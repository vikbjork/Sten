import type { View } from "../App";
import { toolsSections } from "../data/toolsData";

interface ToolsViewProps {
  onNavigate: (view: View) => void;
}

export function ToolsView({ onNavigate }: ToolsViewProps) {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 80px" }}>
      <button
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
          color: "#7a7670", padding: "6px 0", marginBottom: 32,
        }}
        onClick={() => onNavigate("home")}
      >
        <svg viewBox="0 0 24 24" fill="none" width={16} height={16}>
          <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Tillbaka
      </button>

      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 700,
          color: "#1c1a17",
          marginBottom: 6,
          lineHeight: 1.2,
        }}
      >
        Verktyg
      </h1>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#7a7670", marginBottom: 48 }}>
        Praktiska säljverktyg för rådgivning och kundmöten.
      </p>

      {toolsSections.map(section => (
        <ToolSection key={section.id} section={section} />
      ))}
    </div>
  );
}

function ToolSection({ section }: { section: typeof toolsSections[number] }) {
  return (
    <section style={{ marginBottom: 60 }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 8,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: "rgba(0,194,167,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00c2a7",
            flexShrink: 0,
          }}
        >
          <EdgeIcon />
        </div>
        <div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 20,
              fontWeight: 600,
              color: "#1c1a17",
              marginBottom: 2,
            }}
          >
            {section.title}
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#9a9590" }}>
            {section.subtitle}
          </p>
        </div>
      </div>

      {/* Profile grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {section.items.map(item => (
          <ProfileCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function ProfileCard({ item }: { item: typeof toolsSections[number]["items"][number] }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      {/* SVG illustration area */}
      <div
        style={{
          background: "linear-gradient(135deg, #f8f6f2 0%, #f0ede7 100%)",
          padding: "24px 20px 16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <svg
          viewBox={item.svgViewBox}
          width={120}
          height={80}
          style={{ display: "block" }}
          dangerouslySetInnerHTML={{ __html: item.svgPath }}
        />
      </div>

      {/* Text */}
      <div style={{ padding: "18px 18px 20px" }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#1c1a17",
            marginBottom: 8,
          }}
        >
          {item.name}
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "#7a7670",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

function EdgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={22} height={22}>
      <rect x="3" y="6" width="12" height="12" rx="1" stroke="currentColor" strokeWidth={1.75}/>
      <path d="M15 6l6 6-6 6" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
