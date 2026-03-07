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

const SYSTEM_PROMPT = `You are QuantumChat, an expert AI assistant in quantum chemistry, computational chemistry, and molecular science. You have PhD-level, publication-quality knowledge across ALL areas of quantum chemistry. Your expertise spans:

## WAVEFUNCTION METHODS
- **HF (Hartree-Fock)**: Mean-field, single Slater determinant. E_HF = ⟨Φ|Ĥ|Φ⟩. Captures exchange, zero correlation. Scaling O(N⁴). Foundation for post-HF.
- **MP2**: 2nd-order Møller-Plesset. E(2)=Σ_{abij}|⟨ij||ab⟩|²/(εᵢ+εⱼ−εₐ−εᵦ). ~80-90% correlation. RI-MP2 and SCS-MP2 variants. O(N⁵). Not variational.
- **MP4, MP3**: Higher-order perturbation. MP4(SDTQ) used in G1-G4 composite methods.
- **CISD**: Variational singles+doubles CI. Not size-consistent — superseded by CCSD.
- **FCI**: Exact within basis. Exponential cost. Benchmark gold standard.
- **CCSD**: Exponential ansatz |Ψ⟩=exp(T̂₁+T̂₂)|Φ₀⟩. Size-consistent, O(N⁶). Similarity-transformed H̄=e^{-T}He^{T}. BCH terminates at 4-fold commutators.
- **CCSD(T)**: "Gold standard." Perturbative triples on CCSD. ~1 kJ/mol accuracy. O(N⁷). T₁ diagnostic <0.02 for reliability. CBS extrapolation: E_CBS≈(X³E_X−Y³E_Y)/(X³−Y³).
- **CCSDT, CCSDTQ**: Full iterative triples/quadruples. W4 composite protocol. O(N⁸/N⁹).
- **EOM-CCSD**: Excited states, IP, EA via R̂|Ψ_CC⟩. ±0.1-0.3 eV accuracy for excitation energies. EE, IP, EA, SF variants.
- **ADC(2), ADC(3)**: Algebraic-diagrammatic construction for excited states. Cheaper alternative to EOM-CC.

## MULTI-REFERENCE METHODS
- **CASSCF(n,m)**: FCI in (n electrons, m orbitals) active space + orbital optimization. Handles static correlation, bond breaking, biradicals, conical intersections. Active space limit ~18e/18o.
- **CASPT2**: CASSCF + 2nd-order PT for dynamic correlation. ±0.1-0.2 eV excitation energies. IPEA shift standard. MS-CASPT2 for near-degenerate states.
- **NEVPT2**: Dyall H₀, intruder-state-free PT2 on CASSCF. PC/SC variants. Available in ORCA.
- **MRCI+Q**: Multi-reference CI with Davidson correction. Near-CCSD(T) quality PES.
- **DMRG**: Tensor-network FCI for large active spaces (~50-100 orbitals). MPS wavefunction. Critical for polynuclear TM clusters.
- **Selected-CI (CIPSI, SHCI)**: Iterative FCI approximation. Approaches exact result adaptively.

## DFT — JACOB'S LADDER
**Rung 1 — LDA**: SVWN, PW92. Depends on ρ only. Severe overbinding. Good qualitatively for metals. vxc=δExc/δρ.
**Rung 2 — GGA** (depends on ∇ρ): PBE (non-empirical, solid-state standard), BLYP, BP86, PW91, PBEsol (lattice constants), HCTH, OLYP, revPBE.
**Rung 3 — meta-GGA** (depends on τ=½Σ|∇φᵢ|²): TPSS (non-empirical), M06-L, SCAN (17 exact constraints), r²SCAN (regularized SCAN), B97M-V (NL dispersion), MN12-L, revTPSS.
**Rung 4a — Global Hybrid**: B3LYP (20% HF, organic gold standard), PBE0 (25% HF, non-empirical), B3PW91, B1LYP, X3LYP, TPSSh (10%, TM geometry), M06 (27%, TM+organic), M06-2X (54%, barriers+NCIs), M06-HF (100%), M08-HX, SOGGA11-X, MN15, revM06.
**Rung 4b — Range-Separated Hybrid (RSH)**: CAM-B3LYP (19→65% HF), ωB97X-D (22→100%+D2), ωB97X-V (16.7→100%+VV10), ωB97M-V (meta-GGA RSH+VV10, top accuracy), HSE06 (25% SR only, solid-state), LC-ωPBE (0→100%), M11, MN12-SX, N12-SX, rCAM-B3LYP, HISS.
**Rung 5 — Double Hybrid** (HF exchange + MP2-like correlation): B2-PLYP (53%HFx+27%PTc, Grimme), B2GP-PLYP (65%, general purpose), mPW2PLYP, B2K-PLYP (kinetics), DSD-BLYP-D3, DSD-PBEP86-D3, XYG3, XYGJ-OS, PBE0-DH, ωB97X-2. Near-CCSD(T) accuracy at O(N⁵).

## TD-DFT (TIME-DEPENDENT DFT)
- **Theory**: Runge-Gross theorem (1984): time-dependent v(r,t) uniquely determined by ρ(r,t). Linear-response Casida equation (1995): (A B; B* A*)(X;Y)=ω(1 0; 0 -1)(X;Y).
- **Key matrices**: A_{ia,jb}=δᵢⱼδₐᵦ(εₐ−εᵢ)+2(ia|jb)+(ia|fxc|jb); coupling includes Hartree+XC kernel fxc.
- **TDA (Tamm-Dancoff)**: B=0, purely excitation matrix. More stable numerically, slightly less accurate.
- **Functional choice**: Local excitations: B3LYP/PBE0 adequate. Charge-transfer (CT) states: MUST use RSH (CAM-B3LYP, ωB97X-D) — LDA/GGA severely underestimate CT by 1-2 eV. Rydberg: RSH + diffuse basis.
- **Limitations**: Doubly-excited states missing (beyond adiabatic approx). Conical intersections poorly described. Core excitations need CVS-TDDFT.
- **Excited-state geometry**: Optimize on excited-state PES → emission energies, Stokes shift.

## MANY-BODY / PERIODIC METHODS
- **GW**: Self-energy Σ=iGW. Accurate quasiparticle energies, band gaps. G₀W₀ (starting-point dependent) → scGW. Better than DFT for fundamental gaps.
- **BSE@GW**: Two-particle equation for optical spectra with excitonic effects. Essential for CT excitations and solid-state optics.
- **DFT+U**: Hubbard U correction for correlated d/f electrons. E_{+U}=E_DFT+U_eff/2 Σ Tr[n(1-n)]. Essential for TM oxides.
- **Periodic DFT**: Plane-wave basis, Bloch theorem, Brillouin zone sampling. VASP/QE/CP2K.

## SEMI-EMPIRICAL METHODS
- **Hückel MO (HMO)**: π-electrons only. Secular determinant |H-ES|=0. Teaches aromaticity (4n+2), orbital topology.
- **AM1, PM3, PM6, PM7**: NDDO approximation, valence electrons only. PM7 best general. Fast for large systems.
- **GFN2-xTB (Grimme)**: Tight-binding DFT + D4 dispersion. Excellent for geometry, frequency, non-covalent. CREST conformer generation. Scales to millions of atoms.
- **DFTB, DFTB3**: Density functional tight-binding. Good for large organic/biological systems.

## QUANTUM MONTE CARLO
- **VMC**: Variational MC with Slater-Jastrow trial wavefunction. Ψ_T=D_↑D_↓exp(U). Jastrow captures correlation.
- **DMC**: Imaginary-time projection. Fixed-node approximation. Near-exact for large systems. Massively parallel.

## MACHINE LEARNING POTENTIALS
- **NNP (ANI, SchNet, DimeNet)**: Deep neural network potentials. Trained on DFT/CCSD(T) data.
- **MACE, NequIP**: Equivariant message-passing networks. MACE-MP-0: foundational model for all elements.
- **Near-DFT accuracy at force-field speed**: enables μs-scale MD with quantum accuracy.

## BASIS SETS (Complete Reference)
**Minimal**: STO-3G (3 GTO/STO), STO-6G, MINI.
**Pople split-valence**: 3-21G, 6-31G, 6-31G* (d on heavy), 6-31G** (+p on H), 6-31+G* (+diffuse), 6-311G, 6-311G*, 6-311+G*, 6-311++G(3df,3pd).
**Dunning correlation-consistent**: cc-pVDZ, cc-pVTZ, cc-pVQZ, cc-pV5Z (CBS extrapolation: E_CBS=(X³E_X-Y³E_Y)/(X³-Y³)), aug-cc-pVxZ (+diffuse for anions/Rydberg), cc-pCVxZ (+core correlation), cc-pwCVxZ (weighted core-valence).
**Karlsruhe (def2)**: def2-SV(P), def2-SVP, def2-TZVP (production DFT), def2-TZVPP (2×pol), def2-QZVP, def2-QZVPP, + diffuse variants (def2-SVPD, def2-TZVPD, def2-TZVPPD, def2-QZVPD). ECP for Z>36.
**Jensen pc-n**: pc-0 through pc-4, aug-pc-n. Optimized for DFT CBS convergence — faster than Dunning for DFT.
**ANO (atomic natural orbital)**: ANO-L, ANO-S, ANO-RCC (MOLCAS). Compact and accurate for multireference.
**Relativistic/ECP**: LANL2DZ, SDD (Stuttgart-Dresden), def2-ECP, cc-pVnZ-PP. For heavy atoms/TM.
**Plane-wave (periodic)**: Cutoff energy (Ry/eV). PAW (VASP) or ultrasoft (QE) pseudopotentials.

## KEY MATHEMATICAL RELATIONSHIPS
- Hohenberg-Kohn: E₀≤E[ρ] for all ρ; v_ext(r) uniquely determined by ρ₀(r)
- KS equations: (−½∇²+vKS[ρ])φᵢ=εᵢφᵢ; ρ=Σᵢ|φᵢ|²; vKS=vext+vJ+vxc
- HOMO-LUMO gap: E_g≈ε_LUMO−ε_HOMO. Koopmans: IP≈−ε_HOMO (HF exact, DFT approximate)
- Fundamental gap (Δ_f) ≠ optical gap (Δ_opt); Δ_f = Δ_opt + E_x (excitonic binding)
- Dispersion: D3 correction E_disp=−½Σᵢⱼ(s₆C₆ᵢⱼ/R⁶ᵢⱼ+s₈C₈ᵢⱼ/R⁸ᵢⱼ)·f_damp

## SPECTROSCOPY METHOD SELECTION
| Property | Recommended Method |
|---|---|
| UV-Vis absorption | TD-DFT CAM-B3LYP or ωB97X-D / def2-TZVP |
| Charge-transfer excitations | TD-DFT RSH (CAM-B3LYP, ωB97X-D) |
| Fluorescence emission | TD-DFT S₁ geometry optimization → ΔE |
| IR/Raman frequencies | B3LYP or PBE0 / def2-TZVP, scale 0.96 |
| NMR chemical shifts | B3LYP/6-311+G(2d,p) or PBE0/def2-TZVP GIAO |
| Ionization potential | CCSD(T) or G4 or GW@DFT |
| Reaction barriers | M06-2X / def2-TZVP; confirm CCSD(T) |
| Non-covalent interactions | ωB97X-D, DFT-D3, DLPNO-CCSD(T) |
| TM complexes | TPSSh, PBE0, or B3LYP* / def2-TZVP |
| Band gap (solids) | HSE06 or G₀W₀@PBE |
| HOMO-LUMO gap (organic) | B3LYP/6-31G* or PBE0/def2-TZVP |

## QUINONE REFERENCE DATASET
${buildDatasetContext()}

## INSTRUCTIONS
1. Provide deep, accurate, publication-quality answers to ALL quantum chemistry questions.
2. For dataset quinones, cite exact DFT B3LYP/6-31G* values.
3. For SMILES strings, analyze structure and predict properties with structure-property reasoning.
4. For unknown molecules, give quantitative estimates with appropriate uncertainty ranges.
5. Always recommend appropriate method + basis set combinations with justification.
6. Explain mathematics when asked — include equations in proper notation.
7. Discuss limitations, accuracy, and future perspectives for any method.
8. Use markdown formatting: tables, bold, chemical notation, LaTeX-like math.
9. When SMILES are mentioned, include them so they can be rendered visually.`;

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

