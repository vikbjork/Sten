import { useState } from "react";
import type { View } from "../App";
import { getStoneCategories, filterStones, generateOptions, getStoneGradient } from "../data/stoneData";
import type { Stone } from "../data/stoneData";
import { recordStoneScore } from "../utils/progress";
import { stoneImageMap } from "../data/stoneImages";

interface Props { onNavigate: (v: View) => void; }
type Phase = "setup" | "running" | "result";

function getLevelInfo(pct: number) {
  if (pct >= 90) return { label: "Expert",     color: "#00c2a7", emoji: "🏆", msg: "Utmärkt! Du känner igen materialen som en äkta expert." };
  if (pct >= 70) return { label: "Säker",      color: "#3b82f6", emoji: "🎯", msg: "Bra jobbat! Fortsätt öva så sitter det snart perfekt." };
  if (pct >= 50) return { label: "Lärling",    color: "#f59e0b", emoji: "📚", msg: "Godkänt! Mer träning gör dig till en säker materialkännare." };
  return          { label: "Nybörjare",  color: "#9a9590", emoji: "💪", msg: "Fortsätt träna! Kolla Materialskolan för att lära dig mer." };
}

// Rich educational info per stone category
function getStoneTip(stone: Stone): { characteristics: string; useCases: string; similarStones: string; explainToCustomer: string; salesTip: string } {
  const cat = stone.category;
  const tips: Record<string, { characteristics: string; useCases: string; similarStones: string; explainToCustomer: string; salesTip: string }> = {
    Granit: {
      characteristics: "Grovkornig struktur med synliga mineralkorn (kvarts, fältspat, glimmer). Mönstret varierar stort beroende på ursprung.",
      useCases: "Köksbänkar, badrumsbänkar, entrégolv. Tål hög belastning och vardaglig intensiv användning.",
      similarStones: "Kan förväxlas med kvartsit (som är mer bandat) eller Dekton (som ser mer enhetligt ut).",
      explainToCustomer: "'Granit är ett av jordens hårdaste naturmaterial. Det bildades djupt i jordskorpan under miljontals år och tål nästan vad som helst.'",
      salesTip: "Granit är ett tryggt val att rekommendera – brett sortiment, bra pris och hög tålighet. Lyfta fram att varje skiva är unik.",
    },
    Marmor: {
      characteristics: "Karakteristiska ådringar (vener) i varierande färger mot ljus bakgrund. Ytan ser ofta blankpolerad och slät ut.",
      useCases: "Exklusiva kök, badrum, hotell, showroom. Passar där estetik prioriteras framför maximal tålighet.",
      similarStones: "Förväxlas ofta med kvartsit och marmorliknande kvarts-komposit (t.ex. Calacatta-serien från Silestone).",
      explainToCustomer: "'Marmor är naturens eget konstverk – inget annat material har samma tidlösa elegans. Det är ett levande material som utvecklar patina med åren.'",
      salesTip: "Sälj in upplevelsen och exklusiviteten, inte bara specifikationerna. Var ärlig med underhållskraven – det bygger förtroende.",
    },
    Kvartsit: {
      characteristics: "Liknar marmor med ådringar men är hårdare och tätare. Ytan kan se mer 'stenig' ut med naturliga variationer.",
      useCases: "Kök, badrum. Utmärkt för kunder som vill ha marmorliknande look med bättre tålighet.",
      similarStones: "Förväxlas väldigt ofta med marmor. Skillnaden: kvartsit är hårdare, tåligare mot repor och mer värmebeständigt.",
      explainToCustomer: "'Kvartsit är marmorkänslan med granits tålighet. Det är ett naturligt bergart som är hårdare och mer motståndskraftigt än marmor.'",
      salesTip: "Kvartsit är ett utmärkt uppgraderingsargument från marmor: 'Ni får samma vackra look men med bättre hållbarhet – det perfekta kompromissen.'",
    },
    Kalksten: {
      characteristics: "Mjukare utseende med subtila variationer och fossila mönster. Ofta beige, grå eller kräm i färgen.",
      useCases: "Badrumsbänkar, vaskar, dekorativa ytor. Sällan rekommenderad för aktiva köksbänkar.",
      similarStones: "Kan förväxlas med ljus granit eller sandsten beroende på variant.",
      explainToCustomer: "'Kalksten ger ett varmt och tidlöst uttryck. Den är mjukare än granit men har en charm och karaktär som är unik.'",
      salesTip: "Var tydlig med kalkstens begränsningar i kök – den är känslig för syra och repor. Rekommendera den för badrum eller dekorativa ytor.",
    },
    Keramik: {
      characteristics: "Skapas i stora skivor med tryckta mönster. Kan imitera natursten, betong eller trä. Ytan är jämn och tät.",
      useCases: "Köksbänkar, utomhuskök, fasader. Extremt tåligt och hygieniskt.",
      similarStones: "Kan förväxlas med Dekton eller natursten beroende på design. Keramik är tunnare (3-6mm) jämfört med Dekton.",
      explainToCustomer: "'Keramik tillverkas vid extremt höga temperaturer av naturliga material. Det är ett av de mest hygieniska och tåliga materialen du kan välja.'",
      salesTip: "Lyft fram värmetåligheten och den extrema slitstyrkan. Perfekt för kunder som lagar mat intensivt.",
    },
    Komposit: {
      characteristics: "Enhetlig yta med kontrollerat mönster. Kan ha subtila korn, ådringar eller solid färg beroende på design.",
      useCases: "Kök, badrum, kontor. Det vanligaste valet för barnfamiljer och kunder som vill ha minimal skötsel.",
      similarStones: "Förväxlas ibland med natursten, särskilt marmorliknande varianter. Skillnaden: komposit är helt enhetlig utan naturliga variationer.",
      explainToCustomer: "'Kvarts-komposit är ett smart engineered material med 93% naturkvarts. Det kombinerar naturstens tålighet med noll underhållsbehov.'",
      salesTip: "Komposit är det enklaste att sälja till barnfamiljer och praktiska kunder. Fokusera på 'noll underhåll' och 'aldrig impregnering'.",
    },
    Terrazzo: {
      characteristics: "Synliga stenfragment (chips) ingjutna i en matris. Karaktäristisk spräcklig look med djup och textur.",
      useCases: "Golv, bänkskivor, badrum. Klassisk estetik med modern relevans. Populärt i arkitektkök och lyxiga projekt.",
      similarStones: "Terrazzo är unikt i sin look och förväxlas sällan med annat – den karakteristiska spräcklade strukturen är igenkännbar.",
      explainToCustomer: "'Terrazzo är en gammal hantverkstradition – en blandning av stenfragment i en polerad matris. Det ger ett unikt djup och karaktär som inget annat material kan matcha.'",
      salesTip: "Terrazzo appellerar till designmedvetna kunder. Sälj in den historiska hantverkstraditionen och det unika visuella djupet.",
    },
  };
  return tips[cat] ?? {
    characteristics: "Naturligt material med unika egenskaper.",
    useCases: "Bänkskivor och dekorativa ytor.",
    similarStones: "Kontrollera kategori för liknande alternativ.",
    explainToCustomer: "Berätta om materialets ursprung och egenskaper.",
    salesTip: "Anpassa ditt säljargument efter kundens specifika behov.",
  };
}

const SELECT: React.CSSProperties = { width: "100%", padding: "13px 14px", borderRadius: 12, border: "1.5px solid rgba(0,0,0,0.12)", background: "#fff", fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#1c1a17", appearance: "none", cursor: "pointer", outline: "none" };

export function StoneTestView({ onNavigate }: Props) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [stones, setStones] = useState<Stone[]>([]);
  const [allStones, setAllStones] = useState<Stone[]>([]);
  const [idx, setIdx] = useState(0);
  const [options, setOptions] = useState<Stone[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [category, setCategory] = useState("Alla kategorier");
  const [count, setCount] = useState<"10" | "20" | "40" | "all">("10");
  const categories = getStoneCategories();

  function startTest() {
    const n = count === "all" ? "all" : parseInt(count);
    const pool = filterStones(category, n);
    const full = filterStones("Alla kategorier", "all");
    setStones(pool); setAllStones(full);
    setIdx(0); setScore(0); setSelected(null); setRevealed(false); setImgError(false);
    setOptions(generateOptions(pool[0], full));
    setPhase("running");
  }

  function handleAnswer(optIdx: number) {
    if (revealed) return;
    setSelected(optIdx);
    setRevealed(true);
    if (options[optIdx].name === stones[idx].name) setScore(s => s + 1);
  }

  function nextStone() {
    const ni = idx + 1;
    if (ni >= stones.length) {
      const pct = Math.round((score / stones.length) * 100);
      recordStoneScore(pct);
      setPhase("result");
    } else {
      setIdx(ni); setSelected(null); setRevealed(false); setImgError(false);
      setOptions(generateOptions(stones[ni], allStones));
    }
  }

  function retry() { setPhase("setup"); setIdx(0); setSelected(null); setScore(0); setRevealed(false); }

  if (phase === "setup") {
    return (
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
        <button onClick={() => onNavigate("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>← Tillbaka</button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#1c1a17", marginBottom: 6 }}>Stentest</h1>
        <p style={{ fontSize: 15, color: "#7a7670", marginBottom: 8 }}>Identifiera stensorter med bildquiz. Svarsalternativen är medvetet kluriga!</p>
        <div style={{ background: "rgba(0,194,167,0.07)", borderRadius: 10, padding: "12px 16px", marginBottom: 28, fontSize: 13, color: "#007a68" }}>
          💡 Efter varje svar ser du materialets egenskaper, typiska användningsområden och hur du förklarar det för kunden.
        </div>
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 14px rgba(0,0,0,0.05)", padding: "32px 28px", maxWidth: 500 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1c1a17", marginBottom: 24 }}>Konfigurera stentest</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
            {[
              { label: "Kategori", el: <div style={{ position: "relative" }}><select style={SELECT} value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select><Chevron /></div> },
              { label: "Antal bilder", el: <div style={{ position: "relative" }}><select style={SELECT} value={count} onChange={e => setCount(e.target.value as typeof count)}><option value="10">10 bilder</option><option value="20">20 bilder</option><option value="40">40 bilder</option><option value="all">Alla bilder</option></select><Chevron /></div> },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9a9590", marginBottom: 8 }}>{f.label}</label>
                {f.el}
              </div>
            ))}
          </div>
          <button onClick={startTest} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "15px 24px", borderRadius: 14, border: "none", background: "#00c2a7", color: "#fff", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600 }}>
            ▶ Starta stentest
          </button>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const total = stones.length;
    const pct = Math.round((score / total) * 100);
    const { label, color, emoji, msg } = getLevelInfo(pct);
    const r = 44; const circ = 2 * Math.PI * r; const dash = (pct / 100) * circ;

    return (
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
        <button onClick={() => onNavigate("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>← Tillbaka</button>
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 14px rgba(0,0,0,0.05)", padding: "44px 32px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{emoji}</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#1c1a17", marginBottom: 6 }}>Stentest klart!</h2>
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
            <svg width={110} height={110} viewBox="0 0 110 110">
              <circle cx={55} cy={55} r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={7} />
              <circle cx={55} cy={55} r={r} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 55 55)" style={{ transition: "stroke-dasharray 1s ease" }} />
              <text x={55} y={55} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 18, fontWeight: 800, fill: "#1c1a17", fontFamily: "Inter, sans-serif" }}>{pct}%</text>
            </svg>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#1c1a17", marginBottom: 4 }}>{score} av {total} rätt</div>
          <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color, background: `${color}18`, padding: "4px 12px", borderRadius: 6, marginBottom: 12 }}>Nivå: {label}</div>
          <p style={{ fontSize: 14, color: "#7a7670", marginBottom: 32, lineHeight: 1.6 }}>{msg}</p>
          {pct < 65 && (
            <div style={{ marginBottom: 20, padding: "14px 16px", background: "rgba(59,130,246,0.06)", borderRadius: 12, border: "1px solid rgba(59,130,246,0.15)", textAlign: "left" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#3b82f6", marginBottom: 4 }}>Rekommenderat nästa steg</div>
              <p style={{ fontSize: 13, color: "#1e3a8a" }}>Gå igenom <strong>Materialskolan</strong> för att lära dig materialen mer ingående – det gör stentestet mycket lättare!</p>
              <button onClick={() => onNavigate("materialskola")} style={{ marginTop: 8, padding: "7px 14px", borderRadius: 8, border: "none", background: "#3b82f6", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                Gå till Materialskolan →
              </button>
            </div>
          )}
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={retry} style={{ flex: 1, maxWidth: 200, padding: "13px 24px", borderRadius: 12, border: "none", background: "#00c2a7", color: "#fff", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600 }}>Försök igen</button>
            <button onClick={() => onNavigate("home")} style={{ padding: "13px 24px", borderRadius: 12, border: "1.5px solid rgba(0,0,0,0.12)", background: "transparent", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: "#5a5652" }}>Till menyn</button>
          </div>
        </div>
      </div>
    );
  }

  const stone = stones[idx];
  const progress = (idx / stones.length) * 100;
  const correctOptIdx = options.findIndex(o => o.name === stone.name);
  const tip = revealed ? getStoneTip(stone) : null;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => setPhase("setup")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>← Avsluta test</button>

      {/* Progress */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#7a7670" }}>Bild {idx + 1} av {stones.length}</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Poäng: <span style={{ color: "#00c2a7" }}>{score}</span></span>
        </div>
        <div style={{ height: 5, borderRadius: 99, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "#00c2a7", borderRadius: 99, transition: "width 0.4s" }} />
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden", boxShadow: "0 2px 14px rgba(0,0,0,0.05)", marginBottom: 14 }}>
        {/* Stone image — uses imported asset if available, otherwise external path */}
        <div style={{ paddingBottom: "52%", position: "relative", background: getStoneGradient(stone.color) }}>
          {stoneImageMap[stone.image] ? (
            <img
              key={stone.image}
              src={stoneImageMap[stone.image]}
              alt={stone.name}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : !imgError ? (
            <img
              key={stone.image}
              src={`images/${stone.image}`}
              alt={stone.name}
              onError={() => setImgError(true)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : null}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 55%)" }} />
          <span style={{ position: "absolute", top: 14, left: 14, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.9)", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: 6 }}>{stone.category}</span>
        </div>

        <div style={{ padding: "20px 22px" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#1c1a17", marginBottom: 16, fontStyle: "italic" }}>Vilken sten är detta?</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 0 }}>
            {options.map((opt, i) => {
              const isSel = selected === i;
              const isCorr = i === correctOptIdx;
              let bg = "#faf9f7", border = "1.5px solid rgba(0,0,0,0.1)", color = "#1c1a17";
              if (revealed) {
                if (isCorr) { bg = "rgba(0,194,167,0.08)"; border = "1.5px solid #00c2a7"; color = "#007a68"; }
                else if (isSel) { bg = "rgba(220,50,50,0.06)"; border = "1.5px solid #ef4444"; color = "#991b1b"; }
              }
              return (
                <button key={opt.name} onClick={() => handleAnswer(i)} disabled={revealed}
                  style={{ padding: "11px 13px", borderRadius: 11, border, background: bg, cursor: revealed ? "default" : "pointer", textAlign: "left", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 8, transition: "all 0.12s" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, border: `1.5px solid ${revealed && isCorr ? "#00c2a7" : revealed && isSel ? "#ef4444" : "rgba(0,0,0,0.15)"}`, background: revealed && isCorr ? "#00c2a7" : revealed && isSel ? "#ef4444" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>
                    {revealed && isCorr ? "✓" : revealed && isSel && !isCorr ? "✗" : String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 500, color, lineHeight: 1.4 }}>{opt.name}</span>
                </button>
              );
            })}
          </div>

          {/* Extended educational reveal */}
          {revealed && tip && (
            <div style={{ marginTop: 18 }}>
              {/* Stone identity */}
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 16px", background: "rgba(0,194,167,0.05)", border: "1px solid rgba(0,194,167,0.18)", borderRadius: 12, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: getStoneGradient(stone.color), flexShrink: 0, border: "1px solid rgba(0,0,0,0.1)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1c1a17", marginBottom: 3 }}>{stone.name}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {[stone.category, stone.color].map(tag => (
                      <span key={tag} style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", color: "#7a7670", background: "rgba(0,0,0,0.06)", padding: "2px 7px", borderRadius: 4 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Educational tabs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: "👁", label: "Visuella egenskaper", content: tip.characteristics },
                  { icon: "🏠", label: "Typiska användningsområden", content: tip.useCases },
                  { icon: "⚠", label: "Kan förväxlas med", content: tip.similarStones },
                  { icon: "💬", label: "Förklara för kunden", content: tip.explainToCustomer },
                  { icon: "💡", label: "Säljstips", content: tip.salesTip },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: 10, padding: "10px 12px", background: "rgba(0,0,0,0.02)", borderRadius: 10 }}>
                    <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9a9590", marginBottom: 3 }}>{item.label}</div>
                      <p style={{ fontSize: 12, color: "#3a3836", lineHeight: 1.6 }}>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {revealed && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={nextStone} style={{ padding: "13px 28px", borderRadius: 12, border: "none", background: "#00c2a7", color: "#fff", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600 }}>
            {idx + 1 >= stones.length ? "Se resultat →" : "Nästa bild →"}
          </button>
        </div>
      )}
    </div>
  );
}

function Chevron() {
  return <svg viewBox="0 0 24 24" fill="none" width={16} height={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9a9590" }}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
