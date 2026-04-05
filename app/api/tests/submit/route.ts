import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { ALL_TEST_TYPES } from "@/lib/testMeta";
import { buildTestResultPayload } from "@/lib/scoring/testResultPayload";
import type { TestType } from "@/types/test.types";

function isTestType(v: unknown): v is TestType {
  return typeof v === "string" && (ALL_TEST_TYPES as string[]).includes(v);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz gövde" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Geçersiz gövde" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const testType = o.testType;
  if (!isTestType(testType)) {
    return NextResponse.json({ error: "Geçersiz test türü" }, { status: 400 });
  }

  const answersRaw = o.answers;
  const answers: Record<string, string | number> = {};
  if (answersRaw && typeof answersRaw === "object" && !Array.isArray(answersRaw)) {
    for (const [k, v] of Object.entries(answersRaw as Record<string, unknown>)) {
      if (typeof v === "string" || typeof v === "number") answers[k] = v;
    }
  }

  const currentQ = typeof o.currentQ === "number" && o.currentQ >= 0 ? o.currentQ : 0;
  const completed = Boolean(o.completed);
  const userId = session.user.id;

  let testSession = await prisma.testSession.findFirst({
    where: { userId, testType, status: "IN_PROGRESS" },
    orderBy: { startedAt: "desc" },
  });

  if (!testSession) {
    testSession = await prisma.testSession.create({
      data: {
        userId,
        testType,
        status: "IN_PROGRESS",
        currentQ,
      },
    });
  } else {
    await prisma.testSession.update({
      where: { id: testSession.id },
      data: {
        currentQ,
        ...(completed
          ? {
              status: "COMPLETED",
              completedAt: new Date(),
            }
          : {}),
      },
    });
  }

  await prisma.testAnswer.deleteMany({ where: { sessionId: testSession.id } });
  const answerRows = Object.entries(answers).map(([questionId, val]) => ({
    sessionId: testSession!.id,
    questionId,
    answerId: typeof val === "string" ? val : String(val),
    value: typeof val === "number" ? val : null,
  }));
  if (answerRows.length > 0) {
    await prisma.testAnswer.createMany({ data: answerRows });
  }

  if (completed) {
    const payload = buildTestResultPayload(testType, answers);
    await prisma.testResult.upsert({
      where: { sessionId: testSession.id },
      create: {
        userId,
        sessionId: testSession.id,
        testType,
        rawScores: payload.rawScores,
        normalizedProfile: payload.normalizedProfile,
        primaryResult: payload.primaryResult,
        secondaryResult: payload.secondaryResult,
      },
      update: {
        rawScores: payload.rawScores,
        normalizedProfile: payload.normalizedProfile,
        primaryResult: payload.primaryResult,
        secondaryResult: payload.secondaryResult,
      },
    });

    const completedRows = await prisma.testSession.findMany({
      where: { userId, status: "COMPLETED" },
      select: { testType: true },
    });
    const doneTypes = new Set(completedRows.map((r) => r.testType));
    const allTestsComplete = ALL_TEST_TYPES.every((t) => doneTypes.has(t));

    return NextResponse.json({
      ok: true,
      sessionId: testSession.id,
      allTestsComplete,
      redirectTo: allTestsComplete ? "/processing" : null,
    });
  }

  return NextResponse.json({
    ok: true,
    sessionId: testSession.id,
    allTestsComplete: false,
    redirectTo: null,
  });
}
