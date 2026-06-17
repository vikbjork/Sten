import { useEffect, useState } from "react";
import type { View } from "../App";
import { getProgress, getModuleProgress, getOverallProgress, recordVisit } from "../utils/progress";

interface Props { onNavigate: (v: View) => void; }

const MODULES: { key: string; label: string; icon: string; desc: string; view: View; threshold: number }[] = [
  { key: "materialskola", label: "Materialkunskap",       icon: "🪨", desc: "Förstå alla material och deras egenskaper.",             view: "materialskola", threshold: 80 },
  { key: "kantprofiler",  label: "Kantprofiler",          icon: "⌒", desc: "Lär dig alla profiler och deras säljpotential.",         view: "kantprofiler",  threshold: 80 },
  { key: "stonetest",     label: "Materialkännedom",      icon: "🖼", desc: "Identifiera material visuellt.",                        view: "stonetest",     threshold: 70 },
  { key: "kundanalys",    label: "Kundanalys",            icon: "👥", desc: "Förstå kundens behov och ge rätt rekommendation.",      view: "kundanalys",    threshold: 80 },
  { key: "offertstod",    label: "Offertförberedelse",    icon: "📋", desc: "Samla rätt info inför offert.",                        view: "offertstod",    threshold: 70 },
  { key: "saljtraning",   label: "Säljträning",           icon: "💬", desc: "Säljsamtal, invändningar och merförsäljning.",          view: "saljtraning",   threshold: 80 },
  { key: "quiz",          label: "Kunskapsquiz",          icon: "✅", desc: "Testa dina kunskaper med flervalsfrågor.",              view: "quiz",          threshold: 70 },
];

function getLevelInfo(pct: number): { label: string; color: string; emoji: string } {
  if (pct >= 80) return { label: "Stenkoll Expert",  color: "#00c2a7", emoji: "🏆" };
  if (pct >= 55) return { label: "Trygg rådgivare", color: "#3b82f6", emoji: "💪" };
  if (pct >= 25) return { label: "På väg",          color: "#f59e0b", emoji: "📚" };
  return { label: "Ny säljare", color: "#9a9590", emoji: "🌱" };
}

export function ProgressView({ onNavigate }: Props) {
  const [mods, setMods] = useState<Record<string, number>>({});
  const [overall, setOverall] = useState(0);

  useEffect(() => {
    recordVisit("progress");
    setMods(getModuleProgress());
    setOverall(getOverallProgress());
  }, []);

  const { label: level, color: levelColor, emoji: levelEmoji } = getLevelInfo(overall);
  const p = getProgress();
  const bestQuiz  = p.quizScores.length  ? Math.max(...p.quizScores)  : 0;
  const bestStone = p.stoneScores.length ? Math.max(...p.stoneScores) : 0;
  const r = 44; const circ = 2 * Math.PI * r; const dash = (overall / 100) * circ;

  const strengths   = MODULES.filter(m => (mods[m.key] ?? 0) >= m.threshold);
  const weakAreas   = MODULES.filter(m => (mods[m.key] ?? 0) < m.threshold / 2);
  const nextModule  = MODULES.find(m => (mods[m.key] ?? 0) < m.threshold);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => onNavigate("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>
        ← Tillbaka
      </button>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#1c1a17", marginBottom: 6 }}>Lärande & Progress</h1>
        <p style={{ fontSize: 15, color: "#7a7670" }}>Följ din kunskapsutveckling och se exakt var du befinner dig.</p>
      </div>

      {/* Overall level card */}
      <div style={{ background: "linear-gradient(135deg, #1c1a17 0%, #2e2c28 100%)", borderRadius: 20, padding: "28px 30px", marginBottom: 20, color: "#fff", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, opacity: 0.5, marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>Din kunskapsnivå</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 44, fontWeight: 800, color: levelColor, lineHeight: 1 }}>{overall}%</span>
            <span style={{ fontSize: 24 }}>{levelEmoji}</span>
          </div>
          <div style={{ display: "inline-block", fontSize: 13, fontWeight: 700, color: levelColor, background: `${levelColor}22`, padding: "5px 14px", borderRadius: 7 }}>
            {level}
          </div>
        </div>

        {/* Circle */}
        <svg width={110} height={110} viewBox="0 0 110 110" style={{ flexShrink: 0 }}>
          <circle cx={55} cy={55} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={8} />
          <circle cx={55} cy={55} r={r} fill="none" stroke={levelColor} strokeWidth={8} strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 55 55)"
            style={{ transition: "stroke-dasharray 1.2s ease" }} />
          <text x={55} y={50} textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: 18, fontWeight: 800, fill: "#fff", fontFamily: "Inter, sans-serif" }}>{overall}%</text>
          <text x={55} y={68} textAnchor="middle" style={{ fontSize: 9, fill: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}>PROGRESS</text>
        </svg>

        {/* Stats */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { label: "Quiz försök",    val: p.quizScores.length },
            { label: "Stentest försök", val: p.stoneScores.length },
            { label: "Bästa quiz",     val: `${bestQuiz}%` },
            { label: "Bästa stentest", val: `${bestStone}%` },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{s.val}</div>
              <div style={{ fontSize: 10, opacity: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Level progression bar */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.07)", padding: "18px 20px", marginBottom: 20 }}>
        <div style={{ height: 8, borderRadius: 99, background: "rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: 10 }}>
          <div style={{ height: "100%", width: `${overall}%`, background: `linear-gradient(90deg, #9a9590 0%, #f59e0b 30%, #3b82f6 60%, #00c2a7 100%)`, borderRadius: 99, transition: "width 1s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9a9590" }}>
          <span>🌱 Ny säljare</span>
          <span>📚 På väg</span>
          <span>💪 Trygg rådgivare</span>
          <span>🏆 Expert</span>
        </div>
      </div>

      {/* Strengths & weak areas */}
      {(strengths.length > 0 || weakAreas.length > 0) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
          {strengths.length > 0 && (
            <div style={{ background: "rgba(0,194,167,0.06)", border: "1px solid rgba(0,194,167,0.18)", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#00c2a7", marginBottom: 10 }}>✦ Styrkor</div>
              {strengths.map(m => (
                <div key={m.key} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 14 }}>{m.icon}</span>
                  <span style={{ fontSize: 13, color: "#1c1a17", fontWeight: 500 }}>{m.label}</span>
                  <span style={{ fontSize: 11, color: "#00c2a7", marginLeft: "auto" }}>{mods[m.key] ?? 0}%</span>
                </div>
              ))}
            </div>
          )}
          {weakAreas.length > 0 && (
            <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#f59e0b", marginBottom: 10 }}>⚠ Förbättringsområden</div>
              {weakAreas.map(m => (
                <div key={m.key} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 14 }}>{m.icon}</span>
                  <span style={{ fontSize: 13, color: "#1c1a17" }}>{m.label}</span>
                  <button onClick={() => onNavigate(m.view)} style={{ fontSize: 11, color: "#f59e0b", background: "none", border: "none", cursor: "pointer", marginLeft: "auto", fontWeight: 600, padding: 0 }}>Öva →</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Next recommended */}
      {nextModule && (
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(0,194,167,0.2)", padding: "16px 20px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,194,167,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
            {nextModule.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#00c2a7", marginBottom: 3 }}>Rekommenderat nästa steg</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1c1a17" }}>{nextModule.label}</div>
            <div style={{ fontSize: 12, color: "#9a9590" }}>{nextModule.desc}</div>
          </div>
          <button onClick={() => onNavigate(nextModule.view)} style={{ padding: "9px 18px", borderRadius: 9, border: "none", background: "#00c2a7", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
            Starta →
          </button>
        </div>
      )}

      {/* All modules */}
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1c1a17", marginBottom: 14 }}>Alla moduler</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MODULES.map(mod => {
          const pct = mods[mod.key] ?? 0;
          const done = pct >= mod.threshold;
          const inProgress = pct > 0 && !done;
          const barColor = done ? "#00c2a7" : inProgress ? "#3b82f6" : "rgba(0,0,0,0.15)";

          return (
            <div key={mod.key} style={{ background: "#fff", borderRadius: 14, border: done ? "1px solid rgba(0,194,167,0.2)" : "1px solid rgba(0,0,0,0.07)", padding: "14px 18px", boxShadow: "0 1px 5px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: done ? "rgba(0,194,167,0.1)" : "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {mod.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#1c1a17" }}>{mod.label}</div>
                      <div style={{ fontSize: 11, color: "#9a9590" }}>{mod.desc}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, marginLeft: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: pct > 0 ? barColor : "#c0bdb8" }}>{pct}%</span>
                      {done && <span style={{ fontSize: 12, color: "#00c2a7" }}>✓ Klar</span>}
                      {!done && (
                        <button onClick={() => onNavigate(mod.view)} style={{ padding: "6px 12px", borderRadius: 8, border: "1.5px solid rgba(0,194,167,0.3)", background: "rgba(0,194,167,0.06)", color: "#007a68", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                          {pct > 0 ? "Fortsätt" : "Starta"} →
                        </button>
                      )}
                    </div>
                  </div>
                  <div style={{ height: 4, borderRadius: 99, background: "rgba(0,0,0,0.08)" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: 99, transition: "width 0.6s" }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {overall >= 80 && (
        <div style={{ marginTop: 24, background: "linear-gradient(135deg, rgba(0,194,167,0.1) 0%, rgba(0,194,167,0.05) 100%)", border: "2px solid rgba(0,194,167,0.25)", borderRadius: 18, padding: "24px 26px", textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>🏆</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#007a68", marginBottom: 6 }}>Stenkoll Expert!</h2>
          <p style={{ fontSize: 14, color: "#4a7a72", lineHeight: 1.6 }}>Du har nått Expert-nivå. Fortsätt repetera för att behålla skärpan – branschen utvecklas alltid.</p>
        </div>
      )}
    </div>
  );
}
