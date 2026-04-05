import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { ALL_TEST_TYPES } from "@/lib/testMeta";
import { prisma } from "@/lib/prisma";
import type { TestType } from "@/types/test.types";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }

  const rows = await prisma.testSession.findMany({
    where: { userId: session.user.id },
    orderBy: { startedAt: "desc" },
    include: { answers: true },
  });

  const sessions: Partial<
    Record<
      TestType,
      {
        currentIndex: number;
        answers: Record<string, string | number>;
        completed: boolean;
        startedAt: string;
        sessionId: string;
      }
    >
  > = {};

  for (const testType of ALL_TEST_TYPES) {
    const inProg = rows.find((r) => r.testType === testType && r.status === "IN_PROGRESS");
    const latestDone = rows.find((r) => r.testType === testType && r.status === "COMPLETED");
    const pick = inProg ?? latestDone;
    if (!pick) continue;

    const answers: Record<string, string | number> = {};
    for (const a of pick.answers) {
      if (a.answerId != null && a.answerId !== "") answers[a.questionId] = a.answerId;
      else if (a.value != null) answers[a.questionId] = a.value;
    }

    sessions[testType] = {
      currentIndex: pick.currentQ,
      answers,
      completed: pick.status === "COMPLETED",
      startedAt: pick.startedAt.toISOString(),
      sessionId: pick.id,
    };
  }

  return NextResponse.json({ sessions });
}
