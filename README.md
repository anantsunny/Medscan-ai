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

## 💰 Cost Optimization

Running MedScan AI at scale requires choosing models with high vision performance but low token costs. For production workloads, we recommend models that process a single prescription for **less than $0.01 (1 cent)**.

| Model Recommendation | Provider | Est. Cost / Prescription | Best For |
|----------------------|----------|--------------------------|----------|
| `google/gemini-3-flash-preview` | OpenRouter | ~$0.01 | Speed & Accuracy (Tested) |
| `google/gemini-1.5-flash` | Google/OR | < $0.001 | Highest ROI, massive context |
| `openai/gpt-4o-mini` | OpenAI/OR | < $0.001 | Great reliability, low latency |
| `meta-llama/llama-3.2-11b-vision` | Groq/OR | ~$0.00 (Free tier) | Real-time parsing |

### 🆓 OpenRouter Free Models
OpenRouter offers several high-quality vision models for **$0.00 (completely free)**. These are ideal for testing and low-volume production.
*   **Search for `:free` suffix:** Look for models like `google/gemma-2-9b-it:free` or `meta-llama/llama-3.2-11b-vision-instruct:free`.
*   **Automatic Routing:** Use `openrouter/auto` to let OpenRouter pick the best available model (often routes to free options if context allows).

> **Note:** Free models often have stricter rate limits. Check the [OpenRouter Models](https://openrouter.ai/models?max_price=0) page for the latest free offerings.

> **Pro Tip:** Use `google/gemini-1.5-flash` via Google AI Studio for a generous free tier (15 RPM) during development.

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
