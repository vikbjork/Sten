import { useEffect, useState } from "react";
import type { View } from "../App";
import { recordVisit } from "../utils/progress";

interface Props { onNavigate: (v: View) => void; }

// ── Sales conversation flow ─────────────────────────────────────────

interface SalesStep {
  num: number;
  title: string;
  goal: string;
  whatToSay: string;
  whyItMatters: string;
  examplePhrase: string;
  commonMistake: string;
}

const SALES_STEPS: SalesStep[] = [
  {
    num: 1,
    title: "Hälsa och förstå projektet",
    goal: "Skapa en välkomnande atmosfär och förstå projektets sammanhang.",
    whatToSay: "Börja med ett varmt välkomnande och öppna frågor om projektet. Undvik att hoppa direkt till produkter.",
    whyItMatters: "Kunden vill känna sig välkommen och hörd. De första minuterna sätter tonen för hela mötet. En bra start skapar förtroende.",
    examplePhrase: "\"Hej och välkommen! Berätta lite om ert projekt – vad är det ni planerar att göra? Är det ett nytt kök eller en renovering?\"",
    commonMistake: "Att direkt visa material och priser utan att förstå kundens projekt och behov. Det gör kunden förvirrad och inte engagerad.",
  },
  {
    num: 2,
    title: "Ställ behovsfrågor",
    goal: "Förstå kundens behov, livsstil och preferenser innan du rekommenderar något.",
    whatToSay: "Ställ öppna frågor om stil, budget, underhåll, barn, matlagning och tidplan. Lyssna aktivt och anteckna.",
    whyItMatters: "80% av dåliga materialval beror på att säljaren inte förstod kundens faktiska situation. Du kan inte rekommendera rätt om du inte vet vad kunden faktiskt behöver.",
    examplePhrase: "\"Hur viktigt är det att bänkskivan kräver minimalt underhåll? Lagar ni mycket mat och ställer ofta varma kastruller på bänken?\"",
    commonMistake: "Att anta vad kunden vill ha utan att fråga. Varje kund är unik – en barnfamilj har helt andra behov än ett pensionärspar.",
  },
  {
    num: 3,
    title: "Förklara materialalternativ",
    goal: "Presentera 2-3 relevanta alternativ baserat på kundens svar – inte alla material på en gång.",
    whatToSay: "Koppla varje alternativ till kundens specifika behov. Använd enkla jämförelser. Visa prover.",
    whyItMatters: "Kunden blir överväldigad av för många alternativ. Att begränsa till 2-3 relevanta val hjälper kunden att fokusera och fatta beslut.",
    examplePhrase: "\"Baserat på vad ni berättat – med barn i hemmet och önskan om minimalt underhåll – skulle jag titta på kvarts och keramik. Låt mig visa er skillnaden...\"",
    commonMistake: "Att presentera alla sju material utan att filtrera. Det skapar förvirring och förlänger beslutsprocessen onödigt.",
  },
  {
    num: 4,
    title: "Rekommendera lösning",
    goal: "Ge en tydlig, personlig rekommendation med motivering.",
    whatToSay: "Ge din expertrekommendation med trygghet. Koppla rekommendationen till kundens specifika situation.",
    whyItMatters: "Kunden söker en expert som guidar dem, inte bara information. En trygg rekommendation förkortar beslutsprocessen och bygger förtroende.",
    examplePhrase: "\"Min rekommendation är kvarts – det är underhållsfritt, tåler barnfamiljer perfekt och finns i exakt den stil ni visade mig. Det är det klokaste valet för er situation.\"",
    commonMistake: "Att vara för vag: 'Det beror på...' eller 'Båda är bra...' Kunden vill ha din åsikt. Var specifik och säker i din rekommendation.",
  },
  {
    num: 5,
    title: "Gå igenom pris och offert",
    goal: "Presentera priset som en investering i rätt sammanhang.",
    whatToSay: "Rama in priset med värde och livslängd. Bryt ner priset per år eller månad. Förklara vad som ingår.",
    whyItMatters: "Rätt framing av priset minskar prismotstånd dramatiskt. En bänkskiva som håller 30 år kostar faktiskt väldigt lite per dag.",
    examplePhrase: "\"Investerin i en bänkskiva av det här materialet håller 25-30 år. Det är faktiskt under 150 kr per månad – för en yta du använder varje dag.\"",
    commonMistake: "Att presentera priset som det första eller enda. Priset ska komma efter att kunden förstår värdet och vill ha lösningen.",
  },
  {
    num: 6,
    title: "Hantera invändningar",
    goal: "Lyssna, bekräfta och svara på kundens tveksamheter med fakta och empati.",
    whatToSay: "Lyssna fullt ut. Bekräfta frågan. Svara med fakta + en följdfråga. Använd aldrig 'men' direkt efter kunden pratat.",
    whyItMatters: "Invändningar är köpsignaler, inte stopp. En välhanterad invändning stärker förtroendet och driver affären framåt.",
    examplePhrase: "\"Det är en jättebra fråga! Många undrar just det. [Förklaring.] Vad är viktigast för er – att lösa det problemet eller finns det något annat som oroar er?\"",
    commonMistake: "Att bli defensiv, avfärda invändningen eller ge upp för tidigt. Lyssna alltid fullt ut och bekräfta innan du svarar.",
  },
  {
    num: 7,
    title: "Sammanfatta nästa steg",
    goal: "Stäng aldrig ett möte utan ett konkret, överenskommet nästa steg.",
    whatToSay: "Sammanfatta vad ni kommit överens om. Föreslå ett specifikt nästa steg. Ge ett konkret datum.",
    whyItMatters: "'Jag ska tänka på det' utan ett nästa steg är nästan alltid en förlorad affär. Ett konkret nästa steg håller affären vid liv.",
    examplePhrase: "\"Ska vi boka in en tid för mätning nu, eller vill ni ha offerten skickad till er email så kan vi stämma av nästa vecka? Vad passar er bäst?\"",
    commonMistake: "Att avsluta mötet med 'Hör av er när ni bestämt er.' Det är passivt och lämnar initiativet hos kunden. Ta initiativet och föreslå alltid nästa steg.",
  },
];

// ── Objection handling ──────────────────────────────────────────────

interface Objection {
  id: string;
  q: string;
  category: string;
  answer: string;
  explanation: string;
  followUp: string;
  tip: string;
  recommendedMaterial?: string;
}

const OBJECTIONS: Objection[] = [
  {
    id: "price",
    q: "Det är för dyrt",
    category: "Pris",
    answer: "Jag förstår att priset kan verka högt vid första anblicken. Men en bänkskiva av god kvalitet håller 20-30 år eller mer. Det är faktiskt under 150 kr per månad – för en yta du använder varje dag i köket.",
    explanation: "Prismotstånd beror nästan alltid på att kunden inte ser värdet långsiktigt. Bryt ner priset per år eller månad och jämför med alternativ som behöver bytas ut.",
    followUp: "Vad är viktigast för er – att hitta det lägsta priset, eller det bästa värdet för pengarna på lång sikt?",
    tip: "Jämför med alternativkostnader: ett billigare laminat som håller 8 år vs. kvarts som håller 30 år. Räkna per år – natursten vinner ofta.",
  },
  {
    id: "stains",
    q: "Jag är rädd för fläckar",
    category: "Material",
    answer: "Det är en bra fråga! Svaret beror helt på vilket material vi väljer. Kvarts och Dekton är icke-porösa – absolut ingenting kan tränga in. Granit impregnereras 1-2 gånger per år och är sedan mycket tåligt mot fläckar.",
    explanation: "Kunden tänker generellt på 'sten' som känsligt. Hjälp dem att förstå att olika material har fundamentalt olika egenskaper.",
    followUp: "Hur viktigt är det att ytan kräver noll skötsel? Ska vi titta på alternativ som gör fläckor omöjliga?",
    tip: "Demonstrera konkret: 'Om ni väljer kvarts kan ni hälla rött vin på bänken, torka av – klart. Ingen fläcka. Vill ni se?'",
    recommendedMaterial: "Kvarts, Dekton, Keramik",
  },
  {
    id: "scratches",
    q: "Kan stenen repas?",
    category: "Material",
    answer: "Det beror på materialet. Granit, kvartsit och keramik är extremt reptåliga – det är svårt att repa dem med vanliga köksredskap. Kvarts är också reptåligt. Marmor är mjukare och mer känsligt för repor och bör hanteras varsamt.",
    explanation: "Reptålighet är en viktig fråga för aktiva kök. Koppla svaret direkt till materialrekommendation.",
    followUp: "Är det viktigt för er att kunna skära direkt på bänkskivan, eller använder ni skärbräda?",
    tip: "Om kunden är orolig för repor: styr mot granit, kvartsit, keramik eller Dekton. Undvik marmor om det är ett aktivt kök.",
    recommendedMaterial: "Granit, Kvartsit, Keramik, Dekton",
  },
  {
    id: "heat",
    q: "Tål den värme?",
    category: "Material",
    answer: "Det varierar väldigt mellan material – och det är en kritisk skillnad att förstå. Granit, kvartsit, Dekton och keramik tål direkt kontakt med varma kastruller. Kvarts och komposit ska INTE utsättas för direktvärme – det kan orsaka permanent skada.",
    explanation: "Värmetålighet är en av de viktigaste frågorna för att rekommendera rätt material. Fel svar här kan leda till reklamation.",
    followUp: "Lagar ni intensivt och vill ha friheten att ställa kastruller varsomhelst? Det är avgörande för materialvalet.",
    tip: "Om kunden ställer heta kastruller: kvarts är INTE rätt. Var tydlig och ärlig – det bygger förtroende och förhindrar reklamation.",
    recommendedMaterial: "Granit, Kvartsit, Dekton, Keramik",
  },
  {
    id: "best",
    q: "Vilket material är bäst?",
    category: "Rådgivning",
    answer: "Det finns inget enda bästa material – det beror helt på din situation och livsstil. Det är min uppgift att hjälpa dig hitta rätt. Berätta lite mer om hur ni använder köket och vad som är viktigast för er, så kan jag ge en personlig rekommendation.",
    explanation: "Den här frågan är ett säljläge – kunden ber om din expertis. Svara med en följdfråga och led dem mot rätt val.",
    followUp: "Hur använder ni köket? Lagar ni mycket mat, finns barn i hemmet, och vad är viktigast – utseende, hållbarhet eller pris?",
    tip: "Ditt svar på 'vilket är bäst?' ska alltid vara en motfråga. Du visar expertis och samlar kritisk information för rätt rekommendation.",
  },
  {
    id: "vs_laminate",
    q: "Varför ska jag välja sten istället för laminat?",
    category: "Jämförelse",
    answer: "Laminat är billigare i inköp men håller 8-12 år. Sten håller 30+ år, ökar bostadens värde och ger en känsla och kvalitet som laminat inte kan matcha. Räknat per år är skillnaden ofta liten, men upplevelsen är enorm.",
    explanation: "Prisjämförelsen med laminat är vanlig. Visa värdet per år och de kvalitativa skillnaderna – tålighet, känsla, värdeökning.",
    followUp: "Om ni ska bo kvar i huset länge, vad spelar mer roll – lägsta startpriset eller bäst investering på lång sikt?",
    tip: "Lyft bostadens värdehöjning – sten är en investering, laminat är en kostnad. Många kunder har inte tänkt på det perspektivet.",
  },
  {
    id: "delivery",
    q: "Hur lång är leveranstiden?",
    category: "Process",
    answer: "Vanligtvis 3-6 veckor från godkänd offert till installation. Vi börjar med mätning (när köket är monterat), sedan produktion, sedan montering. Har du en specifik tidpunkt du siktar mot?",
    explanation: "Leveransfrågan är ett tecken på att kunden är seriös och nära beslut. Ge ett konkret svar och ta med ett nästa steg.",
    followUp: "Har du en deadline? Om vi startar processen den här veckan kan vi sätta ett datum – när är köket redo för mätning?",
    tip: "Sätt alltid en deadline i kontexten: 'Om vi startar nu kan vi...' Det skapar urgency och hjälper kunden att fatta beslut.",
  },
  {
    id: "edge",
    q: "Vilken kantprofil ska jag välja?",
    category: "Produkt",
    answer: "Det beror på din stil och budget. Rak kant är det moderna standardvalet. Rundad kant är barnvänligare och klassisk. Fas ger ett lite modernare och industriellt intryck. Profilkant som ogee passar klassiska och traditionella hem. Vad är din kökets stil?",
    explanation: "Kantprofilfrågan visar engagemang och att kunden är på väg mot beslut. Koppla rekommendationen till deras stil och kök.",
    followUp: "Kan du visa mig bilder på köket eller berätta om den övriga inredningsstilen? Det hjälper mig rekommendera rätt profil.",
    tip: "Visa alltid fysiska prover av kantprofiler om möjligt – kunden fattar beslut mycket lättare när de kan se och röra vid materialet.",
  },
  {
    id: "diff_materials",
    q: "Vad är skillnaden mellan materialen?",
    category: "Rådgivning",
    answer: "Bra fråga! Enkelt förklarat: Natursten (granit, marmor, kvartsit) = unik, naturlig, kräver lite skötsel. Kvarts/Komposit = engineered, praktisk, noll underhåll men tål inte direktvärme. Keramik/Dekton = teknisk superprestation, tål allt men premium-pris.",
    explanation: "Den här frågan är perfekt för att visa din expertis. Ge en enkel, tydlig jämförelse utan att prata om alla sju material på en gång.",
    followUp: "Vad är viktigast för er – naturstens unikhet, praktisk lättskötsel, eller teknisk maxprestanda?",
    tip: "Använd treenigheten: Natursten vs. Komposit vs. Ultra-kompakt. Det ger kunden en mental karta att navigera med.",
  },
];

// ── Upsell ideas ────────────────────────────────────────────────────

const UPSELL = [
  { title: "Tjockare skiva (30mm vs 20mm)", desc: "Ger tyngd, exklusivitet och en mer massiv känsla. Synlig kvalitetskänsla som kunden uppskattar.", icon: "↑", value: "++" },
  { title: "Waterfall-kant", desc: "Stenen löper ner längs sidan – ett arkitektoniskt statement med hög WOW-faktor.", icon: "⟂", value: "+++" },
  { title: "Stänkskydd i samma material", desc: "Sammanhållen design från bänk till vägg. Ökar ordervärdet markant och ser fantastiskt ut.", icon: "◻", value: "++" },
  { title: "Profilkant istället för rak", desc: "Liten uppgradering med stor visuell effekt. Enkel merförsäljning med lågt pris-motstånd.", icon: "⌒", value: "+" },
  { title: "Impregnering vid leverans", desc: "Trygghet för kunden – inget eget arbete. Lägger till värde utan stor kostnad.", icon: "🛡", value: "+" },
  { title: "Skärbräda i samma sten", desc: "Matchar exakt och är ett populärt tillval som kunden sällan tänkt på själv.", icon: "✂", value: "+" },
  { title: "Uppgradera material", desc: "Föreslå kvartsit istället för granit, eller Dekton istället för keramik. Ofta accepterat när du förklarar fördelarna.", icon: "⬆", value: "++" },
];

// ── Component ───────────────────────────────────────────────────────

export function SaljtraningView({ onNavigate }: Props) {
  const [tab, setTab] = useState(0);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [openObj, setOpenObj] = useState<string | null>(null);
  const [objFilter, setObjFilter] = useState("Alla");

  useEffect(() => { recordVisit("saljtraning"); }, []);

  const TABS = ["Säljsamtal", "Invändningar", "Merförsäljning"];
  const objCategories = ["Alla", ...Array.from(new Set(OBJECTIONS.map(o => o.category)))];
  const filteredObjs = objFilter === "Alla" ? OBJECTIONS : OBJECTIONS.filter(o => o.category === objFilter);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 28px 80px", fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => onNavigate("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#7a7670", marginBottom: 28 }}>
        ← Tillbaka
      </button>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#1c1a17", marginBottom: 6 }}>Säljträning</h1>
        <p style={{ fontSize: 15, color: "#7a7670" }}>Lär dig säljsamtalet steg för steg, hantera invändningar och maxa ordervärdet.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.05)", borderRadius: 12, padding: 4, marginBottom: 32, width: "fit-content" }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            padding: "10px 20px", borderRadius: 9, border: "none",
            background: tab === i ? "#fff" : "transparent",
            boxShadow: tab === i ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            cursor: "pointer", fontSize: 13, fontWeight: tab === i ? 600 : 400,
            color: tab === i ? "#1c1a17" : "#7a7670", transition: "all 0.15s",
          }}>{t}</button>
        ))}
      </div>

      {/* ── Tab 0: Säljsamtal ── */}
      {tab === 0 && (
        <div>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "20px 22px", marginBottom: 24, boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1a17", marginBottom: 6 }}>7 steg till ett perfekt kundmöte</div>
            <p style={{ fontSize: 13, color: "#7a7670", lineHeight: 1.6, margin: 0 }}>
              Följ dessa sju steg i varje kundmöte. De är ordnade logiskt – hoppa aldrig över steg 1 och 2.
              Klicka på ett steg för att se detaljer, exempel och vanliga misstag.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SALES_STEPS.map(step => {
              const isOpen = openStep === step.num;
              return (
                <div key={step.num} style={{
                  background: "#fff", borderRadius: 16,
                  border: isOpen ? "1.5px solid rgba(0,194,167,0.3)" : "1px solid rgba(0,0,0,0.08)",
                  overflow: "hidden", boxShadow: isOpen ? "0 4px 16px rgba(0,194,167,0.08)" : "0 1px 6px rgba(0,0,0,0.04)",
                  transition: "all 0.2s",
                }}>
                  <button
                    onClick={() => setOpenStep(isOpen ? null : step.num)}
                    style={{ width: "100%", padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: isOpen ? "#00c2a7" : "rgba(0,0,0,0.06)",
                      color: isOpen ? "#fff" : "#5a5652",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 15, fontWeight: 800,
                    }}>
                      {step.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#1c1a17" }}>{step.title}</div>
                      <div style={{ fontSize: 12, color: "#9a9590", marginTop: 2 }}>{step.goal}</div>
                    </div>
                    <span style={{ color: "#9a9590", fontSize: 18, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>⌄</span>
                  </button>

                  {isOpen && (
                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "20px 22px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                        <InfoBox title="Vad du ska göra" content={step.whatToSay} />
                        <InfoBox title="Varför det är viktigt" content={step.whyItMatters} accent />
                      </div>
                      <div style={{ marginBottom: 12, background: "rgba(0,0,0,0.03)", borderRadius: 12, padding: "14px 16px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#5a5652", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Exempelfras:</div>
                        <p style={{ fontSize: 14, color: "#1c1a17", fontStyle: "italic", lineHeight: 1.65, margin: 0 }}>{step.examplePhrase}</p>
                      </div>
                      <div style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: "12px 16px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#b45309", marginBottom: 4 }}>⚠ Vanligt misstag:</div>
                        <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.55, margin: 0 }}>{step.commonMistake}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Tab 1: Invändningar ── */}
      {tab === 1 && (
        <div>
          <div style={{ background: "rgba(0,194,167,0.06)", borderRadius: 14, border: "1px solid rgba(0,194,167,0.18)", padding: "16px 18px", marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: "#007a68", lineHeight: 1.6, margin: 0 }}>
              <strong>Kom ihåg:</strong> Invändningar är köpsignaler, inte stopp. Kunden ifrågasätter för att de är intresserade – inte för att de vill säga nej. Lyssna alltid fullt ut, bekräfta frågan, svara sedan.
            </p>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {objCategories.map(cat => (
              <button key={cat} onClick={() => setObjFilter(cat)} style={{
                padding: "6px 14px", borderRadius: 99,
                border: objFilter === cat ? "1.5px solid #00c2a7" : "1.5px solid rgba(0,0,0,0.12)",
                background: objFilter === cat ? "rgba(0,194,167,0.1)" : "#fff",
                color: objFilter === cat ? "#00c2a7" : "#5a5652",
                cursor: "pointer", fontSize: 12, fontWeight: objFilter === cat ? 600 : 400,
              }}>{cat}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredObjs.map(obj => {
              const isOpen = openObj === obj.id;
              return (
                <div key={obj.id} style={{
                  background: "#fff", borderRadius: 16,
                  border: isOpen ? "1.5px solid rgba(0,194,167,0.3)" : "1px solid rgba(0,0,0,0.08)",
                  overflow: "hidden", boxShadow: isOpen ? "0 4px 16px rgba(0,194,167,0.08)" : "0 1px 6px rgba(0,0,0,0.04)",
                  transition: "all 0.2s",
                }}>
                  <button onClick={() => setOpenObj(isOpen ? null : obj.id)}
                    style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: isOpen ? "rgba(0,194,167,0.12)" : "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>
                      💬
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#1c1a17" }}>"{obj.q}"</div>
                      <span style={{ fontSize: 10, fontWeight: 600, color: "#9a9590", background: "rgba(0,0,0,0.06)", padding: "2px 6px", borderRadius: 4 }}>{obj.category}</span>
                    </div>
                    <span style={{ color: "#9a9590", fontSize: 18, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>⌄</span>
                  </button>

                  {isOpen && (
                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "18px 20px" }}>
                      <div style={{ background: "rgba(0,194,167,0.06)", border: "1px solid rgba(0,194,167,0.15)", borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#00c2a7", marginBottom: 6 }}>Förslag på svar:</div>
                        <p style={{ fontSize: 14, color: "#1c1a17", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>"{obj.answer}"</p>
                      </div>

                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#9a9590", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Varför det funkar:</div>
                        <p style={{ fontSize: 13, color: "#5a5652", lineHeight: 1.6, margin: 0 }}>{obj.explanation}</p>
                      </div>

                      <div style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", marginBottom: 4 }}>Följdfråga att ställa:</div>
                        <p style={{ fontSize: 13, color: "#1e3a8a", fontStyle: "italic", lineHeight: 1.55, margin: 0 }}>"{obj.followUp}"</p>
                      </div>

                      <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 10, padding: "12px 14px", marginBottom: obj.recommendedMaterial ? 10 : 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", marginBottom: 4 }}>💡 Säljstips:</div>
                        <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.55, margin: 0 }}>{obj.tip}</p>
                      </div>

                      {obj.recommendedMaterial && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, color: "#9a9590" }}>Rekommendera:</span>
                          {obj.recommendedMaterial.split(", ").map(m => (
                            <span key={m} style={{ fontSize: 12, fontWeight: 600, color: "#00c2a7", background: "rgba(0,194,167,0.1)", padding: "3px 9px", borderRadius: 6 }}>{m}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Tab 2: Merförsäljning ── */}
      {tab === 2 && (
        <div>
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid rgba(0,0,0,0.07)", padding: "18px 20px", marginBottom: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1a17", marginBottom: 6 }}>Naturlig merförsäljning</div>
            <p style={{ fontSize: 13, color: "#7a7670", lineHeight: 1.6, margin: 0 }}>
              Merförsäljning ska aldrig kännas påtvingat. Presentera tillval som en del av rådgivningen – som hjälp till kunden att hitta bästa lösningen. Bästa tillfället: direkt efter att kunden valt material.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {UPSELL.map(item => (
              <div key={item.title} style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", padding: "20px 20px", boxShadow: "0 1px 8px rgba(0,0,0,0.04)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, background: "rgba(0,194,167,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#00c2a7" }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1c1a17" }}>{item.title}</div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", background: "rgba(245,158,11,0.1)", padding: "2px 7px", borderRadius: 5, flexShrink: 0, marginLeft: 8 }}>
                      Värde {item.value}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "#7a7670", lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBox({ title, content, accent }: { title: string; content: string; accent?: boolean }) {
  return (
    <div style={{
      background: accent ? "rgba(0,194,167,0.06)" : "rgba(0,0,0,0.03)",
      border: accent ? "1px solid rgba(0,194,167,0.15)" : "1px solid rgba(0,0,0,0.06)",
      borderRadius: 12, padding: "14px 14px",
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: accent ? "#00c2a7" : "#9a9590", marginBottom: 6 }}>{title}</div>
      <p style={{ fontSize: 13, color: accent ? "#007a68" : "#3a3836", lineHeight: 1.6, margin: 0 }}>{content}</p>
    </div>
  );
}
