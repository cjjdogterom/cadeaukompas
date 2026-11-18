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
    related: ["gamecadeau-tiener-13-17", "sinterklaascadeau-kinderen-8-12", "cadeau-onder-25-euro-collega", "cadeau-onder-15-euro"],
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
    related: ["sinterklaascadeau-tiener", "gamecadeau-tiener-13-17", "cadeau-kinderen-4-7-jaar", "sinterklaascadeau-baby-peuter"],
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
    related: ["cadeau-onder-25-euro-collega", "cadeau-voor-moeder", "kerstcadeau-voor-vader", "cadeau-voor-opa-en-oma"],
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
    related: ["puzzel-en-spelcadeau-oma-opa", "cadeau-voor-moeder", "kerstcadeau-voor-vader", "sinterklaascadeau-baby-peuter"],
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
    related: ["cadeau-vader-klussen-gereedschap", "cadeau-voor-partner", "cadeau-voor-moeder", "cadeau-voor-opa-en-oma"],
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
    related: ["sinterklaascadeau-baby-peuter", "sinterklaascadeau-kinderen-8-12", "cadeau-onder-15-euro", "cadeau-voor-opa-en-oma"],
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
    related: ["kerstcadeau-voor-vader", "cadeau-voor-partner", "cadeau-voor-opa-en-oma", "cadeau-onder-25-euro-collega"],
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
    related: ["sinterklaascadeau-tiener", "sinterklaascadeau-kinderen-8-12", "cadeau-onder-25-euro-collega", "kerstpakket-thuiswerker"],
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
    related: ["cadeau-voor-opa-en-oma", "cadeau-voor-moeder", "kerstcadeau-voor-vader", "cadeau-onder-15-euro"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
