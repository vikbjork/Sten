import { useState } from "react";
import type { View } from "../App";

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const NAV_ITEMS: { view: View; label: string }[] = [
  { view: "quiz", label: "Quiz" },
  { view: "stonetest", label: "Stentest" },
  { view: "tools", label: "Verktyg" },
];

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNav(view: View) {
    onNavigate(view);
    setMenuOpen(false);
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(245, 242, 238, 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 24px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <button
          onClick={() => handleNav("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#00c2a7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.05em",
              fontFamily: "'Inter', sans-serif",
              flexShrink: 0,
            }}
          >
            SK
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 16,
              color: "#1c1a17",
              letterSpacing: "-0.01em",
            }}
          >
            Stenkoll
          </span>
        </button>

        {/* Desktop nav */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: 4 }}
          className="hidden-mobile"
        >
          {NAV_ITEMS.map(({ view, label }) => (
            <button
              key={view}
              onClick={() => handleNav(view)}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                background: currentView === view ? "#00c2a7" : "transparent",
                color: currentView === view ? "#fff" : "#5a5652",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                transition: "all 0.15s ease",
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            borderRadius: 8,
          }}
          className="show-mobile"
        >
          <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
            <span
              style={{
                display: "block",
                height: 2,
                background: "#1c1a17",
                borderRadius: 2,
                transition: "transform 0.2s",
                transformOrigin: "center",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: 2,
                background: "#1c1a17",
                borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.15s",
              }}
            />
            <span
              style={{
                display: "block",
                height: 2,
                background: "#1c1a17",
                borderRadius: 2,
                transition: "transform 0.2s",
                transformOrigin: "center",
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.07)",
            padding: "12px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_ITEMS.map(({ view, label }) => (
            <button
              key={view}
              onClick={() => handleNav(view)}
              style={{
                padding: "14px 16px",
                borderRadius: 10,
                border: "none",
                background: currentView === view ? "#00c2a7" : "transparent",
                color: currentView === view ? "#fff" : "#1c1a17",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                textAlign: "left",
                transition: "background 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 639px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
