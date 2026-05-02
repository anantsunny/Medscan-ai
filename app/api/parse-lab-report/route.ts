import { NextRequest, NextResponse } from "next/server";
import { getLLMClient, getModel } from "@/lib/llm-provider";
import { LabReportResult } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are a senior clinical laboratory analyst AI. Analyze the provided lab report image and extract all test values with clinical interpretation.

Return a JSON object with exactly this schema:
{
  "reportType": "CBC|Lipid Panel|LFT|KFT|Thyroid Profile|HbA1c|Vitamin Panel|Urine Routine|Mixed|Unknown",
  "markers": [
    {
      "testName": "string",
      "value": "string",
      "unit": "string",
      "normalRange": "string",
      "status": "normal|high|low|critical-high|critical-low"
    }
  ],
  "criticalAlerts": ["array of strings for values outside safe range requiring immediate attention"],
  "lifestyleRecommendations": {
    "diet": ["specific dietary recommendations based on findings"],
    "sleep": ["sleep recommendations"],
    "exercise": ["exercise recommendations"]
  },
  "foodAndNutritionGuidance": ["specific food items to add or avoid based on deficiencies or excesses"],
  "aiSummary": "plain language summary of what this report means for the patient",
  "nextSteps": ["recommended follow-up actions, specialist consultations, or repeat tests"]
}

Rules:
- Mark as critical-high or critical-low only for values that require immediate medical attention
- foodAndNutritionGuidance should be specific (e.g., "Low Vitamin D → add fatty fish, egg yolk, 15min sunlight daily")
- aiSummary should be empathetic, clear, and avoid medical jargon
- Always return valid JSON only, no markdown code blocks`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const maxSize =
      parseInt(process.env.MAX_FILE_SIZE_MB || "5", 10) * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Max ${process.env.MAX_FILE_SIZE_MB || 5}MB` },
        { status: 413 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, or PDF files are supported" },
        { status: 415 }
      );
    }

    let imageUrl: string;

    if (file.type === "application/pdf") {
      // For PDF: take first page via pdf2pic (dynamic import to avoid SSR issues)
      const { fromBuffer } = await import("pdf2pic");
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const converter = fromBuffer(buffer, {
        density: 150,
        format: "png",
        width: 1200,
        height: 1600,
      });

      const page = await converter(1, { responseType: "buffer" });
      const pngBuffer = page.buffer as Buffer;
      imageUrl = `data:image/png;base64,${pngBuffer.toString("base64")}`;
    } else {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      imageUrl = `data:${file.type};base64,${base64}`;
    }

    const client = getLLMClient();
    const model = getModel();

    const response = await client.chat.completions.create({
      model,
      max_tokens: 3000,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this lab report and extract all test values and provide clinical guidance as per the JSON schema.",
            },
            {
              type: "image_url",
              image_url: { url: imageUrl, detail: "high" },
            },
          ],
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI model");
    }

    const cleanJson = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result: LabReportResult = JSON.parse(cleanJson);

    return NextResponse.json({ success: true, data: result });
  } catch (err: unknown) {
    console.error("[parse-lab-report] Error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to parse lab report: ${message}` },
      { status: 500 }
    );
  }
}
