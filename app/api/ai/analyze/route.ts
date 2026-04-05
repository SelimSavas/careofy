import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Anthropic from "@anthropic-ai/sdk";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { ANALYSIS_SYSTEM_PROMPT, buildAnalysisPrompt } from "@/lib/prompts";
import { enrichReportWithCatalog } from "@/lib/career/enrichReport";
import { buildMockReport } from "@/lib/mockReport";
import { sanitizeUserContext } from "@/lib/report/userContext";
import type { AIReportData, ProfileVector } from "@/types/report.types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profileVector, userContext } = body as {
      profileVector?: ProfileVector;
      userContext?: unknown;
    };
    if (!profileVector || typeof profileVector !== "object") {
      return NextResponse.json(
        { error: "profileVector gerekli" },
        { status: 400 }
      );
    }
    const snapshot = sanitizeUserContext(userContext);

    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      const reportData = {
        ...buildMockReport(profileVector, snapshot),
        userContextSnapshot: snapshot,
      };
      const session = await getServerSession(authOptions);
      let reportId: string | null = null;
      if (session?.user?.id) {
        const row = await prisma.aIReport.create({
          data: {
            userId: session.user.id,
            profileVector: JSON.stringify(profileVector),
            reportData: JSON.stringify(reportData),
          },
        });
        reportId = row.id;
      }
      return NextResponse.json({ reportId, reportData });
    }

    const client = new Anthropic({ apiKey: key });
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: ANALYSIS_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildAnalysisPrompt(profileVector, snapshot),
        },
      ],
    });

    const block = message.content[0];
    const rawText = block.type === "text" ? block.text : "";
    const match = rawText.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(match ? match[0] : rawText) as AIReportData;
    const reportData = {
      ...enrichReportWithCatalog(profileVector, parsed, snapshot),
      userContextSnapshot: snapshot,
    };

    const session = await getServerSession(authOptions);
    let reportId: string | null = null;
    if (session?.user?.id) {
      const row = await prisma.aIReport.create({
        data: {
          userId: session.user.id,
          profileVector: JSON.stringify(profileVector),
          reportData: JSON.stringify(reportData),
        },
      });
      reportId = row.id;
    }

    return NextResponse.json({ reportId, reportData });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Analiz sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}
