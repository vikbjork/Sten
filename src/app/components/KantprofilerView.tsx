import { useEffect, useState } from "react";
import type { View } from "../App";
import { edgeProfiles } from "../data/toolsData";
import type { EdgeProfile } from "../data/toolsData";
import { recordVisit } from "../utils/progress";

interface Props { onNavigate: (v: View) => void; }

const ALL_TAGS = ["Alla", "Vanligast", "Modern", "Klassisk", "Barnvänlig", "Premium", "Budgetvänlig", "Mer exklusiv"];
const PRICE_COLORS: Record<string, string> = {
  Standard: "#22c55e",
  "+": "#3b82f6",
  "++": "#8b5cf6",
  "+++": "#f59e0b",
};

export function KantprofilerView({ onNavigate }: Props) {
  const [activeTag, setActiveTag] = useState("Alla");
  const [selected, setSelected] = useState<EdgeProfile | null>(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => { recordVisit("kantprofiler"); }, []);

  const filtered = activeTag === "Alla"
    ? edgeProfiles
    : edgeProfiles.filter(p => p.tags.includes(activeTag));

  if (selected) {
    return <ProfileDetail profile={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => onNavigate("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>
        ← Tillbaka
      </button>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#1c1a17", marginBottom: 6 }}>Kantprofiler</h1>
        <p style={{ fontSize: 15, color: "#7a7670" }}>Referensguide för alla kantprofiler med säljstöd, stilbeskrivning och rekommendationer.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.05)", borderRadius: 10, padding: 4, width: "fit-content", marginBottom: 24 }}>
        {["Profilkort", "Jämförelsetabell"].map((t, i) => (
          <button key={t} onClick={() => setShowTable(i === 1)} style={{
            padding: "8px 16px", borderRadius: 8, border: "none",
            background: showTable === (i === 1) ? "#fff" : "transparent",
            boxShadow: showTable === (i === 1) ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            cursor: "pointer", fontSize: 13, fontWeight: showTable === (i === 1) ? 600 : 400,
            color: showTable === (i === 1) ? "#1c1a17" : "#7a7670",
          }}>{t}</button>
        ))}
      </div>

      {!showTable && (
        <>
          {/* Tag filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {ALL_TAGS.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)} style={{
                padding: "6px 14px", borderRadius: 99,
                border: activeTag === tag ? "1.5px solid #00c2a7" : "1.5px solid rgba(0,0,0,0.12)",
                background: activeTag === tag ? "rgba(0,194,167,0.1)" : "#fff",
                color: activeTag === tag ? "#00c2a7" : "#5a5652",
                cursor: "pointer", fontSize: 13, fontWeight: activeTag === tag ? 600 : 400,
                transition: "all 0.15s",
              }}>{tag}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {filtered.map(p => (
              <ProfileCard key={p.id} profile={p} onClick={() => setSelected(p)} />
            ))}
          </div>
        </>
      )}

      {showTable && <CompareTable />}
    </div>
  );
}

function ProfileCard({ profile: p, onClick }: { profile: EdgeProfile; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 18,
        overflow: "hidden", cursor: "pointer", textAlign: "left",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        transition: "transform 0.15s, box-shadow 0.15s",
        display: "flex", flexDirection: "column",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"; }}
    >
      {/* SVG area */}
      <div style={{ background: "linear-gradient(135deg, #f5f2ee 0%, #eae6df 100%)", padding: "20px 16px 16px", display: "flex", justifyContent: "center" }}>
        <svg viewBox={p.svgViewBox} width={110} height={73} dangerouslySetInnerHTML={{ __html: p.svgPath }} />
      </div>

      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1c1a17", marginBottom: 2 }}>{p.name}</div>
          <div style={{ fontSize: 11, color: "#9a9590", fontStyle: "italic" }}>{p.styleImpression}</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {p.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              fontSize: 10, fontWeight: 600, color: "#5a5652",
              background: "rgba(0,0,0,0.06)", padding: "2px 7px", borderRadius: 4,
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#7a7670" }}>Pristillägg:</span>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: PRICE_COLORS[p.priceImpact],
            background: `${PRICE_COLORS[p.priceImpact]}18`,
            padding: "2px 8px", borderRadius: 4,
          }}>
            {p.priceImpact === "Standard" ? "Standard" : `+${p.priceImpact.length} steg`}
          </span>
        </div>

        <div style={{ fontSize: 12, color: "#00c2a7", fontWeight: 600 }}>Mer info →</div>
      </div>
    </button>
  );
}

function ProfileDetail({ profile: p, onBack }: { profile: EdgeProfile; onBack: () => void }) {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>
        ← Alla kantprofiler
      </button>

      <div style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 20 }}>
        {/* Large SVG */}
        <div style={{ background: "linear-gradient(135deg, #f5f2ee 0%, #eae6df 100%)", padding: "40px 24px", display: "flex", justifyContent: "center" }}>
          <svg viewBox={p.svgViewBox} width={200} height={133} dangerouslySetInnerHTML={{ __html: p.svgPath }} />
        </div>

        <div style={{ padding: "24px 28px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#1c1a17", marginBottom: 4 }}>{p.name}</h1>
              <p style={{ fontSize: 14, color: "#9a9590", fontStyle: "italic" }}>{p.styleImpression}</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.tags.map(tag => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: "#5a5652", background: "rgba(0,0,0,0.06)", padding: "3px 9px", borderRadius: 5 }}>{tag}</span>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 14, color: "#5a5652", lineHeight: 1.65, marginBottom: 24 }}>{p.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Pristillägg", value: p.priceImpact === "Standard" ? "Ingår i standard" : p.priceImpact, color: PRICE_COLORS[p.priceImpact] },
              { label: "Svårighetsgrad", value: p.difficulty, color: p.difficulty === "Enkel" ? "#22c55e" : "#f59e0b" },
            ].map(item => (
              <div key={item.label} style={{ background: "#faf9f7", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: "#9a9590", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.color }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {[
        { title: "Bästa användningsområde", content: p.bestUseCase },
        { title: "Rekommenderad kund", content: p.recommendedCustomer },
        { title: "💡 Säljstips", content: p.salesTip, accent: true },
      ].map(item => (
        <div key={item.title} style={{
          background: item.accent ? "rgba(0,194,167,0.06)" : "#fff",
          border: item.accent ? "1px solid rgba(0,194,167,0.2)" : "1px solid rgba(0,0,0,0.07)",
          borderRadius: 14, padding: "18px 20px", marginBottom: 12,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: item.accent ? "#00c2a7" : "#9a9590", marginBottom: 8 }}>{item.title}</div>
          <p style={{ fontSize: 14, color: item.accent ? "#007a68" : "#3a3836", lineHeight: 1.65, margin: 0 }}>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

function CompareTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(0,0,0,0.08)" }}>
            {["Profil", "Stil", "Pristillägg", "Svårighet", "Barnvänlig", "Rekommenderad kund"].map(h => (
              <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#9a9590", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {edgeProfiles.map((p, i) => (
            <tr key={p.id} style={{ background: i % 2 === 0 ? "#fff" : "#faf9f7", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              <td style={{ padding: "12px 14px", fontWeight: 600, color: "#1c1a17" }}>{p.name}</td>
              <td style={{ padding: "12px 14px", color: "#5a5652" }}>{p.styleImpression}</td>
              <td style={{ padding: "12px 14px" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: PRICE_COLORS[p.priceImpact], background: `${PRICE_COLORS[p.priceImpact]}18`, padding: "2px 8px", borderRadius: 4 }}>
                  {p.priceImpact}
                </span>
              </td>
              <td style={{ padding: "12px 14px", color: "#5a5652" }}>{p.difficulty}</td>
              <td style={{ padding: "12px 14px", textAlign: "center" }}>
                {p.tags.includes("Barnvänlig") ? "✓" : "—"}
              </td>
              <td style={{ padding: "12px 14px", color: "#5a5652", maxWidth: 200 }}>{p.recommendedCustomer.slice(0, 60)}…</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
