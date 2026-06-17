import { useEffect, useState } from "react";
import type { View } from "../App";
import { getCategories, filterQuestions, prepareQuestion } from "../data/quizData";
import type { PreparedQuestion } from "../data/quizData";
import { recordQuizScore } from "../utils/progress";

interface QuizViewProps { onNavigate: (view: View) => void; }
type Phase = "setup" | "running" | "result";

function getLevelInfo(pct: number): { label: string; color: string; emoji: string; message: string } {
  if (pct >= 90) return { label: "Expert", color: "#00c2a7", emoji: "🏆", message: "Utmärkt! Du är en riktigt expert på stenbranschen." };
  if (pct >= 70) return { label: "Säker", color: "#3b82f6", emoji: "🎯", message: "Bra jobbat! Du har god kunskap – lite mer övning till Expert-nivå." };
  if (pct >= 50) return { label: "Lärling", color: "#f59e0b", emoji: "📚", message: "Godkänt! Du är på rätt väg – fortsätt öva för att bli riktigt säker." };
  return { label: "Nybörjare", color: "#9a9590", emoji: "💪", message: "Bra start! Läs igenom Materialguiden och försök igen." };
}

export function QuizView({ onNavigate }: QuizViewProps) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [questions, setQuestions] = useState<PreparedQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [category, setCategory] = useState("Alla kategorier");
  const [count, setCount] = useState<"10" | "20" | "40" | "all">("20");
  const categories = getCategories();

  function startQuiz() {
    const n = count === "all" ? "all" : parseInt(count);
    const raw = filterQuestions(category, n);
    const prepared = raw.map(prepareQuestion);
    setQuestions(prepared);
    setIdx(0);
    setSelected(null);
    setScore(0);
    setRevealed(false);
    setPhase("running");
  }

  function handleAnswer(ansIdx: number) {
    if (revealed) return;
    setSelected(ansIdx);
    setRevealed(true);
    if (ansIdx === questions[idx].correctIndex) setScore(s => s + 1);
  }

  function nextQuestion() {
    if (idx + 1 >= questions.length) {
      const pct = Math.round(((score + (selected === questions[idx].correctIndex ? 1 : 0)) / questions.length) * 100);
      recordQuizScore(pct);
      setPhase("result");
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function retry() {
    setPhase("setup");
    setIdx(0); setSelected(null); setScore(0); setRevealed(false);
  }

  if (phase === "setup") {
    return (
      <div style={PAGE}>
        <BackBtn onClick={() => onNavigate("home")} />
        <h1 style={TITLE}>Quiz</h1>
        <p style={SUBTITLE}>Kunskapstest om process, försäljning och rådgivning. Frågorna slumpas och blandas.</p>

        <div style={{ ...CARD, padding: "32px 28px", maxWidth: 500, marginBottom: 0 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#1c1a17", marginBottom: 24 }}>Konfigurera quiz</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
            <Field label="Kategori">
              <SelectWrap>
                <select style={SELECT} value={category} onChange={e => setCategory(e.target.value)}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </SelectWrap>
            </Field>
            <Field label="Antal frågor">
              <SelectWrap>
                <select style={SELECT} value={count} onChange={e => setCount(e.target.value as typeof count)}>
                  <option value="10">10 frågor</option>
                  <option value="20">20 frågor</option>
                  <option value="40">40 frågor</option>
                  <option value="all">Alla frågor</option>
                </select>
              </SelectWrap>
            </Field>
          </div>
          <PrimaryBtn onClick={startQuiz}>▶ Starta quiz</PrimaryBtn>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const total = questions.length;
    const finalScore = score;
    const pct = Math.round((finalScore / total) * 100);
    const { label, color, emoji, message } = getLevelInfo(pct);
    const r = 44; const circ = 2 * Math.PI * r; const dash = (pct / 100) * circ;

    return (
      <div style={PAGE}>
        <BackBtn onClick={() => onNavigate("home")} />
        <div style={{ ...CARD, padding: "44px 32px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{emoji}</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#1c1a17", marginBottom: 6 }}>Quiz klart!</h2>

          {/* Score circle */}
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
            <svg width={110} height={110} viewBox="0 0 110 110">
              <circle cx={55} cy={55} r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={7} />
              <circle cx={55} cy={55} r={r} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round"
                strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 55 55)"
                style={{ transition: "stroke-dasharray 1s ease" }} />
              <text x={55} y={55} textAnchor="middle" dominantBaseline="middle"
                style={{ fontSize: 18, fontWeight: 800, fill: "#1c1a17", fontFamily: "Inter, sans-serif" }}>
                {pct}%
              </text>
            </svg>
          </div>

          <div style={{ fontSize: 20, fontWeight: 700, color: "#1c1a17", marginBottom: 4 }}>{finalScore} av {total} rätt</div>
          <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, color, background: `${color}18`, padding: "4px 12px", borderRadius: 6, marginBottom: 12 }}>
            Nivå: {label}
          </div>
          <p style={{ fontSize: 14, color: "#7a7670", marginBottom: 32, lineHeight: 1.6 }}>{message}</p>

          {pct < 70 && (
            <div style={{ marginBottom: 24, padding: "14px 16px", background: "rgba(59,130,246,0.06)", borderRadius: 12, border: "1px solid rgba(59,130,246,0.15)", textAlign: "left" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#3b82f6", marginBottom: 4 }}>Rekommenderat nästa steg</div>
              <p style={{ fontSize: 13, color: "#1e3a8a", margin: 0 }}>Läs igenom Materialguiden och Säljverktyg för att stärka din kunskapsbas.</p>
            </div>
          )}

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <PrimaryBtn onClick={retry}>Försök igen</PrimaryBtn>
            <button onClick={() => onNavigate("home")} style={SEC_BTN}>Till menyn</button>
          </div>
        </div>
      </div>
    );
  }

  // Running
  const q = questions[idx];
  const progress = (idx / questions.length) * 100;

  return (
    <div style={PAGE}>
      <BackBtn onClick={() => setPhase("setup")} label="Avsluta quiz" />

      {/* Progress */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#7a7670" }}>Fråga {idx + 1} av {questions.length}</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Poäng: <span style={{ color: "#00c2a7" }}>{score}</span></span>
        </div>
        <div style={{ height: 5, borderRadius: 99, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "#00c2a7", borderRadius: 99, transition: "width 0.4s" }} />
        </div>
      </div>

      {/* Question card */}
      <div style={{ ...CARD, padding: "28px 26px", marginBottom: 14 }}>
        <span style={{
          display: "inline-block", fontSize: 10, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "#00c2a7", background: "rgba(0,194,167,0.1)",
          padding: "4px 10px", borderRadius: 6, marginBottom: 16,
        }}>
          {q.cat}
        </span>

        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#1c1a17", lineHeight: 1.55, marginBottom: 24 }}>
          {q.q}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {q.a.map((answer, i) => {
            const isSel = selected === i;
            const isCorr = i === q.correctIndex;
            let bg = "#fff", border = "1.5px solid rgba(0,0,0,0.1)", color = "#1c1a17";

            if (revealed) {
              if (isCorr) { bg = "rgba(0,194,167,0.08)"; border = "1.5px solid #00c2a7"; color = "#007a68"; }
              else if (isSel) { bg = "rgba(220,50,50,0.06)"; border = "1.5px solid #ef4444"; color = "#991b1b"; }
            }

            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={revealed}
                style={{
                  width: "100%", padding: "13px 16px", borderRadius: 12,
                  border, background: bg, cursor: revealed ? "default" : "pointer",
                  textAlign: "left", display: "flex", alignItems: "center", gap: 12,
                  transition: "all 0.15s", fontFamily: "'Inter', sans-serif",
                }}
              >
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  border: `1.5px solid ${revealed && isCorr ? "#00c2a7" : revealed && isSel ? "#ef4444" : "rgba(0,0,0,0.15)"}`,
                  background: revealed && isCorr ? "#00c2a7" : revealed && isSel ? "#ef4444" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 12, fontWeight: 700,
                }}>
                  {revealed && isCorr ? "✓" : revealed && isSel && !isCorr ? "✗" : String.fromCharCode(65 + i)}
                </span>
                <span style={{ fontSize: 14, color, lineHeight: 1.5 }}>{answer}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div style={{
            marginTop: 18, padding: "14px 16px", borderRadius: 12,
            background: "rgba(0,194,167,0.06)", border: "1px solid rgba(0,194,167,0.2)",
            display: "flex", gap: 10, alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>💡</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#00c2a7", marginBottom: 3 }}>Förklaring</div>
              <p style={{ fontSize: 13, color: "#4a7a72", lineHeight: 1.6, margin: 0 }}>{q.i}</p>
            </div>
          </div>
        )}
      </div>

      {revealed && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button style={{ ...SEC_BTN, background: "#00c2a7", color: "#fff", border: "none" }} onClick={nextQuestion}>
            {idx + 1 >= questions.length ? "Se resultat →" : "Nästa fråga →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Shared UI ──────────────────────────────────────────────────────

const PAGE: React.CSSProperties = { maxWidth: 680, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" };
const CARD: React.CSSProperties = { background: "#fff", borderRadius: 20, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 14px rgba(0,0,0,0.05)" };
const TITLE: React.CSSProperties = { fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#1c1a17", marginBottom: 6 };
const SUBTITLE: React.CSSProperties = { fontSize: 15, color: "#7a7670", marginBottom: 32 };
const SELECT: React.CSSProperties = { width: "100%", padding: "13px 14px", borderRadius: 12, border: "1.5px solid rgba(0,0,0,0.12)", background: "#fff", fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#1c1a17", appearance: "none", cursor: "pointer", outline: "none" };
const SEC_BTN: React.CSSProperties = { padding: "13px 24px", borderRadius: 12, border: "1.5px solid rgba(0,0,0,0.12)", background: "transparent", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: "#5a5652" };

function BackBtn({ onClick, label = "Tillbaka" }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", padding: "6px 0", marginBottom: 28 }}>
      ← {label}
    </button>
  );
}
function PrimaryBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 8, width: "100%", padding: "15px 24px", borderRadius: 14, border: "none",
      background: "#00c2a7", color: "#fff", cursor: "pointer",
      fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600,
    }}>{children}</button>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9a9590", marginBottom: 8 }}>{label}</label>
      {children}
    </div>
  );
}
function SelectWrap({ children }: { children: React.ReactNode }) {
  return <div style={{ position: "relative" }}>{children}<svg viewBox="0 0 24 24" fill="none" width={16} height={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9a9590" }}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
}
