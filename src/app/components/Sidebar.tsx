import { useState } from "react";
import type { View } from "../App";

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const NAV_GROUPS = [
  {
    label: "ÖVERSIKT",
    items: [{ view: "home" as View, label: "Hem", icon: HomeIcon }],
  },
  {
    label: "ONBOARDING",
    items: [{ view: "nyborjarvag" as View, label: "Nybörjarväg", icon: RoadmapIcon }],
  },
  {
    label: "LÄR DIG",
    items: [
      { view: "materialskola" as View, label: "Materialskola", icon: MaterialIcon },
      { view: "kantprofiler" as View, label: "Kantprofiler", icon: EdgeIcon },
    ],
  },
  {
    label: "SÄLJSTÖD",
    items: [
      { view: "kundanalys" as View, label: "Kundanalys", icon: CustomerIcon },
      { view: "offertstod" as View, label: "Offertstöd", icon: QuoteIcon },
      { view: "saljtraning" as View, label: "Säljträning", icon: ToolkitIcon },
    ],
  },
  {
    label: "TRÄNA",
    items: [
      { view: "quiz" as View, label: "Quiz", icon: QuizIcon },
      { view: "stonetest" as View, label: "Stentest", icon: StoneIcon },
    ],
  },
  {
    label: "MIN PROGRESS",
    items: [{ view: "progress" as View, label: "Progress", icon: ProgressIcon }],
  },
];

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNav(view: View) {
    onNavigate(view);
    setMobileOpen(false);
  }

  const sidebarContent = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <button
        onClick={() => handleNav("home")}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "22px 18px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ width: 34, height: 34, borderRadius: 9, background: "#00c2a7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", flexShrink: 0 }}>
          SK
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1c1a17", lineHeight: 1.2 }}>Stenkoll</div>
          <div style={{ fontSize: 10, color: "#9a9590", fontWeight: 400, marginTop: 1 }}>Säljträning</div>
        </div>
      </button>

      {/* Nav groups */}
      <nav style={{ flex: 1, padding: "4px 10px", overflowY: "auto" }}>
        {NAV_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: "#c0bcb6", padding: "8px 10px 3px", textTransform: "uppercase" }}>
              {group.label}
            </div>
            {group.items.map(({ view, label, icon: Icon }) => {
              const active = currentView === view;
              return (
                <button
                  key={view}
                  onClick={() => handleNav(view)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 9,
                    padding: "9px 10px", borderRadius: 9,
                    border: "none",
                    background: active ? "rgba(0,194,167,0.1)" : "transparent",
                    cursor: "pointer", textAlign: "left",
                    color: active ? "#00c2a7" : "#5a5652",
                    transition: "background 0.12s, color 0.12s",
                    marginBottom: 1,
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <Icon size={16} />
                  <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, fontFamily: "'Inter', sans-serif" }}>{label}</span>
                  {active && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "#00c2a7" }} />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(0,0,0,0.07)", fontSize: 11, color: "#c0bcb6" }}>
        Stenkoll — internt verktyg
      </div>
    </div>
  );

  return (
    <>
      <aside className="sk-sidebar" style={{ width: 210, background: "#fff", borderRight: "1px solid rgba(0,0,0,0.08)", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 50, overflowY: "auto", fontFamily: "'Inter', sans-serif" }}>
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="sk-mobile-topbar" style={{ display: "none", position: "fixed", top: 0, left: 0, right: 0, height: 58, background: "rgba(247,245,241,0.94)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid rgba(0,0,0,0.08)", zIndex: 60, alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
        <button onClick={() => handleNav("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#00c2a7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>SK</div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#1c1a17", fontFamily: "'Inter', sans-serif" }}>Stenkoll</span>
        </button>
        <button onClick={() => setMobileOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }} aria-label="Öppna meny">
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="sk-mobile-drawer" style={{ display: "none", position: "fixed", top: 58, bottom: 0, left: 0, right: 0, zIndex: 55, background: "#fff", overflowY: "auto", fontFamily: "'Inter', sans-serif" }}>
          <nav style={{ padding: "10px 14px" }}>
            {NAV_GROUPS.map(group => (
              <div key={group.label} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: "#c0bcb6", padding: "8px 10px 3px", textTransform: "uppercase" }}>{group.label}</div>
                {group.items.map(({ view, label, icon: Icon }) => {
                  const active = currentView === view;
                  return (
                    <button key={view} onClick={() => handleNav(view)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 12px", borderRadius: 10, border: "none", background: active ? "rgba(0,194,167,0.08)" : "transparent", cursor: "pointer", textAlign: "left", color: active ? "#00c2a7" : "#1c1a17", marginBottom: 2 }}>
                      <Icon size={18} />
                      <span style={{ fontSize: 15, fontWeight: active ? 600 : 400 }}>{label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .sk-sidebar { display: none !important; }
          .sk-mobile-topbar { display: flex !important; }
          .sk-mobile-drawer { display: block !important; }
          .sk-content { margin-left: 0 !important; padding-top: 58px !important; }
        }
        @media (min-width: 881px) {
          .sk-mobile-topbar { display: none !important; }
          .sk-mobile-drawer { display: none !important; }
        }
      `}</style>
    </>
  );
}

function HomeIcon({ size = 18 }: { size?: number }) { return <svg viewBox="0 0 24 24" fill="none" width={size} height={size}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function RoadmapIcon({ size = 18 }: { size?: number }) { return <svg viewBox="0 0 24 24" fill="none" width={size} height={size}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function MaterialIcon({ size = 18 }: { size?: number }) { return <svg viewBox="0 0 24 24" fill="none" width={size} height={size}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function EdgeIcon({ size = 18 }: { size?: number }) { return <svg viewBox="0 0 24 24" fill="none" width={size} height={size}><rect x="3" y="6" width="12" height="12" rx="1" stroke="currentColor" strokeWidth={1.75}/><path d="M15 6l6 6-6 6" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function CustomerIcon({ size = 18 }: { size?: number }) { return <svg viewBox="0 0 24 24" fill="none" width={size} height={size}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth={1.75}/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function QuoteIcon({ size = 18 }: { size?: number }) { return <svg viewBox="0 0 24 24" fill="none" width={size} height={size}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round"/></svg>; }
function ToolkitIcon({ size = 18 }: { size?: number }) { return <svg viewBox="0 0 24 24" fill="none" width={size} height={size}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.07-3.07a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.07 3.07z" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function QuizIcon({ size = 18 }: { size?: number }) { return <svg viewBox="0 0 24 24" fill="none" width={size} height={size}><path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function StoneIcon({ size = 18 }: { size?: number }) { return <svg viewBox="0 0 24 24" fill="none" width={size} height={size}><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth={1.75}/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth={1.75}/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ProgressIcon({ size = 18 }: { size?: number }) { return <svg viewBox="0 0 24 24" fill="none" width={size} height={size}><line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round"/></svg>; }
function MenuIcon() { return <svg viewBox="0 0 24 24" fill="none" width={22} height={22}><line x1="3" y1="6" x2="21" y2="6" stroke="#1c1a17" strokeWidth={1.75} strokeLinecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke="#1c1a17" strokeWidth={1.75} strokeLinecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke="#1c1a17" strokeWidth={1.75} strokeLinecap="round"/></svg>; }
function XIcon() { return <svg viewBox="0 0 24 24" fill="none" width={22} height={22}><line x1="18" y1="6" x2="6" y2="18" stroke="#1c1a17" strokeWidth={1.75} strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="#1c1a17" strokeWidth={1.75} strokeLinecap="round"/></svg>; }
