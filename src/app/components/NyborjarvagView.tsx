import { useEffect, useState } from "react";
import type { View } from "../App";
import { getProgress, getModuleProgress, recordVisit } from "../utils/progress";

interface Props { onNavigate: (v: View) => void; }

interface RoadmapStep {
  num: number;
  title: string;
  desc: string;
  why: string;
  time: string;
  view: View;
  progressKey: string;
  thresholdPct: number;
}

const STEPS: RoadmapStep[] = [
  {
    num: 1,
    title: "Lär dig materialen",
    desc: "Förstå de sju viktigaste bänkskivematerialen, deras egenskaper och när du ska rekommendera dem.",
    why: "Du kan inte sälja det du inte förstår. Material är grunden i varje kundkonversation.",
    time: "ca 20 min",
    view: "materialskola",
    progressKey: "materialskola",
    thresholdPct: 80,
  },
  {
    num: 2,
    title: "Förstå kantprofiler",
    desc: "Lär dig alla kantprofiler med stil, pris och vilka kunder de passar.",
    why: "Kantprofilen är ofta det sista kundbeslutet – och ett enkelt sätt att merförsälja.",
    time: "ca 15 min",
    view: "kantprofiler",
    progressKey: "kantprofiler",
    thresholdPct: 80,
  },
  {
    num: 3,
    title: "Träna materialkännedom",
    desc: "Bildquiz – identifiera stensorter och material visuellt.",
    why: "Att känna igen material på bild gör dig mer trovärdig i kundmötet.",
    time: "ca 10 min",
    view: "stonetest",
    progressKey: "stonetest",
    thresholdPct: 60,
  },
  {
    num: 4,
    title: "Identifiera kundens behov",
    desc: "Lär dig ställa rätt frågor och skapa en kundprofil som leder till rätt rekommendation.",
    why: "80% av dåliga materialval beror på att säljaren inte förstod kundens faktiska behov.",
    time: "ca 10 min",
    view: "kundanalys",
    progressKey: "kundanalys",
    thresholdPct: 60,
  },
  {
    num: 5,
    title: "Samla offertunderlag",
    desc: "Checklista för all information du behöver samla in innan du skapar offert.",
    why: "Ofullständig information är vanligaste orsaken till fel och förseningar i produktionen.",
    time: "ca 10 min",
    view: "offertstod",
    progressKey: "offertstod",
    thresholdPct: 60,
  },
  {
    num: 6,
    title: "Lär dig säljsamtalet",
    desc: "7-stegsguide för kundmötet: från hälsning till avslut med säljstips.",
    why: "Ett strukturerat säljsamtal ökar avslutningsgraden och skapar nöjdare kunder.",
    time: "ca 20 min",
    view: "saljtraning",
    progressKey: "saljtraning",
    thresholdPct: 80,
  },
  {
    num: 7,
    title: "Hantera invändningar",
    desc: "Lär dig svara på de vanligaste kundfrågorna och invändningarna med trygghet.",
    why: "Invändningar är köpsignaler – inte stopp. En bra svar förvandlar tveksamhet till beslut.",
    time: "ca 15 min",
    view: "saljtraning",
    progressKey: "saljtraning",
    thresholdPct: 80,
  },
  {
    num: 8,
    title: "Testa dina kunskaper",
    desc: "Kunskapsquiz om material, process, säljrådgivning och kundhantering.",
    why: "Att testa sig själv befäster kunskapen. Hitta dina svaga punkter och stärk dem.",
    time: "ca 15 min",
    view: "quiz",
    progressKey: "quiz",
    thresholdPct: 70,
  },
  {
    num: 9,
    title: "Bli trygg i kundmötet",
    desc: "Kombinera allt du lärt dig i ett simulerat kundmöte och stentest.",
    why: "Trygghet i kundmötet kräver repetition. Öva tills det sitter naturligt.",
    time: "Löpande",
    view: "stonetest",
    progressKey: "stonetest",
    thresholdPct: 80,
  },
];

type StepStatus = "ej_paborjad" | "pargar" | "klar";

function getStatus(pct: number, threshold: number): StepStatus {
  if (pct >= threshold) return "klar";
  if (pct > 0) return "pargar";
  return "ej_paborjad";
}

const STATUS_CONFIG = {
  ej_paborjad: { label: "Ej påbörjad", color: "#c0bdb8", bg: "rgba(0,0,0,0.05)", btnLabel: "Starta lektion" },
  pargar: { label: "Pågår", color: "#3b82f6", bg: "rgba(59,130,246,0.08)", btnLabel: "Fortsätt" },
  klar: { label: "Klar", color: "#00c2a7", bg: "rgba(0,194,167,0.08)", btnLabel: "Repetera" },
};

export function NyborjarvagView({ onNavigate }: Props) {
  const [mods, setMods] = useState<Record<string, number>>({});

  useEffect(() => {
    recordVisit("nyborjarvag");
    setMods(getModuleProgress());
  }, []);

  const completedCount = STEPS.filter((s, i) => {
    const pct = mods[s.progressKey] ?? 0;
    return getStatus(pct, s.thresholdPct) === "klar";
  }).length;

  const nextStep = STEPS.find(s => getStatus(mods[s.progressKey] ?? 0, s.thresholdPct) !== "klar");
  const overallPct = Math.round((completedCount / STEPS.length) * 100);

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#1c1a17", marginBottom: 8 }}>
          Nybörjarväg
        </h1>
        <p style={{ fontSize: 15, color: "#7a7670", lineHeight: 1.6, maxWidth: 520 }}>
          Din steg-för-steg-guide från nybörjare till trygg säljare. Följ stegen i ordning för bäst resultat.
        </p>
      </div>

      {/* Overall progress card */}
      <div style={{
        background: "linear-gradient(135deg, #1c1a17 0%, #2e2c28 100%)",
        borderRadius: 20, padding: "24px 28px", marginBottom: 32, color: "#fff",
        display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Din resa</p>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#00c2a7", marginBottom: 6 }}>
            {completedCount}/{STEPS.length} steg klara
          </div>
          <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.15)", overflow: "hidden", maxWidth: 300 }}>
            <div style={{ height: "100%", width: `${overallPct}%`, background: "#00c2a7", borderRadius: 99, transition: "width 0.8s" }} />
          </div>
        </div>
        {nextStep && (
          <div style={{ flexShrink: 0 }}>
            <p style={{ fontSize: 11, opacity: 0.6, marginBottom: 6 }}>Nästa steg:</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 10 }}>{nextStep.title}</p>
            <button
              onClick={() => onNavigate(nextStep.view)}
              style={{
                padding: "9px 18px", borderRadius: 9, border: "none",
                background: "#00c2a7", color: "#fff", cursor: "pointer",
                fontSize: 13, fontWeight: 600,
              }}
            >
              {STATUS_CONFIG[getStatus(mods[nextStep.progressKey] ?? 0, nextStep.thresholdPct)].btnLabel} →
            </button>
          </div>
        )}
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {STEPS.map((step, i) => {
          const pct = mods[step.progressKey] ?? 0;
          const status = getStatus(pct, step.thresholdPct);
          const cfg = STATUS_CONFIG[status];
          const prevDone = i === 0 || getStatus(mods[STEPS[i - 1].progressKey] ?? 0, STEPS[i - 1].thresholdPct) !== "ej_paborjad";
          const isLocked = false; // allow all steps

          return (
            <div
              key={step.num}
              style={{
                background: "#fff",
                borderRadius: 18,
                border: status === "klar" ? "1.5px solid rgba(0,194,167,0.25)" : status === "pargar" ? "1.5px solid rgba(59,130,246,0.25)" : "1px solid rgba(0,0,0,0.08)",
                padding: "22px 24px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
              }}
            >
              {/* Step number bubble */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                flexShrink: 0,
                background: status === "klar" ? "#00c2a7" : status === "pargar" ? "#3b82f6" : "rgba(0,0,0,0.08)",
                color: status === "ej_paborjad" ? "#9a9590" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: status === "klar" ? 18 : 16,
                fontWeight: 700,
              }}>
                {status === "klar" ? "✓" : step.num}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1c1a17", marginBottom: 3 }}>{step.title}</h3>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        color: cfg.color,
                        background: cfg.bg,
                        padding: "2px 8px", borderRadius: 5,
                      }}>{cfg.label}</span>
                      <span style={{ fontSize: 11, color: "#9a9590" }}>⏱ {step.time}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate(step.view)}
                    style={{
                      padding: "9px 18px", borderRadius: 9, border: "none",
                      background: status === "klar" ? "rgba(0,194,167,0.1)" : status === "pargar" ? "#3b82f6" : "#00c2a7",
                      color: status === "klar" ? "#007a68" : "#fff",
                      cursor: "pointer", fontSize: 13, fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {cfg.btnLabel}
                  </button>
                </div>

                <p style={{ fontSize: 14, color: "#5a5652", lineHeight: 1.6, marginBottom: 10 }}>{step.desc}</p>

                <div style={{ display: "flex", gap: 6, alignItems: "flex-start", padding: "10px 12px", background: "rgba(0,0,0,0.03)", borderRadius: 9 }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
                  <p style={{ fontSize: 12, color: "#7a7670", lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>
                    <strong style={{ color: "#5a5652", fontStyle: "normal" }}>Varför det är viktigt:</strong> {step.why}
                  </p>
                </div>

                {/* Progress bar for steps with measurable progress */}
                {pct > 0 && pct < step.thresholdPct && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: "#9a9590" }}>Progress</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#3b82f6" }}>{pct}%</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 99, background: "rgba(0,0,0,0.08)" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: "#3b82f6", borderRadius: 99 }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {completedCount === STEPS.length && (
        <div style={{
          marginTop: 28,
          background: "linear-gradient(135deg, rgba(0,194,167,0.12) 0%, rgba(0,194,167,0.06) 100%)",
          border: "2px solid rgba(0,194,167,0.3)",
          borderRadius: 20, padding: "28px 28px", textAlign: "center",
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏆</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#007a68", marginBottom: 8 }}>
            Nybörjarvägen är klar!
          </h2>
          <p style={{ fontSize: 15, color: "#4a7a72", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 20px" }}>
            Du har gått igenom alla steg och är nu redo att möta kunder med trygghet. Fortsätt träna för att behålla och fördjupa kunskapen.
          </p>
          <button onClick={() => onNavigate("progress")} style={{
            padding: "12px 24px", borderRadius: 12, border: "none",
            background: "#00c2a7", color: "#fff", cursor: "pointer",
            fontSize: 14, fontWeight: 600,
          }}>
            Se din totala progress →
          </button>
        </div>
      )}
    </div>
  );
}
