export interface Stone {
  name: string;
  category: string;
  color: string;
  image: string;
  info: string;
}

export const stoneImages: Stone[] = [
  { name: "Alaskan White", category: "Granit", color: "Vit", image: "stenbilder/alaskan-white.jpg", info: "Ljus granit med grå mineraler." },
  { name: "Angola Black", category: "Granit", color: "Svart", image: "stenbilder/angola-black.jpg", info: "Mörk granit med jämn struktur." },
  { name: "Anthracite Elegante", category: "Kvartsit", color: "Svart", image: "stenbilder/anthracite-elegante.jpg", info: "Mörk elegant kvartsit med exklusivt uttryck." },
  { name: "Antique White", category: "Granit", color: "Vit", image: "stenbilder/antique-white.jpg", info: "Krämvit granit från Brasilien." },
  { name: "Blue Pearl", category: "Granit", color: "Blå", image: "stenbilder/blue-pearl.jpg", info: "Norsk granit med blå skimrande kristaller." },
  { name: "Bohus Grå", category: "Granit", color: "Grå", image: "stenbilder/bohus-gra.jpg", info: "Svensk granit med naturliga grå toner och struktur." },
  { name: "Colonial White", category: "Granit", color: "Vit / Grå", image: "stenbilder/colonial-white.jpg", info: "Ljus granit med grå naturliga variationer." },
  { name: "Cosmic Black", category: "Granit", color: "Svart", image: "stenbilder/cosmic-black.jpg", info: "Svart granit med levande kosmiska mönster." },
  { name: "Cotton White", category: "Granit", color: "Vit", image: "stenbilder/cotton-white.jpg", info: "Vit granit med mjuka grå korn." },
  { name: "Emerald Pearl", category: "Granit", color: "Grön / Svart", image: "stenbilder/emerald-pearl.jpg", info: "Mörk granit med gröna och silverfärgade kristaller." },
  { name: "Grigio Cristallo", category: "Granit", color: "Vit / Grå", image: "stenbilder/grigio-cristallo.jpg", info: "Ljus granit med mörkare grå mineraler." },
  { name: "Nero Africa", category: "Granit", color: "Svart", image: "stenbilder/nero-africa.jpg", info: "Mörk slitstark granit med elegant yta." },
  { name: "Nero Assoluto", category: "Granit", color: "Svart", image: "stenbilder/nero-assoluto.jpg", info: "Svart granit med jämnfördelat ytmönster." },
  { name: "Nero Assoluto Flamed and Brushed", category: "Granit", color: "Svart", image: "stenbilder/nero-assoluto-flamed.jpg", info: "Nero Assoluto med flammad och borstad ytstruktur." },
  { name: "Rosa Beta", category: "Granit", color: "Rosa / Grå", image: "stenbilder/rosa-beta.jpg", info: "Ljus italiensk granit med rosa och grå toner." },
  { name: "Star Galaxy", category: "Granit", color: "Svart", image: "stenbilder/star-galaxy.jpg", info: "Populär svart granit med gyllene mineralfläckar." },
  { name: "Star Gate", category: "Granit", color: "Svart", image: "stenbilder/star-gate.jpg", info: "Svart granit från Zimbabwe." },
  { name: "Steel Grey", category: "Granit", color: "Grå", image: "stenbilder/steel-grey.jpg", info: "Mörk grovkornig granit med grå nyanser." },
  { name: "Tan Brown", category: "Granit", color: "Brun", image: "stenbilder/tan-brown.jpg", info: "Granit med bruna, svarta och grå mineraler." },
  { name: "Verde Savana", category: "Granit", color: "Grön / Svart", image: "stenbilder/verde-savana.jpg", info: "Mörk granit med gröna och bruna toner." },
  { name: "Viscont White", category: "Granit", color: "Vit / Grå", image: "stenbilder/viscont-white.jpg", info: "Vit granit med mjuka grå ådringar." },
  { name: "Arabescato", category: "Marmor", color: "Vit / Grå", image: "stenbilder/arabescato.jpg", info: "Italiensk vit marmor med tydliga grå ådringar." },
  { name: "Azul Valverde", category: "Kalksten", color: "Brun / Grå", image: "stenbilder/azul-valverde.jpg", info: "Mörk kalksten med fossila mönster och blåbruna toner." },
  { name: "Bardiglio", category: "Marmor", color: "Grå", image: "stenbilder/bardiglio.jpg", info: "Elegant italiensk marmor med djup grå bakgrund och naturliga vener." },
  { name: "Carrara", category: "Marmor", color: "Vit", image: "stenbilder/carrara.jpg", info: "Vit marmor med grå ådringar." },
  { name: "Carrara C", category: "Marmor", color: "Vit", image: "stenbilder/carrara-c.jpg", info: "Klassisk vitgrå marmor med mjuka naturliga variationer." },
  { name: "Jura Grey", category: "Kalksten", color: "Beige / Grå", image: "stenbilder/jura-grey.jpg", info: "Tysk kalksten med tidlös gråbeige ton." },
  { name: "Verde Guatemala", category: "Marmor", color: "Grön", image: "stenbilder/verde-guatemala.jpg", info: "Grön marmor med djupa naturliga ådringar och variationer." },
  { name: "Dekton Albarium", category: "Keramik", color: "Vit", image: "stenbilder/dekton-albarium.jpg", info: "Ljus Dekton-skiva med modern matt yta." },
  { name: "Dekton Arga", category: "Keramik", color: "Beige", image: "stenbilder/dekton-arga.jpg", info: "Inspirerad av kvartsit med ett exklusivt naturstensutseende." },
  { name: "Dekton Aura 22", category: "Keramik", color: "Vit", image: "stenbilder/dekton-aura-22.jpg", info: "Ljus keramisk skiva med marmorliknande ådringar." },
  { name: "Dekton Bergen", category: "Keramik", color: "Grå", image: "stenbilder/dekton-bergen.jpg", info: "Grå Dekton med djup struktur inspirerad av natursten." },
  { name: "Dekton Bromo", category: "Keramik", color: "Grå / Blå", image: "stenbilder/dekton-bromo.jpg", info: "Mörk skiva med inspiration från skiffer och bergarter." },
  { name: "Dekton Danae", category: "Keramik", color: "Beige", image: "stenbilder/dekton-danae.jpg", info: "Beige Dekton med kalkstensliknande uttryck." },
  { name: "Dekton Domoos", category: "Keramik", color: "Svart", image: "stenbilder/dekton-domoos.jpg", info: "Mörk Dekton med jämn och elegant yta." },
  { name: "Dekton Halo", category: "Keramik", color: "Vit", image: "stenbilder/dekton-halo.jpg", info: "Vit högglansig Dekton med exklusivt utseende." },
  { name: "Dekton Kelya", category: "Keramik", color: "Brun / Svart", image: "stenbilder/dekton-kelya.jpg", info: "Mörk Dekton inspirerad av naturlig sten." },
  { name: "Dekton Kreta", category: "Keramik", color: "Grå", image: "stenbilder/dekton-kreta.jpg", info: "Grå Dekton med betonginspirerat mönster." },
  { name: "Dekton Limbo", category: "Keramik", color: "Vit / Beige", image: "stenbilder/dekton-limbo.jpg", info: "Ljus Dekton med mjuka naturliga toner." },
  { name: "Dekton Sirius", category: "Keramik", color: "Svart", image: "stenbilder/dekton-sirius.jpg", info: "Elegant svart Dekton med enhetlig färg." },
  { name: "Dekton Soke", category: "Keramik", color: "Grå", image: "stenbilder/dekton-soke.jpg", info: "Grå Dekton inspirerad av klassiska cementytor." },
  { name: "Dekton Taga", category: "Keramik", color: "Grå", image: "stenbilder/dekton-taga.jpg", info: "Inspirerad av Taj Mahal-kvartsit med modernt uttryck." },
  { name: "Dekton Trilium", category: "Keramik", color: "Brun / Grå / Svart", image: "stenbilder/dekton-trilium.jpg", info: "Dekton med vulkaniskt inspirerad färgvariation." },
  { name: "Dekton Zenith", category: "Keramik", color: "Vit / Grå", image: "stenbilder/dekton-zenith.jpg", info: "Ljusgrå Dekton med lugnt och enhetligt uttryck." },
  { name: "Terrazzo Breccia Oniciata", category: "Terrazzo", color: "Beige", image: "stenbilder/terrazzo-breccia-oniciata.jpg", info: "Terrazzo med brun/beige bakgrund och färgade stenfragment." },
  { name: "Terrazzo Calacatta", category: "Terrazzo", color: "Vit", image: "stenbilder/terrazzo-calacatta.jpg", info: "Vit terrazzo inspirerad av Calacatta-marmor med exklusivt uttryck." },
  { name: "Terrazzo Fior Di Pesco", category: "Terrazzo", color: "Grå", image: "stenbilder/terrazzo-fior-di-pesco.jpg", info: "Grå terrazzo med dekorativa stenfragment och modern känsla." },
  { name: "Terrazzo Grigio Carnico", category: "Terrazzo", color: "Svart", image: "stenbilder/terrazzo-grigio-carnico.jpg", info: "Mörk terrazzo med elegant uttryck och kontrasterande detaljer." },
  { name: "Terrazzo GV", category: "Terrazzo", color: "Vit", image: "stenbilder/terrazzo-gv.jpg", info: "Ljus terrazzo med ren och modern design." },
  { name: "Terrazzo Perlato Royal", category: "Terrazzo", color: "Beige", image: "stenbilder/terrazzo-perlato-royal.jpg", info: "Beige terrazzo med mjuka toner och klassiskt utseende." },
  { name: "Terrazzo Verde Alpi", category: "Terrazzo", color: "Grön", image: "stenbilder/terrazzo-verde-alpi.jpg", info: "Grön terrazzo med naturlig färg och exklusiv karaktär." },
  { name: "Silestone Arden Blue", category: "Komposit", color: "Grå / Blå", image: "stenbilder/silestone-arden-blue.jpg", info: "Kvartskomposit med blågrå toner och modern känsla." },
  { name: "Silestone Bianco Calacatta", category: "Komposit", color: "Vit", image: "stenbilder/silestone-bianco-calacatta.jpg", info: "Komposit inspirerad av klassisk Calacatta-marmor." },
  { name: "Silestone Blanco Maple", category: "Komposit", color: "Vit", image: "stenbilder/silestone-blanco-maple.jpg", info: "Ljus kvartssten med subtila korn och tidlöst uttryck." },
  { name: "Silestone Blanco Matrix", category: "Komposit", color: "Vit", image: "stenbilder/silestone-blanco-matrix.jpg", info: "Vit Silestone med en ren och modern yta." },
  { name: "Silestone Blanco Orion", category: "Komposit", color: "Vit", image: "stenbilder/silestone-blanco-orion.jpg", info: "Ljus komposit med marmorliknande vener." },
  { name: "Silestone Blanco Zeus", category: "Komposit", color: "Vit", image: "stenbilder/silestone-blanco-zeus.jpg", info: "Vit kvartssten med en jämn och elegant yta." },
  { name: "Silestone Copper Mist", category: "Komposit", color: "Brun / Grå", image: "stenbilder/silestone-copper-mist.jpg", info: "Komposit med varma toner och detaljer som ger djup." },
  { name: "Silestone Coral Clay", category: "Komposit", color: "Brun", image: "stenbilder/silestone-coral-clay.jpg", info: "Varm brun komposit med mjukt naturligt uttryck." },
  { name: "Silestone Desert Silver", category: "Komposit", color: "Grå", image: "stenbilder/silestone-desert-silver.jpg", info: "Ljusgrå kvartssten med eleganta rörelser." },
  { name: "Silestone Eternal Calacatta Classic", category: "Komposit", color: "Vit", image: "stenbilder/silestone-eternal-calacatta-classic.jpg", info: "Marmorliknande komposit inspirerad av Calacatta." },
  { name: "Silestone Eternal Calacatta Gold", category: "Komposit", color: "Vit", image: "stenbilder/silestone-eternal-calacatta-gold.jpg", info: "Vit komposit med exklusiva ådringar i varm ton." },
  { name: "Silestone Eternal Marquina", category: "Komposit", color: "Svart", image: "stenbilder/silestone-eternal-marquina.jpg", info: "Svart kvartssten inspirerad av Nero Marquina-marmor." },
  { name: "Silestone Eternal Statuario", category: "Komposit", color: "Vit", image: "stenbilder/silestone-eternal-statuario.jpg", info: "Vit yta med tydliga grå marmorliknande vener." },
  { name: "Silestone Gris Expo", category: "Komposit", color: "Grå", image: "stenbilder/silestone-gris-expo.jpg", info: "Mörkgrå komposit med modern och neutral stil." },
  { name: "Silestone Lagoon", category: "Komposit", color: "Vit", image: "stenbilder/silestone-lagoon.jpg", info: "Ljus kvartssten med mjukt och exklusivt uttryck." },
  { name: "Silestone Marengo", category: "Komposit", color: "Grå", image: "stenbilder/silestone-marengo.jpg", info: "Grå komposit med varm ton och tålig yta." },
  { name: "Silestone Miami White", category: "Komposit", color: "Vit", image: "stenbilder/silestone-miami-white.jpg", info: "Vit komposit med ren och ljus design." },
  { name: "Silestone Night Tebas", category: "Komposit", color: "Svart", image: "stenbilder/silestone-night-tebas.jpg", info: "Mörk kvartssten med elegant djup." },
  { name: "Silestone Ocean Jasper", category: "Komposit", color: "Grå", image: "stenbilder/silestone-ocean-jasper.jpg", info: "Grå komposit med naturligt stenliknande mönster." },
  { name: "Silestone Pietra", category: "Komposit", color: "Grå", image: "stenbilder/silestone-pietra.jpg", info: "Grå kvartssten med exklusiv stenkaraktär." },
  { name: "Silestone Royal Reef", category: "Komposit", color: "Beige", image: "stenbilder/silestone-royal-reef.jpg", info: "Beige komposit med varm och mjuk känsla." },
  { name: "Silestone Seaport", category: "Komposit", color: "Grå", image: "stenbilder/silestone-seaport.jpg", info: "Grå Silestone med modern matt känsla." },
  { name: "Silestone Snowy Ibiza", category: "Komposit", color: "Vit", image: "stenbilder/silestone-snowy-ibiza.jpg", info: "Vit kvartssten med naturliga mörkare detaljer." },
  { name: "Silestone White Storm", category: "Komposit", color: "Vit", image: "stenbilder/silestone-white-storm.jpg", info: "Ljus komposit med diskret mönster och mjuka toner." },
  { name: "Technistone Crystal Absolute White", category: "Komposit", color: "Vit", image: "stenbilder/technistone-crystal-absolute-white.jpg", info: "Mycket vit kvartskomposit med ett rent och exklusivt uttryck." },
  { name: "Technistone Gobi Black", category: "Komposit", color: "Svart", image: "stenbilder/technistone-gobi-black.jpg", info: "Svart kvartssten med jämn färg och modern känsla." },
  { name: "Technistone Gobi Grey", category: "Komposit", color: "Grå", image: "stenbilder/technistone-gobi-grey.jpg", info: "Grå komposit med kristallstruktur och naturligt utseende." },
  { name: "Technistone Mystery White", category: "Komposit", color: "Vit", image: "stenbilder/technistone-mystery-white.jpg", info: "Vit kvartskomposit med grå marmorliknande vener." },
  { name: "Technistone Noble Arco", category: "Komposit", color: "Vit", image: "stenbilder/technistone-noble-arco.jpg", info: "Ljus komposit med elegant och stilrent uttryck." },
  { name: "Technistone Noble Carrara", category: "Komposit", color: "Vit", image: "stenbilder/technistone-noble-carrara.jpg", info: "Komposit inspirerad av klassisk Carrara-marmor." },
  { name: "Technistone Noble Concrete Grey", category: "Komposit", color: "Grå", image: "stenbilder/technistone-noble-concrete-grey.jpg", info: "Grå kvartssten med betongkänsla och subtila detaljer." },
  { name: "Technistone Noble Ivory White", category: "Komposit", color: "Grå", image: "stenbilder/technistone-noble-ivory-white.jpg", info: "Mjuk grå komposit med elegant yta." },
  { name: "Technistone Noble Pietra Grey", category: "Komposit", color: "Grå", image: "stenbilder/technistone-noble-pietra-grey.jpg", info: "Mörk grå komposit med ljusa naturliga vener." },
  { name: "Technistone Noble Pro Cloud", category: "Komposit", color: "Grå", image: "stenbilder/technistone-noble-pro-cloud.jpg", info: "Ljusgrå komposit med modern matt eller polerad yta." },
  { name: "Technistone Noble Pro Frost", category: "Komposit", color: "Grå", image: "stenbilder/technistone-noble-pro-frost.jpg", info: "Ljus kvartskomposit med ett lugnt och stilrent uttryck." },
  { name: "Technistone Noble Quartzite", category: "Komposit", color: "Grå", image: "stenbilder/technistone-noble-quartzite.jpg", info: "Komposit inspirerad av naturlig kvartsit." },
  { name: "Technistone Noble Supreme White", category: "Komposit", color: "Vit", image: "stenbilder/technistone-noble-supreme-white.jpg", info: "Vit komposit med grå vener som ger naturlig marmorkänsla." },
  { name: "Technistone Noble Troya", category: "Komposit", color: "Grå", image: "stenbilder/technistone-noble-troya.jpg", info: "Grå kvartskomposit med mjuka naturliga rörelser." },
  { name: "Caesarstone Clamshell", category: "Komposit", color: "Beige", image: "stenbilder/caesarstone-clamshell.jpg", info: "Beige kvartskomposit med mjukt och exklusivt uttryck." },
  { name: "Caesarstone London Grey", category: "Komposit", color: "Grå", image: "stenbilder/caesarstone-london-grey.jpg", info: "Ljusgrå komposit med mjuka mörkare vener och modern känsla." },
];

export function getStoneCategories(): string[] {
  const cats = Array.from(new Set(stoneImages.map(s => s.category)));
  return ["Alla kategorier", ...cats];
}

export function filterStones(category: string, count: number | "all"): Stone[] {
  const pool = category === "Alla kategorier"
    ? [...stoneImages]
    : stoneImages.filter(s => s.category === category);

  const shuffled = pool.sort(() => Math.random() - 0.5);
  if (count === "all") return shuffled;
  return shuffled.slice(0, Math.min(count as number, shuffled.length));
}

const COLOR_WORDS = [
  "black", "white", "grey", "gray", "green", "blue", "brown", "pearl", "star",
  "nero", "bianco", "blanco", "grigio", "gris", "verde", "azul", "marron", "coral",
  "svart", "vit", "grå", "grön", "blå", "brun", "rosa", "beige",
  "silver", "gold", "copper", "night", "galaxy", "ivory", "crystal", "cloud", "frost",
  "storm", "lagoon", "ocean", "desert", "miami", "eternal"
];

function extractColorTokens(name: string): string[] {
  const lower = name.toLowerCase();
  return COLOR_WORDS.filter(w => lower.includes(w));
}

export function generateOptions(correct: Stone, pool: Stone[]): Stone[] {
  const others = pool.filter(s => s.name !== correct.name);
  const correctTokens = extractColorTokens(correct.name);

  const scored = others.map(stone => {
    let score = 0;
    const stoneTokens = extractColorTokens(stone.name);

    // Shared color word in name → very tricky distractor
    const sharedTokens = stoneTokens.filter(t => correctTokens.includes(t));
    score += sharedTokens.length * 12;

    // Same category → also tricky
    if (stone.category === correct.category) score += 6;

    // Same brand/series prefix (e.g. "Silestone", "Dekton", "Technistone")
    const correctWords = correct.name.split(" ");
    const stoneWords = stone.name.split(" ");
    if (correctWords[0] === stoneWords[0]) score += 4;
    if (correctWords[0] === stoneWords[0] && correctWords[1] === stoneWords[1]) score += 4;

    // Same base color from color property
    const correctColorLower = correct.color.toLowerCase();
    const stoneColorLower = stone.color.toLowerCase();
    if (correctColorLower.split("/").some(c => stoneColorLower.includes(c.trim()))) score += 3;

    score += Math.random() * 5;
    return { stone, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const distractors = scored.slice(0, 3).map(s => s.stone);
  const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
  return options;
}

export function getStoneGradient(color: string): string {
  const c = color.toLowerCase();
  if (c.includes("svart") || c.includes("black") || c.includes("nero")) {
    return "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #111111 100%)";
  }
  if (c.includes("vit") && (c.includes("grå") || c.includes("grey"))) {
    return "linear-gradient(135deg, #e0ddd8 0%, #c8c4bc 50%, #d4d0c8 100%)";
  }
  if (c.includes("vit") || c.includes("white") || c.includes("bianco") || c.includes("blanco")) {
    return "linear-gradient(135deg, #edeae4 0%, #e0ddd6 50%, #d4d0c8 100%)";
  }
  if (c.includes("grå") && c.includes("blå")) {
    return "linear-gradient(135deg, #3d4a5c 0%, #2d3a50 50%, #1d2d40 100%)";
  }
  if (c.includes("grå") || c.includes("grey") || c.includes("grigio") || c.includes("gris")) {
    return "linear-gradient(135deg, #7a7570 0%, #63605a 50%, #505050 100%)";
  }
  if (c.includes("grön") || c.includes("green") || c.includes("verde")) {
    return "linear-gradient(135deg, #2d4a3e 0%, #1a3328 50%, #0f2218 100%)";
  }
  if (c.includes("blå") || c.includes("blue") || c.includes("azul")) {
    return "linear-gradient(135deg, #1a3050 0%, #1d3a5c 50%, #0f2035 100%)";
  }
  if (c.includes("rosa") || c.includes("pink")) {
    return "linear-gradient(135deg, #c4a8a0 0%, #b09088 50%, #988070 100%)";
  }
  if (c.includes("brun") || c.includes("brown")) {
    return "linear-gradient(135deg, #7a5c3a 0%, #6a4c2a 50%, #5a3c1a 100%)";
  }
  if (c.includes("beige")) {
    return "linear-gradient(135deg, #c8b88a 0%, #b8a87a 50%, #a89860 100%)";
  }
  return "linear-gradient(135deg, #8a8680 0%, #7a7268 50%, #6a6258 100%)";
}
