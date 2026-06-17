export interface EdgeProfile {
  id: string;
  name: string;
  description: string;
  bestUseCase: string;
  styleImpression: string;
  priceImpact: "Standard" | "+" | "++" | "+++";
  difficulty: "Enkel" | "Avancerad";
  recommendedCustomer: string;
  salesTip: string;
  tags: string[];
  svgPath: string;
  svgViewBox: string;
}

export interface ToolSection {
  id: string;
  title: string;
  subtitle: string;
  items: EdgeProfile[];
}

export const edgeProfiles: EdgeProfile[] = [
  {
    id: "rak",
    name: "Rak kant",
    description: "Klassisk, ren linje med skarp 90°-vinkel. Tidlös och passar alla miljöer.",
    bestUseCase: "Moderna, minimalistiska kök och badrum. Standardval för de flesta projekt.",
    styleImpression: "Ren, minimalistisk, tidlös",
    priceImpact: "Standard",
    difficulty: "Enkel",
    recommendedCustomer: "Kunder som vill ha ett rent och enkelt uttryck utan överkant.",
    salesTip: "Presentera alltid rak kant som grundvalet och lyft sedan upp alternativ med mer karaktär.",
    tags: ["Vanligast", "Modern", "Budgetvänlig"],
    svgViewBox: "0 0 120 80",
    svgPath: `<rect x="15" y="15" width="75" height="50" rx="1" fill="#e8e4dd" stroke="#c8c4bc" stroke-width="1.5"/>
      <line x1="90" y1="15" x2="90" y2="65" stroke="#00c2a7" stroke-width="3" stroke-linecap="round"/>`,
  },
  {
    id: "fas",
    name: "Fas",
    description: "En 45°-fasen längs överkanten. Ger distinkt, modern känsla och minskar risken för skadade hörn.",
    bestUseCase: "Moderna och industriella kök. Passar stenens naturliga look.",
    styleImpression: "Modern, distinkt, maskulin",
    priceImpact: "+",
    difficulty: "Enkel",
    recommendedCustomer: "Kunder som vill ha lite mer karaktär utan att vara för dekorativa.",
    salesTip: "Lyft fram att fasad kant minskar risken för chipning i kanten – bra för aktiva kök.",
    tags: ["Modern", "Vanligast", "Barnvänlig"],
    svgViewBox: "0 0 120 80",
    svgPath: `<path d="M 15 15 L 75 15 L 90 30 L 90 65 L 15 65 Z" fill="#e8e4dd" stroke="#c8c4bc" stroke-width="1.5"/>
      <path d="M 75 15 L 90 30" stroke="#00c2a7" stroke-width="3" stroke-linecap="round"/>
      <line x1="90" y1="30" x2="90" y2="65" stroke="#00c2a7" stroke-width="3" stroke-linecap="round"/>`,
  },
  {
    id: "halvfas",
    name: "Halvfas",
    description: "Diskret liten fas på överkanten. Subtil detalj som mjukar upp utan att ta plats.",
    bestUseCase: "Moderna minimalistiska kök som vill ha ett litet lyft utan dramatik.",
    styleImpression: "Subtil, modern, raffinerad",
    priceImpact: "+",
    difficulty: "Enkel",
    recommendedCustomer: "Kunder som vill ha rak kant men med ett litet extra touch.",
    salesTip: "Bra kompromiss för kunder som är osäkra – mer än standard men inte överdrivet.",
    tags: ["Modern", "Vanligast"],
    svgViewBox: "0 0 120 80",
    svgPath: `<path d="M 15 15 L 82 15 L 90 23 L 90 65 L 15 65 Z" fill="#e8e4dd" stroke="#c8c4bc" stroke-width="1.5"/>
      <path d="M 82 15 L 90 23" stroke="#00c2a7" stroke-width="3" stroke-linecap="round"/>
      <line x1="90" y1="23" x2="90" y2="65" stroke="#00c2a7" stroke-width="3" stroke-linecap="round"/>`,
  },
  {
    id: "rundad",
    name: "Rundad kant",
    description: "Mjuk kvartscirkel längs hela överkanten. Säker, behaglig och elegant.",
    bestUseCase: "Familjer med barn, klassiska kök, badrum.",
    styleImpression: "Mjuk, klassisk, familjevänlig",
    priceImpact: "+",
    difficulty: "Enkel",
    recommendedCustomer: "Barnfamiljer och kunder som vill ha ett mjukare och varmare uttryck.",
    salesTip: "Perfekt säljargument: 'Säkert för barn och behagligt att luta sig mot'. Alltid ett bra alternativ.",
    tags: ["Barnvänlig", "Klassisk", "Vanligast"],
    svgViewBox: "0 0 120 80",
    svgPath: `<path d="M 15 15 L 72 15 Q 90 15 90 33 L 90 65 L 15 65 Z" fill="#e8e4dd" stroke="#c8c4bc" stroke-width="1.5"/>
      <path d="M 72 15 Q 90 15 90 33" stroke="#00c2a7" stroke-width="3" stroke-linecap="round" fill="none"/>
      <line x1="90" y1="33" x2="90" y2="65" stroke="#00c2a7" stroke-width="3" stroke-linecap="round"/>`,
  },
  {
    id: "halvrundad",
    name: "Halvrundad",
    description: "Halvmåneform – konvex profil som ger ett mjukt, elegant uttryck med tydlig volym.",
    bestUseCase: "Klassiska kök, ölandet, badrumsskivor.",
    styleImpression: "Voluminös, klassisk, varm",
    priceImpact: "++",
    difficulty: "Avancerad",
    recommendedCustomer: "Kunder som vill ha ett rundare, mer traditionellt och omsorgsfullt uttryck.",
    salesTip: "Populär på öar och köksholmar – lyft fram det visuella djupet profilen ger.",
    tags: ["Klassisk", "Premium"],
    svgViewBox: "0 0 120 80",
    svgPath: `<path d="M 15 15 L 65 15 Q 90 15 90 40 Q 90 65 65 65 L 15 65 Z" fill="#e8e4dd" stroke="#c8c4bc" stroke-width="1.5"/>
      <path d="M 65 15 Q 90 15 90 40 Q 90 65 65 65" stroke="#00c2a7" stroke-width="3" stroke-linecap="round" fill="none"/>`,
  },
  {
    id: "vattenas",
    name: "Vattenas (Pencil)",
    description: "Liten avrundad överkant med lätt överhäng nedtill. Sofistikerat och lätt intryck.",
    bestUseCase: "Exklusiva kök, badrum och lyxiga miljöer.",
    styleImpression: "Sofistikerad, exklusiv, lätt",
    priceImpact: "++",
    difficulty: "Avancerad",
    recommendedCustomer: "Kunder med stilmedvetenhet som vill ha en diskret men distinkt detalj.",
    salesTip: "Bra för premium-segmentet. Vattenas skapar visuell lätthet – stenen verkar nästan sväva.",
    tags: ["Premium", "Modern", "Mer exklusiv"],
    svgViewBox: "0 0 120 80",
    svgPath: `<path d="M 15 15 L 80 15 Q 92 15 92 22 L 92 58 Q 92 65 80 65 L 15 65 Z" fill="#e8e4dd" stroke="#c8c4bc" stroke-width="1.5"/>
      <path d="M 80 15 Q 92 15 92 22" stroke="#00c2a7" stroke-width="3" stroke-linecap="round" fill="none"/>
      <line x1="92" y1="22" x2="92" y2="58" stroke="#00c2a7" stroke-width="3" stroke-linecap="round"/>
      <path d="M 92 58 Q 92 65 80 65" stroke="#00c2a7" stroke-width="3" stroke-linecap="round" fill="none"/>`,
  },
  {
    id: "ogee",
    name: "Profilkant (Ogee)",
    description: "Klassisk S-formad profil med konkav och konvex kurva. Traditionellt och dekorativt.",
    bestUseCase: "Klassiska och traditionella kök, landsbygdskök, ornamentala miljöer.",
    styleImpression: "Traditionell, dekorativ, karaktärsfull",
    priceImpact: "+++",
    difficulty: "Avancerad",
    recommendedCustomer: "Kunder som renoverar klassiska hem eller vill ha en tydlig traditionell stil.",
    salesTip: "Sälj in hantverkskänslan – detta är en profil som kräver skicklighet och ger ett resultat som imponerar.",
    tags: ["Klassisk", "Mer exklusiv"],
    svgViewBox: "0 0 120 80",
    svgPath: `<path d="M 15 15 L 65 15 C 90 15 75 32 75 40 C 75 48 90 55 90 65 L 15 65 Z" fill="#e8e4dd" stroke="#c8c4bc" stroke-width="1.5"/>
      <path d="M 65 15 C 90 15 75 32 75 40 C 75 48 90 55 90 65" stroke="#00c2a7" stroke-width="3" stroke-linecap="round" fill="none"/>`,
  },
  {
    id: "dubbelfas",
    name: "Dubbelfas",
    description: "Fas längs både övre och undre kant. Geometrisk och modern – lyfter fram stenens tjocklek.",
    bestUseCase: "Moderna industrikök, öar och köksholmar med synliga kanter.",
    styleImpression: "Geometrisk, modern, industriell",
    priceImpact: "++",
    difficulty: "Avancerad",
    recommendedCustomer: "Kunder som vill visa upp stenens tjocklek och lyfta fram materialets karaktär.",
    salesTip: "Bra val för kunder med tjock sten (30mm+) – dubbelfas betonar stenens massa och kvalitet.",
    tags: ["Modern", "Premium"],
    svgViewBox: "0 0 120 80",
    svgPath: `<path d="M 15 15 L 75 15 L 90 28 L 90 52 L 75 65 L 15 65 Z" fill="#e8e4dd" stroke="#c8c4bc" stroke-width="1.5"/>
      <path d="M 75 15 L 90 28" stroke="#00c2a7" stroke-width="3" stroke-linecap="round" fill="none"/>
      <line x1="90" y1="28" x2="90" y2="52" stroke="#00c2a7" stroke-width="3" stroke-linecap="round"/>
      <path d="M 90 52 L 75 65" stroke="#00c2a7" stroke-width="3" stroke-linecap="round" fill="none"/>`,
  },
  {
    id: "fullbullnose",
    name: "Full Bullnose",
    description: "Komplett rundad kant, halvcirkel-profil runt hela kanten. Mjuk, taktil och lyxig.",
    bestUseCase: "Öar, barkanter, badrum. Passar tjocka skivor 30-40mm.",
    styleImpression: "Lyxig, mjuk, skulptural",
    priceImpact: "+++",
    difficulty: "Avancerad",
    recommendedCustomer: "Kunder som vill ha en tydlig luxuöst uttryck och en behaglig barkant att sitta vid.",
    salesTip: "Full bullnose är en statementprofil. Lyft fram att det känns lika bra som det ser ut.",
    tags: ["Premium", "Mer exklusiv", "Klassisk"],
    svgViewBox: "0 0 120 80",
    svgPath: `<path d="M 15 15 L 60 15 Q 90 15 90 40 Q 90 65 60 65 L 15 65 Z" fill="#e8e4dd" stroke="#c8c4bc" stroke-width="1.5"/>
      <path d="M 60 15 Q 90 15 90 40 Q 90 65 60 65" stroke="#00c2a7" stroke-width="3" stroke-linecap="round" fill="none"/>`,
  },
  {
    id: "waterfall",
    name: "Waterfall",
    description: "Stenen löper vertikalt ner längs sidan av köksskåpen i en kontinuerlig yta – dramatiskt och exklusivt.",
    bestUseCase: "Köksöar med synliga sidor, exklusiva showroom-kök, premiumprojekt.",
    styleImpression: "Dramatisk, lyxig, arkitektonisk",
    priceImpact: "+++",
    difficulty: "Avancerad",
    recommendedCustomer: "Kunder med ett öppet kök och hög inredningsbudget som vill ha ett visuellt statement.",
    salesTip: "Waterfall är ett arkitektoniskt grepp, inte bara en kant. Sälj in helheten – detta förvandlar köket till en designikon.",
    tags: ["Premium", "Mer exklusiv", "Modern"],
    svgViewBox: "0 0 120 80",
    svgPath: `<path d="M 15 10 L 80 10 L 80 15 L 95 15 L 95 70 L 80 70 L 80 75 L 15 75 Z" fill="#e8e4dd" stroke="#c8c4bc" stroke-width="1.5"/>
      <line x1="80" y1="10" x2="80" y2="75" stroke="#00c2a7" stroke-width="3" stroke-linecap="round"/>
      <line x1="80" y1="15" x2="95" y2="15" stroke="#00c2a7" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 2"/>
      <line x1="80" y1="70" x2="95" y2="70" stroke="#00c2a7" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 2"/>`,
  },
];

export const toolsSections: ToolSection[] = [
  {
    id: "kantprofiler",
    title: "Kantprofiler",
    subtitle: "Välj rätt kantprofil för en perfekt finish.",
    items: edgeProfiles,
  },
];
