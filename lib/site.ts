export const site = {
  name: "Cadeaukompas", // werknaam — zie ops/vragen-eigenaar.md vraag 1
  tagline: "Cadeaus die op tijd aankomen",
  description:
    "Cadeau-ideeën voor Sinterklaas en kerst, gefilterd op wie, budget en interesse — met eerlijke levertijden en een duidelijke uiterste besteldatum.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Indexeren pas na livegang-akkoord van de eigenaar.
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  company: {
    legalName: "[IN TE VULLEN: bedrijfsnaam]",
    address: "[IN TE VULLEN: adres]",
    email: "[IN TE VULLEN: e-mail]",
    phone: "[IN TE VULLEN: telefoon]",
    kvk: "90505611",
    vat: "[IN TE VULLEN]",
  },
};
