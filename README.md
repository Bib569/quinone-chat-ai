# QuantumChat — LLM-Powered Quantum Chemistry Chat

A conversational AI interface for exploring quinone molecular properties and HOMO-LUMO gap predictions, powered by the Qwen3 Coder model via OpenRouter.

**Live Demo:** [https://quinone-chat-ai.netlify.app](https://quinone-chat-ai.netlify.app)

## Features

- **Chat Interface** — Natural language Q&A about quinone derivatives, DFT calculations, and molecular properties
- **SMILES Detection** — Automatic extraction and rendering of molecular structures from chat messages via PubChem API
- **Dual Mode** — Fast mode for quick responses; Thinking mode for step-by-step reasoning with visible chain-of-thought
- **Quinone Dataset** — Embedded reference dataset of 25 quinone derivatives with DFT B3LYP/6-31G* computed HOMO, LUMO, and gap values
- **Molecule Visualization** — Inline 2D structure images fetched from PubChem PUG-REST

## Architecture

```
┌─────────────────────────────────────────────┐
│              React + Vite Frontend          │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Chat UI   │  │ SMILES   │  │ Molecule │ │
│  │ Component │  │ Extractor│  │ Renderer │ │
│  └─────┬─────┘  └────┬─────┘  └────┬─────┘ │
│        │              │              │       │
└────────┼──────────────┼──────────────┼───────┘
         │              │              │
    ┌────▼──────────────▼──────────────▼────┐
    │        Netlify Serverless Functions    │
    │  ┌─────────────┐  ┌────────────────┐  │
    │  │ /chat       │  │ /molecule      │  │
    │  │ OpenRouter   │  │ PubChem API    │  │
    │  │ LLM Proxy   │  │ + DFT Dataset  │  │
    │  └─────────────┘  └────────────────┘  │
    └───────────────────────────────────────┘
```

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, TypeScript, Vite 5      |
| Styling   | TailwindCSS 3, custom theme       |
| Icons     | Lucide React                      |
| Markdown  | react-markdown + remark-gfm       |
| Backend   | Netlify Functions (serverless)    |
| LLM       | Qwen3 Coder (480B) via OpenRouter |
| Chemistry | PubChem PUG-REST API              |
| Dataset   | 25 quinones, DFT B3LYP/6-31G*    |
| Hosting   | Netlify                           |

## Quick Start

```bash
git clone https://github.com/Bib569/quinone-chat-ai.git
cd quinone-chat-ai
npm install
```

Create a `.env` file:
```
OPENROUTER_API_KEY=your_openrouter_api_key
```

Run locally with Netlify CLI:
```bash
npx netlify dev
```

Build for production:
```bash
npm run build
```

## Environment Variables

| Variable            | Description                  |
|---------------------|------------------------------|
| `OPENROUTER_API_KEY`| API key from openrouter.ai   |

## Project Structure

```
├── index.html
├── netlify.toml
├── package.json
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── App.tsx
│   └── lib/
│       └── quinoneData.ts      # 25-molecule DFT dataset
├── netlify/
│   └── functions/
│       ├── chat.ts             # LLM chat proxy
│       └── molecule.ts         # PubChem + DFT lookup
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Design Choices

1. **Serverless backend** — Netlify Functions keep the API key secure and avoid CORS issues with OpenRouter
2. **Embedded dataset** — The 25-quinone DFT dataset is embedded in both frontend and backend for instant lookups without a database
3. **PubChem integration** — Real-time molecular property and 2D structure retrieval for any valid SMILES
4. **Thinking mode** — Exposes the LLM's reasoning chain-of-thought for educational/research transparency

## License

MIT
