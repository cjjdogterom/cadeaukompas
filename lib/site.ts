export const site = {
  name: "OpTijdCadeau", // domein optijdcadeau.nl (gekozen door eigenaar 17-11)
  tagline: "Cadeaus die op tijd aankomen",
  description:
    "Cadeau-ideeën voor Sinterklaas en kerst, gefilterd op wie, budget en interesse — met eerlijke levertijden en een duidelijke uiterste besteldatum.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Indexeren pas na livegang-akkoord van de eigenaar.
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  company: {
    legalName: "Omega Ksi",
    address: "[IN TE VULLEN: adres]",
    email: "dogteromc03@gmail.com",
    phone: "[IN TE VULLEN: telefoon]",
    kvk: "90505611",
    vat: "NL249643807B01",
  },
};
