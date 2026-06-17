export interface Material {
  id: string;
  name: string;
  type: "Natursten" | "Engineered" | "Keramik/Ultra-kompakt";
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  maintenance: number;
  durability: number;
  heatResistance: number;
  scratchResistance: number;
  stainResistance: number;
  priceLevel: "Budgetvänlig" | "Mellanklass" | "Premium" | "Lyx";
  bestCustomer: string;
  whenToRecommend: string;
  whenNotToRecommend: string;
  salesArgument: string;
  commonMisunderstanding: string;
  customerScenario: string;
  gradient: string;
  accentColor: string;
}

export const materials: Material[] = [
  {
    id: "granit",
    name: "Granit",
    type: "Natursten",
    tagline: "Det klassiska naturstensalternativet",
    description: "Granit är ett naturligt kristallint bergart som bildats under miljontals år. Extremt hårt och hållbart – ett av de mest slitstarka materialen för bänkskivor.",
    pros: ["Extremt hållbart och reptåligt", "Värmebeständigt – tål kastruller direkt från spisen", "Varje skiva är unik med naturliga mönster", "Ökar bostadens värde", "Håller hela livet med rätt skötsel"],
    cons: ["Kräver impregnering 1–2 gånger per år", "Känsligt för sura vätskor om oimpregnerat", "Naturliga variationer kan skilja sig från prover"],
    maintenance: 2,
    durability: 5,
    heatResistance: 5,
    scratchResistance: 5,
    stainResistance: 3,
    priceLevel: "Mellanklass",
    bestCustomer: "Kunder som vill ha äkta natursten med hög tålighet och lång livslängd.",
    whenToRecommend: "Kunden lagar mycket mat och ställer kastruller direkt på bänken. Kunden vill ha natursten men är orolig för hållbarhet. Budget är mellanklass och kunden är beredd att sköta lite impregnering.",
    whenNotToRecommend: "Kunden vill absolut noll underhåll. Kunden väljer material enbart på pris och bryr sig inte om naturstens unikhet. Kunden vill ha 100% identisk färg på flera skivor.",
    salesArgument: "Granit är ett av jordens hårdaste naturmaterial – det håller ett helt liv och ser bättre ut med åren. Varje skiva är ett unikt konstverk som aldrig kan kopieras.",
    commonMisunderstanding: "Många tror att granit är svårt att sköta om. I verkligheten räcker det med impregnering 1–2 gånger per år och enkel daglig rengöring.",
    customerScenario: "\"Vi lagar mat nästan varje kväll och vill ha något som håller länge. Vi gillar natursten men är lite oroliga för skötsel.\" → Granit är perfekt: tåligt, värmebeständigt och kräver bara lite impregnering per år.",
    gradient: "linear-gradient(135deg, #8a8278 0%, #6e6860 50%, #5a5450 100%)",
    accentColor: "#6e6860",
  },
  {
    id: "marmor",
    name: "Marmor",
    type: "Natursten",
    tagline: "Det tidlösa lyxmaterialet",
    description: "Marmor är ett metamorft bergart känt för sina exklusiva ådringar och naturliga skönhet. Symbolen för lyx och elegans i årtusenden.",
    pros: ["Exklusivt och tidlöst utseende", "Unika naturliga ådringar – aldrig identiska", "Ökar bostadens attraktivitet dramatiskt", "Körs kallare – bra för bakning och deg"],
    cons: ["Känsligt för syra (citronsaft, vin, karbonerat vatten)", "Kräver regelbunden impregnering", "Kan ta märken och repas lättare än granit"],
    maintenance: 4,
    durability: 3,
    heatResistance: 3,
    scratchResistance: 2,
    stainResistance: 2,
    priceLevel: "Lyx",
    bestCustomer: "Kunder som prioriterar estetik och exklusivitet och är beredda att sköta om materialet.",
    whenToRecommend: "Kunden sätter design och exklusivitet allra högst. Kunden kan acceptera att ytan kräver mer omsorg. Projektet är ett premium badrum, showroom-kök eller lyxrenovering.",
    whenNotToRecommend: "Kunden har barn och vill ha minimalt underhåll. Kunden lagar intensivt med sura ingredienser. Kunden förväntar sig en fläckfri yta utan ansträngning.",
    salesArgument: "Marmor är det mest exklusiva valet – ett levande material som utvecklar en vacker patina med åren. Investera i tidlös elegans som aldrig går ur mode.",
    commonMisunderstanding: "Att marmor är oanvändbart i köket. Det är fullt möjligt med rätt impregnering och förståelse för materialet. Många av världens finaste restaurangkök har marmorbänkskivor.",
    customerScenario: "\"Vi drömmer om ett marmorliknande kök, men vi har hört att det är svårt att underhålla.\" → Beskriv hur impregnering fungerar och att patina är en del av materialets charm. Om de fortfarande är tveksamma, föreslå kvartsit.",
    gradient: "linear-gradient(135deg, #e8e4dc 0%, #d4cfc8 50%, #c0bab2 100%)",
    accentColor: "#b0aaa0",
  },
  {
    id: "kvarts",
    name: "Kvarts",
    type: "Engineered",
    tagline: "Det underhållsfria vardagshjälten",
    description: "Kvartskomposit är ett engineered material bestående av ca 93% naturkvarts bundet med hartser. Icke-poröst och extremt praktiskt.",
    pros: ["Icke-poröst – kräver ingen impregnering", "Minimal skötsel, enkelt att hålla rent", "Repbeständigt och hållbart", "Enhetlig färg – lättare att matcha inredningen", "Brett sortiment och prisvariation"],
    cons: ["Inte värmebeständigt – varma kastruller kan skada ytan", "Kan blekna i direkt solljus", "Engineered – inte 100% natursten"],
    maintenance: 1,
    durability: 4,
    heatResistance: 1,
    scratchResistance: 4,
    stainResistance: 5,
    priceLevel: "Mellanklass",
    bestCustomer: "Barnfamiljer och kunder som vill ha minimal skötsel och praktisk vardagsyta.",
    whenToRecommend: "Kunden vill absolut inte tänka på impregnering. Det finns barn i hemmet. Kunden vill ha enhetlig, kontrollerbar färg. Budgeten är mellanklass.",
    whenNotToRecommend: "Kunden ställer ofta varma kastruller direkt på bänken. Kunden vill ha utomhuskök. Kunden vill ha 100% naturstens unikhet och karaktär.",
    salesArgument: "Kvarts är det smartaste valet för moderna familjer – inga fläckar fastnar, ingen impregnering behövs. Bara ren och fin yta varje dag utan ansträngning.",
    commonMisunderstanding: "Att kvarts är samma sak som granit. Kvarts är engineered (konstgjort material), inte natursten. Det påverkar bl.a. värmetåligheten – kvarts tål INTE direktvärme, granit gör det.",
    customerScenario: "\"Vi har tre barn och vill ha en bänkskiva som klarar allt utan att vi behöver tänka på det.\" → Kvarts är det självklara valet: tål spill, kräver noll impregnering och ser alltid fräsch ut.",
    gradient: "linear-gradient(135deg, #e4e0d8 0%, #d0ccc4 50%, #bcb8b0 100%)",
    accentColor: "#a0a8b0",
  },
  {
    id: "kvartsit",
    name: "Kvartsit",
    type: "Natursten",
    tagline: "Marmorkänsla med granitets tålighet",
    description: "Kvartsit är ett naturligt metamorft bergart hårdare än marmor med vackra ådringar. Ofta förväxlat med marmor men är betydligt tåligare.",
    pros: ["Extremt hårt och slitstark natursten", "Vacker marmorliknande yta med ådringar", "Värmebeständigt", "Tåligare än marmor mot repor"],
    cons: ["Kräver impregnering", "Begränsat sortiment jämfört med kvarts", "Priset varierar kraftigt beroende på ursprung"],
    maintenance: 2,
    durability: 5,
    heatResistance: 4,
    scratchResistance: 5,
    stainResistance: 3,
    priceLevel: "Premium",
    bestCustomer: "Kunder som älskar marmorets utseende men behöver bättre tålighet och lagar mat aktivt.",
    whenToRecommend: "Kunden vill ha marmorliknande utseende men är orolig för marmorets svagheter. Kunden lagar mat ofta och vill ha värmetålighet. Kunden vill ha naturstens unikhet med bättre praktiska egenskaper.",
    whenNotToRecommend: "Kunden vill ha noll underhåll. Kunden har strikt budget. Kunden förväntar sig exakt samma mönster på alla skivor.",
    salesArgument: "Kvartsit ger dig marmorkänslan med granitets tålighet. Det bästa av två världar – naturlig skönhet utan att kompromissa med hållbarhet.",
    commonMisunderstanding: "Kvartsit förväxlas ofta med kvarts (komposit). Det är helt olika material. Kvartsit är 100% natursten, kvarts är engineered. Kvartsit tål värme, kvarts gör det inte.",
    customerScenario: "\"Vi älskar marmor men har hört att det är för känsligt. Finns det något liknande men tåligare?\" → Kvartsit är svaret: natursten med marmorliknande ådringar men mycket bättre tålighet.",
    gradient: "linear-gradient(135deg, #dcd6cc 0%, #c4beb4 50%, #a8a298 100%)",
    accentColor: "#9890a0",
  },
  {
    id: "keramik",
    name: "Keramik",
    type: "Keramik/Ultra-kompakt",
    tagline: "Det moderna materialets superförmågor",
    description: "Keramiska skivor sintras vid extremt hög temperatur av naturliga material. Resulterar i ett material med exceptionella tekniska egenskaper.",
    pros: ["Extremt värmebeständigt – tål direkt kontakt med heta kastruller", "Mycket repbeständigt", "Hygieniskt och icke-poröst", "UV-beständigt – passar utomhus"],
    cons: ["Kan spricka vid kraftig punktbelastning", "Svår att reparera om den slår", "Kräver specialverktyg vid skärning"],
    maintenance: 1,
    durability: 4,
    heatResistance: 5,
    scratchResistance: 5,
    stainResistance: 5,
    priceLevel: "Mellanklass",
    bestCustomer: "Matentusiaster, kunder som lagar mycket mat och vill ha en modern lättskött yta.",
    whenToRecommend: "Kunden lagar mat intensivt och ställer heta kastruller direkt på bänken. Kunden vill ha minimal skötsel och maximal tålighet. Kunden är matintresserad och ser köket som ett professionellt rum.",
    whenNotToRecommend: "Kunden är orolig för att stenen kan spricka vid slag. Kunden har ett kök med mycket rörelse och risk för att tappa tunga föremål.",
    salesArgument: "Keramik tål värme direkt från ugnen, är ogenomträngligt för fläckar och ser ut som nytt efter 20 år. Perfekt för den seriösa hemmakocken.",
    commonMisunderstanding: "Att keramik 'ser ut som kakel'. Moderna keramiska bänkskivor tillverkas i stora skivor och kan imitera natursten, betong, trä och andra ytor med fantastisk realism.",
    customerScenario: "\"Jag är ett stort matintresse och ställer ofta kastruller direkt på bänken. Jag vill inte ha ett material som tar skada av det.\" → Keramik och Dekton är de enda materialen som tål det utan problem.",
    gradient: "linear-gradient(135deg, #e8e4e0 0%, #d0ccc8 50%, #b8b4b0 100%)",
    accentColor: "#8890a8",
  },
  {
    id: "dekton",
    name: "Dekton",
    type: "Keramik/Ultra-kompakt",
    tagline: "Den ultimata bänkskivan utan kompromisser",
    description: "Dekton är en ultra-kompakt yta från Cosentino, tillverkad under extremt högt tryck och temperatur. Resultatet är överlägset alla andra material i teknisk prestanda.",
    pros: ["Extremt värmebeständigt och frostbeständigt", "Repbeständigt och slagtåligt", "UV-beständigt – passar utomhus", "Icke-poröst, kräver noll impregnering", "Tillgängligt i stora format utan skarvar"],
    cons: ["Premium-pris", "Kan spricka vid extrem stöt", "Begränsat antal certifierade monterare"],
    maintenance: 1,
    durability: 5,
    heatResistance: 5,
    scratchResistance: 5,
    stainResistance: 5,
    priceLevel: "Lyx",
    bestCustomer: "Kunder som vill ha det absolut bästa utan kompromisser. Utomhuskök, matentusiaster och kunder med höga krav.",
    whenToRecommend: "Kunden vill ha det bästa materialet och har budget för det. Kunden planerar utomhuskök. Kunden är matentusiast och vill ha professionell köksstandard. Kunden vill ha stora skivor utan skarvar.",
    whenNotToRecommend: "Kunden har begränsad budget. Kunden bor i ett hyresboende eller planerar kortsiktigt.",
    salesArgument: "Dekton är den ultimata bänkskivan – inget material i världen presterar bättre. En investering som varar generationer utan kompromisser.",
    commonMisunderstanding: "Att Dekton och keramik är samma sak. Dekton är ett eget ultra-kompakt material med en unik tillverkningsprocess som skiljer det från vanlig keramik i prestanda och hållbarhet.",
    customerScenario: "\"Vi renoverar köket en gång för alltid och vill ha det absolut bästa. Budget är inte det primära.\" → Dekton är det självklara svaret: branschens bäst presterande material utan undantag.",
    gradient: "linear-gradient(135deg, #3a3836 0%, #2a2826 50%, #1a1816 100%)",
    accentColor: "#5a5856",
  },
  {
    id: "kompositsten",
    name: "Kompositsten",
    type: "Engineered",
    tagline: "Smart val med god kvalitet",
    description: "Kompositsten är ett engineered material med hög andel naturkvarts. Bred prisvariation och god prestanda i vardagen.",
    pros: ["Prisvärt utan att kompromissa med kvalitet", "Enhetlig kvalitet och konsekvent utseende", "Icke-poröst och lättskött", "Stort sortiment i många stilar"],
    cons: ["Inte värmebeständigt – kräver grytunderlägg", "Kan blekna i direkt solljus", "Inte natursten – saknar naturstens unikhet"],
    maintenance: 1,
    durability: 4,
    heatResistance: 2,
    scratchResistance: 4,
    stainResistance: 5,
    priceLevel: "Budgetvänlig",
    bestCustomer: "Budgetmedvetna kunder som ändå vill ha bra kvalitet och lättskött yta.",
    whenToRecommend: "Kunden har tydlig budget och vill ha bästa möjliga inom den. Kunden vill ha enkelt underhåll och praktisk vardagsyta. Kunden renoverar ett hyresboende eller gör ett kortare projekt.",
    whenNotToRecommend: "Kunden ställer höga krav på estetik och naturstens unikhet. Kunden vill ha material för utomhusbruk. Kunden lagar intensivt och ställer heta kastruller.",
    salesArgument: "Kompositsten ger dig modern, lättskött yta till ett rimligt pris. Smart val för den budgetmedvetne kunden som inte vill kompromissa med kvalitet.",
    commonMisunderstanding: "Att billigare komposit är dålig kvalitet. Många kompositmärken håller utmärkt kvalitet – prisskillnaden beror ofta på tillverkare och sortiment, inte nödvändigtvis prestanda.",
    customerScenario: "\"Vi har en begränsad budget men vill ändå ha en bra bänkskiva som håller ett tag.\" → Kompositsten är det perfekta svaret: solid kvalitet, enkelt underhåll och rimligt pris.",
    gradient: "linear-gradient(135deg, #c8c4bc 0%, #b4b0a8 50%, #a0a09a 100%)",
    accentColor: "#7a8890",
  },
];

export function getRatingLabel(val: number): string {
  if (val >= 5) return "Utmärkt";
  if (val >= 4) return "Mycket bra";
  if (val >= 3) return "Bra";
  if (val >= 2) return "Godkänt";
  return "Begränsat";
}

export function getPriceLevelColor(level: Material["priceLevel"]): string {
  const map: Record<Material["priceLevel"], string> = {
    Budgetvänlig: "#22c55e",
    Mellanklass: "#3b82f6",
    Premium: "#8b5cf6",
    Lyx: "#f59e0b",
  };
  return map[level];
}
