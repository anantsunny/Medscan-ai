import { NextRequest, NextResponse } from "next/server";
import { getLLMClient, getModel } from "@/lib/llm-provider";
import { PrescriptionResult } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are a clinical pharmacist assistant AI. Analyze the provided prescription image and extract structured information.

Return a JSON object with exactly this schema:
{
  "diagnosis": "string or null if not visible",
  "medicines": [
    {
      "name": "string",
      "dosage": "string (e.g., 500mg)",
      "frequency": "string (e.g., twice daily)",
      "duration": "string (e.g., 7 days)",
      "confidence": "high|medium|low",
      "notes": "string or null"
    }
  ],
  "doctorInstructions": ["array of strings"],
  "patientGuidance": "plain language explanation of the prescription for the patient",
  "recommendedTests": ["array of test names if mentioned"],
  "flags": [
    {
      "type": "warning|alert|info",
      "message": "string describing the flag"
    }
  ]
}

Rules:
- Set confidence based on legibility of handwriting
- Flag any unusual dosages, potential drug interactions, or allergy-triggering medications
- patientGuidance should be in simple, empathetic language a patient can understand
- If you cannot read something clearly, mark confidence as "low"
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

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP images are supported" },
        { status: 415 }
      );
    }

    // Convert to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const imageUrl = `data:${file.type};base64,${base64}`;

    const client = getLLMClient();
    const model = getModel();

    const response = await client.chat.completions.create({
      model,
      max_tokens: 2000,
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
              text: "Please analyze this prescription and extract all the information as per the JSON schema.",
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

    // Strip possible markdown code fences
    const cleanJson = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result: PrescriptionResult = JSON.parse(cleanJson);

    return NextResponse.json({ success: true, data: result });
  } catch (err: unknown) {
    console.error("[parse-prescription] Error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to parse prescription: ${message}` },
      { status: 500 }
    );
  }
}
