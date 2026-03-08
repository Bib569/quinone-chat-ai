# QuantumChat — AI Quantum Chemistry Chat Assistant

[![Netlify Status](https://api.netlify.com/api/v1/badges/quinone-chat-ai/deploy-status)](https://quinone-chat-ai.netlify.app)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-quinone--chat--ai.netlify.app-6366f1)](https://quinone-chat-ai.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A conversational AI interface for quantum chemistry — specialising in quinone derivatives, HOMO-LUMO gap analysis, DFT theory, and computational chemistry methods. Powered by the **Groq API** with selectable free-plan models (Kimi K2, Llama 3.3 70B, Qwen3 32B, GPT-OSS 120B) and optional thinking mode.

**🔗 Live Demo:** [https://quinone-chat-ai.netlify.app](https://quinone-chat-ai.netlify.app)  
**🔗 Companion App (task-oriented):** [QuantumTask](https://github.com/Bib569/quinone-task-ai)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **AI Chat** | PhD-level Q&A on quantum chemistry, DFT, basis sets, and spectroscopy |
| **SMILES Detection** | Automatic extraction and inline 2D rendering of molecular structures via PubChem |
| **QC Methods Library** | Searchable reference panel: 20+ methods, 25+ DFT functionals, 18+ basis sets, key equations |
| **Export Chat** | Download any AI response as **Markdown**, **PDF**, or **Word (.docx)** |
| **Quinone Dataset** | 25 quinone derivatives with DFT B3LYP/6-31G* HOMO/LUMO/gap values embedded in system prompt |
| **Model Selector** | Dropdown in header to switch between 4 Groq models (Kimi K2, Llama 3.3 70B, Qwen3 32B, GPT-OSS 120B) |
| **Thinking Mode** | Toggle beside model selector — enabled for Qwen3 32B (chain-of-thought reasoning shown in collapsible panel) |
| **Auto-retry** | Server retries up to 3× on 502/503/429 errors automatically |
| **k-NN Prediction** | HOMO-LUMO gap estimates for arbitrary molecules via structural similarity |

---

## ⚠️ Rate Limits (Groq Free Plan)

Groq's free plan has per-minute token limits per model. If you hit a rate limit (HTTP 429):

1. **Wait 10–30 seconds** and resend your message — limits reset quickly.
2. **Switch to a different model** using the dropdown in the header.
3. The server retries **up to 3 times** automatically before surfacing an error.

| Model | Free RPM | Free TPM |
|-------|----------|----------|
| Kimi K2 (`moonshotai/kimi-k2-instruct`) | varies | varies |
| Llama 3.3 70B (`llama-3.3-70b-versatile`) | 30 | 6,000 |
| Qwen3 32B (`qwen/qwen3-32b`) | 30 | 6,000 |
| GPT-OSS 120B (`openai/gpt-oss-120b`) | varies | varies |

> Check current limits at [console.groq.com/settings/limits](https://console.groq.com/settings/limits)

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  React + Vite Frontend                   │
│  ┌────────────┐  ┌──────────────┐  ┌───────────────────┐ │
│  │  Chat UI   │  │ SMILES       │  │  MethodsLibrary   │ │
│  │  Messages  │  │ Extractor +  │  │  (QC Reference    │ │
│  │  ExportMenu│  │ MoleculeImage│  │   Panel)          │ │
│  └─────┬──────┘  └──────┬───────┘  └───────────────────┘ │
└────────┼────────────────┼──────────────────────────────── ┘
         │                │
    ┌────▼────────────────▼────────────────────────┐
    │          Netlify Serverless Functions         │
    │  ┌──────────────────┐  ┌────────────────────┐ │
    │  │  /chat           │  │  /molecule         │ │
    │  │  • 3× retry      │  │  • PubChem lookup  │ │
    │  │  • Groq API      │  │  • DFT dataset     │ │
    │  │  • System prompt │  │  • k-NN prediction │ │
    │  └──────────────────┘  └────────────────────┘ │
    └──────────────────────────────────────────────┘
```

---

## 🧪 Quantum Chemistry Knowledge Base

The LLM system prompt encodes **PhD-level knowledge** across:

- **Wavefunction methods**: HF, MP2–MP4, CCSD, CCSD(T), EOM-CCSD, ADC, CISD, FCI
- **Multi-reference**: CASSCF, CASPT2, NEVPT2, MRCI+Q, DMRG, Selected-CI
- **DFT — Jacob's Ladder** (all 5 rungs): LDA → GGA → meta-GGA → hybrid/RSH → double hybrid
- **TD-DFT**: Runge-Gross theorem, Casida equation, TDA, CT state warnings
- **Many-body**: GW, BSE, DFT+U, periodic DFT
- **Semi-empirical**: Hückel, AM1, PM7, GFN2-xTB, DFTB
- **Basis sets**: STO-3G, Pople, Dunning cc-pVxZ/aug, def2, Jensen pc-n, ANO-RCC, ECPs
- **Spectroscopy guide**: property → method+basis mapping (UV-Vis, NMR, IR, IP, barriers, etc.)

The interactive **QC Methods Library** (BookOpen icon in the header) provides a searchable, tabbed reference panel for all of the above.

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React + TypeScript | 18 / 5.5 |
| Build | Vite | 5 |
| Styling | TailwindCSS | 3 |
| Icons | Lucide React | 0.468 |
| Markdown | react-markdown + remark-gfm | 9 / 4 |
| Export | jsPDF + docx | latest |
| Backend | Netlify Functions (serverless) | — |
| LLM | Groq API (free plan) | `api.groq.com` |
| Models | Kimi K2, Llama 3.3 70B, Qwen3 32B, GPT-OSS 120B | selectable |
| Chemistry | PubChem PUG-REST API | — |
| Dataset | 25 quinones DFT B3LYP/6-31G* | — |
| Hosting | Netlify (free tier) | — |

---

## 🚀 Quick Start

```bash
git clone https://github.com/Bib569/quinone-chat-ai.git
cd quinone-chat-ai
npm install
```

The Groq API key is embedded in the serverless function for the free plan. To use your own key, set it as an environment variable:
```env
GROQ_API_KEY=your_groq_api_key_here
```

> Get a free API key at [console.groq.com/keys](https://console.groq.com/keys)

Run locally with Netlify CLI (required for serverless functions):
```bash
npx netlify dev
```

Build for production:
```bash
npm run build
```

Deploy to Netlify:
```bash
netlify deploy --prod --dir=dist
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Optional | Override the built-in Groq API key. Get one at [console.groq.com/keys](https://console.groq.com/keys) |

The default key is embedded in `netlify/functions/chat.ts` for the free plan. For production with your own key, set it in **Netlify dashboard → Site settings → Environment variables** and update `chat.ts` to read `process.env.GROQ_API_KEY`.

---

## 📁 Project Structure

```
quinone-chat-ai/
├── index.html
├── netlify.toml                    # Netlify build + functions config
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── App.tsx                     # Main chat UI + state
│   ├── components/
│   │   ├── ExportMenu.tsx          # MD / PDF / DOCX export dropdown
│   │   └── MethodsLibrary.tsx      # QC methods reference panel (modal)
│   └── lib/
│       ├── exportUtils.ts          # jsPDF + docx export engine
│       └── quantumChemKnowledge.ts # Full QC knowledge base (methods, functionals, basis sets)
└── netlify/
    └── functions/
        ├── chat.ts                 # LLM chat proxy (3× retry, system prompt)
        └── molecule.ts             # PubChem lookup + k-NN HOMO-LUMO prediction
```

---

## 🧠 LLM Model Selection

**Gateway: Groq API** — switched from OpenRouter in v1.6.0 due to persistent free-tier 502 traffic overload errors.

### OpenRouter History (v1.0–v1.5)

| Model | Status | Reason rejected |
|-------|--------|-----------------|
| `openai/gpt-oss-120b:free` | ❌ Blocked | Data-policy restriction on API key |
| `z-ai/glm-4.5-air:free` | ❌ Rejected | Provider backend errors in production |
| `qwen/qwen3-coder:free` | ❌ Rate-limited | 20 RPM cap caused failures |
| `meta-llama/llama-3.3-70b-instruct:free` | ❌ Rejected | Intermittent provider errors |
| `arcee-ai/trinity-large-preview:free` | ❌ Rejected | Returns HTML instead of JSON |
| `openrouter/free` | ❌ Replaced | Persistent 502 overload under traffic |

### Groq Models (v1.6.0+)

| Model ID | Label | Thinking | Notes |
|----------|-------|----------|-------|
| `moonshotai/kimi-k2-instruct` | Kimi K2 | ✗ | **Default.** 1T MoE, 128K ctx, top intelligence |
| `llama-3.3-70b-versatile` | Llama 3.3 70B | ✗ | Reliable, versatile, well-tested |
| `qwen/qwen3-32b` | Qwen3 32B | ✅ | Supports thinking mode (chain-of-thought) |
| `openai/gpt-oss-120b` | GPT-OSS 120B | ✗ | OpenAI MoE, high reasoning |

**Why Groq:** Predictable low latency (~200–600 ms), stable JSON responses, no HTML fallbacks, clear rate-limit headers, and free-plan keys with reasonable TPM/RPM limits.

---

## 📊 Quinone Reference Dataset

25 quinone derivatives with DFT B3LYP/6-31G* computed values:

| Family | Count | HOMO-LUMO Gap Range |
|--------|-------|---------------------|
| Benzoquinones | 11 | 3.72 – 4.27 eV |
| Naphthoquinones | 7 | 3.05 – 3.52 eV |
| Anthraquinones | 7 | 2.78 – 3.12 eV |

---

## 🔧 Design Decisions

1. **Groq backend** — Netlify Functions keep the API key server-side; OpenAI-compatible endpoint, no CORS issues
2. **Model selector** — Right-hand side dropdown in header; persists for session; auto-disables thinking toggle for non-supporting models
3. **Thinking toggle** — Purple brain icon appears only when Qwen3 32B is selected; sends `thinking: {type: 'enabled', budget_tokens: 2048}` to Groq
4. **3× auto-retry** — Transparent to users; absorbs transient 429/502/503 with 1.5 s / 3.0 s backoff
5. **Embedded dataset** — Zero-latency DFT lookups without a database
6. **k-NN gap prediction** — Structural-feature k-NN (k=3) predicts HOMO/LUMO; ±0.3–0.5 eV uncertainty
7. **Multi-format export** — jsPDF (Latin-1 sanitised) + docx for offline archival

---

## 📝 Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.6.0 | Mar 2026 | **Groq API migration**: model selector dropdown (Kimi K2 / Llama 3.3 / Qwen3 / GPT-OSS), thinking mode toggle for Qwen3 32B, 429 rate-limit error handling |
| 1.5.0 | Mar 2026 | PDF export garbled character fix (`sanitiseForPDF` Latin-1 sanitisation) |
| 1.4.0 | Mar 2026 | Server-side 3× retry for 502/503/429; improved error messages |
| 1.3.0 | Mar 2026 | Multi-format export (MD/PDF/DOCX) inline per response |
| 1.2.0 | Mar 2026 | QC Methods Library panel; comprehensive knowledge base |
| 1.1.0 | Mar 2026 | k-NN HOMO-LUMO prediction; bug fix for empty-name matching |
| 1.0.0 | Mar 2026 | Initial release with chat, SMILES detection, quinone dataset |

---

## 📄 License

MIT © 2026
