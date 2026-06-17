import { useEffect, useState } from "react";
import type { View } from "../App";
import { materials, getRatingLabel, getPriceLevelColor } from "../data/materialData";
import type { Material } from "../data/materialData";
import { recordVisit } from "../utils/progress";

interface Props { onNavigate: (v: View) => void; }

export function MaterialguideView({ onNavigate }: Props) {
  const [selected, setSelected] = useState<Material | null>(null);
  const [compare, setCompare] = useState(false);

  useEffect(() => { recordVisit("materialskola"); }, []);

  if (selected) return <MaterialDetail material={selected} onBack={() => setSelected(null)} />;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => onNavigate("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>
        ← Tillbaka
      </button>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#1c1a17", marginBottom: 6 }}>Materialskola</h1>
        <p style={{ fontSize: 15, color: "#7a7670" }}>Lär dig alla material, deras egenskaper och exakt när du ska rekommendera dem.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.05)", borderRadius: 10, padding: 4, width: "fit-content", marginBottom: 24 }}>
        {["Alla material", "Jämförelsetabell"].map((t, i) => (
          <button key={t} onClick={() => setCompare(i === 1)} style={{
            padding: "8px 18px", borderRadius: 8, border: "none",
            background: compare === (i === 1) ? "#fff" : "transparent",
            boxShadow: compare === (i === 1) ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            cursor: "pointer", fontSize: 13, fontWeight: compare === (i === 1) ? 600 : 400,
            color: compare === (i === 1) ? "#1c1a17" : "#7a7670", transition: "all 0.15s",
          }}>{t}</button>
        ))}
      </div>

      {compare ? (
        <CompareTable onSelect={setSelected} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {materials.map(m => <MaterialCard key={m.id} material={m} onClick={() => setSelected(m)} />)}
        </div>
      )}
    </div>
  );
}

function MaterialCard({ material: m, onClick }: { material: Material; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 18, overflow: "hidden", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", transition: "transform 0.15s, box-shadow 0.15s", display: "flex", flexDirection: "column" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"; }}>
      <div style={{ height: 80, background: m.gradient, position: "relative", flexShrink: 0 }}>
        <span style={{ position: "absolute", bottom: 10, left: 14, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.8)", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: 5 }}>{m.type}</span>
        <span style={{ position: "absolute", top: 10, right: 12, fontSize: 10, fontWeight: 700, color: "#fff", background: getPriceLevelColor(m.priceLevel), padding: "3px 8px", borderRadius: 5 }}>{m.priceLevel}</span>
      </div>
      <div style={{ padding: "18px 18px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#1c1a17", marginBottom: 2 }}>{m.name}</div>
          <div style={{ fontSize: 12, color: "#9a9590", fontStyle: "italic" }}>{m.tagline}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[{ label: "Hållbarhet", val: m.durability }, { label: "Värmetålighet", val: m.heatResistance }, { label: "Fläcktålighet", val: m.stainResistance }, { label: "Lågt underhåll", val: 6 - m.maintenance }].map(r => (
            <div key={r.label}>
              <div style={{ fontSize: 10, color: "#9a9590", marginBottom: 3 }}>{r.label}</div>
              <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= r.val ? "#00c2a7" : "rgba(0,0,0,0.1)" }} />)}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#5a5652", lineHeight: 1.5 }}>{m.description.slice(0, 85)}…</div>
        <div style={{ fontSize: 12, color: "#00c2a7", fontWeight: 600, marginTop: "auto" }}>Lär dig mer →</div>
      </div>
    </button>
  );
}

function MaterialDetail({ material: m, onBack }: { material: Material; onBack: () => void }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>
        ← Alla material
      </button>

      {/* Hero */}
      <div style={{ borderRadius: 20, overflow: "hidden", background: m.gradient, marginBottom: 24, minHeight: 130, display: "flex", alignItems: "flex-end", padding: "22px 26px", position: "relative" }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: 6 }}>{m.type}</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{m.name}</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}>{m.tagline}</p>
        </div>
        <span style={{ position: "absolute", top: 18, right: 18, fontSize: 12, fontWeight: 700, color: "#fff", background: getPriceLevelColor(m.priceLevel), padding: "5px 12px", borderRadius: 7 }}>{m.priceLevel}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <InfoCard title="Beskrivning"><p style={{ fontSize: 14, color: "#5a5652", lineHeight: 1.65 }}>{m.description}</p></InfoCard>
          <InfoCard title="Fördelar">
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
              {m.pros.map((pro, i) => <li key={i} style={{ display: "flex", gap: 8 }}><span style={{ color: "#00c2a7", flexShrink: 0 }}>✓</span><span style={{ fontSize: 13, color: "#3a3836", lineHeight: 1.5 }}>{pro}</span></li>)}
            </ul>
          </InfoCard>
          <InfoCard title="Nackdelar">
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
              {m.cons.map((con, i) => <li key={i} style={{ display: "flex", gap: 8 }}><span style={{ color: "#f59e0b", flexShrink: 0 }}>!</span><span style={{ fontSize: 13, color: "#3a3836", lineHeight: 1.5 }}>{con}</span></li>)}
            </ul>
          </InfoCard>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <InfoCard title="Egenskaper">
            {[{ label: "Hållbarhet", val: m.durability }, { label: "Värmetålighet", val: m.heatResistance }, { label: "Reptålighet", val: m.scratchResistance }, { label: "Fläcktålighet", val: m.stainResistance }, { label: "Lågt underhåll", val: 6 - m.maintenance }].map(r => (
              <div key={r.label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: "#5a5652" }}>{r.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#1c1a17" }}>{getRatingLabel(r.val)}</span>
                </div>
                <div style={{ display: "flex", gap: 3 }}>{[1,2,3,4,5].map(i => <div key={i} style={{ height: 6, flex: 1, borderRadius: 3, background: i <= r.val ? "#00c2a7" : "rgba(0,0,0,0.1)" }} />)}</div>
              </div>
            ))}
          </InfoCard>
          <InfoCard title="Vanligt missförstånd" highlight="warning">
            <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>💡 {m.commonMisunderstanding}</p>
          </InfoCard>
        </div>
      </div>

      {/* When to/not to recommend + scenario */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <InfoCard title="✓ Rekommendera när..." highlight="success">
          <p style={{ fontSize: 13, color: "#14532d", lineHeight: 1.65 }}>{m.whenToRecommend}</p>
        </InfoCard>
        <InfoCard title="✗ Undvik när..." highlight="danger">
          <p style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.65 }}>{m.whenNotToRecommend}</p>
        </InfoCard>
      </div>

      <div style={{ marginBottom: 14 }}>
        <InfoCard title="Exempelscenario" highlight="scenario">
          <p style={{ fontSize: 14, color: "#1c1a17", lineHeight: 1.7, fontStyle: "italic" }}>{m.customerScenario}</p>
        </InfoCard>
      </div>

      <InfoCard title="Säljargument" highlight="accent">
        <p style={{ fontSize: 14, color: "#007a68", lineHeight: 1.65, fontStyle: "italic" }}>"{m.salesArgument}"</p>
      </InfoCard>

      <style>{`@media(max-width:580px){ .mat-cols { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

type Highlight = "success" | "danger" | "warning" | "accent" | "scenario" | undefined;

function InfoCard({ title, children, highlight }: { title: string; children: React.ReactNode; highlight?: Highlight }) {
  const styles: Record<string, { bg: string; border: string; titleColor: string }> = {
    success:  { bg: "rgba(34,197,94,0.05)",  border: "rgba(34,197,94,0.2)",  titleColor: "#16a34a" },
    danger:   { bg: "rgba(239,68,68,0.05)",  border: "rgba(239,68,68,0.18)", titleColor: "#dc2626" },
    warning:  { bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)", titleColor: "#b45309" },
    accent:   { bg: "rgba(0,194,167,0.06)",  border: "rgba(0,194,167,0.2)",  titleColor: "#00c2a7" },
    scenario: { bg: "rgba(59,130,246,0.05)", border: "rgba(59,130,246,0.15)", titleColor: "#3b82f6" },
  };
  const st = highlight ? styles[highlight] : { bg: "#fff", border: "rgba(0,0,0,0.07)", titleColor: "#9a9590" };

  return (
    <div style={{ background: st.bg, border: `1px solid ${st.border}`, borderRadius: 14, padding: "16px 18px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: st.titleColor, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function CompareTable({ onSelect }: { onSelect: (m: Material) => void }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(0,0,0,0.08)" }}>
            {["Material", "Pris", "Hållbarhet", "Värme", "Fläckar", "Underhåll", "Bäst för"].map(h => (
              <th key={h} style={{ padding: "10px 12px", textAlign: "left", color: "#9a9590", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {materials.map((m, i) => (
            <tr key={m.id} onClick={() => onSelect(m)} style={{ background: i % 2 === 0 ? "#fff" : "#faf9f7", cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.05)", transition: "background 0.1s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,194,167,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#faf9f7"; }}>
              <td style={{ padding: "12px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 5, background: m.gradient, flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: "#1c1a17" }}>{m.name}</span>
                </div>
              </td>
              <td style={{ padding: "12px 12px" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: getPriceLevelColor(m.priceLevel), padding: "2px 8px", borderRadius: 4 }}>{m.priceLevel}</span>
              </td>
              {[m.durability, m.heatResistance, m.stainResistance].map((val, vi) => (
                <td key={vi} style={{ padding: "12px 12px" }}>
                  <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(j => <div key={j} style={{ width: 8, height: 8, borderRadius: "50%", background: j <= val ? "#00c2a7" : "rgba(0,0,0,0.12)" }} />)}</div>
                </td>
              ))}
              <td style={{ padding: "12px 12px" }}>
                <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(j => <div key={j} style={{ width: 8, height: 8, borderRadius: "50%", background: j <= (6 - m.maintenance) ? "#00c2a7" : "rgba(0,0,0,0.12)" }} />)}</div>
              </td>
              <td style={{ padding: "12px 12px", color: "#5a5652", maxWidth: 180, fontSize: 12 }}>{m.bestCustomer.slice(0, 55)}…</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
