# QuantumChat — AI Quantum Chemistry Chat Assistant

[![Netlify Status](https://api.netlify.com/api/v1/badges/quinone-chat-ai/deploy-status)](https://quinone-chat-ai.netlify.app)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-quinone--chat--ai.netlify.app-6366f1)](https://quinone-chat-ai.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A conversational AI interface for quantum chemistry — specialising in quinone derivatives, HOMO-LUMO gap analysis, DFT theory, and computational chemistry methods. Powered by the **OpenRouter Free Router** (automatic model selection) via the OpenRouter API.

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
| **Auto-retry** | Server retries up to 3× on 502/503/429 errors automatically |
| **k-NN Prediction** | HOMO-LUMO gap estimates for arbitrary molecules via structural similarity |

---

## ⚠️ Known Issue: 502 Errors (Free Tier)

> **The OpenRouter Free Router is occasionally overloaded**, returning HTTP 502 or empty responses. This is a known limitation of free-tier LLM routing.

**What happens automatically:**
- The server retries **up to 3 times** with 1.2 s / 2.4 s backoff before returning an error.

**What to do if you see a 502 error:**
1. **Simply resend your message** — the router usually recovers within seconds.
2. If errors persist, wait **30–60 seconds** and try again.
3. Peak hours (UTC 14:00–22:00) have higher failure rates.

This limitation is inherent to free-tier AI routing and cannot be fully eliminated without a paid API plan.

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
    │  │  • OpenRouter API│  │  • DFT dataset     │ │
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
| LLM | OpenRouter Free Router | `openrouter/free` |
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

Create a `.env` file in the project root:
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

> Get a free API key at [openrouter.ai/keys](https://openrouter.ai/keys)

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
| `OPENROUTER_API_KEY` | ✅ Yes | API key from [openrouter.ai](https://openrouter.ai) |

Set this in the **Netlify dashboard → Site settings → Environment variables** for production.

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

**Final choice: `openrouter/free`** (OpenRouter Free Router)

The Free Router automatically selects the best available free model for each request. Six models were evaluated before settling on this approach:

| Model | Status | Reason rejected |
|-------|--------|-----------------|
| `openai/gpt-oss-120b:free` | ❌ Blocked | Data-policy restriction on API key |
| `z-ai/glm-4.5-air:free` | ❌ Rejected | Provider backend errors in production |
| `qwen/qwen3-coder:free` | ❌ Rate-limited | 20 RPM cap caused production failures |
| `meta-llama/llama-3.3-70b-instruct:free` | ❌ Rejected | Intermittent provider errors |
| `deepseek/deepseek-chat-v3-0324:free` | ❌ Not found | No endpoint on OpenRouter |
| `arcee-ai/trinity-large-preview:free` | ❌ Rejected | Returns HTML instead of JSON |
| **`openrouter/free`** | ✅ **Selected** | Smart routing, no restrictions, auto-fallback |

**Trade-off:** Occasional 502 overload errors (mitigated by server-side 3× retry).

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

1. **Serverless backend** — Netlify Functions keep `OPENROUTER_API_KEY` server-side; no CORS issues
2. **3× auto-retry** — Transparent to users; absorbs most transient 502/503 failures
3. **Embedded dataset** — Zero-latency DFT lookups without a database
4. **k-NN gap prediction** — Structural-feature k-NN (k=3) predicts HOMO/LUMO for any SMILES using the 25-quinone dataset as reference; ±0.3–0.5 eV uncertainty
5. **No thinking toggle** — Removed in final release; all candidate models failed reliable reasoning-mode routing via the free tier
6. **Multi-format export** — jsPDF + docx enable offline archival of AI responses in standard formats

---

## 📝 Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.4.0 | Mar 2026 | Server-side 3× retry for 502/503/429; improved error messages |
| 1.3.0 | Mar 2026 | Multi-format export (MD/PDF/DOCX) inline per response |
| 1.2.0 | Mar 2026 | QC Methods Library panel; comprehensive knowledge base |
| 1.1.0 | Mar 2026 | k-NN HOMO-LUMO prediction; bug fix for empty-name matching |
| 1.0.0 | Mar 2026 | Initial release with chat, SMILES detection, quinone dataset |

---

## 📄 License

MIT © 2026
