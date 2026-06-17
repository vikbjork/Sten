import "../styles/fonts.css";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { HomeView } from "./components/HomeView";
import { NyborjarvagView } from "./components/NyborjarvagView";
import { QuizView } from "./components/QuizView";
import { StoneTestView } from "./components/StoneTestView";
import { MaterialguideView } from "./components/MaterialguideView";
import { KantprofilerView } from "./components/KantprofilerView";
import { KundanalysView } from "./components/KundanalysView";
import { OffertstodView } from "./components/OffertstodView";
import { SaljtraningView } from "./components/SaljtraningView";
import { ProgressView } from "./components/ProgressView";

export type View =
  | "home"
  | "nyborjarvag"
  | "quiz"
  | "stonetest"
  | "materialskola"
  | "kantprofiler"
  | "kundanalys"
  | "offertstod"
  | "saljtraning"
  | "progress";

export default function App() {
  const [view, setView] = useState<View>("home");

  function navigate(v: View) {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f7f5f1",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Sidebar currentView={view} onNavigate={navigate} />

      <div
        className="sk-content"
        style={{ flex: 1, marginLeft: 210, minHeight: "100vh", overflowX: "hidden" }}
      >
        {view === "home"          && <HomeView          onNavigate={navigate} />}
        {view === "nyborjarvag"   && <NyborjarvagView   onNavigate={navigate} />}
        {view === "quiz"          && <QuizView          onNavigate={navigate} />}
        {view === "stonetest"     && <StoneTestView     onNavigate={navigate} />}
        {view === "materialskola" && <MaterialguideView onNavigate={navigate} />}
        {view === "kantprofiler"  && <KantprofilerView  onNavigate={navigate} />}
        {view === "kundanalys"    && <KundanalysView    onNavigate={navigate} />}
        {view === "offertstod"    && <OffertstodView    onNavigate={navigate} />}
        {view === "saljtraning"   && <SaljtraningView   onNavigate={navigate} />}
        {view === "progress"      && <ProgressView      onNavigate={navigate} />}
      </div>

      <style>{`
        body { margin: 0; padding: 0; }
        * { box-sizing: border-box; }
        button { font-family: 'Inter', sans-serif; }
        select { font-family: 'Inter', sans-serif; }
        p, h1, h2, h3, h4 { margin: 0; }
        @media (max-width: 880px) {
          .sk-content { margin-left: 0 !important; padding-top: 58px !important; }
        }
      `}</style>
    </div>
  );
}
