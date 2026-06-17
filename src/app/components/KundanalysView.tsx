import { useEffect, useState } from "react";
import type { View } from "../App";
import { getProgress, saveProgress, recordVisit } from "../utils/progress";

interface Props { onNavigate: (v: View) => void; }

interface Question {
  id: string;
  q: string;
  why: string;
  options: { label: string; value: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "budget",
    q: "Vilken budget har kunden?",
    why: "Budget styr materialval och möjliga uppgraderingar. Identifiera detta tidigt.",
    options: [{ label: "Begränsad – letar bästa pris", value: "budget" }, { label: "Mellanklass – rimligt pris för bra kvalitet", value: "medium" }, { label: "Generös – vill ha det bästa", value: "premium" }],
  },
  {
    id: "maintenance",
    q: "Hur viktigt är lågt underhåll?",
    why: "Avgörande för om natursten eller komposit passar. Kunder med barn vill nästan alltid ha minimalt underhåll.",
    options: [{ label: "Mycket viktigt – vill inte tänka på det", value: "low" }, { label: "Accepterar lite skötsel", value: "medium" }, { label: "OK med regelbunden skötsel", value: "high" }],
  },
  {
    id: "children",
    q: "Finns barn i hemmet?",
    why: "Barnfamiljer behöver tåligare, lättskött material utan risk för fläckar.",
    options: [{ label: "Ja – aktiv familj", value: "yes" }, { label: "Nej – vuxet hushåll", value: "no" }],
  },
  {
    id: "cooking",
    q: "Lagar kunden mycket mat?",
    why: "Intensiv matlagning kräver värmebeständigt material. Kvarts är fel val om kunden ställer kastruller.",
    options: [{ label: "Ja – lagar mat dagligen och intensivt", value: "yes" }, { label: "Lite – enkel vardagsmatlagning", value: "no" }],
  },
  {
    id: "style",
    q: "Vilken stil vill kunden ha?",
    why: "Stilen avgör om natursten, engineered eller ultra-kompakt passar bäst estetiskt.",
    options: [{ label: "Modern och minimalistisk", value: "modern" }, { label: "Klassisk och tidlös", value: "classic" }, { label: "Lyx och exklusiv", value: "luxury" }, { label: "Praktisk och funktionell", value: "practical" }],
  },
  {
    id: "look",
    q: "Vad lockar kunden estetiskt?",
    why: "Visuell preferens avgör om kunden vill ha natursten, marmorliknande look eller enhetlig yta.",
    options: [{ label: "Natursten med unika ådringar", value: "natural" }, { label: "Enhetlig, kontrollerbar färg", value: "uniform" }, { label: "Marmorkänsla", value: "marble" }, { label: "Modern industriell yta", value: "industrial" }],
  },
  {
    id: "outdoor",
    q: "Behövs stenen utomhus?",
    why: "Utomhusbruk kräver UV-beständigt material. Kvarts och marmor är inte lämpliga utomhus.",
    options: [{ label: "Ja – utomhuskök eller terrass", value: "yes" }, { label: "Nej – enbart inomhus", value: "no" }],
  },
  {
    id: "timeline",
    q: "Hur bråttom är det?",
    why: "Tidplanen påverkar tillgängliga alternativ och möjligheten att beställa specialmaterial.",
    options: [{ label: "Behöver snabbt – inom 2-4 veckor", value: "urgent" }, { label: "Normalt – 4-8 veckor är OK", value: "normal" }, { label: "Flexibelt – kan vänta", value: "flexible" }],
  },
];

interface Recommendation {
  primary: string[];
  reason: string;
  avoid: string;
  salesTip: string;
  learnMore?: View;
}

function getRecommendation(answers: Record<string, string>): Recommendation {
  const { budget, maintenance, children, cooking, style, look, outdoor } = answers;

  if (outdoor === "yes") return {
    primary: ["Dekton", "Keramik", "Granit"],
    reason: "UV-beständiga material som tål klimatväxlingar. Dekton och keramik är optimalt för utomhusbruk.",
    avoid: "Kvarts och marmor är inte lämpliga för utomhusbruk – de missfärgas och skadas av UV och temperaturväxlingar.",
    salesTip: "Lyft fram Dektons UV-beständighet och extrema tålighet – det är designat för just det här användningsfallet.",
    learnMore: "materialskola",
  };

  if (maintenance === "low" && children === "yes") return {
    primary: ["Kvarts", "Dekton", "Keramik"],
    reason: "Barnfamiljer behöver icke-porösa ytor som tål spill och enkel rengöring. Inget impregnering behövs.",
    avoid: "Marmor och kalksten är känsliga för fläckar och syror – inte idealiskt med barn i hemmet.",
    salesTip: "Fokusera på 'zero maintenance' – inga fläckar fastnar, ingen impregnering, bara en snygg yta varje dag.",
    learnMore: "materialskola",
  };

  if (look === "marble" && maintenance !== "low") return {
    primary: ["Marmor", "Kvartsit"],
    reason: "Kunden vill ha äkta marmorkänsla och accepterar skötsel. Kvartsit ger liknande look med bättre tålighet.",
    avoid: "Standard kvarts kan upplevas som för 'konstgjort' för en lyxorienterad kund.",
    salesTip: "Lyft fram att marmor och kvartsit är naturens egna konstverk – inga två skivor är identiska.",
    learnMore: "materialskola",
  };

  if (look === "marble" && maintenance === "low") return {
    primary: ["Kvartsit", "Silestone Eternal-serien"],
    reason: "Kunden vill ha marmorkänsla utan marmorets underhållskrav. Kvartsit är det naturliga svaret.",
    avoid: "Ren marmor kräver mer skötsel än kunden verkar villig att ge.",
    salesTip: "Kvartsit = marmorkänslan utan marmors svagheter. Sätt det som en fördel, inte ett kompromiss.",
    learnMore: "materialskola",
  };

  if (cooking === "yes") return {
    primary: ["Dekton", "Keramik", "Granit", "Kvartsit"],
    reason: "Aktiv matlagning kräver värmebeständighet. Dessa material tål direktkontakt med heta kastruller utan problem.",
    avoid: "Kvarts och komposit är INTE värmetåliga – allvarlig risk vid aktiv matlagning. Undvik för den här kunden.",
    salesTip: "Fråga alltid: 'Ställer du varma kastruller direkt på bänken?' Om ja – kvarts är definitivt fel val.",
    learnMore: "materialskola",
  };

  if (budget === "budget") return {
    primary: ["Kompositsten", "Granit", "Keramik"],
    reason: "Budgetmedvetna kunder kan fortfarande få bra kvalitet och lättskött yta till ett rimligt pris.",
    avoid: "Marmor och Dekton är sannolikt utanför budget och förväntningar.",
    salesTip: "Lyft värdet: 'Med kompositsten får du modern, lättskött yta till ett pris som funkar' – inte 'det billigaste'.",
    learnMore: "materialskola",
  };

  if (budget === "premium" || style === "luxury") return {
    primary: ["Dekton", "Marmor", "Kvartsit", "Granit"],
    reason: "Premium-kunden vill ha det bästa och unikt. Natursten eller Dekton ger den exklusiva känsla de söker.",
    avoid: "Undvik standard kvarts – det signalerar budget, inte premium. Presentera det aldrig som förstaval.",
    salesTip: "För premiumkunder: sälj in upplevelsen, hantverket och det unika – inte bara tekniska specifikationer.",
    learnMore: "materialskola",
  };

  return {
    primary: ["Kvarts", "Granit", "Keramik"],
    reason: "Balanserat val för de flesta kunder – bra hållbarhet, relativt lågt underhåll och god prisvariation.",
    avoid: "Marmor kan vara för krävande om kunden inte är beredd på regelbunden skötsel.",
    salesTip: "Börja alltid med kvarts som 'säkert val' och erbjud uppgradering till natursten om kunden är intresserad.",
    learnMore: "materialskola",
  };
}

export function KundanalysView({ onNavigate }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    recordVisit("kundanalys");
    const p = getProgress();
    if (Object.keys(p.kundanalysAnswers).length > 0) setAnswers(p.kundanalysAnswers);
  }, []);

  function handleAnswer(qid: string, value: string) {
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    const p = getProgress(); p.kundanalysAnswers = next; saveProgress(p);
  }

  function reset() {
    setAnswers({});
    const p = getProgress(); p.kundanalysAnswers = {}; saveProgress(p);
  }

  const completed = Object.keys(answers).length;
  const canShow = completed >= 4;
  const rec = canShow ? getRecommendation(answers) : null;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => onNavigate("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>← Tillbaka</button>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#1c1a17", marginBottom: 6 }}>Kundanalys</h1>
      <p style={{ fontSize: 15, color: "#7a7670", marginBottom: 24 }}>Besvara frågorna under kundmötet för att få en materialrekommendation anpassad till kunden.</p>

      {/* Progress + reset */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.07)", padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1a17" }}>Frågor besvarade</span>
            <span style={{ fontSize: 13, color: "#00c2a7", fontWeight: 700 }}>{completed}/{QUESTIONS.length}</span>
          </div>
          <div style={{ height: 5, borderRadius: 99, background: "rgba(0,0,0,0.08)" }}>
            <div style={{ height: "100%", width: `${(completed / QUESTIONS.length) * 100}%`, background: "#00c2a7", borderRadius: 99, transition: "width 0.4s" }} />
          </div>
        </div>
        <button onClick={reset} style={{ background: "none", border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12, color: "#7a7670" }}>Rensa</button>
      </div>

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        {QUESTIONS.map((q, qi) => (
          <div key={q.id} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "18px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, background: answers[q.id] ? "#00c2a7" : "rgba(0,0,0,0.08)", color: answers[q.id] ? "#fff" : "#9a9590", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                {answers[q.id] ? "✓" : qi + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1c1a17", lineHeight: 1.45, marginBottom: 4 }}>{q.q}</p>
                <p style={{ fontSize: 12, color: "#9a9590", fontStyle: "italic" }}>💡 {q.why}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, paddingLeft: 36 }}>
              {q.options.map(opt => {
                const sel = answers[q.id] === opt.value;
                return (
                  <button key={opt.value} onClick={() => handleAnswer(q.id, opt.value)}
                    style={{ padding: "11px 16px", borderRadius: 10, textAlign: "left", border: sel ? "1.5px solid #00c2a7" : "1.5px solid rgba(0,0,0,0.1)", background: sel ? "rgba(0,194,167,0.07)" : "#faf9f7", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, transition: "all 0.12s" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, border: sel ? "2px solid #00c2a7" : "2px solid rgba(0,0,0,0.2)", background: sel ? "#00c2a7" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {sel && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                    </div>
                    <span style={{ fontSize: 13, color: sel ? "#007a68" : "#3a3836", fontWeight: sel ? 500 : 400 }}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      {canShow && rec && (
        <div style={{ background: "linear-gradient(135deg, rgba(0,194,167,0.08), rgba(0,194,167,0.04))", border: "1.5px solid rgba(0,194,167,0.25)", borderRadius: 18, padding: "24px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#00c2a7", marginBottom: 14 }}>✦ Rekommendation</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: "#7a7670", marginBottom: 8 }}>Rekommenderade material:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {rec.primary.map(m => <span key={m} style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: "#00c2a7", padding: "5px 14px", borderRadius: 8 }}>{m}</span>)}
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#007a68", marginBottom: 4 }}>Varför:</div>
            <p style={{ fontSize: 13, color: "#3a5a54", lineHeight: 1.65 }}>{rec.reason}</p>
          </div>
          <div style={{ padding: "11px 13px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#b45309", marginBottom: 3 }}>Undvik:</div>
            <p style={{ fontSize: 13, color: "#7a4c00", lineHeight: 1.55 }}>{rec.avoid}</p>
          </div>
          <div style={{ padding: "11px 13px", background: "rgba(0,0,0,0.03)", borderRadius: 10, marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#5a5652", marginBottom: 3 }}>💡 Säljstips:</div>
            <p style={{ fontSize: 13, color: "#3a3836", lineHeight: 1.55, fontStyle: "italic" }}>"{rec.salesTip}"</p>
          </div>
          {rec.learnMore && (
            <button onClick={() => onNavigate(rec.learnMore!)} style={{ fontSize: 13, fontWeight: 600, color: "#00c2a7", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              → Läs mer om materialen i Materialskolan
            </button>
          )}
        </div>
      )}

      {!canShow && completed > 0 && (
        <div style={{ textAlign: "center", padding: "20px", color: "#9a9590", fontSize: 14 }}>
          Svara på {4 - completed} frågor till för att se rekommendation.
        </div>
      )}
    </div>
  );
}
