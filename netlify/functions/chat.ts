const QUINONE_DATASET = [
  { name: "1,4-Benzoquinone", smiles: "O=C1C=CC(=O)C=C1", gap: 4.27, homo: -8.82, lumo: -4.55, family: "benzoquinone" },
  { name: "2-Methyl-1,4-benzoquinone", smiles: "CC1=CC(=O)C=CC1=O", gap: 4.12, homo: -8.65, lumo: -4.53, family: "benzoquinone" },
  { name: "2,3-Dimethyl-1,4-benzoquinone", smiles: "CC1=C(C)C(=O)C=CC1=O", gap: 3.97, homo: -8.48, lumo: -4.51, family: "benzoquinone" },
  { name: "2,6-Dimethyl-1,4-benzoquinone", smiles: "CC1=CC(=O)C(C)=CC1=O", gap: 3.95, homo: -8.46, lumo: -4.51, family: "benzoquinone" },
  { name: "2-Chloro-1,4-benzoquinone", smiles: "ClC1=CC(=O)C=CC1=O", gap: 4.02, homo: -8.92, lumo: -4.9, family: "benzoquinone" },
  { name: "2,3-Dichloro-1,4-benzoquinone", smiles: "ClC1=C(Cl)C(=O)C=CC1=O", gap: 3.78, homo: -9.05, lumo: -5.27, family: "benzoquinone" },
  { name: "2,5-Dichloro-1,4-benzoquinone", smiles: "ClC1=CC(=O)C(Cl)=CC1=O", gap: 3.79, homo: -9.03, lumo: -5.24, family: "benzoquinone" },
  { name: "2-Methoxy-1,4-benzoquinone", smiles: "COC1=CC(=O)C=CC1=O", gap: 4.05, homo: -8.55, lumo: -4.5, family: "benzoquinone" },
  { name: "2-Hydroxy-1,4-benzoquinone", smiles: "OC1=CC(=O)C=CC1=O", gap: 4.18, homo: -8.68, lumo: -4.5, family: "benzoquinone" },
  { name: "2-Amino-1,4-benzoquinone", smiles: "NC1=CC(=O)C=CC1=O", gap: 3.72, homo: -8.05, lumo: -4.33, family: "benzoquinone" },
  { name: "2,5-Dimethoxy-1,4-benzoquinone", smiles: "COC1=CC(=O)C(OC)=CC1=O", gap: 4.06, homo: -8.5, lumo: -4.44, family: "benzoquinone" },
  { name: "1,4-Naphthoquinone", smiles: "O=C1C=CC(=O)c2ccccc21", gap: 3.52, homo: -8.38, lumo: -4.86, family: "naphthoquinone" },
  { name: "2-Methyl-1,4-naphthoquinone", smiles: "CC1=CC(=O)c2ccccc2C1=O", gap: 3.38, homo: -8.21, lumo: -4.83, family: "naphthoquinone" },
  { name: "2-Hydroxy-1,4-naphthoquinone", smiles: "OC1=CC(=O)c2ccccc2C1=O", gap: 3.45, homo: -8.28, lumo: -4.83, family: "naphthoquinone" },
  { name: "2-Amino-1,4-naphthoquinone", smiles: "NC1=CC(=O)c2ccccc2C1=O", gap: 3.21, homo: -7.92, lumo: -4.71, family: "naphthoquinone" },
  { name: "5-Hydroxy-1,4-naphthoquinone", smiles: "O=C1C=CC(=O)c2c(O)cccc21", gap: 3.2, homo: -8.12, lumo: -4.92, family: "naphthoquinone" },
  { name: "2-Chloro-1,4-naphthoquinone", smiles: "ClC1=CC(=O)c2ccccc2C1=O", gap: 3.35, homo: -8.55, lumo: -5.2, family: "naphthoquinone" },
  { name: "5,8-Dihydroxy-1,4-naphthoquinone", smiles: "O=C1C=CC(=O)c2c(O)ccc(O)c21", gap: 3.05, homo: -7.98, lumo: -4.93, family: "naphthoquinone" },
  { name: "9,10-Anthraquinone", smiles: "O=C1c2ccccc2C(=O)c2ccccc21", gap: 3.12, homo: -8.2, lumo: -5.08, family: "anthraquinone" },
  { name: "1-Hydroxy-9,10-anthraquinone", smiles: "O=C1c2c(O)cccc2C(=O)c2ccccc21", gap: 2.98, homo: -7.95, lumo: -4.97, family: "anthraquinone" },
  { name: "2-Hydroxy-9,10-anthraquinone", smiles: "O=C1c2ccccc2C(=O)c2cc(O)ccc21", gap: 3.02, homo: -8.0, lumo: -4.98, family: "anthraquinone" },
  { name: "1-Amino-9,10-anthraquinone", smiles: "O=C1c2c(N)cccc2C(=O)c2ccccc21", gap: 2.85, homo: -7.72, lumo: -4.87, family: "anthraquinone" },
  { name: "2-Amino-9,10-anthraquinone", smiles: "O=C1c2ccccc2C(=O)c2cc(N)ccc21", gap: 2.92, homo: -7.8, lumo: -4.88, family: "anthraquinone" },
  { name: "1,5-Dihydroxy-9,10-anthraquinone", smiles: "O=C1c2c(O)cccc2C(=O)c2cccc(O)c21", gap: 2.78, homo: -7.68, lumo: -4.9, family: "anthraquinone" },
  { name: "9,10-Anthraquinone-2-sulfonic acid", smiles: "O=C1c2ccccc2C(=O)c2cc(S(=O)(=O)O)ccc21", gap: 3.05, homo: -8.38, lumo: -5.33, family: "anthraquinone" },
];

function buildDatasetContext(): string {
  const lines = QUINONE_DATASET.map(
    (q) => `- ${q.name} (${q.family}): SMILES=${q.smiles}, HOMO=${q.homo} eV, LUMO=${q.lumo} eV, Gap=${q.gap} eV`
  );
  return `REFERENCE DATASET (DFT B3LYP/6-31G* computed values for 25 quinone derivatives):\n${lines.join('\n')}`;
}

const SYSTEM_PROMPT = `You are QuantumChat, an expert AI assistant specializing in quantum chemistry and molecular science. You have deep knowledge of:
- Density Functional Theory (DFT), especially B3LYP with various basis sets
- HOMO-LUMO gaps and frontier molecular orbital theory
- Quinone derivatives (benzoquinones, naphthoquinones, anthraquinones) and their redox chemistry
- Molecular properties: molecular weight, LogP, topological polar surface area, hydrogen bond donors/acceptors
- Structure-property relationships in organic molecules
- Electrochemistry and redox flow batteries

You have access to a reference dataset of 25 quinone derivatives with DFT B3LYP/6-31G* computed HOMO, LUMO, and HOMO-LUMO gap values.

${buildDatasetContext()}

INSTRUCTIONS:
1. When a user asks about a specific quinone in the dataset, provide the exact DFT-computed values.
2. When a user provides a SMILES string, analyze the molecular structure and discuss its expected properties.
3. For molecules NOT in the dataset, explain that exact DFT values are not available but provide qualitative analysis based on structure-property relationships.
4. Use markdown formatting with tables, bold text, and chemical notation.
5. When discussing SMILES strings, always mention the SMILES notation so it can be rendered.
6. Be scientifically accurate and cite the level of theory when discussing computed values.
7. If asked about DFT methods, explain them clearly with appropriate technical depth.`;

export default async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages, thinking } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: { message: 'OPENROUTER_API_KEY not configured' } }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const model = 'openrouter/free';

    const requestBody: Record<string, unknown> = {
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 4096,
      temperature: 0.7,
    };

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://quinone-chat-ai.netlify.app',
        'X-Title': 'QuantumChat - AI Quantum Chemistry Assistant',
      },
      body: JSON.stringify(requestBody),
    });

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      // Handle cases where OpenRouter returns HTML instead of JSON
      const responseText = await response.text();
      console.error('OpenRouter response parsing error:', parseError);
      console.error('Response text:', responseText);
      
      // Return a more informative error message
      return new Response(
        JSON.stringify({ 
          error: { 
            message: `Invalid response format from OpenRouter Free Router. Expected JSON but received: ${responseText.substring(0, 200)}...`,
            details: 'The OpenRouter Free Router may have routed to a model that returned HTML instead of JSON. Please try again.'
          }
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    return new Response(JSON.stringify(data), {
      status: response.ok ? 200 : response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: { message } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

