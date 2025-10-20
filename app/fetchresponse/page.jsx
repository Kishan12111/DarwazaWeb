"use client";
import React, { useState } from "react";
import UploadPage from "/components/Uploadpage";
import { UploadQuestion } from "@/convex/UploadQuestions";

export default function Page() {
  const [ocrdata, setOcrdata] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchOcrData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/get-ocr-scans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an intelligent multimodal document analyzer trained to identify and segment exam-style question papers. You will receive a multi-page PDF document (it may include scanned pages or digital text). Each page may contain one or more questions, diagrams, and multiple-choice options.

Your task:
1. Analyze every page carefully.
2. Identify complete question blocks, where each block includes:
   - Question number
   - Question text
   - Any associated images or diagrams
   - Options (A, B, C, D or similar)
   - Option images (if any)
3. Output only complete blocks. If any part (text or image) is missing, cut, blurred, or unclear, discard that block.

When extracting text:
- Convert all mathematical expressions (equations, symbols, formulas, etc.) into LaTeX format.
- Inline math should be wrapped in '$ ... $'.
- Block equations should be wrapped in '$$ ... $$'.
- Keep the rest of the text in a clean, human-readable Markdown-style format.

Your final output must be valid JSON only, structured as follows:
{
  "page_number": <int>,
  "questions": [
    {
      "question_number": <int>,
      "coordinates": { "x": 0.0-1.0, "y": 0.0-1.0, "width": 0.0-1.0, "height": 0.0-1.0 },
      "question_text": "<clean text with LaTeX math>",
      "question_image": {
        "exists": true | false,
        "coordinates": { "x": 0.0-1.0, "y": 0.0-1.0, "width": 0.0-1.0, "height": 0.0-1.0 }
      },
      "options": [
        {
          "label": "A",
          "text": "option text with LaTeX if needed",
          "image": {
            "exists": true | false,
            "coordinates": { "x": 0.0-1.0, "y": 0.0-1.0, "width": 0.0-1.0, "height": 0.0-1.0 }
          }
        }
      ]
    }
  ]
}

Rules:
- All coordinates must be normalized (0-1) relative to the page size.
- Ignore headers, footers, watermarks, or repeating page numbers.
- Do not include explanations or commentary.
- Return only valid JSON, ready for programmatic use.`,
        }),
      });
      
      console.log(res.text);
      const data = await res.json();
      setOcrdata(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //upload to database:

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={fetchOcrData}
      >
        {loading ? "Processing..." : "CLICK HERE"}
      </button>
      <UploadPage ocrdata={ocrdata}></UploadPage>
    </div>
  );
}
