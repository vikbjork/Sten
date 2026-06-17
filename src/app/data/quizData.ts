export interface QuizQuestion {
  cat: string;
  q: string;
  a: string[];
  c: number;
  i: string;
}

export const questions: QuizQuestion[] = [
  {
    cat: "StoneFlow Expert",
    q: "Vad är den viktigaste anledningen till att hålla projektinformationen uppdaterad i StoneFlow?",
    a: ["Så att hela företaget arbetar utifrån samma aktuella information", "För att systemet ska se mer aktivt ut", "För att kunden automatiskt ska få färre frågor", "För att gamla projekt ska raderas snabbare"],
    c: 0,
    i: "StoneFlow ska fungera som gemensam källa för projektets information."
  },
  {
    cat: "StoneFlow Expert",
    q: "En säljare har lovat kunden en lösning muntligt men den finns inte dokumenterad. Vad är största risken?",
    a: ["Att nästa person saknar viktig information och projektet får fel förutsättningar", "Att systemet automatiskt stoppar projektet", "Att kunden inte kan logga in", "Att offerten alltid blir billigare"],
    c: 0,
    i: "Muntliga löften måste dokumenteras för att undvika missförstånd."
  },
  {
    cat: "StoneFlow Expert",
    q: "Vilken information är mest värdefull att skriva i en projektanteckning?",
    a: ["Beslut, anledning och vad som behöver hända härnäst", "Endast att kunden kontaktats", "Endast datumet för senaste samtalet", "Personliga åsikter om kunden"],
    c: 0,
    i: "Bra notes ska göra att nästa person förstår situationen direkt."
  },
  {
    cat: "StoneFlow Expert",
    q: "En affär är markerad som vunnen men saknar viktiga detaljer. Vad är bästa arbetssättet?",
    a: ["Kontrollera att projektet är redo för nästa steg och komplettera informationen", "Starta produktionen direkt", "Ta bort projektet", "Ändra till installation klar"],
    c: 0,
    i: "Såld betyder inte automatiskt att projektet är redo för nästa steg."
  },
  {
    cat: "StoneFlow Expert",
    q: "Varför är felaktiga pipeline-statusar ett problem?",
    a: ["De gör att prognoser, prioriteringar och arbetsflöden blir fel", "De påverkar bara säljarens statistik", "De påverkar endast gamla projekt", "De spelar ingen roll efter offert"],
    c: 0,
    i: "Pipeline måste visa verkligt läge."
  },
  {
    cat: "StoneFlow Expert",
    q: "En kund frågar om leveransdatum. Vad ska säljaren kontrollera innan svar?",
    a: ["Projektets verkliga status och om alla beroenden är klara", "Endast offertdatum", "Endast kundens önskemål", "Endast säljarens kalender"],
    c: 0,
    i: "Datum ska baseras på projektets faktiska status."
  },
  {
    cat: "StoneFlow Expert",
    q: "Vilken är den bästa användningen av kundhistorik innan ett samtal?",
    a: ["Förstå vad som redan beslutats och undvika motsägande information", "Kontrollera gamla priser endast", "Se hur många gånger kunden ringt", "Radera gammal information"],
    c: 0,
    i: "Historiken ger rätt sammanhang."
  },
  {
    cat: "StoneFlow Expert",
    q: "Vad kännetecknar ett professionellt överlämnat projekt?",
    a: ["Nästa avdelning förstår kundens behov, beslut och nästa steg", "Det finns bara ett ordernummer", "Projektet har högsta möjliga pris", "Säljaren har flest anteckningar"],
    c: 0,
    i: "Bra överlämning minskar frågor och fel."
  },
  {
    cat: "StoneFlow Expert",
    q: "En säljare skriver 'kund vill ha svart sten'. Vad saknas mest?",
    a: ["Viktig kontext som materialtyp, beslut och eventuella begränsningar", "Ingenting", "Kundens telefonnummer", "En ny offert direkt"],
    c: 0,
    i: "Kort information utan sammanhang skapar risk."
  },
  {
    cat: "StoneFlow Expert",
    q: "När är det rätt att flytta ett projekt vidare i processen?",
    a: ["När kraven för nästa steg faktiskt är uppfyllda", "När kunden väntat länge", "När säljaren vill rensa listan", "När projektet ser gammalt ut"],
    c: 0,
    i: "Processen ska styras av verklig status."
  },
  {
    cat: "StoneFlow Expert",
    q: "En kund vill ändra material efter att arbetet kommit långt. Vad är första steget?",
    a: ["Kontrollera projektets status och konsekvenser innan något lovas", "Godkänn alltid direkt", "Radera gamla uppgifter", "Skicka kunden till fabriken"],
    c: 0,
    i: "Ändringar kan påverka flera delar av flödet."
  },
  {
    cat: "StoneFlow Expert",
    q: "Vilken typ av information ska ligga i systemet och inte endast i säljarens minne?",
    a: ["All information som påverkar leverans, kund och projekt", "Endast interna tankar", "Endast säljarens mål", "Endast saker som gått fel"],
    c: 0,
    i: "Systemet ska bära projektets viktiga information."
  },
  {
    cat: "StoneFlow Expert",
    q: "Varför ska man undvika att skriva otydliga kommentarer som 'fixa detta'?",
    a: ["Det är oklart vem som ska göra vad och varför", "Systemet tillåter inte korta texter", "Det påverkar bara designen", "Det skapar automatiskt felpris"],
    c: 0,
    i: "Tydliga instruktioner minskar risken för fel."
  },
  {
    cat: "StoneFlow Expert",
    q: "Vad är ett vanligt tecken på att ett projekt inte är redo att lämnas vidare?",
    a: ["Viktig information eller beslut saknas", "Projektet har en kund", "Det finns en offert", "Det finns ett datum"],
    c: 0,
    i: "Ofullständig information skapar stopp senare."
  },
  {
    cat: "StoneFlow Expert",
    q: "En säljare upptäcker en viktig ändring efter kundkontakt. Vad bör göras?",
    a: ["Uppdatera projektet direkt så informationen är aktuell", "Vänta tills någon frågar", "Skriva privat anteckning", "Skapa nytt projekt automatiskt"],
    c: 0,
    i: "Aktuell information är avgörande i hela flödet."
  },
  {
    cat: "StoneFlow Expert",
    q: "Vad är den största skillnaden mellan en vanlig säljare och en stark StoneFlow-användare?",
    a: ["Den starka användaren tänker på hela projektets livscykel", "Den starka användaren skriver flest kommentarer", "Den starka användaren ändrar flest statusar", "Den starka användaren använder aldrig andra avdelningar"],
    c: 0,
    i: "StoneFlow kräver förståelse för hela kedjan."
  },
  {
    cat: "StoneFlow Expert",
    q: "När ett projekt stoppas, vad ska man först undersöka?",
    a: ["Vad som saknas eller blockerar nästa steg", "Vem som kan få skulden", "Om projektet kan döljas", "Om kunden kan vänta längre"],
    c: 0,
    i: "Problem löses genom att hitta blockerande information."
  },
  {
    cat: "StoneFlow Expert",
    q: "Varför är det viktigt att skilja på status, anteckning och uppgift?",
    a: ["De har olika funktioner och skapar struktur", "De är egentligen samma sak", "Endast status används", "Anteckningar ersätter allt"],
    c: 0,
    i: "Rätt information på rätt plats gör systemet användbart."
  },
  {
    cat: "StoneFlow Expert",
    q: "En kund säger 'men säljaren lovade detta'. Vad är första kontrollen?",
    a: ["Kontrollera dokumenterad information i projektet", "Direkt neka kunden", "Ändra historiken", "Skapa ny offert"],
    c: 0,
    i: "Dokumentation visar vad som kommunicerats."
  },
  {
    cat: "StoneFlow Expert",
    q: "Vilket arbetssätt ger minst risk för fel?",
    a: ["Dokumentera beslut löpande under projektets gång", "Samla allt i slutet", "Förlita sig på minnet", "Endast kommunicera muntligt"],
    c: 0,
    i: "Löpande dokumentation håller projektet korrekt."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "En kund vill boka mätning men köket är inte färdigmonterat. Vad är korrekt hantering?",
    a: ["Informera kunden att köket behöver vara klart innan mätning eftersom förutsättningarna måste vara slutliga", "Boka ändå eftersom mätaren kan lösa allt på plats", "Be kunden ändra efter mätningen", "Skicka endast en preliminär ritning"],
    c: 0,
    i: "Köksskåp, placering och förutsättningar ska vara färdiga inför mätning."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "En kund vill ändra placering av skåp efter att mätning är genomförd. Vad är rätt?",
    a: ["Informera att ändringar efter mätning kan påverka resultatet och inte ska göras", "Det går alltid bra eftersom stenen kan justeras", "Ändra bara i systemet", "Installatören löser det automatiskt"],
    c: 0,
    i: "Efter mätning ska kundens kök inte ändras eftersom måtten bygger på de faktiska förutsättningarna."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "Kunden vill återanvända sin gamla diskho i nya skivan. Vad ska säljaren vara medveten om?",
    a: ["Det kan finnas risk för skada vid demontering och kunden måste informeras", "Det är alltid utan risk", "Företaget ansvarar alltid för den gamla diskhon", "Det påverkar aldrig installationen"],
    c: 0,
    i: "Återanvändning kan vara komplicerat beroende på hur diskhon sitter."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "En kund kräver ett mycket långt stänkskydd utan skarv trots att lösningen innebär hög risk. Vad gör du?",
    a: ["Informerar kunden om riskerna och dokumenterar att lösningen inte rekommenderas", "Lovar lösningen eftersom kunden bestämt sig", "Tar bort informationen från projektet", "Ändrar automatiskt måttet"],
    c: 0,
    i: "Kunden ska förstå risker innan beslut tas."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "En kund väljer Jura Grey och säger att ådringar ser ut som sprickor. Hur svarar en kunnig säljare?",
    a: ["Förklarar att naturliga vener kan förekomma och inte automatiskt är fel", "Säger att stenen ska vara helt utan variation", "Rekommenderar endast komposit", "Lovar att varje skiva ser identisk ut"],
    c: 0,
    i: "Jura Grey har naturliga ådringar som är en del av materialets karaktär."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "Vad är viktigt att förstå om Jura Grey innan försäljning?",
    a: ["Det är en känslig och porös sten där kunden behöver rätt information", "Det är en helt underhållsfri sten", "Alla märken är fabrikationsfel", "Den är starkare än alla andra material"],
    c: 0,
    i: "Jura Grey kräver tydlig kundinformation."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "Kunden vill ha en Antique Profile. Vad ska säljaren göra innan löfte ges?",
    a: ["Kontakta fabriken och säkerställa att profilen går att producera", "Lovar alltid eftersom alla profiler fungerar", "Ta bort profilvalet", "Endast ändra priset"],
    c: 0,
    i: "Antique Profile måste kontrolleras eftersom fabriker kan skilja sig."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "Vilket material fungerar inte med Antique Profile enligt riktlinjen?",
    a: ["Dekton", "20 mm sten", "30 mm sten", "Natursten"],
    c: 0,
    i: "Antique Profile kan göras i 20 och 30 mm men inte Dekton."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "En kund vill ha 45° kantlimning för att få en tjockare känsla. Vad är viktigt?",
    a: ["Förstå att lösningen kräver rätt kantprofil och korrekt hantering", "Alla kantprofiler fungerar tillsammans", "Det behövs ingen information till fabrik", "Det påverkar aldrig ritningen"],
    c: 0,
    i: "45° kantlimning har specifika krav."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "När används 45° kantlimning främst?",
    a: ["När kunden vill skapa tjockare utseende eller bridge-lösning", "För alla vanliga raka kanter", "Endast för diskhoar", "För att minska stenens vikt"],
    c: 0,
    i: "45° kantlimning används för speciella visuella lösningar."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "En kund vill ha ett specialhål större än standardmått. Hur hanteras det?",
    a: ["Det räknas som ett större specialurtag och hanteras enligt rätt kategori", "Det räknas alltid som ett vanligt litet hål", "Det ska ignoreras", "Det kan alltid göras gratis"],
    c: 0,
    i: "Större hål behöver hanteras som specialurtag."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "Vad är viktigt med kundens diskho och häll innan mätning?",
    a: ["Modell och monteringssätt behöver vara kända", "Det spelar ingen roll förrän installation", "Endast färgen behövs", "Det räcker med ungefärliga mått"],
    c: 0,
    i: "Montering påverkar utskärning och produktion."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "En kund vill ha en lösning där mätning måste ske i två steg. Vad måste säljaren göra?",
    a: ["Informera kunden om processen och eventuell extra kostnad samt dokumentera", "Gömma informationen tills senare", "Lovar att det inte påverkar pris", "Ta bort första mätningen"],
    c: 0,
    i: "Specialfall kräver tydlig kommunikation och dokumentation."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "Varför är det viktigt att skriva tydliga notes vid specialfall?",
    a: ["För att alla involverade ska förstå avvikelsen och nästa steg", "För att fylla systemet med text", "För att kunden inte ska se något", "För att slippa prata med teamet"],
    c: 0,
    i: "Specialfall kräver extra tydlighet."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "En kund vill ha kranlösning för att få in en stor sten utan skarv. Vad är viktigt?",
    a: ["Kontrollera att kunden kan ordna rätt förutsättningar för kranen och öppningen", "Företaget löser alltid kranen automatiskt", "Det behövs ingen planering", "Stenen kan alltid tas in genom trappor"],
    c: 0,
    i: "Kran kräver planering kring plats och åtkomst."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "Vad är viktigast vid en större B2B-affär innan offert skickas?",
    a: ["Samla in projektinformation och säkerställ rätt hantering", "Skicka offert direkt utan frågor", "Endast fråga om pris", "Hoppa över projektinformation"],
    c: 0,
    i: "Större projekt kräver mer information innan offert."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "Vid prisgaranti, vad måste kunden normalt kunna visa?",
    a: ["En konkurrents offert som matchar samma produkter och villkor", "Endast ett muntligt pris", "En gammal bild", "En ungefärlig uppskattning"],
    c: 0,
    i: "Prisgaranti kräver jämförbart underlag."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "En kund avbryter en order och vill ha återbetalning. Vad behöver säljaren göra först?",
    a: ["Samla rätt information och följa återbetalningsrutinen", "Lovar direkt full återbetalning", "Radera projektet", "Skicka kunden till fabriken"],
    c: 0,
    i: "Återbetalningar kräver rätt uppgifter och hantering."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "Vad är ett av de största misstagen en säljare kan göra?",
    a: ["Lovar en lösning utan att kontrollera om den är möjlig", "Ställer frågor", "Dokumenterar", "Kontrollerar information"],
    c: 0,
    i: "Att lova innan kontroll skapar problem senare."
  },
  {
    cat: "Säljarbeslut Expert",
    q: "Vad skiljer en expertanvändare från en vanlig användare?",
    a: ["Experten tänker på hela kedjan från kund till färdig installation", "Experten skriver aldrig anteckningar", "Experten hoppar över rutiner", "Experten använder bara prisfunktionen"],
    c: 0,
    i: "Expertanvändaren ser konsekvenserna av sina beslut."
  },
  {
    cat: "Material Expert",
    q: "En kund säger att de vill ha natursten men vill samtidigt ha en helt enhetlig färg utan variation. Vad är bästa säljarens svar?",
    a: ["Förklara att natursten är ett naturligt material med variationer och att detta är en del av materialets karaktär", "Lovar att stenen blir helt jämn", "Säger att all natursten ser exakt likadan ut", "Byter automatiskt material utan att fråga"],
    c: 0,
    i: "Natursten har naturliga variationer som kunden behöver förstå."
  },
  {
    cat: "Material Expert",
    q: "Vad är viktigast när en kund väljer ett material?",
    a: ["Att kundens förväntningar matchar materialets egenskaper och begränsningar", "Att materialet alltid är billigast", "Att alla material fungerar identiskt", "Att kunden endast väljer färg"],
    c: 0,
    i: "Rätt materialval handlar om både utseende och funktion."
  },
  {
    cat: "Material Expert",
    q: "En kund väljer en sten med mycket ådringar och tror att vissa linjer är sprickor. Vad gör du?",
    a: ["Förklarar skillnaden mellan naturliga strukturer och faktiska skador", "Bekräftar att alla linjer är fel", "Säger att stenen alltid är perfekt homogen", "Avråder alltid från stenen"],
    c: 0,
    i: "Kunden behöver förstå materialets naturliga uttryck."
  },
  {
    cat: "Material Expert",
    q: "Varför är kundens val av diskho viktigt innan produktion?",
    a: ["Monteringstyp och modell påverkar utskärning och utförande", "Diskhon påverkar endast färgen", "Det påverkar aldrig stenen", "Det bestäms alltid efter installation"],
    c: 0,
    i: "Diskho och häll påverkar den tekniska lösningen."
  },
  {
    cat: "Material Expert",
    q: "Vad behöver en säljare veta om en häll innan beställning?",
    a: ["Modell och rätt förutsättningar för utskärning", "Endast färgen på hällen", "Endast priset", "Ingenting förrän installation"],
    c: 0,
    i: "Utskärningar kräver rätt information."
  },
  {
    cat: "Material Expert",
    q: "En kund vill ha en väldigt liten radie på en kantprofil. Vad är rätt?",
    a: ["Kontrollera om lösningen är möjlig innan den lovas", "Lovar alltid eftersom alla profiler går", "Ändrar utan kundens vetskap", "Tar bort profilvalet"],
    c: 0,
    i: "Specialprofiler måste kontrolleras."
  },
  {
    cat: "Material Expert",
    q: "Varför är kantprofilen viktig vid försäljning?",
    a: ["Den påverkar både utseende och hur produkten tillverkas", "Den påverkar endast färgen", "Den spelar ingen roll", "Den väljs alltid av fabriken"],
    c: 0,
    i: "Kantprofil är en del av produktens specifikation."
  },
  {
    cat: "Material Expert",
    q: "En kund vill ha en mycket tunn skiva men förväntar sig massiv tjock känsla. Vad bör säljaren göra?",
    a: ["Förklara möjliga lösningar och kontrollera rätt utförande", "Lovar att alla tjocklekar ger samma resultat", "Ändrar tjocklek själv", "Avslutar affären"],
    c: 0,
    i: "Säljaren måste matcha förväntan med teknisk lösning."
  },
  {
    cat: "Material Expert",
    q: "Vad är risken med att bara sälja på utseende?",
    a: ["Att kunden väljer en lösning som inte passar användning eller installation", "Att priset blir automatiskt högre", "Att systemet slutar fungera", "Att fabriken alltid säger nej"],
    c: 0,
    i: "Materialval måste baseras på hela projektet."
  },
  {
    cat: "Material Expert",
    q: "En kund frågar om alla material tål exakt samma saker. Vad svarar en expert?",
    a: ["Nej, material har olika egenskaper och kräver olika information", "Ja, alla material är identiska", "Det spelar ingen roll", "Endast färgen avgör"],
    c: 0,
    i: "Material skiljer sig i egenskaper och användning."
  },
  {
    cat: "Material Expert",
    q: "En kund vill välja ett material men har mycket höga krav på minimalt underhåll. Vad gör du?",
    a: ["Matchar kundens krav mot materialets egenskaper innan rekommendation", "Lovar att alla material kräver samma underhåll", "Väljer billigaste alternativet", "Undviker frågor"],
    c: 0,
    i: "Säljaren måste hjälpa kunden välja rätt material."
  },
  {
    cat: "Material Expert",
    q: "Vad är en säljares viktigaste uppgift vid materialrådgivning?",
    a: ["Skapa rätt förväntningar så kunden förstår både möjligheter och begränsningar", "Endast sälja dyraste alternativet", "Undvika tekniska frågor", "Alltid välja samma material"],
    c: 0,
    i: "Bra rådgivning minskar problem efter försäljning."
  },
  {
    cat: "Teknisk försäljning",
    q: "Varför är mått kritiska innan produktion?",
    a: ["De styr tillverkning och måste baseras på verkliga förutsättningar", "De är endast ungefärliga", "De påverkar bara priset", "De kan alltid ändras efteråt"],
    c: 0,
    i: "Fel mått kan skapa stora problem senare."
  },
  {
    cat: "Teknisk försäljning",
    q: "En kund vill ändra kökslayout efter att mått är tagna. Vad är rätt?",
    a: ["Förklara att ändringar kan påverka resultatet och måste hanteras innan vidare arbete", "Det spelar ingen roll", "Installatören löser alltid det", "Skicka direkt till produktion"],
    c: 0,
    i: "Mätningen bygger på de faktiska förutsättningarna."
  },
  {
    cat: "Teknisk försäljning",
    q: "Vad är ett specialurtag?",
    a: ["Ett urtag som kräver extra hantering utöver standard", "Ett vanligt standardhål", "Ett kundnamn", "En fakturatyp"],
    c: 0,
    i: "Specialurtag kräver tydlig hantering."
  },
  {
    cat: "Teknisk försäljning",
    q: "Varför måste speciallösningar dokumenteras extra tydligt?",
    a: ["För att minska risken att någon annan tolkar lösningen fel", "För att systemet kräver längre text", "För att kunden inte ska se det", "För att undvika kontakt"],
    c: 0,
    i: "Komplexa lösningar kräver tydlighet."
  },
  {
    cat: "Teknisk försäljning",
    q: "En kund vill ha en lösning som kräver två separata besök. Vad måste säljaren göra?",
    a: ["Förklara processen och eventuell extra kostnad innan beslut", "Dölja extra steg", "Lovar samma pris alltid", "Hoppa över information"],
    c: 0,
    i: "Extra arbete ska kommuniceras tydligt."
  },
  {
    cat: "Teknisk försäljning",
    q: "Vad är viktigast med en speciallösning?",
    a: ["Att alla förstår exakt vad som ska göras och varför", "Att den säljs snabbt", "Att den inte dokumenteras", "Att den alltid behandlas som standard"],
    c: 0,
    i: "Specialfall kräver kontroll och kommunikation."
  },
  {
    cat: "Teknisk försäljning",
    q: "Varför är bilder från kundens miljö värdefulla?",
    a: ["De hjälper andra förstå förutsättningar som inte alltid syns i text", "De ersätter alla mått", "De behövs endast efter installation", "De används bara i reklam"],
    c: 0,
    i: "Bilder minskar risken för missförstånd."
  },
  {
    cat: "Teknisk försäljning",
    q: "När en kund har ett ovanligt önskemål, vad är bästa arbetssättet?",
    a: ["Kontrollera möjligheten innan löfte och dokumentera beslutet", "Lovar direkt", "Avslår alltid", "Tar bort information"],
    c: 0,
    i: "Experten verifierar innan kunden får ett definitivt svar."
  },
  {
    cat: "Specialfall Expert",
    q: "En kund vill att wallstones ska göras men de kan inte mätas förrän bänkskivan är installerad. Vad är korrekt hantering?",
    a: ["Informera kunden att det blir ett extra steg och dokumentera processen tydligt", "Tillverka wallstones baserat på ungefärliga mått", "Lovar kunden att det inte påverkar tid eller kostnad", "Avsluta projektet"],
    c: 0,
    i: "När mätning måste ske senare krävs tydlig kommunikation och dokumentation."
  },
  {
    cat: "Specialfall Expert",
    q: "Vid ett specialfall där standardrutinen inte kan följas, vem ansvarar för att alla är informerade?",
    a: ["Den ansvariga projektpersonen/säljaren som hanterar ärendet", "Endast kunden", "Endast fabriken", "Ingen eftersom det är ett undantag"],
    c: 0,
    i: "Avvikelser kräver aktiv kommunikation mellan alla berörda."
  },
  {
    cat: "Specialfall Expert",
    q: "En order behöver delas upp eftersom fabriken inte kan leverera allt material samtidigt. Vad är viktigast?",
    a: ["Dokumentera uppdelningen och informera alla involverade", "Ändra bara leveransdatum", "Vänta tills kunden frågar", "Ta bort delar från projektet"],
    c: 0,
    i: "Delade ordrar kräver extra kontroll."
  },
  {
    cat: "Specialfall Expert",
    q: "När ett projekt kräver två separata steg på grund av mätning, vad måste kunden förstå?",
    a: ["Att det kan innebära extra kostnad eftersom flera besök krävs", "Att priset aldrig påverkas", "Att första steget inte behövs", "Att installation sker automatiskt"],
    c: 0,
    i: "Extra arbete och besök måste kommuniceras innan."
  },
  {
    cat: "Specialfall Expert",
    q: "Vad ska göras med offerten om extra stenar behöver skapas efter mätning under installation?",
    a: ["En ny offert skapas baserat på ritningen och det extra arbetet", "Den gamla offerten används alltid", "Projektet avslutas", "Ingen dokumentation behövs"],
    c: 0,
    i: "Extra arbete behöver hanteras separat och korrekt."
  },
  {
    cat: "Specialfall Expert",
    q: "En kund är inte överens om kostnaden för ett undantagsfall. Vad är rätt?",
    a: ["Lyfta frågan till ansvarig person enligt rutin", "Ändra priset själv direkt", "Ta bort kostnaden", "Installera ändå"],
    c: 0,
    i: "Osäkra undantag ska eskaleras."
  },
  {
    cat: "Installation Expert",
    q: "Vad är största risken med att boka installation innan projektet är redo?",
    a: ["Montör kan komma utan rätt förutsättningar och skapa förseningar", "Systemet raderar projektet", "Kunden får automatiskt rabatt", "Fabriken stoppar alltid"],
    c: 0,
    i: "Installation kräver att tidigare steg är klara."
  },
  {
    cat: "Installation Expert",
    q: "En kund har inte förberett platsen inför installation. Vad är rätt?",
    a: ["Hantera situationen enligt rutin och dokumentera avvikelsen", "Skylla på kunden direkt", "Installera oavsett", "Ändra gamla anteckningar"],
    c: 0,
    i: "Avvikelser ska dokumenteras och hanteras korrekt."
  },
  {
    cat: "Installation Expert",
    q: "Varför är installationsinformation viktig för säljaren?",
    a: ["För att kundens förväntningar ska matcha vad som faktiskt kan levereras", "För att säljaren ska göra montörens jobb", "För att slippa använda systemet", "För att ändra fabrikspriser"],
    c: 0,
    i: "Säljaren påverkar hela kundupplevelsen."
  },
  {
    cat: "Problemlösning Expert",
    q: "Ett projekt har stannat. Vad är första frågan en expert ställer?",
    a: ["Vad blockerar nästa steg?", "Vem gjorde fel?", "Kan vi dölja projektet?", "Kan kunden vänta?"],
    c: 0,
    i: "Lös problemet genom att hitta orsaken."
  },
  {
    cat: "Problemlösning Expert",
    q: "En kund hävdar att något lovats men det finns ingen dokumentation. Vad gör du först?",
    a: ["Kontrollerar all tillgänglig projektinformation och historik", "Säger direkt att kunden har fel", "Ändrar historiken", "Avslutar ärendet"],
    c: 0,
    i: "Alltid kontrollera fakta innan beslut."
  },
  {
    cat: "Problemlösning Expert",
    q: "Vad är en konsekvens av dåliga notes vid specialfall?",
    a: ["Teamet kan missa viktiga steg och fatta fel beslut", "Systemet blir snabbare", "Kunden får automatiskt information", "Det påverkar bara statistik"],
    c: 0,
    i: "Specialfall kräver tydlighet."
  },
  {
    cat: "Kundkommunikation Expert",
    q: "En kund vill ha en lösning som inte rekommenderas. Vad är säljarens ansvar?",
    a: ["Förklara riskerna tydligt innan kunden fattar beslut", "Lovar eftersom kunden betalar", "Undviker att nämna risker", "Avslutar direkt"],
    c: 0,
    i: "Kunden ska fatta beslut med rätt information."
  },
  {
    cat: "Kundkommunikation Expert",
    q: "Varför ska kunden informeras tidigt om extra kostnader?",
    a: ["För att undvika överraskningar och skapa rätt förväntningar", "För att öka priset", "För att slippa dokumentation", "För att göra processen längre"],
    c: 0,
    i: "Tydlighet skapar förtroende."
  },
  {
    cat: "System & Process Expert",
    q: "En säljare upptäcker ett fel i projektinformationen efter överlämning. Vad är bäst?",
    a: ["Uppdatera informationen direkt och informera berörda", "Låta projektet fortsätta", "Skapa ett separat privat dokument", "Radera projektet"],
    c: 0,
    i: "Korrigering ska ske där projektet hanteras."
  },
  {
    cat: "System & Process Expert",
    q: "Vilket scenario är mest riskfyllt?",
    a: ["En kund har fått ett löfte som inte är kontrollerat eller dokumenterat", "En anteckning är väldigt detaljerad", "En status är uppdaterad korrekt", "Ett dokument finns uppladdat"],
    c: 0,
    i: "Ej verifierade löften skapar ofta de största problemen."
  },
  {
    cat: "System & Process Expert",
    q: "Varför ska man undvika att behandla specialfall som standardärenden?",
    a: ["De kan ha andra krav och risker som behöver extra hantering", "Systemet förbjuder det alltid", "Det tar bort kundens information", "Alla projekt är identiska"],
    c: 0,
    i: "Specialfall kräver mer kontroll."
  },
  {
    cat: "Säljarens ansvar Expert",
    q: "Vad är den bästa definitionen av en professionell StoneFlow-säljare?",
    a: ["En person som säljer och samtidigt säkerställer att projektet kan genomföras korrekt", "En person som bara stänger affärer", "En person som undviker teknik", "En person som aldrig dokumenterar"],
    c: 0,
    i: "Bra försäljning tar ansvar för hela flödet."
  },
  {
    cat: "Säljarens ansvar Expert",
    q: "När ska en säljare vara extra försiktig med att lova en lösning?",
    a: ["När lösningen innehåller specialmått, specialmaterial eller avvikelser", "När kunden frågar pris", "När kunden skickar mejl", "När offerten skapas"],
    c: 0,
    i: "Speciallösningar kräver kontroll innan löfte."
  },
  {
    cat: "Helhetsperspektiv Expert",
    q: "Vad är den största vinsten med korrekt användning av StoneFlow?",
    a: ["Färre missförstånd eftersom hela teamet arbetar med samma information", "Fler manuella steg", "Mer intern administration", "Mindre kundkontakt"],
    c: 0,
    i: "Systemet ska skapa kontroll genom hela processen."
  }
];

export function getCategories(): string[] {
  const cats = Array.from(new Set(questions.map(q => q.cat)));
  return ["Alla kategorier", ...cats];
}

export function filterQuestions(category: string, count: number | "all"): QuizQuestion[] {
  const pool = category === "Alla kategorier"
    ? [...questions]
    : questions.filter(q => q.cat === category);

  const shuffled = pool.sort(() => Math.random() - 0.5);

  if (count === "all") return shuffled;
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export interface PreparedQuestion {
  cat: string;
  q: string;
  a: string[];
  correctIndex: number;
  i: string;
}

export function prepareQuestion(q: QuizQuestion): PreparedQuestion {
  const correct = q.a[q.c];
  const shuffled = [...q.a].sort(() => Math.random() - 0.5);
  return {
    cat: q.cat,
    q: q.q,
    a: shuffled,
    correctIndex: shuffled.indexOf(correct),
    i: q.i,
  };
}
