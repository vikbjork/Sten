import { useEffect, useState } from "react";
import type { View } from "../App";
import { getOverallProgress, getModuleProgress } from "../utils/progress";

interface HomeViewProps { onNavigate: (view: View) => void; }

function getLevelInfo(pct: number): { label: string; color: string; next: string } {
  if (pct >= 80) return { label: "Stenkoll Expert", color: "#00c2a7", next: "Repetera och håll kunskapen fräsch" };
  if (pct >= 55) return { label: "Trygg rådgivare", color: "#3b82f6", next: "Stärk säljsamtalet och invändningshantering" };
  if (pct >= 25) return { label: "På väg", color: "#f59e0b", next: "Fortsätt med Kundanalys och Offertstöd" };
  return { label: "Ny säljare", color: "#9a9590", next: "Börja med Nybörjarvägen" };
}

const CARDS: { view: View; label: string; desc: string; tag: string; tagColor: string; icon: string; progressKey: string }[] = [
  { view: "nyborjarvag",   label: "Nybörjarväg",   desc: "Din steg-för-steg-guide från nybörjare till trygg säljare.",          tag: "Start här",  tagColor: "#00c2a7", icon: "⚡", progressKey: "nyborjarvag" },
  { view: "materialskola", label: "Materialskola",  desc: "Lär dig alla material, egenskaper och hur du säljer dem.",             tag: "Lär dig",    tagColor: "#8b5cf6", icon: "🪨", progressKey: "materialskola" },
  { view: "kantprofiler",  label: "Kantprofiler",   desc: "Referensguide för alla kantprofiler med säljstöd.",                    tag: "Lär dig",    tagColor: "#8b5cf6", icon: "⌒", progressKey: "kantprofiler" },
  { view: "kundanalys",    label: "Kundanalys",     desc: "Frågemallar och rekommendationslogik för kundmötet.",                  tag: "Säljstöd",   tagColor: "#f59e0b", icon: "👥", progressKey: "kundanalys" },
  { view: "offertstod",    label: "Offertstöd",     desc: "Checklista för allt du behöver samla in innan offert.",               tag: "Säljstöd",   tagColor: "#f59e0b", icon: "📋", progressKey: "offertstod" },
  { view: "saljtraning",   label: "Säljträning",    desc: "7-stegsguide för kundmötet, invändningar och merförsäljning.",         tag: "Säljstöd",   tagColor: "#f59e0b", icon: "💬", progressKey: "saljtraning" },
  { view: "quiz",          label: "Quiz",           desc: "Kunskapstest om material, process och rådgivning.",                    tag: "Träna",      tagColor: "#3b82f6", icon: "✅", progressKey: "quiz" },
  { view: "stonetest",     label: "Stentest",       desc: "Bildquiz – identifiera stensorter och material.",                      tag: "Träna",      tagColor: "#3b82f6", icon: "🖼", progressKey: "stonetest" },
  { view: "progress",      label: "Min Progress",   desc: "Se din kunskapsutveckling och vad som är nästa steg.",                 tag: "Progress",   tagColor: "#22c55e", icon: "📊", progressKey: "progress" },
];

export function HomeView({ onNavigate }: HomeViewProps) {
  const [overall, setOverall] = useState(0);
  const [mods, setMods] = useState<Record<string, number>>({});

  useEffect(() => {
    setOverall(getOverallProgress());
    setMods(getModuleProgress());
  }, []);

  const level = getLevelInfo(overall);
  const r = 38; const circ = 2 * Math.PI * r; const dash = (overall / 100) * circ;

  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "36px 28px 80px" }}>

      {/* Welcome banner */}
      <div style={{
        background: "linear-gradient(135deg, #1c1a17 0%, #2e2c28 100%)",
        borderRadius: 22, padding: "30px 32px", marginBottom: 24, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, marginBottom: 8 }}>
            Välkommen till
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 10 }}>
            Stenkoll
          </h1>
          <p style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.6, maxWidth: 360, marginBottom: 16 }}>
            Din steg-för-steg-plattform för att lära dig sälja stenskivor och bänkskivor.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${level.color}22`, borderRadius: 8, padding: "6px 14px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: level.color }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: level.color }}>{level.label}</span>
          </div>
        </div>

        {/* Progress circle */}
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <svg width={96} height={96} viewBox="0 0 96 96">
            <circle cx={48} cy={48} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={7} />
            <circle cx={48} cy={48} r={r} fill="none" stroke="#00c2a7" strokeWidth={7} strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 48 48)"
              style={{ transition: "stroke-dasharray 1s ease" }} />
            <text x={48} y={48} textAnchor="middle" dominantBaseline="middle"
              style={{ fontSize: 16, fontWeight: 800, fill: "#fff", fontFamily: "Inter, sans-serif" }}>
              {overall}%
            </text>
          </svg>
          <div style={{ fontSize: 11, opacity: 0.5, marginTop: 4 }}>Total progress</div>
        </div>
      </div>

      {/* Recommended next action */}
      <div style={{
        background: "rgba(0,194,167,0.08)", border: "1.5px solid rgba(0,194,167,0.2)",
        borderRadius: 16, padding: "18px 22px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#00c2a7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, flexShrink: 0 }}>
          →
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#00c2a7", marginBottom: 3 }}>Rekommenderat nästa steg</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1c1a17" }}>{level.next}</div>
        </div>
        <button
          onClick={() => onNavigate(overall < 15 ? "nyborjarvag" : overall < 55 ? "saljtraning" : "quiz")}
          style={{ padding: "9px 18px", borderRadius: 9, border: "none", background: "#00c2a7", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, flexShrink: 0 }}
        >
          Starta
        </button>
      </div>

      {/* Quick start spotlight */}
      {overall < 10 && (
        <button
          onClick={() => onNavigate("nyborjarvag")}
          style={{
            width: "100%", background: "linear-gradient(135deg, #00c2a7 0%, #009e88 100%)",
            borderRadius: 18, padding: "22px 26px", marginBottom: 24, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 18, textAlign: "left",
          }}
        >
          <div style={{ fontSize: 36 }}>⚡</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Börja med Nybörjarvägen</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
              9 steg som tar dig från nybörjare till trygg säljare – i rätt ordning.
            </div>
          </div>
          <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.7)", fontSize: 20 }}>→</div>
        </button>
      )}

      {/* All sections grid */}
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1c1a17", marginBottom: 14 }}>Alla avsnitt</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))", gap: 12 }}>
        {CARDS.map(c => {
          const pct = mods[c.progressKey] ?? 0;
          return (
            <button
              key={c.view}
              onClick={() => onNavigate(c.view)}
              style={{
                background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16,
                padding: "18px 16px", cursor: "pointer", textAlign: "left",
                display: "flex", flexDirection: "column", gap: 10,
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                transition: "transform 0.14s, box-shadow 0.14s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 5px 18px rgba(0,0,0,0.09)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(0,194,167,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {c.icon}
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: c.tagColor, background: `${c.tagColor}14`, padding: "3px 7px", borderRadius: 5 }}>
                  {c.tag}
                </span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1c1a17", marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 12, color: "#7a7670", lineHeight: 1.5 }}>{c.desc}</div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: "#9a9590" }}>Progress</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: pct >= 80 ? "#00c2a7" : "#9a9590" }}>{pct}%</span>
                </div>
                <div style={{ height: 3, borderRadius: 99, background: "rgba(0,0,0,0.07)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: pct >= 80 ? "#00c2a7" : pct >= 40 ? "#3b82f6" : "rgba(0,0,0,0.18)", borderRadius: 99, transition: "width 0.6s" }} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
