import { useEffect } from "react";
import type { View } from "../App";
import { getProgress, saveProgress, recordVisit } from "../utils/progress";

interface Props { onNavigate: (v: View) => void; }

interface ChecklistItem {
  id: string;
  label: string;
  required: boolean;
}

interface ChecklistGroup {
  title: string;
  emoji: string;
  items: ChecklistItem[];
}

const GROUPS: ChecklistGroup[] = [
  {
    title: "Kundinformation",
    emoji: "👤",
    items: [
      { id: "name", label: "Kundens namn", required: true },
      { id: "contact", label: "Kontaktuppgifter (tel/mail)", required: true },
      { id: "address", label: "Projektadress / leveransadress", required: true },
    ],
  },
  {
    title: "Materialval",
    emoji: "🪨",
    items: [
      { id: "material", label: "Materialtyp (granit, kvarts, keramik…)", required: true },
      { id: "colormodel", label: "Färg / stenmodell", required: true },
      { id: "thickness", label: "Tjocklek (20mm / 30mm)", required: true },
      { id: "edgeprofile", label: "Kantprofil vald", required: true },
    ],
  },
  {
    title: "Mått & tekniska detaljer",
    emoji: "📐",
    items: [
      { id: "measurements", label: "Bänkskivans mått (eller ritning)", required: true },
      { id: "sink", label: "Diskho – modell och monteringssätt", required: true },
      { id: "hob", label: "Häll – modell och utskärningstyp", required: true },
      { id: "tap", label: "Blandare / kranskål", required: false },
      { id: "cutouts", label: "Specialurtag (hål, beslag etc.)", required: false },
      { id: "splashback", label: "Bakkantslist / stänkskydd", required: false },
    ],
  },
  {
    title: "Installation & logistik",
    emoji: "🔧",
    items: [
      { id: "delivery", label: "Leveranssätt klargjort", required: true },
      { id: "installation", label: "Montering ingår i offerten", required: false },
      { id: "stairs", label: "Trappor / hiss / bärhjälp diskuterat", required: false },
      { id: "template", label: "Mallning – tidpunkt bekräftad", required: true },
      { id: "special", label: "Specialönskemål dokumenterade", required: false },
      { id: "deadline", label: "Kundens deadline noterad", required: false },
    ],
  },
];

const ALL_ITEMS = GROUPS.flatMap(g => g.items);
const REQUIRED_ITEMS = ALL_ITEMS.filter(i => i.required);

export function OffertstodView({ onNavigate }: Props) {
  const p = getProgress();
  const checked = new Set(p.offertstodChecked);

  useEffect(() => { recordVisit("offertstod"); }, []);

  function toggle(id: string) {
    const pr = getProgress();
    const set = new Set(pr.offertstodChecked);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    pr.offertstodChecked = Array.from(set);
    saveProgress(pr);
    // force re-render by reading again (simple approach)
    window.dispatchEvent(new Event("storage"));
  }

  function resetAll() {
    const pr = getProgress();
    pr.offertstodChecked = [];
    saveProgress(pr);
    window.dispatchEvent(new Event("storage"));
  }

  // Read live
  const livePr = getProgress();
  const liveChecked = new Set(livePr.offertstodChecked);
  const totalChecked = liveChecked.size;
  const requiredChecked = REQUIRED_ITEMS.filter(i => liveChecked.has(i.id)).length;
  const totalItems = ALL_ITEMS.length;
  const readinessPct = Math.round((totalChecked / totalItems) * 100);
  const requiredPct = Math.round((requiredChecked / REQUIRED_ITEMS.length) * 100);

  const readinessColor = readinessPct >= 80 ? "#00c2a7" : readinessPct >= 50 ? "#3b82f6" : readinessPct >= 30 ? "#f59e0b" : "#ef4444";
  const readinessLabel = readinessPct >= 90 ? "Redo för offert!" : readinessPct >= 70 ? "Nästan klar" : readinessPct >= 40 ? "Pågår" : "Tidigt stadie";

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => onNavigate("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>
        ← Tillbaka
      </button>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#1c1a17", marginBottom: 6 }}>Offertstöd</h1>
        <p style={{ fontSize: 15, color: "#7a7670" }}>Samla all information innan du skapar offerten. Checka av allteftersom du pratar med kunden.</p>
      </div>

      {/* Readiness score */}
      <div style={{
        background: "#fff", borderRadius: 18, border: "1px solid rgba(0,0,0,0.07)",
        padding: "22px 24px", marginBottom: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1a17", marginBottom: 2 }}>Offertberedskap</div>
            <div style={{ fontSize: 12, color: "#9a9590" }}>{totalChecked} av {totalItems} punkter klara</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: readinessColor, lineHeight: 1 }}>{readinessPct}%</div>
            <div style={{ fontSize: 12, color: readinessColor, fontWeight: 600 }}>{readinessLabel}</div>
          </div>
        </div>

        {/* Main bar */}
        <div style={{ height: 10, borderRadius: 99, background: "rgba(0,0,0,0.08)", overflow: "hidden", marginBottom: 12 }}>
          <div style={{
            height: "100%", width: `${readinessPct}%`, borderRadius: 99,
            background: `linear-gradient(90deg, ${readinessColor} 0%, ${readinessColor}cc 100%)`,
            transition: "width 0.5s ease",
          }} />
        </div>

        {/* Required items sub-bar */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ fontSize: 11, color: "#9a9590", whiteSpace: "nowrap" }}>Obligatoriska ({requiredChecked}/{REQUIRED_ITEMS.length}):</div>
          <div style={{ flex: 1, height: 4, borderRadius: 99, background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${requiredPct}%`, background: requiredPct === 100 ? "#00c2a7" : "#f59e0b", borderRadius: 99, transition: "width 0.5s" }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: requiredPct === 100 ? "#00c2a7" : "#f59e0b" }}>{requiredPct}%</span>
        </div>

        {readinessPct < 100 && (
          <button onClick={resetAll} style={{
            marginTop: 14, background: "none", border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 8, padding: "5px 12px", cursor: "pointer",
            fontSize: 12, color: "#9a9590",
          }}>
            Rensa allt
          </button>
        )}
      </div>

      {/* Checklist groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {GROUPS.map(group => {
          const groupChecked = group.items.filter(i => liveChecked.has(i.id)).length;
          return (
            <div key={group.title} style={{
              background: "#fff", borderRadius: 18, border: "1px solid rgba(0,0,0,0.07)",
              overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
            }}>
              {/* Group header */}
              <div style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#faf9f7",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{group.emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1c1a17" }}>{group.title}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: groupChecked === group.items.length ? "#00c2a7" : "#9a9590" }}>
                  {groupChecked}/{group.items.length}
                </span>
              </div>

              {/* Items */}
              <div style={{ padding: "8px 4px" }}>
                {group.items.map(item => {
                  const isChecked = liveChecked.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      style={{
                        width: "100%", padding: "11px 16px",
                        display: "flex", alignItems: "center", gap: 12,
                        background: "none", border: "none", cursor: "pointer",
                        textAlign: "left", borderRadius: 8,
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.03)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
                    >
                      {/* Checkbox */}
                      <div style={{
                        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                        border: isChecked ? "2px solid #00c2a7" : "2px solid rgba(0,0,0,0.2)",
                        background: isChecked ? "#00c2a7" : "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 13, fontWeight: 700,
                        transition: "all 0.12s",
                      }}>
                        {isChecked && "✓"}
                      </div>

                      <span style={{
                        fontSize: 14, color: isChecked ? "#9a9590" : "#1c1a17",
                        textDecoration: isChecked ? "line-through" : "none",
                        flex: 1,
                        transition: "color 0.12s",
                      }}>
                        {item.label}
                      </span>

                      {item.required && !isChecked && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: "#f59e0b",
                          background: "rgba(245,158,11,0.1)",
                          padding: "2px 6px", borderRadius: 4, flexShrink: 0,
                        }}>
                          Krav
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Done message */}
      {readinessPct >= 90 && (
        <div style={{
          marginTop: 24,
          background: "linear-gradient(135deg, rgba(0,194,167,0.1) 0%, rgba(0,194,167,0.05) 100%)",
          border: "1.5px solid rgba(0,194,167,0.3)",
          borderRadius: 16, padding: "20px 22px", textAlign: "center",
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#007a68", marginBottom: 4 }}>Redo att skicka offert!</div>
          <p style={{ fontSize: 13, color: "#4a7a72" }}>Du har samlat tillräcklig information. Gå vidare och skapa offerten.</p>
        </div>
      )}
    </div>
  );
}
