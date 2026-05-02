# MedScan AI 🏥

> AI-Powered Prescription & Lab Report Analyzer — Self-hostable, no vendor lock-in.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Built to demonstrate **Vision AI in healthcare** using production patterns from Zeno Health's 440+ pharmacy network.

---

## What It Does

| Feature | Description |
|---|---|
| 📋 **Prescription Parser** | Upload JPG/PNG → AI extracts medicines, dosages, frequencies, diagnoses |
| 🧪 **Lab Report Analyzer** | Upload PDF/JPG → AI interprets CBC, Lipid, LFT, KFT, Thyroid, HbA1c values |
| 💊 **Clinical Flags** | Unusual dosages, drug interactions, allergy alerts |
| 🥗 **Lifestyle Guidance** | Diet, sleep, exercise & nutrition recs from lab findings |
| 🔒 **Zero Storage** | Images never written to disk — base64 directly to LLM |

---

## 🔑 Quick Start

```bash
git clone https://github.com/medscan-ai/medscan-ai
cd medscan-ai
cp .env.example .env.local
```

Edit `.env.local`:

```env
LLM_PROVIDER=openrouter          # or openai | anthropic | groq | xai | gemini | mistral
LLM_API_KEY=sk-or-your-key-here
LLM_MODEL=anthropic/claude-3-5-sonnet
```

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 🤖 Supported Providers

| Provider   | Vision | Free Tier | Example Model |
|------------|--------|-----------|---------------|
| OpenRouter | ✅ 100+ models | ✅ | `anthropic/claude-3-5-sonnet` |
| OpenAI     | ✅ GPT-4o | ❌ | `gpt-4o` |
| Anthropic  | ✅ Claude | ❌ | `claude-3-5-sonnet-20241022` |
| Groq       | ✅ Llama | ✅ | `llama-3.3-70b-versatile` |
| xAI        | ✅ Grok | Limited | `grok-2-vision-1212` |
| Google     | ✅ Gemini | ✅ | `gemini-2.0-flash` |
| Mistral    | ✅ Pixtral | ❌ | `pixtral-12b-2409` |

> **Switching providers** = single `.env` change. No code modification required.

---

## 🗂 Project Structure

```
medscan-ai/
├── .env.example                    ← All config here
├── app/
│   ├── page.tsx                    ← Landing page
│   ├── layout.tsx
│   ├── globals.css                 ← Design system
│   ├── lab/
│   │   ├── prescription/page.tsx   ← Prescription analyzer UI
│   │   └── lab-report/page.tsx     ← Lab report analyzer UI
│   └── api/
│       ├── parse-prescription/route.ts
│       └── parse-lab-report/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── FileUpload.tsx
│   ├── PrescriptionResults.tsx
│   └── LabReportResults.tsx
├── lib/
│   ├── llm-provider.ts             ← Universal OpenAI-compatible router
│   └── types.ts                    ← Shared TypeScript types
└── config/
    └── providers.ts                ← Provider registry
```

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 16 App Router | React Server Components, API routes |
| **Language** | TypeScript 5 | Type-safe throughout |
| **Styling** | Tailwind v4 + Custom CSS | Design tokens, glassmorphism |
| **AI Client** | OpenAI SDK (universal) | Single SDK, all providers via baseURL |
| **Vision** | Any vision model via env | No lock-in |
| **PDF** | pdf2pic | Lab report PDFs → PNG for vision |
| **Icons** | lucide-react | Consistent, lightweight |

---

## Architecture

```
Browser
  └─ base64 encode image
      └─ POST /api/parse-prescription  (or /api/parse-lab-report)
          └─ getLLMClient()            ← reads LLM_PROVIDER, LLM_MODEL
              └─ openai.chat.completions.create() with vision
                  └─ JSON response → PrescriptionResult | LabReportResult
                      └─ rendered in ResultsDisplay component
```

---

## ⚠️ Disclaimer

Demo only. No data is stored. Do not upload real patient data.
Built to demonstrate Vision AI in healthcare — **not a medical device**.

---

## License

MIT © 2025 MedScan AI Contributors
