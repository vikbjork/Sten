import { useEffect, useState } from "react";
import type { View } from "../App";
import { recordVisit } from "../utils/progress";

interface Props { onNavigate: (v: View) => void; }

interface Objection {
  id: string;
  q: string;
  answer: string;
  explanation: string;
  followUp: string;
  tip: string;
}

const OBJECTIONS: Objection[] = [
  {
    id: "expensive",
    q: "Det är för dyrt",
    answer: "Jag förstår att priset kan verka högt vid första anblicken. Men en bänkskiva av god kvalitet håller 20-30 år eller mer. Det är faktiskt en investering på under 100 kr per månad – och du använder den varje dag.",
    explanation: "Prisinvändningar beror ofta på att kunden inte sett värdet långsiktigt. Bryt ner priset i tid och jämför med alternativ.",
    followUp: "Vad är viktigast för dig – att hitta det lägsta priset, eller att hitta det bästa värdet för pengarna?",
    tip: "Jämför med alternativkostnader: en billig lösning som håller 10 år vs. en premium som håller 30 år. Räkna per år.",
  },
  {
    id: "stains",
    q: "Jag är rädd att stenen får fläckar",
    answer: "Det är en bra fråga! Svaret beror på vilket material du väljer. Kvarts och Dekton är icke-porösa – ingenting kan tränga in. Granit impregnereras 1-2 gånger om året och är då mycket tåligt. Marmor kräver mer omsorg.",
    explanation: "Kunderna tänker på natursten som 'svårt'. Hjälp dem skilja mellan material med olika egenskaper.",
    followUp: "Hur viktigt är det att ytan kräver minimal skötsel? Ska vi titta på alternativ som passar din livsstil?",
    tip: "Visa konkret: 'Om du väljer kvarts behöver du aldrig oroa dig för fläckar. Häll rött vin – torka av – klart.'",
  },
  {
    id: "best_material",
    q: "Vilket material är bäst?",
    answer: "Det finns inget enda bästa material – det beror på just din situation. För barnfamiljer med hög aktivitet rekommenderar jag kvarts eller Dekton. Vill du ha naturstens exklusivitet och kan sköta om den lite mer? Då är granit eller marmor fantastiska val.",
    explanation: "Frågan är ett säljläge – kunden ber om din expertis. Ställ en följdfråga och led dem till rätt val.",
    followUp: "Berätta lite om hur ni använder köket. Så kan jag ge dig en personlig rekommendation.",
    tip: "Ditt svar på 'vilket är bäst?' ska alltid vara en motfråga. Du visar expertis och samlar viktig info.",
  },
  {
    id: "granite_vs_quartz",
    q: "Vad är skillnaden mellan granit och kvarts?",
    answer: "Granit är 100% natursten – varje skiva är unik, värmetålig, reptålig och håller hela livet med lite impregnering. Kvarts är engineered – tillverkat av 93% kvarts och hartser. Det är icke-poröst, kräver noll underhåll men tål inte direkt värme.",
    explanation: "Denna fråga visar att kunden är intresserad och vill förstå. Det är ett tecken på att de är nära ett beslut.",
    followUp: "Lagar du mycket mat och ställer heta kastruller på bänken, eller handlar det mer om enkel matlagning?",
    tip: "Rita upp jämförelsen enkelt: Granit = naturens konstverk + värme OK + lite skötsel. Kvarts = fabrikens precision + inga fläckar + inga varma kastruller.",
  },
  {
    id: "delivery",
    q: "Hur lång leveranstid är det?",
    answer: "Det varierar beroende på materialval och hur komplex lösningen är. Vanligtvis är det 3-6 veckor från godkänd offert till installation. Vi börjar med en mätning, sedan produktion, sedan montering. När behöver du ha det klart?",
    explanation: "Frågan om leveranstid är ofta en test av säljarens kunskap och ett tecken på att kunden är seriös.",
    followUp: "Har du en specifik tidpunkt du siktar på? Är köket klart för mätning nu?",
    tip: "Sätt alltid en deadline i kontexten: 'Om vi startar processen denna vecka kan vi...' Det skapar urgency.",
  },
  {
    id: "heat",
    q: "Kan man ställa varma kastruller på stenen?",
    answer: "Det beror på materialet. Granit, kvartsit, Dekton och keramik tål värme utmärkt. Kvarts och komposit bör INTE utsättas för direktvärme – det kan orsaka missfärgning eller skada. Är det viktigt för dig att kunna ställa heta kastruller direkt?",
    explanation: "Kritisk fråga! Fel svar här kan leda till reklamation. Vara alltid tydlig och ärlig.",
    followUp: "Lagar du intensivt och vill ha frihet att ställa kastruller varsomhelst?",
    tip: "Om kunden är aktiv kock: styr dem mot Dekton, granit eller keramik. Säg det direkt och förklara varför – det bygger förtroende.",
  },
  {
    id: "edge_choice",
    q: "Vilken kantprofil ska jag välja?",
    answer: "Det beror på din stil och budget. Rak kant är det moderna standardvalet. Rundad kant är barnvänligare och klassisk. Fas ger ett modernare intryck. Och profilkant som ogee passar klassiska hem. Vad är din kökets stil?",
    explanation: "En bra fråga om kantprofiler visar engagemang. Hjälp kunden visualisera och koppla till deras befintliga stil.",
    followUp: "Har du bilder på köket? Och hur ser inredningen ut – modern, klassisk eller något mittemellan?",
    tip: "Ha alltid ett fysiskt prov av kantprofiler att visa. Kunden fattar beslut lättare när de kan röra vid det.",
  },
];

const UPSELL = [
  { title: "Tjockare skiva (30mm vs 20mm)", desc: "Ger tyngd, exklusivitet och en mer massiv känsla. Kan motivera ett premium-pris.", icon: "↑" },
  { title: "Waterfall-kant", desc: "Stenen löper ner längs sidan – ett arkitektoniskt statement. Hög WOW-faktor.", icon: "⟂" },
  { title: "Stänkskydd i samma material", desc: "Sammanhållen design från bänk till vägg. Ökar ordervärd markant.", icon: "◻" },
  { title: "Profilkant istället för rak", desc: "En liten uppgradering med stor visuell effekt. Enkel merförsäljning.", icon: "⌒" },
  { title: "Impregnering ingår vid leverans", desc: "Trygghet för kunden. Lägger till värde utan stor kostnad.", icon: "🛡" },
  { title: "Skärbräda i samma sten", desc: "Matchar exakt. Populärt tillägg som kunden ofta inte tänkt på.", icon: "✂" },
];

const MAINTENANCE = [
  { material: "Granit", tips: ["Impregnera 1–2 gånger per år", "Torka spill snabbt, speciellt sura vätskor", "Daglig rengöring med mild diskmedel och vatten", "Undvik aggressiva rengöringsmedel"] },
  { material: "Marmor", tips: ["Impregnera minst 2 gånger per år", "Torka upp syror (vin, citronsaft) omedelbart", "Använd pH-neutral rengöring", "Räkna med att patina utvecklas med åren – det är naturligt"] },
  { material: "Kvarts / Komposit", tips: ["Ingen impregnering behövs", "Daglig rengöring med mild diskmedel", "Undvik direkt värme – använd grytunderlägg", "Kan ge vita märken av kalkavlagringar – ta bort med vinäger + vatten"] },
  { material: "Dekton / Keramik", tips: ["Inget underhåll krävs", "Tål de flesta rengöringsmedel", "Tål extrem värme och kyla", "Undvik kraftiga slag mot kanterna"] },
];

export function SaljverktygView({ onNavigate }: Props) {
  const [tab, setTab] = useState(0);
  const [openObj, setOpenObj] = useState<string | null>(null);

  useEffect(() => { recordVisit("saljverktyg"); }, []);

  const TABS = ["Invändningshantering", "Merförsäljning", "Skötselguide"];

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => onNavigate("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>
        ← Tillbaka
      </button>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#1c1a17", marginBottom: 6 }}>Säljverktyg</h1>
        <p style={{ fontSize: 15, color: "#7a7670" }}>Praktiska verktyg för kundmötet – invändningar, merförsäljning och skötselinfo.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.05)", borderRadius: 12, padding: 4, marginBottom: 28 }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            flex: 1, padding: "10px 8px", borderRadius: 9, border: "none",
            background: tab === i ? "#fff" : "transparent",
            boxShadow: tab === i ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            cursor: "pointer", fontSize: 13, fontWeight: tab === i ? 600 : 400,
            color: tab === i ? "#1c1a17" : "#7a7670",
            transition: "all 0.15s",
          }}>{t}</button>
        ))}
      </div>

      {/* Tab: Invändningshantering */}
      {tab === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 13, color: "#9a9590", marginBottom: 4 }}>Klicka på en invändning för att se svarsguide.</p>
          {OBJECTIONS.map(obj => {
            const isOpen = openObj === obj.id;
            return (
              <div key={obj.id} style={{
                background: "#fff", borderRadius: 16,
                border: isOpen ? "1.5px solid rgba(0,194,167,0.3)" : "1px solid rgba(0,0,0,0.08)",
                overflow: "hidden", boxShadow: isOpen ? "0 4px 16px rgba(0,194,167,0.1)" : "0 1px 6px rgba(0,0,0,0.04)",
                transition: "all 0.2s",
              }}>
                <button
                  onClick={() => setOpenObj(isOpen ? null : obj.id)}
                  style={{
                    width: "100%", padding: "16px 20px",
                    display: "flex", alignItems: "center", gap: 12,
                    background: "none", border: "none", cursor: "pointer", textAlign: "left",
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: isOpen ? "rgba(0,194,167,0.12)" : "rgba(0,0,0,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16,
                  }}>
                    💬
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#1c1a17", flex: 1 }}>
                    "{obj.q}"
                  </span>
                  <span style={{ color: "#9a9590", fontSize: 18, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    ⌄
                  </span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", padding: "20px 20px 22px" }}>
                    {/* Answer */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#00c2a7", marginBottom: 8 }}>Förslag på svar</div>
                      <div style={{
                        background: "rgba(0,194,167,0.06)", border: "1px solid rgba(0,194,167,0.15)",
                        borderRadius: 12, padding: "14px 16px",
                      }}>
                        <p style={{ fontSize: 14, color: "#1c1a17", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>"{obj.answer}"</p>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9a9590", marginBottom: 6 }}>Varför det funkar</div>
                      <p style={{ fontSize: 13, color: "#5a5652", lineHeight: 1.6, margin: 0 }}>{obj.explanation}</p>
                    </div>

                    {/* Follow-up */}
                    <div style={{ marginBottom: 14, padding: "12px 14px", background: "rgba(59,130,246,0.06)", borderRadius: 10, border: "1px solid rgba(59,130,246,0.15)" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", marginBottom: 5 }}>Följdfråga att ställa:</div>
                      <p style={{ fontSize: 13, color: "#1e3a8a", lineHeight: 1.55, margin: 0, fontStyle: "italic" }}>"{obj.followUp}"</p>
                    </div>

                    {/* Tip */}
                    <div style={{ padding: "12px 14px", background: "rgba(245,158,11,0.06)", borderRadius: 10, border: "1px solid rgba(245,158,11,0.15)" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", marginBottom: 5 }}>💡 Säljstips</div>
                      <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.55, margin: 0 }}>{obj.tip}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Merförsäljning */}
      {tab === 1 && (
        <div>
          <p style={{ fontSize: 14, color: "#7a7670", marginBottom: 20, lineHeight: 1.6 }}>
            Dessa tillval ökar ordervärdet och förbättrar kundens upplevelse. Presentera dem naturligt som en del av rådgivningen.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {UPSELL.map(item => (
              <div key={item.title} style={{
                background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)",
                padding: "20px 20px", boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: "rgba(0,194,167,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, color: "#00c2a7",
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1c1a17", marginBottom: 4 }}>{item.title}</div>
                  <p style={{ fontSize: 13, color: "#7a7670", lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Skötselguide */}
      {tab === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontSize: 14, color: "#7a7670", marginBottom: 4 }}>
            Dela med dig av rätt skötselråd – det bygger förtroende och minskar reklamationer.
          </p>
          {MAINTENANCE.map(m => (
            <div key={m.material} style={{
              background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)",
              padding: "20px 22px", boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1c1a17", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                🪨 {m.material}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {m.tips.map((tip, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#00c2a7", flexShrink: 0, marginTop: 2 }}>›</span>
                    <span style={{ fontSize: 14, color: "#3a3836", lineHeight: 1.55 }}>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
