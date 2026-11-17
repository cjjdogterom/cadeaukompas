import type { Filters } from "./catalog";

export type Guide = {
  slug: string;
  title: string; // H1
  metaTitle: string; // ≤ 60 tekens
  metaDescription: string; // ≤ 155 tekens
  intro: string[]; // alinea's, eigen tekst
  filters: Filters;
  tips: string[];
  faq: { q: string; a: string }[];
  related: string[]; // andere gids-slugs
};

export const guides: Guide[] = [
  {
    slug: "cadeau-onder-25-euro-collega",
    title: "Cadeau onder €25 voor een collega",
    metaTitle: "Cadeau onder €25 voor je collega | OpTijdCadeau",
    metaDescription:
      "Leuke cadeaus tot €25 voor collega's: voor de lootjes, de secret santa of als bedankje. Met levertijd en uiterste besteldatum voor Sinterklaas en kerst.",
    intro: [
      "Lootjes trekken op het werk, een secret santa of gewoon een bedankje voor die ene collega die altijd koffie haalt: het budget ligt meestal rond de €20 en je wilt iets dat past zonder te persoonlijk te worden.",
      "We hebben cadeaus geselecteerd die vrijwel iedereen kan gebruiken, op kantoor of thuis. Bij elk product zie je hoe snel het bezorgd wordt en tot wanneer je kunt bestellen om het op tijd in huis te hebben.",
    ],
    filters: { voor: "collega", budget: "15-25" },
    tips: [
      "Kies iets voor de werkplek of een kleine traktatie: dat past bijna altijd.",
      "Twijfel je over smaak? Een spel of iets lekkers werkt beter dan decoratie.",
      "Laat het prijskaartje zitten van de verpakking af, maar bewaar de bon voor ruilen.",
    ],
    faq: [
      { q: "Hoeveel geef je uit aan een cadeau voor een collega?", a: "Bij lootjes of een secret santa spreken de meeste teams €10 tot €25 af. Houd je aan het afgesproken bedrag; duurder is niet beter." },
      { q: "Wat geef je een collega die je niet goed kent?", a: "Iets praktisch of lekkers: een mok, een spel voor in de pauze of luxe thee. Vermijd persoonlijke verzorging of kleding." },
      { q: "Komt mijn cadeau op tijd voor de borrel?", a: "Bij elk product staat de uiterste besteldatum. Die rekent met werkdagen en een dag extra marge voor de drukte rond de feestdagen." },
    ],
    related: ["sinterklaascadeau-tiener", "kerstpakket-thuiswerker", "cadeau-onder-15-euro", "cadeau-voor-partner"],
  },
  {
    slug: "sinterklaascadeau-tiener",
    title: "Sinterklaascadeau voor een tiener",
    metaTitle: "Sinterklaascadeau voor tieners (13–17) | OpTijdCadeau",
    metaDescription:
      "Sinterklaascadeaus voor tieners van 13 tot 17 jaar: gadgets, spellen en creatieve cadeaus. Met eerlijke levertijd en uiterste besteldatum voor 5 december.",
    intro: [
      "Tieners zijn lastig te verrassen: ze weten precies wat ze willen, of juist helemaal niet. Het helpt om te kiezen vanuit wat ze al doen — gamen, muziek, sporten of iets maken — in plaats van wat jij leuk vindt.",
      "Deze selectie is gericht op 13 tot 17 jaar. Voor de surprise kun je een cadeau goed verstoppen in iets dat met hun hobby te maken heeft; kijk ook bij onze surprise-ideeën.",
    ],
    filters: { voor: "tiener", leeftijd: "13-17", optijd: "sinterklaas" },
    tips: [
      "Vraag broers, zussen of vrienden wat er al in huis is om dubbele cadeaus te voorkomen.",
      "Gadgets: let op welke telefoon of console ze hebben (USB-C, iPhone, Switch, PlayStation).",
      "Een cadeaukaart is prima, maar combineer hem met iets kleins om uit te pakken.",
    ],
    faq: [
      { q: "Wat is een goed sinterklaascadeau voor een tiener van 15?", a: "Iets dat aansluit bij een hobby: een koptelefoon voor muziek, een bordspel voor met vrienden of een creatieve set. Gebruik de filters om op interesse te zoeken." },
      { q: "Tot wanneer kan ik bestellen voor pakjesavond?", a: "Dat verschilt per product; de uiterste besteldatum staat bij elk cadeau en wordt per product berekend. Pakjesavond is op zaterdag 5 december, dus het cadeau moet uiterlijk vrijdag 4 december in huis zijn." },
    ],
    related: ["cadeau-onder-25-euro-collega", "cadeau-onder-15-euro", "kerstpakket-thuiswerker", "sinterklaascadeau-kinderen-8-12"],
  },
  {
    slug: "kerstpakket-thuiswerker",
    title: "Kerstcadeau of kerstpakket voor een thuiswerker",
    metaTitle: "Kerstcadeau voor thuiswerkers | OpTijdCadeau",
    metaDescription:
      "Kerstcadeaus voor wie (deels) thuiswerkt: voor een fijnere werkplek, betere koffie of even pauze. Stel zelf een kerstpakket samen, op tijd voor kerst.",
    intro: [
      "Wie thuiswerkt, heeft weinig aan nog een kerstbal maar veel aan een betere werkplek, goede koffie of iets om de werkdag mee af te sluiten. Daar is deze gids op gericht.",
      "Je kunt één groter cadeau kiezen of zelf een klein kerstpakket samenstellen uit twee of drie producten. Let bij combineren op de levertijd van het traagste product.",
    ],
    filters: { voor: "thuiswerker", optijd: "kerst" },
    tips: [
      "Combineer iets praktisch (bureau, licht, geluid) met iets om van te genieten.",
      "Voor een team: kies één product en geef iedereen hetzelfde, dat scheelt gedoe met bestellen.",
    ],
    faq: [
      { q: "Wat stop je in een kerstpakket voor thuiswerkers?", a: "Denk aan goede koffie of thee, een mok die warm blijft, een bureaulamp of iets voor ontspanning na het werk." },
      { q: "Wanneer moet ik bestellen voor kerst?", a: "Dat verschilt per product. De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, zodat het voor de kerstdagen in huis is." },
    ],
    related: ["cadeau-onder-25-euro-collega", "cadeau-onder-15-euro", "sinterklaascadeau-tiener", "kerstcadeau-voor-vader"],
  },
  {
    slug: "cadeau-onder-15-euro",
    title: "Cadeaus onder €15",
    metaTitle: "Leuke cadeaus onder €15 | OpTijdCadeau",
    metaDescription:
      "Kleine cadeaus tot €15 voor lootjes, in de schoen of als extraatje bij de surprise. Gesorteerd op wie, met levertijd en uiterste besteldatum.",
    intro: [
      "Een klein budget betekent niet dat het cadeau klein moet voelen. Voor lootjes, de schoen of als extraatje bij een surprise zoek je iets dat net even leuker is dan verwacht.",
      "Alle cadeaus hieronder kosten minder dan €15 bij de winkel waar je bestelt. Prijzen kunnen wijzigen; we tonen altijd de datum waarop we de prijs hebben gecontroleerd.",
    ],
    filters: { budget: "tot-15" },
    tips: [
      "Tel verzendkosten mee: sommige winkels rekenen ze onder een minimumbedrag.",
      "Bundel twee kleine cadeaus bij dezelfde winkel om verzendkosten te besparen.",
    ],
    faq: [
      { q: "Wat is een leuk cadeau onder €15?", a: "Kleine spellen, iets lekkers, een goed boek of een handig gadget. Filter op voor wie om sneller iets te vinden." },
    ],
    related: ["cadeau-onder-25-euro-collega", "sinterklaascadeau-tiener", "kerstpakket-thuiswerker", "cadeau-voor-opa-en-oma"],
  },
  {
    slug: "sinterklaascadeau-kinderen-8-12",
    title: "Sinterklaascadeau voor kinderen van 8 tot 12 jaar",
    metaTitle: "Sinterklaascadeau kind 8–12 jaar | OpTijdCadeau",
    metaDescription:
      "Sinterklaascadeaus voor kinderen van 8 tot 12 jaar: LEGO, kaartspellen en bordspellen. Met levertijd en uiterste besteldatum per cadeau.",
    intro: [
      "Tussen 8 en 12 jaar weten kinderen steeds beter wat ze leuk vinden, en dat verandert snel. Wat vorig jaar favoriet was, ligt nu misschien in de kast. Kijk daarom naar wat ze de laatste weken echt doen: bouwen, spelletjes spelen met vrienden, muziek luisteren of gamen.",
      "In deze selectie staan bouwsets, kaartspellen en bordspellen die je met het hele gezin kunt spelen, plus een koptelefoon voor onderweg. Een spel pak je samen uit en kun je meteen uitproberen op pakjesavond, dat maakt het ook handig voor de surprise. Bij elk product zie je de levertijd en de uiterste besteldatum, zodat je niet hoeft te gokken of het op tijd komt. Prijzen en leveropties kunnen wijzigen, dus controleer de winkelpagina nog even voor je bestelt.",
    ],
    filters: { voor: "kind", leeftijd: "8-12", optijd: "sinterklaas" },
    tips: [
      "Check de leeftijdsaanbeveling op de verpakking: veel bouwsets zijn bedoeld voor een bepaalde leeftijd, ook als het kind er technisch al aan toe lijkt.",
      "Een spel dat je met meerdere mensen speelt, is vaak leuker dan een cadeau dat alleen het kind gebruikt. Zeker als er broers, zussen of grootouders op bezoek komen.",
      "Vraag stiekem aan een vriendje of ouder van een klasgenoot wat er al in huis is, zodat je geen dubbel cadeau koopt.",
    ],
    faq: [
      { q: "Wat is een goed sinterklaascadeau voor een kind van 10?", a: "Een bouwset of spel dat past bij wat het kind nu leuk vindt, bijvoorbeeld een LEGO-auto, een snel kaartspel of een bordspel voor het gezin. Gebruik de filters om op interesse te zoeken." },
      { q: "Tot wanneer kan ik bestellen voor pakjesavond?", a: "Dat verschilt per product. De uiterste besteldatum staat bij elk cadeau en wordt door de site per product berekend, inclusief een dag marge voor de drukte." },
      { q: "Hoeveel geef je uit aan een sinterklaascadeau voor een kind?", a: "Daar bestaat geen vaste regel. Veel gezinnen spreken een bedrag af met familie, zodat de cadeaus ongeveer even groot zijn. In deze selectie vind je zowel kleinere als grotere cadeaus." },
    ],
    related: ["sinterklaascadeau-tiener", "cadeau-onder-15-euro", "cadeau-onder-25-euro-collega"],
  },
  {
    slug: "cadeau-voor-partner",
    title: "Cadeau voor je partner",
    metaTitle: "Cadeau voor je partner | OpTijdCadeau",
    metaDescription:
      "Cadeau-ideeën voor je partner: iets voor samen, voor thuis of om zelf van te genieten. Met levertijd en uiterste besteldatum per cadeau.",
    intro: [
      "Een cadeau voor je partner hoeft niet groot te zijn, maar het moet wel laten zien dat je hebt nagedacht. Dat lukt het best als je kijkt naar wat iemand echt doet: elke ochtend koffie zetten, in de avond lezen, spelletjes spelen of juist een uurtje rust zoeken.",
      "Hieronder staan cadeaus voor uiteenlopende smaken: een boek of spel voor een gezellige avond, iets om zelf te bouwen, een koffiezetter of een verwenmoment. Sommige zijn voor samen, andere helemaal voor de ander. Bij elk product zie je hoe snel het geleverd wordt en tot wanneer je kunt bestellen voor Sinterklaas of kerst. Prijzen kunnen veranderen; we tonen de datum waarop we de prijs hebben gecontroleerd.",
    ],
    filters: { voor: "partner" },
    tips: [
      "Kies iets dat past bij een gewoonte die je partner al heeft, in plaats van iets dat je zelf graag zou krijgen.",
      "Een cadeau voor samen, zoals een spel of een bouwproject, geeft meteen een gezamenlijke avond cadeau.",
      "Combineer iets kleins en lekkers met iets groters. Dan heb je iets om te openen, ook als het grote cadeau een dag later pas binnenkomt.",
    ],
    faq: [
      { q: "Wat geef je je partner als jullie alles al hebben?", a: "Kies voor ervaringen in huis of iets dat verbruikt wordt: een spel voor samen, een goed boek, lekkers of een verwenset. Dan hoef je geen ruimte te vinden voor nog meer spullen." },
      { q: "Hoeveel mag een cadeau voor een partner kosten?", a: "Dat bepaal je zelf. Een persoonlijk gekozen cadeau voor een beperkt bedrag werkt vaak beter dan een duur cadeau waar weinig over is nagedacht." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "Bij elk product staat de uiterste besteldatum voor beide momenten. Die is gebaseerd op de verwachte levertijd van de winkel plus een dag marge." },
    ],
    related: ["cadeau-onder-25-euro-collega", "kerstcadeau-voor-vader", "cadeau-voor-opa-en-oma"],
  },
  {
    slug: "cadeau-voor-opa-en-oma",
    title: "Cadeau voor opa en oma",
    metaTitle: "Cadeau voor opa en oma | OpTijdCadeau",
    metaDescription:
      "Cadeaus voor opa en oma die ze echt gebruiken: warmte, lekkers, een spel of een boek. Met levertijd en uiterste besteldatum voor Sinterklaas en kerst.",
    intro: [
      "Opa en oma hebben vaak al alles, en een cadeau dat in een la verdwijnt is zonde. Het helpt om te kiezen voor iets dat ze dagelijks merken of samen met jullie kunnen gebruiken: iets lekkers, iets warms voor de winter of een spel voor als de kleinkinderen langskomen.",
      "Let bij deze leeftijdsgroep vooral op gebruiksgemak. Een cadeau dat je eerst moet instellen, koppelen of installeren is zelden een succes. Hieronder staan cadeaus die je uit de doos haalt en direct kunt gebruiken. Bij elk product zie je de levertijd en tot wanneer je kunt bestellen voor Sinterklaas of kerst. Heb je een cadeau gekozen met een stekker? Controleer dan even de verpakking en de gebruiksaanwijzing voordat je het inpakt.",
    ],
    filters: { voor: "opa-oma" },
    tips: [
      "Kies iets dat zonder handleiding werkt. Wat niet meteen duidelijk is, wordt vaak niet gebruikt.",
      "Een spel of puzzel is een cadeau voor jezelf erbij: je speelt het bij het volgende bezoek meteen samen.",
      "Zorg dat het cadeau makkelijk uit de verpakking te halen is, zeker als je het laat bezorgen of opsturen.",
    ],
    faq: [
      { q: "Wat geef je opa en oma die alles al hebben?", a: "Iets dat op raakt of dat ze zelf niet snel zouden kopen: lekkers, een verwenproduct, een boek of iets voor extra warmte in de winter." },
      { q: "Kan ik een cadeau rechtstreeks naar opa en oma laten bezorgen?", a: "Vaak kan dat met een ander bezorgadres, maar dat verschilt per winkel. Je bestelt wel bij de winkel zelf; we sturen je door via onze links. Controleer bij het bestellen het afleveradres en de levertijd." },
      { q: "Wanneer moet ik bestellen voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau. We rekenen met werkdagen en een dag extra marge voor de drukte." },
    ],
    related: ["kerstcadeau-voor-vader", "cadeau-voor-partner", "cadeau-onder-15-euro"],
  },
  {
    slug: "kerstcadeau-voor-vader",
    title: "Kerstcadeau voor je vader",
    metaTitle: "Kerstcadeau voor je vader | OpTijdCadeau",
    metaDescription:
      "Kerstcadeaus voor je vader: voor in de keuken, voor een spelletjesavond of om zelf te bouwen. Met levertijd en uiterste besteldatum voor 24 december.",
    intro: [
      "Wat geef je je vader met kerst als hij zelf zegt dat hij niets nodig heeft? Kijk naar wat hij in zijn vrije tijd doet. Houdt hij van koken en koffie, van puzzelen en bouwen, of van een spelletje met de familie na het kerstdiner?",
      "In deze selectie staan cadeaus die daarbij passen: iets voor de keuken, een spel voor de feestdagen, een boek of een bouwset voor een rustige middag. Gebruiksgemak gaat voor gadgets die veel uitleg nodig hebben. Bij elk product zie je de levertijd en de uiterste besteldatum voor bezorging voor kerst. Je hoeft dus niet te gokken of het pakje nog op tijd komt. Prijzen kunnen veranderen, daarom tonen we de datum waarop de prijs is gecontroleerd.",
    ],
    filters: { voor: "vader", optijd: "kerst" },
    tips: [
      "Kijk wat hij al elke dag gebruikt en kies een betere versie of iets dat daarbij past.",
      "Een spel voor de kerstdagen is een cadeau voor het hele gezin, ook als het op zijn naam staat.",
      "Check bij keukenspullen of ze bij zijn fornuis of apparatuur passen, bijvoorbeeld bij een inductieplaat.",
    ],
    faq: [
      { q: "Wat geef je je vader voor kerst als hij alles al heeft?", a: "Iets dat hij opmaakt of samen met anderen gebruikt: een spel, lekkers, een goed boek of iets voor koffie en eten. Dat voelt minder als nog meer spullen." },
      { q: "Wanneer moet ik bestellen voor kerst?", a: "Dat verschilt per product. De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, inclusief een dag extra marge." },
      { q: "Is dit ook een goed cadeau voor Sinterklaas?", a: "Veel cadeaus passen ook bij Sinterklaas, maar de besteldeadline ligt dan eerder. Kijk bij het product naar de uiterste besteldatum per gelegenheid." },
    ],
    related: ["cadeau-voor-partner", "cadeau-voor-opa-en-oma", "kerstpakket-thuiswerker"],
  },
  {
    slug: "cadeau-voor-moeder",
    title: "Cadeau voor je moeder",
    metaTitle: "Cadeau voor moeder: Sinterklaas en kerst | OpTijdCadeau",
    metaDescription:
      "Cadeau-ideeën voor je moeder voor Sinterklaas of kerst: warmte, lekkers, een goed boek of een verwenmoment. Met levertijd en besteldatum per cadeau.",
    intro: [
      "Veel moeders zijn goed in zorgen voor een ander en minder goed in iets voor zichzelf kopen. Een cadeau dat past bij Sinterklaas of kerst mag daarom best een beetje verwennerij zijn: iets om bij weg te zakken, iets lekkers voor bij de koffie of een boek voor een rustige avond.",
      "In deze selectie staan cadeaus die ze direct kan gebruiken, zoals een warmtekussen of voetenwarmer voor de koude maanden, een spannend boek, handcrème, chocolade of een yogamat voor even tijd voor zichzelf. Kies vooral iets dat past bij wat jouw moeder doet als ze eindelijk even zit. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Prijzen kunnen veranderen; we tonen de datum waarop we de prijs hebben gecontroleerd.",
    ],
    filters: { voor: "moeder" },
    tips: [
      "Kijk naar wat ze zelf nooit zou kopen, maar wel fijn vindt: een extra warm kussen, een mooie peper- en zoutmolen of een boek van een schrijver die ze graag leest.",
      "Een persoonlijk kaartje of een gedicht erbij maakt een klein cadeau meteen groter.",
      "Elektrische cadeaus, zoals een voetenwarmer, werken het best als je even checkt of ze de bediening duidelijk vindt. Kies bij twijfel iets zonder stekker.",
    ],
    faq: [
      { q: "Wat geef je je moeder voor Sinterklaas of kerst?", a: "Iets waar ze zelf zelden tijd of ruimte voor maakt: warmte voor de winter, lekkers, een goed boek of een verwenset. Kies liever één persoonlijk cadeau dan veel kleine dingen." },
      { q: "Wat geef je een moeder die zegt dat ze niets nodig heeft?", a: "Kies iets dat op raakt of een gezellig moment oplevert, zoals chocolade, handcrème of een boek. Dat voelt niet als extra spullen en toch weet ze dat je aan haar gedacht hebt." },
      { q: "Komt het cadeau op tijd voor pakjesavond of kerst?", a: "Bij elk product staat de uiterste besteldatum voor beide momenten. Die wordt per product berekend op basis van de verwachte levertijd van de winkel, met een dag extra marge." },
    ],
    related: ["cadeau-voor-partner", "kerstcadeau-voor-vader", "cadeau-voor-opa-en-oma", "cadeau-onder-25-euro-collega"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
