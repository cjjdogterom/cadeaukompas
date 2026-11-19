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
    related: ["sinterklaascadeau-tiener", "kerstpakket-thuiswerker", "cadeau-onder-15-euro", "cadeau-voor-partner", "cadeau-thuiswerker-50-100-euro", "kerstcadeau-onder-50-euro", "cadeau-voor-een-vriend"],
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
    related: ["gamecadeau-tiener-13-17", "sinterklaascadeau-kinderen-8-12", "cadeau-onder-25-euro-collega", "cadeau-onder-15-euro", "kerstcadeau-voor-tiener"],
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
    related: ["cadeau-onder-25-euro-collega", "cadeau-onder-15-euro", "sinterklaascadeau-tiener", "kerstcadeau-voor-vader", "cadeau-thuiswerker-50-100-euro", "sportcadeau-voor-volwassenen", "kerstcadeau-onder-50-euro"],
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
    related: ["cadeau-onder-25-euro-collega", "sinterklaascadeau-tiener", "cadeau-kinderen-4-7-jaar", "sinterklaascadeau-baby-peuter"],
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
    related: ["sinterklaascadeau-tiener", "gamecadeau-tiener-13-17", "cadeau-kinderen-4-7-jaar", "sinterklaascadeau-baby-peuter", "sinterklaascadeau-jongens-8-12", "muziekcadeau", "creatief-cadeau", "sinterklaascadeau-meisjes-8-12"],
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
    related: ["cadeau-onder-25-euro-collega", "cadeau-voor-moeder", "kerstcadeau-voor-vader", "cadeau-voor-opa-en-oma", "sportcadeau-voor-volwassenen", "cadeau-voor-wie-graag-kookt", "cadeau-thuiswerker-50-100-euro", "cadeau-voor-fijnproevers", "muziekcadeau", "verwencadeau-voor-haar", "cadeau-voor-lezers", "cadeau-voor-een-vriend", "cadeau-voor-wie-alles-heeft", "cadeau-partner-50-100-euro", "cadeau-partner-boven-100-euro"],
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
    related: ["puzzel-en-spelcadeau-oma-opa", "cadeau-voor-moeder", "kerstcadeau-voor-vader", "sinterklaascadeau-baby-peuter", "cadeau-voor-wie-graag-kookt", "cadeau-voor-wie-alles-heeft"],
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
    related: ["cadeau-vader-klussen-gereedschap", "cadeau-voor-partner", "cadeau-voor-moeder", "cadeau-voor-opa-en-oma", "sportcadeau-voor-volwassenen", "cadeau-voor-wie-graag-kookt", "sinterklaascadeau-voor-vader"],
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
    related: ["cadeau-voor-partner", "kerstcadeau-voor-vader", "cadeau-voor-opa-en-oma", "cadeau-onder-25-euro-collega", "sportcadeau-voor-volwassenen", "cadeau-voor-wie-graag-kookt", "cadeau-voor-fijnproevers", "verwencadeau-voor-haar", "cadeau-voor-lezers", "kerstcadeau-voor-moeder-onder-50"],
  },
  {
    slug: "sinterklaascadeau-baby-peuter",
    title: "Sinterklaascadeaus voor baby en peuter (0–3 jaar)",
    metaTitle: "Sinterklaascadeau baby en peuter (0–3) | OpTijdCadeau",
    metaDescription:
      "Sinterklaascadeaus voor baby's en peuters van 0 tot 3 jaar: DUPLO, grijp- en bijtspeelgoed en eerste puzzels. Met levertijd en uiterste besteldatum.",
    intro: [
      "Een baby of peuter weet nog niet dat het pakjesavond is, maar de ouders en grootouders hebben er wel zin in. Voor deze leeftijd zoek je speelgoed dat veilig is, makkelijk vast te pakken en niet na een dag in de kast verdwijnt. Bij baby's draait het om voelen, kijken en bijten, bij peuters om stapelen, puzzelen en nadoen.",
      "In deze selectie staan grijp- en bijtspeelgoed, rammelaars, grote DUPLO-stenen, eerste puzzels en een prentenboek. Let altijd op de leeftijdsaanduiding op de verpakking: kleine onderdelen zijn niet geschikt voor jonge kinderen die dingen nog in hun mond stoppen. Bij elk product zie je de levertijd en de uiterste besteldatum voor pakjesavond, berekend per product. Prijzen kunnen wijzigen; we tonen de datum waarop we de prijs hebben gecontroleerd.",
    ],
    filters: { voor: "kind", leeftijd: "0-3", optijd: "sinterklaas" },
    tips: [
      "Lees de leeftijdsaanduiding op de verpakking. Bij kinderen onder 3 jaar telt veiligheid zwaarder dan wat er leuk uitziet.",
      "Vraag de ouders wat er al in huis is. Veel gezinnen hebben al een berg knuffels, maar nog geen eerste bouwset of puzzel.",
      "Een prentenboek of kleine bouwset past ook in de schoen en is een rustig cadeau voor tussendoor.",
    ],
    faq: [
      { q: "Wat geef je een baby voor Sinterklaas?", a: "Kies iets kleins dat veilig vast te pakken is, zoals een rammelaar, een grijpspeeltje of een bijtspeeltje. Check de leeftijd op de verpakking; een baby heeft vooral aan eenvoudig speelgoed genoeg." },
      { q: "Vanaf welke leeftijd kan een kind spelen met DUPLO?", a: "De DUPLO-sets in deze selectie zijn bedoeld voor kinderen vanaf ongeveer 18 maanden. De stenen zijn groot, maar kijk altijd op de verpakking naar de aanbevolen leeftijd." },
      { q: "Wanneer moet ik bestellen voor pakjesavond?", a: "Dat verschilt per product. De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, inclusief een dag marge voor de drukte." },
    ],
    related: ["cadeau-kinderen-4-7-jaar", "sinterklaascadeau-kinderen-8-12", "cadeau-voor-opa-en-oma", "cadeau-onder-15-euro"],
  },
  {
    slug: "cadeau-kinderen-4-7-jaar",
    title: "Cadeaus voor kinderen van 4–7 jaar",
    metaTitle: "Cadeau voor kinderen van 4–7 jaar | OpTijdCadeau",
    metaDescription:
      "Cadeaus voor kinderen van 4 tot 7 jaar voor Sinterklaas of kerst: LEGO, kaartspellen en puzzels. Met levertijd en uiterste besteldatum per cadeau.",
    intro: [
      "Kleuters en kinderen in de onderbouw staan midden in hun fantasiespel. Ze bouwen, puzzelen, spelen samen en nemen hun favoriete tekenfilmfiguren overal mee naartoe. Een goed cadeau sluit aan bij waar het kind nu mee bezig is, en niet bij wat jij vroeger leuk vond.",
      "In deze selectie staan bouwsets, kaartspellen, puzzels en andere cadeaus die bij deze leeftijd passen. Spellen kunnen vaak al met een ouder of een broer of zus gespeeld worden, ook als het kind nog niet goed leest. Check bij elk product de leeftijdsaanduiding op de verpakking, want die verschilt per set. Bij elk cadeau zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst. Prijzen kunnen wijzigen; we tonen de datum waarop we de prijs hebben gecontroleerd.",
    ],
    filters: { voor: "kind", leeftijd: "4-7" },
    tips: [
      "Kies bij een bouwset een kleine set als je twijfelt. Die is sneller klaar en het kind heeft meteen een succeservaring.",
      "Een spel dat je samen speelt, is vaak leuker dan speelgoed dat alleen gebruikt wordt. Let op of het zonder lezen te spelen is.",
      "Bekende figuren uit een serie zijn populair, maar smaak verandert snel. Vraag de ouders wat het kind nu kijkt of speelt.",
    ],
    faq: [
      { q: "Wat is een goed cadeau voor een kind van 5 of 6 jaar?", a: "Een bouwset, een puzzel of een eenvoudig kaartspel dat past bij wat het kind nu leuk vindt. Kijk vooral naar de leeftijdsaanduiding en of het kind het zelf kan spelen of samen met een ouder." },
      { q: "Zijn deze cadeaus ook geschikt voor Sinterklaas en kerst?", a: "Veel cadeaus passen bij beide momenten. De uiterste besteldatum verschilt per gelegenheid en staat bij elk product." },
      { q: "Hoe voorkom ik dat ik hetzelfde cadeau koop als iemand anders?", a: "Vraag de ouders of spreek met de familie af wie wat koopt. Een spel of bouwset dat al in huis is, kan wel een uitbreiding krijgen, maar vraag dat even na." },
    ],
    related: ["sinterklaascadeau-baby-peuter", "sinterklaascadeau-kinderen-8-12", "cadeau-onder-15-euro", "cadeau-voor-opa-en-oma", "creatief-cadeau", "spelcadeau-bord-en-kaartspellen"],
  },
  {
    slug: "cadeau-vader-klussen-gereedschap",
    title: "Cadeau voor een vader die van klussen houdt",
    metaTitle: "Cadeau voor vader die klust: gereedschap | OpTijdCadeau",
    metaDescription:
      "Gereedschap en klusspullen als cadeau voor een vader die graag klust: boormachine, schroevendraaiers, waterpas en meer. Met levertijd en besteldatum.",
    intro: [
      "Een vader die graag klust heeft meestal al een schuur vol gereedschap, en toch ligt er altijd iets niet op de goede plek of is er iets stuk of zoek. Een goed klusgeschenk lost dat soort kleine ergernissen op: een koffer waarin alles bij elkaar zit, een waterpas die wel recht blijft meten of een set bits die compleet is.",
      "In deze selectie staan accuboormachines, schroevendraaiersets, tangen, een rolbandmaat, een laserafstandsmeter en opbergers voor gereedschap. Kijk eerst wat hij al gebruikt: heeft hij een bepaald merk accu's, dan is een machine van hetzelfde systeem handiger. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. De winkel is bol; wij sturen je door en verkopen zelf niets.",
    ],
    filters: { voor: "vader", interesse: "bouwen" },
    tips: [
      "Vraag stiekem aan een broer, zus of partner welk merk accugereedschap hij al heeft. Een accu die op bestaande machines past is meer waard dan een losse machine.",
      "Kies bij twijfel iets dat altijd van pas komt, zoals een goede schroevendraaierset of een rolbandmaat. Dat ligt minder snel dubbel dan een groot apparaat.",
      "Een opbergkoffer of gereedschapstas is een cadeau dat je als aanvulling kunt geven bij een kleiner stuk gereedschap.",
    ],
    faq: [
      { q: "Wat geef je een vader die graag klust?", a: "Iets dat hij tijdens elke klus gebruikt: een set schroevendraaiers of tangen, een rolbandmaat, een waterpas of een koffer om alles in te bewaren. Zo weet je dat het cadeau gebruikt wordt." },
      { q: "Is een boormachine een goed cadeau?", a: "Dat kan, maar kijk eerst of hij al een accusysteem heeft. Past de accu bij zijn andere gereedschap, dan is het een handige aanvulling. Heeft hij er nog geen, dan is een eenvoudige accuboormachine een prima begin." },
      { q: "Tot wanneer kan ik bestellen voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend op basis van de verwachte levertijd, met een dag extra marge." },
    ],
    related: ["kerstcadeau-voor-vader", "cadeau-voor-partner", "cadeau-voor-opa-en-oma", "cadeau-onder-25-euro-collega", "sinterklaascadeau-voor-vader"],
  },
  {
    slug: "gamecadeau-tiener-13-17",
    title: "Cadeau voor een tiener die gamet (13–17 jaar)",
    metaTitle: "Gamecadeau voor tieners (13–17) | OpTijdCadeau",
    metaDescription:
      "Cadeaus voor tieners die gamen: headsets, controllers, muizen, muismatten en games voor Switch en PS5. Met levertijd en uiterste besteldatum.",
    intro: [
      "Een tiener die veel gamet weet vaak precies wat hij of zij mist: een betere muis, een headset die niet knijpt of een tweede controller zodat vrienden mee kunnen doen. Het lastige is dat je niet kunt zien welk systeem er in huis staat en welke spellen al in de kast liggen.",
      "In deze selectie staan gaming headsets, controllers, muizen, muismatten, ledstrips voor op de kamer en games voor de Nintendo Switch en PS5. Controleer vooraf op welk systeem er gespeeld wordt, want een game voor de Switch werkt niet op een PS5. Kijk ook naar de leeftijdsaanduiding van een spel op de verpakking of de winkelpagina. Bij elk product zie je de levertijd en de uiterste besteldatum voor pakjesavond of kerst. Je bestelt bij bol; wij verkopen zelf niets.",
    ],
    filters: { voor: "tiener", leeftijd: "13-17", interesse: "gamen" },
    tips: [
      "Vraag een vriend of broer of zus op welk systeem er gespeeld wordt en welke games al in huis zijn, voordat je een spel koopt.",
      "Accessoires zoals een muismat of controller zijn veiliger dan een game: ze passen bij bijna elke opstelling en liggen minder snel dubbel.",
      "Let bij een headset op de aansluiting. Sommige werken via USB, andere via een gewone audioplug, en niet elke aansluiting past op elke console.",
    ],
    faq: [
      { q: "Wat geef je een tiener die gamet?", a: "Een accessoire dat bij het systeem past, zoals een headset, een extra controller of een muismat, of een game waarvan je zeker weet dat hij of zij hem nog niet heeft." },
      { q: "Hoe weet ik of een game geschikt is voor mijn kind?", a: "Kijk naar de PEGI-leeftijdsaanduiding op de verpakking of de productpagina. Die geeft aan vanaf welke leeftijd een spel is bedoeld." },
      { q: "Tot wanneer kan ik bestellen voor pakjesavond?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, inclusief een dag marge voor de drukte. Pakjesavond is zaterdag 5 december, dus het cadeau moet uiterlijk vrijdag 4 december in huis zijn." },
    ],
    related: ["sinterklaascadeau-tiener", "sinterklaascadeau-kinderen-8-12", "cadeau-onder-25-euro-collega", "kerstpakket-thuiswerker", "sinterklaascadeau-jongens-8-12", "muziekcadeau", "creatief-cadeau", "cadeau-voor-een-vriend", "techcadeau", "kerstcadeau-voor-tiener"],
  },
  {
    slug: "puzzel-en-spelcadeau-oma-opa",
    title: "Puzzel- en spelcadeau voor oma en opa",
    metaTitle: "Puzzel- en spelcadeau voor oma en opa | OpTijdCadeau",
    metaDescription:
      "Puzzels, kaartspellen en denkspellen als cadeau voor oma en opa: rustig samen te doen. Met levertijd en uiterste besteldatum per cadeau.",
    intro: [
      "Een cadeau voor oma of opa mag best iets zijn waar ze de hele winter plezier van hebben. Een puzzel van 1000 stukjes ligt dagenlang op tafel, een kaartspel gaat mee naar de volgende familiemiddag en een puzzelboek vult een rustige ochtend. Dat past bij mensen die graag bezig zijn zonder dat er een stekker of handleiding aan te pas komt.",
      "In deze selectie staan legpuzzels met uiteenlopende plaatjes, kaartspellen die je in een paar minuten uitlegt, denkspellen en puzzelboeken. Let bij een puzzel op de afmeting van het eindresultaat en op de grootte van de stukjes: niet iedereen vindt kleine stukjes prettig. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst. Je bestelt bij bol; wij sturen je door en verkopen zelf niets. Zoek je iets anders voor opa en oma, kijk dan ook in de algemene gids.",
    ],
    filters: { voor: "opa-oma", interesse: "spellen", leeftijd: "volwassen" },
    tips: [
      "Kies een plaatje dat past bij wat ze mooi vinden: een stad, bloemen of een kerstthema. Een puzzel die ze niet mooi vinden, wordt niet gelegd.",
      "Een spel dat je samen kunt spelen maakt het cadeau ook een afspraak: speel het meteen bij het volgende bezoek.",
      "Heeft oma of opa moeite met kleine stukjes of kleine letters? Kies dan een spel met grote kaarten of een puzzel met minder stukjes.",
    ],
    faq: [
      { q: "Wat geef je oma die graag puzzelt?", a: "Een legpuzzel met een plaatje dat ze mooi vindt, bij voorkeur van een merk waarvan ze er al eens een heeft gelegd. Heb je geen idee, kies dan een rustig plaatje zonder te veel details." },
      { q: "Welk spel is geschikt voor opa en oma?", a: "Een spel dat je in een paar minuten uitlegt en dat met twee of meer mensen werkt, zoals een kaartspel. Kijk op de verpakking naar het aantal spelers en de speelduur." },
      { q: "Wanneer moet ik bestellen voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau. We rekenen met werkdagen en een dag extra marge voor de drukte." },
    ],
    related: ["cadeau-voor-opa-en-oma", "cadeau-voor-moeder", "kerstcadeau-voor-vader", "cadeau-onder-15-euro", "cadeau-voor-lezers", "spelcadeau-bord-en-kaartspellen"],
  },
  {
    slug: "sportcadeau-voor-volwassenen",
    title: "Sportcadeau voor een sportieve volwassene",
    metaTitle: "Sportcadeau voor volwassenen | OpTijdCadeau",
    metaDescription:
      "Sportcadeaus voor wie hardloopt, fit blijft of yogaat: yogamatten, foam rollers, drinkflessen en meer. Met levertijd en uiterste besteldatum per cadeau.",
    intro: [
      "Wie veel sport, heeft meestal al de basis in huis. Een goed sportcadeau sluit daarom aan bij wat iemand écht doet: elke week een rondje hardlopen, thuis trainen, een yogales volgen of na het werk even naar de sportschool. Kijk eerst welke sport het is en wat er al in de tas zit, dan wordt kiezen een stuk makkelijker.",
      "In deze selectie staan onder meer yogamatten, foam rollers, weerstandsbanden, een kettlebell, een hardloophorloge en activity tracker, sportoordopjes, drinkflessen en massageapparaten voor het herstel na een training. Let bij elektronica op de aansluiting en op de telefoon of het horloge dat iemand al heeft. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, daarom tonen we de datum waarop we de prijs hebben gecontroleerd.",
    ],
    filters: { leeftijd: "volwassen", interesse: "sport" },
    tips: [
      "Kies iets voor het herstel of voor onderweg, zoals een foam roller of een goede drinkfles. Die gebruikt iedere sporter, ook als hij of zij al van alles heeft.",
      "Vraag stiekem aan een sportmaatje welke apparaten er al zijn, zodat je geen tweede horloge of tracker koopt.",
      "Bij een yogamat telt de dikte en de maat: een dikkere mat is zachter voor de knieën, een dunnere ligt stabieler bij staande houdingen.",
    ],
    faq: [
      { q: "Wat geef je iemand die veel sport?", a: "Iets dat past bij de sport die diegene doet en dat het sporten prettiger maakt: een foam roller of massageapparaat voor het herstel, een goede fles of oordopjes voor onderweg." },
      { q: "Is een hardloophorloge of activity tracker een goed cadeau?", a: "Dat kan, als de ontvanger de gegevens wil bijhouden. Check of iemand al een horloge draagt en welke telefoon er in gebruik is, want niet elke app werkt met elk apparaat." },
      { q: "Wat geef je als ik niet weet welke sport iemand doet?", a: "Kies iets dat bij bijna elke sport van pas komt, zoals een drinkfles of een foam roller. Die zijn nuttig voor wie hardloopt, fit blijft of yogaat." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend op basis van de verwachte levertijd, met een dag extra marge." },
    ],
    related: ["cadeau-voor-partner", "cadeau-voor-moeder", "kerstcadeau-voor-vader", "kerstpakket-thuiswerker", "muziekcadeau"],
  },
  {
    slug: "cadeau-voor-wie-graag-kookt",
    title: "Cadeau voor iemand die graag kookt en bakt",
    metaTitle: "Cadeau voor wie graag kookt en bakt | OpTijdCadeau",
    metaDescription:
      "Cadeaus voor wie graag kookt of bakt: kookboeken, bakvormen, pannen en keukengerei. Met levertijd en uiterste besteldatum voor Sinterklaas en kerst.",
    intro: [
      "Wie graag kookt of bakt, kijkt bij een cadeau vooral naar wat er in de keuken echt gebruikt wordt. Een kookboek met recepten die je ook echt wilt maken, een bakvorm in de goede maat of een spatel die niet smelt: het zijn kleine dingen die elke week terugkomen.",
      "In deze selectie staan kookboeken en bakboeken, bakvormen en ovenschalen, pannen, keukengerei, een handmixer en spullen voor de barbecue. Kijk voor je kiest wat er al in de keukenkast ligt, bijvoorbeeld welke maat bakvorm iemand gebruikt en of er een inductieplaat is. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen veranderen, daarom tonen we de datum waarop we de prijs hebben gecontroleerd.",
    ],
    filters: { leeftijd: "volwassen", interesse: "koken" },
    tips: [
      "Check bij pannen of ze geschikt zijn voor het fornuis van de ontvanger, bijvoorbeeld inductie, en bij een bakvorm welke maat er al is.",
      "Een kookboek is een veilige keuze als je weet wat voor keuken iemand leuk vindt: vegetarisch, Italiaans, bakken of barbecueën.",
      "Combineer een boek met een klein stuk keukengerei. Dan heeft iemand meteen iets om mee aan de slag te gaan.",
    ],
    faq: [
      { q: "Wat geef je iemand die graag kookt?", a: "Iets dat vaak gebruikt wordt: een kookboek in de smaak van de ontvanger, een goede pan of handig keukengerei. Kies liever één degelijk ding dan een hele set die in de kast verdwijnt." },
      { q: "Wat is een goed cadeau voor iemand die graag bakt?", a: "Een bakvorm of ovenschaal in een maat die vaak nodig is, een bakboek of een handmixer. Kijk eerst welke vormen iemand al heeft." },
      { q: "Zijn kookcadeaus ook geschikt voor Sinterklaas en kerst?", a: "Ja, veel keukencadeaus passen bij beide momenten. De uiterste besteldatum verschilt per gelegenheid en staat bij elk product." },
    ],
    related: ["cadeau-voor-partner", "cadeau-voor-moeder", "kerstcadeau-voor-vader", "cadeau-voor-opa-en-oma", "cadeau-voor-fijnproevers"],
  },
  {
    slug: "cadeau-thuiswerker-50-100-euro",
    title: "Cadeau voor een thuiswerker van €50 tot €100",
    metaTitle: "Cadeau thuiswerker €50 tot €100 | OpTijdCadeau",
    metaDescription:
      "Cadeaus voor thuiswerkers tussen €50 en €100: muis, toetsenbord, bureaulamp, koptelefoon en meer. Met levertijd en uiterste besteldatum per cadeau.",
    intro: [
      "Een thuiswerker zit al snel acht uur per dag op dezelfde plek. Dan merk je kleine verbeteringen direct: een muis die prettig in de hand ligt, een laptop op ooghoogte of licht dat niet in je ogen schijnt. Met een budget tussen €50 en €100 kun je daar goed in kiezen.",
      "In deze selectie staan draadloze muizen en toetsenborden, een laptopstandaard, een monitorlamp, sfeerverlichting, koptelefoons met ruisonderdrukking, koffiemachines en een voetenwarmer voor koude dagen. Kijk eerst wat er al op het bureau staat, bijvoorbeeld welk merk en welke aansluiting iemand gebruikt, zodat het cadeau past. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, daarom tonen we de datum waarop we de prijs hebben gecontroleerd.",
    ],
    filters: { voor: "thuiswerker", budget: "50-100" },
    tips: [
      "Kijk wat er al op het bureau staat. Een muis of toetsenbord moet passen bij de aansluiting en het besturingssysteem van de ontvanger.",
      "Iets voor een betere houding, zoals een laptopstandaard of ergonomische muis, wordt dagelijks gebruikt en valt minder snel in de categorie nog meer spullen.",
      "Wil je een kleiner cadeau erbij? Combineer iets praktisch met iets om van te genieten, bijvoorbeeld goede koffie of thee.",
    ],
    faq: [
      { q: "Wat geef je een thuiswerker voor €50 tot €100?", a: "Iets voor de werkplek dat dagelijks gebruikt wordt: een muis of toetsenbord, een laptopstandaard, een monitorlamp of een koptelefoon die omgevingsgeluid dempt." },
      { q: "Is een koptelefoon met noise cancelling een goed cadeau voor thuiswerkers?", a: "Vaak wel, vooral als iemand veel belt of in een huis met meer mensen werkt. Kijk of iemand de voorkeur heeft voor over-ear of oordopjes." },
      { q: "Wat is het verschil met de kerstgids voor thuiswerkers?", a: "Deze gids is gericht op een budget van €50 tot €100 en geldt voor elk moment van het jaar. De kerstgids toont cadeaus in alle prijsklassen die voor kerst nog op tijd komen." },
    ],
    related: ["kerstpakket-thuiswerker", "cadeau-onder-25-euro-collega", "cadeau-voor-partner", "muziekcadeau", "cadeau-voor-lezers", "techcadeau"],
  },
  {
    slug: "muziekcadeau",
    title: "Muziekcadeau voor muziekliefhebbers",
    metaTitle: "Muziekcadeau voor muziekliefhebbers | OpTijdCadeau",
    metaDescription:
      "Muziekcadeaus voor liefhebbers: speakers, koptelefoons, oordopjes, platenspelers en kinderinstrumenten. Met levertijd en uiterste besteldatum.",
    intro: [
      "Wie van muziek houdt, luistert bijna de hele dag: onderweg, onder de douche, tijdens het werk of op de bank met een plaat. Een goed muziekcadeau maakt dat luisteren net wat prettiger. Kijk daarom eerst waar iemand de meeste muziek hoort, thuis of onderweg, en kies daar iets bij.",
      "In deze selectie staan Bluetooth-speakers, koptelefoons met en zonder ruisonderdrukking, draadloze oordopjes, platenspelers en muziekspellen voor een gezellige avond. Voor kinderen vind je een kinder-koptelefoon en speelgoedinstrumenten zoals een gitaar, drumstel, piano of xylofoon. Let bij elektronica op de aansluiting en op de telefoon die iemand gebruikt. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { interesse: "muziek" },
    tips: [
      "Kies bij een koptelefoon op basis van gebruik: over-ear of on-ear voor thuis en op reis, oordopjes voor onderweg en sporten. Vraag stiekem wat iemand nu gebruikt.",
      "Een speaker is een veilige keuze voor wie al een koptelefoon heeft. Let op of hij tegen water kan als je hem mee wilt nemen naar buiten of onder de douche.",
      "Een platenspeler is pas een compleet cadeau met een plaat erbij. Kies een album dat iemand al kent en graag hoort.",
      "Kinderen bepalen zelf hoe lang ze met een instrument spelen. Begin daarom met iets eenvoudigs en let op de leeftijdsaanduiding op de verpakking.",
    ],
    faq: [
      { q: "Wat geef je iemand die van muziek houdt?", a: "Iets waarmee diegene vaker of prettiger luistert: een Bluetooth-speaker, een koptelefoon of draadloze oordopjes. Voor een gezellige avond met meer mensen is een muziekspel een leuk alternatief." },
      { q: "Wat is een goed muziekcadeau voor een kind?", a: "Een eenvoudig speelgoedinstrument zoals een xylofoon, gitaar of drumstel, of een kinderkoptelefoon met volumebegrenzing. Kijk naar de leeftijdsaanduiding op de verpakking." },
      { q: "Hoe kies ik tussen een speaker en een koptelefoon?", a: "Een speaker is voor luisteren met anderen of in een kamer, een koptelefoon voor luisteren voor jezelf. Weet je niet wat iemand al heeft, vraag het dan stiekem aan een huisgenoot." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend op basis van de verwachte levertijd, met een dag extra marge." },
    ],
    related: ["sinterklaascadeau-tiener", "cadeau-thuiswerker-50-100-euro", "sinterklaascadeau-kinderen-8-12", "cadeau-voor-partner", "techcadeau"],
  },
  {
    slug: "cadeau-voor-fijnproevers",
    title: "Cadeau voor fijnproevers: eten en drinken",
    metaTitle: "Cadeau voor fijnproevers: eten en drinken | OpTijdCadeau",
    metaDescription:
      "Cadeaus voor fijnproevers: chocolade, thee, koffie, koekjes en olijfolie om te proeven. Met levertijd en besteldatum voor Sinterklaas en kerst.",
    intro: [
      "Een cadeau dat je kunt opeten, opdrinken of proeven heeft één groot voordeel: het hoeft nergens meer te liggen. Voor wie graag lekker eet en drinkt is dat vaak het fijnste cadeau, zeker als het iets is dat iemand zichzelf niet snel zou kopen.",
      "In deze selectie staan chocolade en bonbons, theedozen, koffie en koffiezetters, koekjes in een mooie trommel, kruidnoten en een olijfolie-proeverij. Kijk voor je kiest naar wat iemand echt lekker vindt: houdt diegene van zoet, van thee of juist van sterke koffie? Let ook op voedselallergieën en dieetwensen, en lees de ingrediënten op de winkelpagina. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen veranderen, daarom tonen we de datum waarop we de prijs hebben gecontroleerd.",
    ],
    filters: { leeftijd: "volwassen", interesse: "eten-drinken" },
    tips: [
      "Kies liever één goed product in een smaak die je kent dan een grote doos met van alles. Twijfel je? Een proeverij met meerdere smaken laat iemand zelf ontdekken wat het lekkerst is.",
      "Houd rekening met allergieën en dieetwensen, en kijk op de verpakking of de winkelpagina naar de ingrediënten.",
      "Combineer iets lekkers met iets om het mee te maken, zoals thee met een theepot of koffie met een koffiezetter. Dan is het meteen een cadeaupakket.",
      "Let bij verse of gekoelde producten op de houdbaarheid, zeker als het cadeau een paar dagen voor het feest binnenkomt.",
    ],
    faq: [
      { q: "Wat geef je een fijnproever?", a: "Iets dat bijzonder genoeg is om van te genieten, zoals goede chocolade, een theeset, speciale koffie of een proeverij. Kies bij twijfel iets met meerdere smaken." },
      { q: "Wat is een goed eetbaar cadeau als je de smaak niet kent?", a: "Kies iets dat bij bijna iedereen past, zoals chocolade, koekjes of thee. Vermijd sterke smaken en kijk bij de ingrediënten of er veelvoorkomende allergenen in zitten." },
      { q: "Kan ik ook thee of koffie geven als cadeau?", a: "Ja, vooral als je weet wat iemand drinkt. Een doos met verschillende smaken thee of een zak koffiebonen past bij bijna iedereen die thuis een kopje drinkt." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, met een dag extra marge voor de drukte." },
    ],
    related: ["cadeau-voor-wie-graag-kookt", "cadeau-voor-moeder", "cadeau-voor-opa-en-oma", "cadeau-onder-25-euro-collega", "verwencadeau-voor-haar", "cadeau-voor-wie-alles-heeft"],
  },
  {
    slug: "sinterklaascadeau-jongens-8-12",
    title: "Sinterklaascadeau voor jongens van 8 tot 12 jaar",
    metaTitle: "Sinterklaascadeau voor jongens 8–12 jaar | OpTijdCadeau",
    metaDescription:
      "Sinterklaascadeaus voor jongens van 8 tot 12 jaar die graag bouwen: LEGO Technic, City, Ninjago en meer. Met levertijd en uiterste besteldatum.",
    intro: [
      "Jongens van 8 tot 12 jaar hebben vaak een duidelijke favoriet: bouwen, sporten, gamen of uitzoeken hoe iets werkt. Elk kind is anders, dus kijk vooral naar wat hij de laatste tijd doet en niet naar wat je denkt dat bij zijn leeftijd past. Deze gids richt zich op bouwen en techniek.",
      "In deze selectie staan bouwsets, onder meer uit LEGO Technic, LEGO City en LEGO Ninjago, plus andere sets om zelf in elkaar te zetten. Bij Technic gaat het vaak om bewegende onderdelen, een mooie manier om te zien hoe iets werkt. Kijk bij elke set naar de leeftijdsaanduiding en het aantal stukjes: een grote set kost uren en wie niet houdt van lang bouwen, is blij met een kleine. Voor gamen en spelletjes met vrienden vind je meer in onze andere gidsen. Bij elk product zie je de levertijd en de uiterste besteldatum voor pakjesavond, berekend per product. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { voor: "kind", leeftijd: "8-12", interesse: "bouwen", optijd: "sinterklaas" },
    tips: [
      "Vraag stiekem welke thema's hij al heeft. Een set die past bij zijn verzameling is meestal leuker dan een losse set van iets nieuws.",
      "Kies bij een grote set een rustige middag of de kerstvakantie om te bouwen. Dan wordt het cadeau een activiteit en geen frustratie.",
      "Let op de leeftijdsaanduiding op de verpakking. Sets met veel kleine onderdelen of instructies zijn niet altijd geschikt voor de jongere kinderen in deze groep.",
      "Een kleine set past ook in de schoen, bijvoorbeeld als extraatje bij een groter cadeau.",
    ],
    faq: [
      { q: "Wat geef je een jongen van 10 voor Sinterklaas?", a: "Een bouwset die past bij wat hij nu leuk vindt, zoals een voertuig, een bewegend model of een set met figuren. Let op de leeftijdsaanduiding en op hoeveel stukjes erin zitten." },
      { q: "Wat is het verschil met de gids voor kinderen van 8 tot 12 jaar?", a: "Die gids toont een bredere selectie, zoals spellen en kaartspellen. Deze gids is gericht op bouwen en techniek, voor wie graag zelf iets in elkaar zet." },
      { q: "Is LEGO Technic geschikt voor kinderen van 8 tot 12 jaar?", a: "Veel Technic-sets zijn bedoeld voor kinderen vanaf een bepaalde leeftijd, die per set verschilt. Kijk op de verpakking of de winkelpagina naar de aanbevolen leeftijd." },
      { q: "Tot wanneer kan ik bestellen voor pakjesavond?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, inclusief een dag marge voor de drukte. Pakjesavond is zaterdag 5 december, dus het cadeau moet uiterlijk vrijdag 4 december in huis zijn." },
    ],
    related: ["sinterklaascadeau-kinderen-8-12", "gamecadeau-tiener-13-17", "sinterklaascadeau-tiener", "cadeau-onder-15-euro", "creatief-cadeau", "sinterklaascadeau-meisjes-8-12"],
  },
  {
    slug: "creatief-cadeau",
    title: "Creatief cadeau voor volwassenen en kinderen",
    metaTitle: "Creatief cadeau voor volwassenen en kinderen | OpTijdCadeau",
    metaDescription:
      "Creatieve cadeaus voor volwassenen en kinderen: tekenen, haken, schrijven en bouwen. Met levertijd en uiterste besteldatum voor Sinterklaas en kerst.",
    intro: [
      "Een creatief cadeau geeft iemand een reden om met de handen aan de slag te gaan. Dat kan een kind zijn dat graag bouwt, een tiener die tekent, of een volwassene die na een drukke werkweek iets wil maken in plaats van op een scherm te kijken. Het mooiste is als het cadeau meteen te gebruiken is, zonder dat je eerst nog van alles moet bijkopen.",
      "In deze selectie staan onder meer een tekenset, een kaartendeck met haakpatronen, mooie pennen om mee te schrijven, een puzzel en bouwsets van LEGO. Kijk bij elk product naar de leeftijdsaanduiding en naar wat er in de doos zit. Een eenvoudige set is prettiger dan een uitgebreide set waar je al ervaring voor nodig hebt. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { interesse: "creatief" },
    tips: [
      "Kies bij een beginner een set waar alles in zit. Dan kan iemand direct beginnen en hoeft er niets bijgekocht te worden.",
      "Let bij kinderen op de leeftijdsaanduiding en op kleine onderdelen. Jonge kinderen knutselen het prettigst samen met een volwassene erbij.",
      "Een creatief cadeau is ook een cadeau voor een rustige middag. Je kunt erbij beloven om samen een keer aan de slag te gaan.",
      "Weet je niet wat iemand al heeft? Kijk wat er op de tekentafel of in de hobbykast ligt en kies iets aanvullends.",
      "Let op de taal: sommige boekjes met patronen zijn Engelstalig. Dat staat bij het product vermeld.",
    ],
    faq: [
      { q: "Wat is een leuk creatief cadeau voor een volwassene?", a: "Iets waarmee iemand rustig een paar uur bezig is en dat een resultaat oplevert, zoals een set om zelf te maken of tekenmateriaal. Kies iets dat past bij het niveau." },
      { q: "Wat geef je een kind dat graag knutselt?", a: "Een set met alles erbij, zodat het kind direct kan beginnen. Kijk naar de leeftijdsaanduiding en naar de moeilijkheid van de instructies." },
      { q: "Zijn creatieve cadeaus geschikt voor een surprise?", a: "Ja, zeker als je er iets persoonlijks bij doet, zoals een gedichtje of een kleine verwijzing naar de hobby. Kijk ook bij onze surprise-ideeën." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend op basis van de verwachte levertijd, met een dag extra marge." },
    ],
    related: ["sinterklaascadeau-kinderen-8-12", "cadeau-kinderen-4-7-jaar", "sinterklaascadeau-tiener", "cadeau-voor-partner", "sinterklaascadeau-meisjes-8-12"],
  },
  {
    slug: "cadeau-voor-lezers",
    title: "Cadeau voor lezers en boekenliefhebbers",
    metaTitle: "Cadeau voor lezers en boekenliefhebbers | OpTijdCadeau",
    metaDescription:
      "Cadeaus voor wie graag leest: romans, thrillers, kookboeken en kinderboeken. Met levertijd en uiterste besteldatum voor Sinterklaas en kerst.",
    intro: [
      "Wie graag leest, heeft meestal een stapel boeken liggen die nog gelezen moet worden. Een boek kiezen voor een lezer is daarom lastig, tenzij je weet wat iemand graag leest. Gelukkig is een boek ook een cadeau dat je kunt afstemmen op een genre of een onderwerp, en dat past bij bijna elk budget.",
      "In deze selectie staan nieuwe romans en thrillers, een biografie, kookboeken, een kort kerstverhaal en kinderboeken. Let bij een boek op de taal, want één titel is Engelstalig, en bij kinderboeken op de leeftijdsaanduiding. Twijfel je over een titel, kies dan een genre dat iemand al leest. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { interesse: "lezen" },
    tips: [
      "Weet je niet welk boek iemand nog niet heeft? Vraag het stiekem aan een huisgenoot of kies iets bij een genre dat iemand vaak leest.",
      "Combineer een boek met iets om het leesmoment gezellig te maken, zoals thee of een kaars.",
      "Kijk bij kinderboeken naar de leeftijdsaanduiding en naar of het kind zelf leest of voorgelezen wordt.",
    ],
    faq: [
      { q: "Wat geef je iemand die veel leest?", a: "Een boek in een genre dat diegene al leest, bij voorkeur een nieuwe uitgave. Een kort kerstverhaal of een kookboek is een goed alternatief als je de smaak niet precies kent." },
      { q: "Hoe kies ik een boek als ik de smaak niet ken?", a: "Kijk naar het genre dat iemand het vaakst leest en kies iets dat daarbij past. Vraag zo nodig stiekem aan een huisgenoot welke titels al in de kast staan." },
      { q: "Is een boek een goed cadeau voor een kind?", a: "Ja, zolang je let op de leeftijdsaanduiding en de interesses van het kind. Een boek bij een hobby of een favoriet thema werkt meestal goed." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, met een dag extra marge voor de drukte." },
    ],
    related: ["cadeau-voor-partner", "cadeau-voor-opa-en-oma", "puzzel-en-spelcadeau-oma-opa", "cadeau-thuiswerker-50-100-euro"],
  },
  {
    slug: "verwencadeau-voor-haar",
    title: "Verwencadeau voor haar",
    metaTitle: "Verwencadeau voor haar: verzorging | OpTijdCadeau",
    metaDescription:
      "Verwencadeaus voor je partner, moeder of vriendin: verzorging, thee en iets voor ontspanning. Met levertijd en uiterste besteldatum per cadeau.",
    intro: [
      "Een verwencadeau draait om één ding: even rust en aandacht voor de ander. Dat past bij een partner, een moeder of een vriendin die altijd voor anderen zorgt en zichzelf zelden iets gunt. Het hoeft niet groot te zijn. Een mooie verzorgingsset of een doos thee voor een rustig avondje is vaak al genoeg.",
      "In deze selectie staan verzorgingssets, handcrème, geurige geschenksets, thee, iets voor warmte op de bank en een paar haarstylers. Kijk bij een geurproduct naar wat iemand al gebruikt, want geur is persoonlijk. Let ook op ingrediënten als iemand gevoelige huid heeft of allergieën. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { interesse: "wellness" },
    tips: [
      "Geur is persoonlijk. Kies bij twijfel een set zonder sterke parfum, zoals handcrème of lippenbalsem, of kijk welke geur iemand al gebruikt.",
      "Combineer iets voor de huid met iets om te drinken, zoals thee. Dan is het meteen een compleet verwenmoment.",
      "Heeft iemand een gevoelige huid? Lees de ingrediënten op de winkelpagina voordat je koopt.",
      "Een verwencadeau is extra fijn als je er tijd bij cadeau geeft, bijvoorbeeld een avond waarop jij de rest overneemt.",
    ],
    faq: [
      { q: "Wat geef je als verwencadeau aan je partner of moeder?", a: "Iets voor verzorging of ontspanning, zoals een geschenkset, handcrème of thee. Kies iets dat bij haar gewoontes past en niet te persoonlijk is als je haar smaak niet precies kent." },
      { q: "Wat is een veilig verwencadeau als ik haar smaak niet ken?", a: "Handcrème, lippenbalsem of thee zijn meestal een veilige keuze. Vermijd sterke parfums tenzij je weet welke geur ze graag draagt." },
      { q: "Zijn verzorgingssets geschikt voor een gevoelige huid?", a: "Dat verschilt per product. Lees de ingrediënten op de winkelpagina en kies bij twijfel een product zonder parfum." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, met een dag extra marge voor de drukte." },
    ],
    related: ["cadeau-voor-moeder", "cadeau-voor-partner", "cadeau-voor-fijnproevers", "cadeau-onder-25-euro-collega", "kerstcadeau-voor-moeder-onder-50"],
  },
  {
    slug: "kerstcadeau-onder-50-euro",
    title: "Kerstcadeau onder €50",
    metaTitle: "Kerstcadeau onder €50 | OpTijdCadeau",
    metaDescription:
      "Kerstcadeaus tussen €25 en €50 voor familie, vrienden en partner. Met levertijd en uiterste besteldatum, zodat het pakje voor kerst in huis is.",
    intro: [
      "Met een budget tot €50 kun je met kerst al een cadeau kiezen dat je niet bij de kassa hoeft te verontschuldigen. Het is genoeg voor een goed boek met iets lekkers erbij, een mooi spel voor de feestdagen of een warm kussen voor op de bank. Een groter bedrag maakt een cadeau niet vanzelf persoonlijker.",
      "In deze gids staan cadeaus die kerst als gelegenheid hebben en tussen €25 en €50 kosten. Zoek je iets goedkopers, kijk dan bij de gidsen voor cadeaus onder €25 of onder €15. Bij elk product zie je de levertijd en de uiterste besteldatum voor kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { budget: "25-50", optijd: "kerst" },
    tips: [
      "Spreek bij een familiekerst een maximumbedrag af. Dan voelt niemand zich over- of ondergewaardeerd.",
      "Verdeel je budget liever over één goed cadeau en een kleine attentie dan over drie dingen die snel in de kast verdwijnen.",
      "Tel verzendkosten mee. Sommige winkels rekenen ze onder een minimumbedrag, en dan kan een cadeau net boven je budget uitkomen.",
      "Combineer twee cadeaus bij dezelfde winkel als je ze samen wilt laten bezorgen. Let op de langste levertijd.",
    ],
    faq: [
      { q: "Wat geef je voor kerst als het budget €50 is?", a: "Iets dat past bij wat de ontvanger doet in de wintermaanden: een spel voor met het gezin, iets lekkers, een boek of iets voor een gezellige avond thuis. Gebruik de filters om op ontvanger of interesse te zoeken." },
      { q: "Waarom staan er geen cadeaus onder €25 in deze gids?", a: "Deze gids toont het bereik van €25 tot €50. Voor kleinere bedragen heb je de gidsen voor cadeaus onder €25 voor een collega en cadeaus onder €15." },
      { q: "Tot wanneer kan ik bestellen voor kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend op basis van de verwachte levertijd, met een dag extra marge. Zo hoef je niet te gokken of het pakje voor 24 december binnen is." },
    ],
    related: ["kerstpakket-thuiswerker", "kerstcadeau-voor-vader", "cadeau-onder-25-euro-collega", "cadeau-onder-15-euro", "cadeau-voor-wie-alles-heeft", "kerstcadeau-voor-moeder-onder-50", "kerstcadeau-vanaf-100-euro"],
  },
  {
    slug: "cadeau-voor-een-vriend",
    title: "Cadeau voor een vriend of vriendin",
    metaTitle: "Cadeau voor een vriend of vriendin | OpTijdCadeau",
    metaDescription:
      "Cadeau-ideeën voor een vriend of vriendin voor Sinterklaas of kerst: spellen, lekkers, iets voor thuis en meer. Met levertijd en uiterste besteldatum.",
    intro: [
      "Een goede vriend of vriendin ken je vaak beter dan je denkt. Je weet wat iemand na een lange dag doet, welke serie op repeat staat en welk koekje er altijd bij de koffie hoort. Gebruik dat: een cadeau dat past bij een gewoonte of een grap die jullie delen, voelt persoonlijker dan iets duurs.",
      "In deze selectie staan cadeaus voor uiteenlopende smaken, zoals spellen voor een avond met meer mensen, iets lekkers, verzorging, boeken en spullen voor thuis. Houd het bedrag in lijn met wat jullie normaal aan elkaar geven, zodat niemand zich ongemakkelijk voelt. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { voor: "vriend" },
    tips: [
      "Kies iets dat bij een gedeelde herinnering of binnenpretje past. Een klein cadeau met een verhaal blijft langer hangen dan een duur cadeau zonder.",
      "Een spel of iets om samen te doen is meteen een afspraak: speel het bij de volgende keer dat jullie afspreken.",
      "Twijfel je over smaak? Kies iets lekkers of iets zonder geur of maat, zoals thee, chocolade of een boek.",
      "Doe je mee aan lootjes in de vriendengroep? Houd je dan aan het afgesproken bedrag.",
    ],
    faq: [
      { q: "Wat geef je een vriend of vriendin voor Sinterklaas of kerst?", a: "Iets dat past bij wat diegene graag doet: een spel voor met vrienden, iets lekkers, een boek of een verzorgingsproduct. Gebruik de filters om op interesse of budget te zoeken." },
      { q: "Hoeveel geef je uit aan een cadeau voor een vriend?", a: "Dat verschilt per vriendschap. Veel vriendengroepen spreken een bedrag af bij lootjes. Zonder afspraak werkt een bedrag dat jullie ook aan elkaar zouden geven vaak het best." },
      { q: "Wat geef je een vriend die moeilijk te verrassen is?", a: "Kies iets dat verbruikt wordt, zoals thee, chocolade of een kaars, of iets om samen te doen, zoals een spel. Dan hoeft het niet precies bij de smaak te passen." },
      { q: "Komt het cadeau op tijd?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, met een dag extra marge voor de drukte." },
    ],
    related: ["cadeau-onder-25-euro-collega", "cadeau-onder-15-euro", "cadeau-voor-partner", "sinterklaascadeau-tiener", "cadeau-voor-fijnproevers", "spelcadeau-bord-en-kaartspellen"],
  },
  {
    slug: "cadeau-voor-wie-alles-heeft",
    title: "Cadeau voor wie alles al heeft",
    metaTitle: "Cadeau voor wie alles al heeft | OpTijdCadeau",
    metaDescription:
      "Cadeau-ideeën voor mensen die al alles hebben: sfeer, warmte en spullen voor in huis die ze elke dag gebruiken. Met levertijd en besteldatum.",
    intro: [
      "Sommige mensen hebben alles al, of zeggen in ieder geval dat ze niets nodig hebben. Dan is het verleidelijk om een bon of een envelop te geven. Dat kan prima, maar je kunt ook zoeken naar iets dat niet in de categorie nog meer spullen valt: iets voor de sfeer, iets dat warm houdt of iets dat opraakt en dan met plezier wordt vervangen.",
      "In deze selectie staan cadeaus voor in en om het huis, zoals geurkaarsen, lampen, warmte voor de bank en andere dingen die je dagelijks ziet of gebruikt. Kijk bij sfeerartikelen naar wat iemand al heeft, bijvoorbeeld in welke kleuren het huis is ingericht. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { leeftijd: "volwassen", interesse: "thuis" },
    tips: [
      "Kies iets dat opraakt of op een natuurlijke manier vervangen wordt, zoals een kaars of iets lekkers. Dan hoeft er geen ruimte voor te worden gevonden.",
      "Let op wat iemand al in huis heeft. Een stekkerlamp of deken die past bij de inrichting wordt eerder gebruikt dan iets dat opvalt.",
      "Voeg iets persoonlijks toe, zoals een kaartje of een gedichtje. Dan krijgt een eenvoudig cadeau meteen een betekenis.",
      "Twijfel je? Vraag een huisgenoot wat er de laatste tijd stuk is gegaan of bijna op is.",
    ],
    faq: [
      { q: "Wat geef je iemand die alles al heeft?", a: "Iets dat verbruikt wordt of de sfeer in huis verbetert, zoals een geurkaars, iets voor extra warmte of een lamp. Dat past bij bijna iedereen en hoeft niet te worden opgeborgen." },
      { q: "Is een cadeaubon een goed alternatief?", a: "Soms wel, zeker als je de smaak echt niet kent. Een klein cadeau dat je zelf hebt uitgekozen laat meestal beter zien dat je hebt nagedacht." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend op basis van de verwachte levertijd, met een dag extra marge." },
    ],
    related: ["cadeau-voor-opa-en-oma", "cadeau-voor-fijnproevers", "verwencadeau-voor-haar", "kerstcadeau-voor-vader", "cadeau-voor-partner", "kerstcadeau-vanaf-100-euro"],
  },
  {
    slug: "sinterklaascadeau-meisjes-8-12",
    title: "Sinterklaascadeau voor meisjes van 8 tot 12 jaar",
    metaTitle: "Sinterklaascadeau voor meisjes 8–12 jaar | OpTijdCadeau",
    metaDescription:
      "Sinterklaascadeaus voor meisjes van 8 tot 12 jaar die graag tekenen, knutselen en bouwen. Met levertijd en uiterste besteldatum voor 5 december.",
    intro: [
      "Wat een meisje van 8 tot 12 leuk vindt, hangt veel minder af van haar leeftijd of van of ze een meisje is dan van wat ze zelf graag doet. De ene tekent de hele middag, de andere bouwt, bakt of verzint een toneelstukje. Kijk daarom naar haar hobby's en niet naar wat 'bij meisjes past'.",
      "Deze selectie is gericht op creatief bezig zijn: knutselen, tekenen, schilderen en bouwen, dingen die een rustige middag opleveren en iets om te laten zien. De selectie is niet speciaal voor meisjes gemaakt: de meeste cadeaus zijn net zo leuk voor een jongen. Bij elk product zie je de levertijd en de uiterste besteldatum voor pakjesavond op zaterdag 5 december. Het cadeau moet uiterlijk vrijdag 4 december in huis zijn. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { voor: "kind", leeftijd: "8-12", interesse: "creatief", optijd: "sinterklaas" },
    tips: [
      "Vraag haar zelf of een vriendin waar ze de laatste tijd mee bezig is. Een cadeau bij een nieuwe hobby wordt meestal vaker gebruikt dan iets dat bij een oude interesse past.",
      "Kies bij een knutsel- of bouwset iets waar alles in zit. Dan kan ze direct beginnen en hoef je niets bij te kopen.",
      "Kijk naar de leeftijdsaanduiding en naar hoe moeilijk de set is. Een te ingewikkelde set geeft frustratie, een te eenvoudige is snel klaar.",
      "Voor de surprise kun je het cadeau verstoppen in een zelfgemaakt knutselwerkje of een gedicht dat aansluit bij haar hobby.",
    ],
    faq: [
      { q: "Wat geef je een meisje van 10 voor Sinterklaas?", a: "Iets dat past bij wat ze zelf graag doet, bijvoorbeeld een tekenset, een knutselset of een bouwset. Vraag stiekem aan ouders of vriendinnen waar ze nu mee bezig is." },
      { q: "Zijn deze cadeaus alleen voor meisjes?", a: "Nee. We selecteren op leeftijd en interesse, niet op geslacht. Dezelfde cadeaus zijn net zo leuk voor een jongen die graag creatief bezig is." },
      { q: "Tot wanneer kan ik bestellen voor pakjesavond?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, inclusief een dag marge. Pakjesavond is zaterdag 5 december, dus het cadeau moet uiterlijk vrijdag 4 december in huis zijn." },
    ],
    related: ["sinterklaascadeau-kinderen-8-12", "sinterklaascadeau-jongens-8-12", "creatief-cadeau", "sinterklaascadeau-tiener", "cadeau-onder-15-euro"],
  },
  {
    slug: "techcadeau",
    title: "Techcadeau voor tech-liefhebbers",
    metaTitle: "Techcadeau voor tech-liefhebbers | OpTijdCadeau",
    metaDescription:
      "Techcadeaus voor alle leeftijden: speakers, koptelefoons, ledverlichting en gadgets. Met levertijd en uiterste besteldatum voor Sinterklaas en kerst.",
    intro: [
      "Wie van techniek houdt, heeft vaak al een eigen mening over wat goed is. Dat maakt een techcadeau kiezen lastig, maar niet onmogelijk: kies iets dat past bij wat iemand al heeft en gebruikt. Een extra controller, een betere muis of een speaker voor in de keuken wordt eerder gebruikt dan een gadget dat nog niet bij de rest aansluit.",
      "In deze selectie staan onder meer speakers, koptelefoons en oordopjes, gaming-accessoires, muizen en slimme verlichting. Het is bedoeld voor alle leeftijden, van een tiener met een console tot een ouder die zijn werkplek wil verbeteren. Let op de aansluiting en op welke telefoon, computer of console iemand gebruikt. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { interesse: "tech" },
    tips: [
      "Check wat iemand al heeft: merk, aansluiting (USB-C, Bluetooth, jack) en systeem. Dat voorkomt dat het cadeau niet past.",
      "Een accessoire past bijna altijd, ook bij iemand die al veel heeft. Denk aan een muismat, een kabel of een oplaadstation.",
      "Vraag stiekem aan een huisgenoot of vriend wat er nog op de verlanglijst staat of wat kapot is gegaan.",
      "Bewaar de bon. Bij elektronica wil je kunnen ruilen als iets toch niet blijkt te passen.",
    ],
    faq: [
      { q: "Wat geef je iemand die van techniek houdt?", a: "Iets dat aansluit op wat diegene al gebruikt, zoals een betere koptelefoon, een extra controller, een speaker of slimme verlichting. Een accessoire is vaak veiliger dan een nieuw apparaat." },
      { q: "Hoe voorkom ik dat ik iets koop dat niet past?", a: "Kijk op de winkelpagina naar de aansluiting en de compatibiliteit. Vraag zo nodig aan een huisgenoot welk merk of systeem er in gebruik is." },
      { q: "Zijn techcadeaus ook geschikt voor kinderen?", a: "Een aantal wel, maar kijk altijd naar de leeftijdsaanduiding op de verpakking. Een kinderkoptelefoon of een eenvoudige speaker is geschikter dan een apparaat voor volwassenen." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend. Voor pakjesavond (zaterdag 5 december) moet het cadeau uiterlijk vrijdag 4 december in huis zijn." },
    ],
    related: ["gamecadeau-tiener-13-17", "cadeau-thuiswerker-50-100-euro", "muziekcadeau", "kerstcadeau-voor-vader", "sinterklaascadeau-tiener", "kerstcadeau-vanaf-100-euro", "kerstcadeau-voor-tiener", "sinterklaascadeau-voor-vader"],
  },
  {
    slug: "kerstcadeau-voor-moeder-onder-50",
    title: "Kerstcadeau voor je moeder onder €50",
    metaTitle: "Kerstcadeau voor moeder onder €50 | OpTijdCadeau",
    metaDescription:
      "Kerstcadeaus voor je moeder tussen €25 en €50: thee, warmte, een goed boek of een verwenmoment. Met levertijd en uiterste besteldatum voor kerst.",
    intro: [
      "Met een budget tot €50 kun je je moeder met kerst echt verrassen, zonder dat het een grote uitgave wordt. Denk aan iets om bij op te warmen, iets lekkers bij de thee of een boek voor de rustige dagen tussen kerst en oud en nieuw. Het gaat erom dat ze merkt dat je hebt nagedacht, niet om het bedrag.",
      "In deze gids staan cadeaus voor moeders tussen €25 en €50 die voor kerst nog op tijd bezorgd kunnen worden. Zoek je iets goedkopers, kijk dan bij de gidsen voor cadeaus onder €25 of onder €15. Kijk vooral naar wat zij zelf nooit voor zichzelf zou kopen. Bij elk product zie je de levertijd en de uiterste besteldatum voor kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { voor: "moeder", budget: "25-50", optijd: "kerst" },
    tips: [
      "Kies iets dat ze zelf niet snel zou kopen, zoals een mooie theeset of een kussen dat warm blijft, en geen dingen die ze al heeft.",
      "Een persoonlijk kaartje of een gedichtje erbij maakt een cadeau van €30 minstens zo waardevol als een duurder cadeau.",
      "Tel verzendkosten mee. Sommige winkels rekenen ze onder een minimumbedrag, en dan kan een cadeau net boven je budget uitkomen.",
      "Wil je met broers of zussen samenleggen? Dan kom je makkelijker uit op één groter cadeau in plaats van twee kleine.",
    ],
    faq: [
      { q: "Wat geef je je moeder voor kerst als het budget €50 is?", a: "Iets voor warmte, ontspanning of gezelligheid: een theeset, een verzorgingsset, een boek of iets voor op de bank. Kies iets dat bij haar gewoontes past." },
      { q: "Waarom staan er geen cadeaus onder €25 in deze gids?", a: "Deze gids toont het bereik van €25 tot €50. Voor kleinere bedragen heb je de gidsen voor cadeaus onder €25 en onder €15." },
      { q: "Tot wanneer kan ik bestellen voor kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend op basis van de verwachte levertijd, met een dag extra marge. Zo hoef je niet te gokken of het pakje voor 24 december binnen is." },
    ],
    related: ["cadeau-voor-moeder", "verwencadeau-voor-haar", "kerstcadeau-onder-50-euro", "cadeau-voor-fijnproevers", "cadeau-voor-wie-graag-kookt"],
  },
  {
    slug: "kerstcadeau-vanaf-100-euro",
    title: "Kerstcadeau vanaf €100",
    metaTitle: "Kerstcadeau vanaf €100 | OpTijdCadeau",
    metaDescription:
      "Kerstcadeaus vanaf €100: audio, e-readers, keukenapparaten, sporthorloges en meer. Met levertijd en uiterste besteldatum voor 24 december.",
    intro: [
      "Een kerstcadeau van €100 of meer koop je meestal niet zomaar. Het is vaak een cadeau van een paar mensen samen, een mijlpaal of iets waar iemand al langer naar kijkt. Daarom loont het om eerst te bedenken wat de ontvanger dagelijks gebruikt en wat daar een flinke stap beter in is, in plaats van te kiezen op prijs.",
      "In deze selectie staan onder meer draadloze koptelefoons en speakers, platenspelers, e-readers, sporthorloges, keukenapparaten, gereedschap en grotere LEGO Technic-sets. Controleer bij elektronica de aansluiting en de telefoon of het systeem dat iemand gebruikt, en lees de garantie- en retourvoorwaarden van de winkel. Bij elk product zie je de levertijd en de uiterste besteldatum voor kerst; de site rekent met bezorging uiterlijk 24 december. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { budget: "100-plus", optijd: "kerst" },
    tips: [
      "Leg met familie of collega's samen voor één groter cadeau. Dat is vaak beter dan drie kleine cadeaus die in de kast verdwijnen.",
      "Kies iets dat de ontvanger elke dag gebruikt, zoals koptelefoon, e-reader of keukenapparaat. Dan is de prijs per keer gebruiken laag.",
      "Check de retourvoorwaarden voor je bestelt. Bij een duurder cadeau wil je kunnen ruilen als de maat, kleur of aansluiting niet past.",
      "Let op het totaalbedrag inclusief verzendkosten en kijk of er een fabrieksgarantie bij zit.",
    ],
    faq: [
      { q: "Wat is een goed kerstcadeau boven €100?", a: "Iets dat dagelijks of wekelijks gebruikt wordt en waar de ontvanger zelf niet snel zoveel geld aan uitgeeft, zoals goede koptelefoon, een e-reader of een keukenapparaat." },
      { q: "Is een duur cadeau beter dan een goedkoop cadeau?", a: "Nee. Het gaat erom dat het past bij de ontvanger. Een goed gekozen cadeau van €30 is meer waard dan een duur cadeau waar weinig over is nagedacht." },
      { q: "Kan ik een cadeau van meer dan €100 retourneren?", a: "Dat bepaalt de winkel waar je bestelt. Bij webwinkels geldt in Nederland meestal een bedenktermijn bij online kopen; lees de voorwaarden op de winkelpagina en bewaar de verpakking." },
      { q: "Tot wanneer kan ik bestellen voor kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, met een dag extra marge. Zo hoef je niet te gokken of het pakje voor 24 december binnen is." },
    ],
    related: ["kerstcadeau-onder-50-euro", "cadeau-voor-wie-alles-heeft", "techcadeau", "cadeau-partner-50-100-euro", "kerstcadeau-voor-vader", "cadeau-partner-boven-100-euro"],
  },
  {
    slug: "cadeau-partner-50-100-euro",
    title: "Cadeau voor je partner van €50 tot €100",
    metaTitle: "Cadeau voor je partner van €50 tot €100 | OpTijdCadeau",
    metaDescription:
      "Cadeau-ideeën voor je partner tussen €50 en €100: iets voor thuis, verwennen, koken of tech. Met levertijd en uiterste besteldatum per cadeau.",
    intro: [
      "Met een budget tussen €50 en €100 kun je je partner iets geven dat meer is dan een kleine attentie. Het blijft lastig om te kiezen, want het gaat niet om het bedrag maar om of het past. Kijk daarom eerst naar wat jouw partner de afgelopen weken zelf heeft genoemd, of waar hij of zij elke dag mee bezig is.",
      "In deze selectie staan cadeaus voor verwennen, wonen, koken en luisteren, en een paar voor wie graag sport of techniek heeft. Denk aan verzorgingssets, een lamp of kussen voor op de bank, keukengerei of een speaker. Let bij verzorging op geur en gevoelige huid, en bij elektronica op de aansluiting. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { voor: "partner", budget: "50-100" },
    tips: [
      "Kies iets bij een gewoonte die jullie delen, zoals samen koken, een avondje spelen of een serie kijken. Dan is het cadeau meteen een moment om samen te gebruiken.",
      "Geur en maat zijn persoonlijk. Twijfel je, kies dan iets zonder maat of geur, zoals een lamp, een boek of keukengerei.",
      "Een klein extraatje erbij, zoals een kaartje of iets lekkers, maakt van één cadeau meteen een pakketje om uit te pakken.",
      "Spreek bij een gedeeld budget af wie wat betaalt, zodat een cadeau van €80 niet ongemerkt bij een gezamenlijke rekening belandt.",
    ],
    faq: [
      { q: "Wat geef je je partner voor €50 tot €100?", a: "Iets dat past bij wat jouw partner dagelijks doet: een verzorgingsset, iets voor de bank, een speaker, een boek met iets lekkers of keukengerei dat hij of zij zelf niet snel zou kopen." },
      { q: "Moet een cadeau voor je partner duurder zijn dan een cadeau voor een vriend?", a: "Nee, daar bestaat geen regel voor. Bepaal samen of in je eigen hoofd een bedrag dat bij jullie situatie past. Een persoonlijk gekozen cadeau werkt beter dan een duur cadeau zonder gedachte erachter." },
      { q: "Wat als mijn partner moeilijk te verrassen is?", a: "Kies iets dat verbruikt wordt of een gezellig moment oplevert, zoals lekkers, een spel voor samen of iets voor de bank. Dan hoef je niet precies de smaak te raden." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau voor beide momenten. Die wordt per product berekend, met een dag extra marge voor de drukte." },
    ],
    related: ["cadeau-voor-partner", "cadeau-thuiswerker-50-100-euro", "verwencadeau-voor-haar", "kerstcadeau-vanaf-100-euro", "kerstcadeau-onder-50-euro", "cadeau-partner-boven-100-euro"],
  },
  {
    slug: "spelcadeau-bord-en-kaartspellen",
    title: "Spelcadeau: bordspellen, kaartspellen en puzzels",
    metaTitle: "Spelcadeau: bordspel, kaartspel of puzzel | OpTijdCadeau",
    metaDescription:
      "Spelcadeaus voor het hele gezin: bordspellen, kaartspellen en puzzels voor kinderen en volwassenen. Met levertijd en uiterste besteldatum per cadeau.",
    intro: [
      "Een spel is een cadeau dat je meteen kunt gebruiken: pak het uit, leg de regels uit en je zit binnen tien minuten midden in een potje. Daarom past het goed bij Sinterklaas en kerst, wanneer er toch al familie of vrienden aan tafel zitten. Het werkt voor kinderen, voor volwassenen en voor een gemengd gezelschap.",
      "In deze selectie staan kaartspellen die je snel uitlegt, bordspellen voor een avond, woordspellen, kinderpuzzels en legpuzzels van 1000 stukjes. Kijk op de verpakking naar de leeftijdsaanduiding, het aantal spelers en de speelduur. Een spel voor twee werkt anders dan een spel voor zes, en een puzzel van 1000 stukjes vraagt een vrije tafel. Bij elk product zie je de levertijd en de uiterste besteldatum voor Sinterklaas of kerst, berekend per product. Je bestelt bij de winkel zelf; wij sturen je door en verkopen niets. Prijzen kunnen wijzigen, dus bekijk de actuele prijs bij de winkel.",
    ],
    filters: { interesse: "spellen" },
    tips: [
      "Kijk naar het aantal spelers. Een spel dat pas leuk is vanaf vier spelers, werkt niet als jullie met twee zijn.",
      "Kies voor een groep met jong en oud een spel dat zonder veel regels te begrijpen is, zoals een kaartspel of een snel dobbelspel.",
      "Check de taal. Sommige spellen zijn Engelstalig of hebben veel tekst, en dat is niet voor elke leeftijd geschikt.",
      "Bij een puzzel telt ook de ruimte: een puzzel van 1000 stukjes is ongeveer 70 bij 50 centimeter, dus er moet een tafel voor vrij zijn.",
    ],
    faq: [
      { q: "Wat is een goed spel als cadeau?", a: "Een spel dat past bij de groep: een snel kaartspel voor een gezin met kinderen, een bordspel voor een spelletjesavond of een puzzel voor wie rustig bezig wil zijn. Kijk naar aantal spelers en leeftijd." },
      { q: "Welk spel is geschikt voor jong en oud?", a: "Kies een spel met korte uitleg en simpele regels, zoals een kaartspel of dobbelspel. Op de verpakking staat de leeftijd en de speelduur." },
      { q: "Is een puzzel een goed cadeau voor een volwassene?", a: "Ja, zeker voor wie graag rustig bezig is. Kies een plaatje dat iemand mooi vindt en let op het aantal stukjes, want 1000 stukjes kost meerdere avonden." },
      { q: "Komt het cadeau op tijd voor Sinterklaas of kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, met een dag extra marge. Voor pakjesavond (zaterdag 5 december) moet het cadeau uiterlijk vrijdag 4 december in huis zijn." },
    ],
    related: ["puzzel-en-spelcadeau-oma-opa", "cadeau-voor-een-vriend", "cadeau-kinderen-4-7-jaar", "sinterklaascadeau-kinderen-8-12", "cadeau-onder-15-euro"],
  },
  {
    slug: "cadeau-partner-boven-100-euro",
    title: "Cadeau voor je partner boven €100",
    metaTitle: "Cadeau voor je partner boven €100 | OpTijdCadeau",
    metaDescription:
      "Cadeaus boven €100 voor je partner: audio, e-reader, sporthorloge, verwennen of een grote bouwset. Met levertijd en uiterste besteldatum per cadeau.",
    intro: [
      "Een cadeau van meer dan €100 voor je partner is een bewuste keuze. Het is vaak iets waar al langer naar gekeken wordt, een jubileum of een bedrag dat je samen met een ander bij elkaar legt. Kijk daarom eerst naar wat je partner elke week doet: veel lezen, hardlopen, muziek luisteren of juist even tijd voor zichzelf nemen. Een cadeau dat bij die gewoonte past, wordt gebruikt.",
      "In deze selectie staan onder meer een e-reader, draadloze oordopjes en speakers, een platenspeler, sporthorloges, yogamatten, een massagekussen en een grote LEGO Technic-set. Controleer bij elektronica de aansluiting en welke telefoon iemand gebruikt, en lees de retourvoorwaarden van de winkel. Dit is een gids voor alle cadeaumomenten. Zoek je iets voor kerst in alle categorieën boven €100, kijk dan ook bij de kerstgids. Bij elk product zie je de levertijd en de uiterste besteldatum. Je bestelt bij de winkel zelf; wij verkopen niets.",
    ],
    filters: { voor: "partner", budget: "100-plus" },
    tips: [
      "Kies iets dat je partner dagelijks of wekelijks gebruikt. Dan weeg je het bedrag tegen veel momenten van gebruik.",
      "Bij een horloge, oordopjes of e-reader loont het om stiekem te checken welke telefoon of welk merk al in huis is.",
      "Check de retourvoorwaarden en de garantie voor je bestelt. Past iets toch niet, dan kun je het binnen de bedenktijd terugsturen, maar de voorwaarden verschillen per winkel.",
      "Wil je met familie of vrienden samenleggen? Spreek dan vooraf af wie bestelt en wie het cadeau bewaart.",
    ],
    faq: [
      { q: "Wat geef je je partner voor meer dan €100?", a: "Iets dat past bij een vaste gewoonte, zoals een e-reader voor wie veel leest, een sporthorloge voor wie loopt of een goede speaker of oordopjes voor wie van muziek houdt." },
      { q: "Moet een cadeau voor je partner boven €100 kosten?", a: "Nee. Het bedrag zegt weinig over hoe goed een cadeau past. Deze gids is er voor wie bewust een groter bedrag wil besteden." },
      { q: "Wat is het verschil met de kerstgids vanaf €100?", a: "Die gids toont cadeaus boven €100 voor alle ontvangers die voor kerst op tijd komen. Deze gids is alleen voor je partner en geldt voor zowel Sinterklaas als kerst." },
      { q: "Tot wanneer kan ik bestellen?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, met een dag marge. Voor pakjesavond (zaterdag 5 december) moet het cadeau uiterlijk vrijdag 4 december in huis zijn, voor kerst uiterlijk 24 december." },
    ],
    related: ["cadeau-partner-50-100-euro", "cadeau-voor-partner", "kerstcadeau-vanaf-100-euro", "muziekcadeau"],
  },
  {
    slug: "kerstcadeau-voor-tiener",
    title: "Kerstcadeau voor een tiener",
    metaTitle: "Kerstcadeau voor een tiener | OpTijdCadeau",
    metaDescription:
      "Kerstcadeaus voor tieners: speakers, oordopjes, gamegear en bouwsets. Met eerlijke levertijd en uiterste besteldatum voor kerst op 24 december.",
    intro: [
      "Een kerstcadeau voor een tiener ligt anders dan het cadeau voor pakjesavond. Met kerst is er meer tijd, minder surprise-gedoe en vaak een iets groter budget, bijvoorbeeld omdat opa, oma en ouders samenleggen. Dat maakt het makkelijker om één goed cadeau te kiezen in plaats van veel kleine.",
      "In deze selectie staan speakers, draadloze oordopjes, een platenspeler, gamingaccessoires zoals een Stream Deck en een grote LEGO Technic-set. De prijzen lopen uiteen van een paar tientjes tot ruim boven de €100. Kijk naar wat je tiener nu doet in plaats van wat een jaar geleden paste, en check welke telefoon of console er in huis is. Bij elk product zie je de levertijd en de uiterste besteldatum; de site rekent met bezorging uiterlijk 24 december. Je bestelt bij de winkel zelf; wij verkopen niets. Zoek je een cadeau voor Sinterklaas, kijk dan bij de gids voor pakjesavond.",
    ],
    filters: { voor: "tiener", optijd: "kerst" },
    tips: [
      "Vraag een vriend of broer of zus naar wat er al in huis is of op het verlanglijstje staat. Dat voorkomt dubbele cadeaus.",
      "Controleer de aansluiting bij audio: niet elke koptelefoon of speaker werkt met elke telefoon of console.",
      "Een groter cadeau van meerdere mensen werkt goed, mits je afspreekt wie het koopt en wie het inpakt.",
      "Combineer een cadeau met iets kleins om uit te pakken, zodat er op eerste kerstdag meer dan één pakje is.",
    ],
    faq: [
      { q: "Wat geef je een tiener voor kerst?", a: "Iets dat past bij wat hij of zij nu doet: muziek, gamen, bouwen of tekenen. Audio-accessoires en gamingspullen zijn vaak veilige keuzes als je weet welk systeem er in huis is." },
      { q: "Wat is het verschil met het sinterklaascadeau voor een tiener?", a: "De selectie en de besteldeadline verschillen. Voor kerst is de uiterste bezorgdatum 24 december, dus je hebt meer tijd dan voor pakjesavond op 5 december." },
      { q: "Is een cadeaubon een goed alternatief?", a: "Voor veel tieners wel, zeker als je smaak niet kent. Een klein cadeau uit deze selectie erbij laat zien dat je hebt nagedacht." },
      { q: "Tot wanneer kan ik bestellen voor kerst?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend op basis van de verwachte levertijd, met een dag extra marge voor de drukte." },
    ],
    related: ["sinterklaascadeau-tiener", "gamecadeau-tiener-13-17", "techcadeau", "muziekcadeau"],
  },
  {
    slug: "sinterklaascadeau-voor-vader",
    title: "Sinterklaascadeau voor je vader",
    metaTitle: "Sinterklaascadeau voor je vader | OpTijdCadeau",
    metaDescription:
      "Sinterklaascadeaus voor je vader: gereedschap, audio, LEGO Technic en meer. Met levertijd en uiterste besteldatum voor pakjesavond op 5 december.",
    intro: [
      "Een vader die zegt dat hij niets nodig heeft, heeft meestal wel dingen die hij gebruikt en graag een stap beter zou zien. Kijk daarom naar zijn vaste gewoonten: klussen in het weekend, muziek luisteren, hardlopen, lezen of een groot project bouwen. Een cadeau dat daarop aansluit, is meer waard dan iets dat alleen nieuw is.",
      "In deze selectie staan gereedschap en opbergers, speakers en platenspelers, een e-reader, sporthorloges en grote LEGO Technic-sets voor een rustige middag. Heeft hij al een accusysteem of een vast merk, kies dan iets dat daarbij past. Bij elk product zie je de levertijd en de uiterste besteldatum voor pakjesavond. Dat is zaterdag 5 december, dus het cadeau moet uiterlijk vrijdag 4 december in huis zijn. Je bestelt bij de winkel zelf; wij verkopen niets. Zoek je een cadeau voor kerst, kijk dan bij de kerstgids voor je vader.",
    ],
    filters: { voor: "vader", optijd: "sinterklaas" },
    tips: [
      "Vraag stiekem aan een broer, zus of je moeder wat hij al heeft. Bij gereedschap telt vooral het merk van zijn accu's.",
      "Maak van een cadeau een gedeeld moment: een bouwset of spel kun je samen uitpakken en meteen proberen.",
      "Bij een surprise kun je het cadeau verstoppen in iets dat met zijn hobby te maken heeft, bijvoorbeeld een gereedschapskist.",
      "Bewaar de bon voor de zekerheid, zeker bij elektronica en duurdere cadeaus.",
    ],
    faq: [
      { q: "Wat geef je je vader voor Sinterklaas?", a: "Iets dat bij zijn hobby of dagelijkse gewoonte past: gereedschap voor wie klust, een speaker of platenspeler voor wie van muziek houdt, of een bouwset voor een rustige middag." },
      { q: "Wat geef je een vader die alles al heeft?", a: "Kies iets dat hij verbruikt of waar hij zichzelf niet snel aan zou besteden, zoals een betere versie van iets dat hij dagelijks gebruikt." },
      { q: "Wat is het verschil met de kerstgids voor je vader?", a: "Deze gids rekent met pakjesavond op 5 december en toont alleen cadeaus die daarvoor nog op tijd komen. De kerstgids rekent met 24 december." },
      { q: "Tot wanneer kan ik bestellen voor pakjesavond?", a: "De uiterste besteldatum staat bij elk cadeau en wordt per product berekend, met een dag marge. Het cadeau moet uiterlijk vrijdag 4 december in huis zijn." },
    ],
    related: ["kerstcadeau-voor-vader", "cadeau-vader-klussen-gereedschap", "techcadeau", "sportcadeau-voor-volwassenen"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
