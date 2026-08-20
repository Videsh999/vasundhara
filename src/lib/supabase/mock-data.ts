export interface CollectionItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  story?: string;
  inspiration?: string;
  heroImage: string;
  heroVideo?: string;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export interface JewelleryItem {
  id: string;
  title: string;
  slug: string;
  code: string;
  category: string;
  karat: string;
  diamondCarat?: number;
  description: string;
  inspiration?: string;
  specifications: Record<string, string | number>;
  primaryImage: string;
  galleryMedia: string[];
  isFeatured: boolean;
  isPublished: boolean;
  collectionSlug: string;
  model3D?: string;
  model3DPoster?: string;
  model3DFormat?: 'gltf' | 'glb';
  model3DEnabled?: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  slug: string;
  eventType: 'EVENT' | 'EXHIBITION' | 'PRIVATE';
  category: 'Events' | 'Exhibitions' | 'Private Experiences';
  dateStart: string;
  dateEnd?: string;
  location: string;
  venueDetails: string;
  description: string;
  story?: string;
  curatorialStatement?: string;
  coverImage: string;
  heroVideo?: string;
  galleryMedia: string[];
  isFeatured: boolean;
  isPublished: boolean;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export type EventItem = ExperienceItem;

export interface TestimonialItem {
  id: string;
  customerName: string;
  location: string;
  quote: string;
  occasion: string;
  collectionName: string;
  avatarImage: string;
  jewelleryImage?: string;
}

export interface HeritageChapter {
  id: string;
  chapterNumber: string;
  title: string;
  slug: string;
  eyebrow: string;
  headline: string;
  content: string[];
  image: string;
}

export interface BespokeStage {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  details: string;
  image: string;
}

export const MOCK_HERITAGE_CHAPTERS: HeritageChapter[] = [
  {
    id: "chap-1",
    chapterNumber: "01",
    title: "The House",
    slug: "the-house",
    eyebrow: "HYDERABAD LINEAGE",
    headline: "Born in the Royal City of Hyderabad",
    content: [
      "The city of Hyderabad has long held a reverent place in global high jewellery history. Known for its imperial courts, legendary gemstone vaults, and royal trousseau traditions, it provided the soil from which Vasundhara grew.",
      "Rooted in these regal traditions, the House of Vasundhara was established to honor the art of royal Indian goldsmithing, sculpting pieces that carry the weight of memory and royal elegance."
    ],
    image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: "chap-2",
    chapterNumber: "02",
    title: "The Legacy",
    slug: "the-legacy",
    eyebrow: "HERITAGE PROVENANCE",
    headline: "Preserving Immortal Goldsmithing Traditions",
    content: [
      "The aesthetic language of Vasundhara draws deep inspiration from courtly Indian regalia—multi-tiered uncut polki diamond rani haars, natural Basra pearl fringes, and vivid Zambian emerald drops.",
      "Every creation is conceived not merely as an ornament, but as a family legacy intended to be handed down across generations."
    ],
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: "chap-3",
    chapterNumber: "03",
    title: "The Craft",
    slug: "the-craft",
    eyebrow: "KARIGAR MASTERY",
    headline: "Human Mastery Over Precious Metals",
    content: [
      "At Vasundhara, machine production is strictly absent. Every curve, Nakshi gold engraving, and pure gold foil Kundan encasement is brought to life by master artisans whose lineage spans generations.",
      "The process demands months of patient devotion, transforming rare gemstones into timeless masterpieces."
    ],
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: "chap-4",
    chapterNumber: "04",
    title: "The Vision",
    slug: "the-vision",
    eyebrow: "THE FUTURE",
    headline: "Modern Sophistication Meets Ancient Heritage",
    content: [
      "As we look to the future, Vasundhara bridges the timeless grandeur of Indian royal heritage with contemporary architectural diamond design.",
      "We remain devoted to exclusivity, personal luxury, and total discretion for our discerning patrons worldwide."
    ],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1600"
  }
];

export const MOCK_BESPOKE_STAGES: BespokeStage[] = [
  {
    stepNumber: "01",
    title: "DISCOVER",
    subtitle: "Understanding the Client's Vision",
    description: "The bespoke journey begins with an intimate private dialogue. We explore your family heritage, aesthetic preferences, and the emotion of the occasion.",
    details: "Private Consultation • Gemstone Curation • Heritage Lore",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600"
  },
  {
    stepNumber: "02",
    title: "ENVISION",
    subtitle: "Exploring Inspiration & Design",
    description: "Our master designers translate your vision into hand-drawn gouache parchment illustrations, selecting rare syndicate polki gems and Zambian emeralds.",
    details: "Hand-Drawn Gouache Renderings • Rare Gem Selection • Proportional Balancing",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1600"
  },
  {
    stepNumber: "03",
    title: "CREATE",
    subtitle: "Crafting the Piece with Precision",
    description: "Master karigars hand-chisel the 22K Nakshi gold structures, set gold-foil Kundan encasements, and string natural Basra pearls.",
    details: "Hand-Sculpted Nakshi Gold • Pure Gold Foil Kundan Setting • Master Assembly",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1600"
  },
  {
    stepNumber: "04",
    title: "REFINE",
    subtitle: "Perfecting Every Detail",
    description: "Every angle is meticulously inspected under magnification. We verify metal tension, light reflection, and velvet-smooth comfort against the skin.",
    details: "Microscope Quality Inspection • Optical Fire Verification • Comfort Alignment",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1600"
  },
  {
    stepNumber: "05",
    title: "REVEAL",
    subtitle: "Presenting the Finished Creation",
    description: "Your custom masterpiece is unveiled in a private chamber at our Jubilee Hills Flagship Salon, accompanied by certified GIA documentation and heirloom vault casing.",
    details: "Private Salon Unveiling • GIA Certification • Custom Heirloom Casing",
    image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&q=80&w=1600"
  }
];

export const MOCK_COLLECTIONS: CollectionItem[] = [
  {
    id: "col-eternal",
    title: "ETERNAL",
    slug: "eternal",
    category: "Diamond",
    description: "Classic. Elegant. Forever. Precision-cut diamond eternity creations and solitaire masterpieces.",
    story: "Created to celebrate love that endures forever, the Eternal Collection features flawless certified diamonds set in liquid-shine gold and platinum.",
    inspiration: "Timeless geometric balance and diamond brilliance.",
    heroImage: "/brand/vasundhara-emerald-solitaire-bib-suite.jpg",
    isFeatured: true,
    isPublished: true,
    displayOrder: 1,
  },
  {
    id: "col-heritage",
    title: "HERITAGE",
    slug: "heritage-collection",
    category: "Polki & Kundan",
    description: "Inspired by Tradition. Regal uncut polki diamonds, Basra pearls, and emerald drops.",
    story: "Each heirloom is hand-sculpted over months by master karigars using centuries-old 24K gold foil encasement techniques.",
    inspiration: "Heritage Indian royal jewellery forms handcrafted by master artisans.",
    heroImage: "/brand/vasundhara-royal-bridal-trinity.jpg",
    isFeatured: true,
    isPublished: true,
    displayOrder: 2,
  },
  {
    id: "col-grace",
    title: "GRACE",
    slug: "grace",
    category: "Fine Gold",
    description: "Beauty in Every Detail. Intricately studded gold bangles, kadas, and delicate daytime adornments.",
    story: "Effortless luxury sculpted in warm 22K gold, accented with brilliant pavé diamonds.",
    inspiration: "Flowing organic silhouettes and tactile gold textures.",
    heroImage: "/brand/vasundhara-emerald-diamond-kada.jpg",
    isFeatured: true,
    isPublished: true,
    displayOrder: 3,
  },
  {
    id: "col-celestia",
    title: "CELESTIA",
    slug: "celestia",
    category: "Haute Joaillerie",
    description: "Radiant Like Stars. Floral diamond motifs and cascading luminous gemstones.",
    story: "Star-like constellations of pear and marquise diamonds designed for radiant gala evenings.",
    inspiration: "Celestial night skies and blooming jasmine blossoms in diamond form.",
    heroImage: "/brand/vasundhara-ruby-diamond-bangles.jpg",
    isFeatured: true,
    isPublished: true,
    displayOrder: 4,
  },
  {
    id: "col-1",
    title: "The Royal Bridal Heritage",
    slug: "nizam-bridal-heritage",
    category: "Bridal",
    description: "Royal bridal chokers, multi-tiered uncut diamond rani haars, and heirloom neckpieces encrusted with rare South Sea pearls and Zambian emerald drop jewels.",
    story: "Inspired by the legendary bridal traditions of South India, this collection revives imperial splendour.",
    inspiration: "Architectural motifs and courtly archways, layered with Basra pearls and unheated Zambian emerald drops.",
    heroImage: "/brand/vasundhara-crimson-bridal-emerald.jpg",
    isFeatured: true,
    isPublished: true,
    displayOrder: 5,
  }
];

export const MOCK_JEWELLERY: JewelleryItem[] = [
  {
    id: "jewel-1",
    title: "The Royal Emerald & Polki Choker Suite",
    slug: "royal-nizam-emerald-choker",
    code: "VDR-BD-001",
    category: "Bridal",
    karat: "18K Gold",
    diamondCarat: 42.5,
    description: "A breathtaking multi-strand polki diamond choker featuring a central 65-carat natural Zambian emerald pendant, fringed with hand-strung Basra pearls.",
    inspiration: "Designed as an homage to royal bridal neckpieces, combining uncut polki brilliance with vivid Zambian green.",
    specifications: {
      "Gold Purity": "18K Yellow Gold",
      "Gold Weight": "185 grams",
      "Diamond Weight": "42.50 Carats",
      "Gemstone Drop": "65 Carat Natural Zambian Emerald",
      "Pearls": "Basra South Sea Pearls",
      "Craftsmanship": "Hand-Set Kundan & Nakshi Encasement"
    },
    primaryImage: "/brand/vasundhara-crimson-bridal-emerald.jpg",
    galleryMedia: [
      "/brand/vasundhara-crimson-bridal-emerald.jpg",
      "/brand/vasundhara-royal-bridal-trinity.jpg",
      "/brand/vasundhara-nizam-rajmata-polki-portrait.jpg",
      "/brand/vasundhara-emerald-solitaire-bib-suite.jpg"
    ],
    isFeatured: true,
    isPublished: true,
    collectionSlug: "nizam-bridal-heritage",
    model3DEnabled: true,
    model3DPoster: "/brand/vasundhara-crimson-bridal-emerald.jpg"
  },
  {
    id: "jewel-2",
    title: "Colombian Emerald & Solitaire Mesh Bib Suite",
    slug: "solitaire-symphony-earrings",
    code: "VDR-DM-042",
    category: "Diamond",
    karat: "18K White Gold",
    diamondCarat: 38.5,
    description: "An extraordinary high jewellery masterpiece featuring an expansive diamond mesh bib necklace fringed with vivid green Colombian emerald drops and matching chandelier earrings.",
    inspiration: "Modern gala elegance engineered to catch and scatter ambient light with fluid movement.",
    specifications: {
      "Gold Purity": "18K White Gold",
      "Gold Weight": "145 grams",
      "Diamond Color": "D-E Colorless",
      "Diamond Clarity": "VVS1 Flawless",
      "Carat Weight": "38.50 Total Carats",
      "Emeralds": "Natural Colombian Emeralds"
    },
    primaryImage: "/brand/vasundhara-emerald-solitaire-bib-suite.jpg",
    galleryMedia: [
      "/brand/vasundhara-emerald-solitaire-bib-suite.jpg",
      "/brand/vasundhara-imperial-jade-high-jewellery.jpg",
      "/brand/vasundhara-ruby-diamond-bangles.jpg"
    ],
    isFeatured: true,
    isPublished: true,
    collectionSlug: "solitaire-fine-diamonds"
  },
  {
    id: "jewel-3",
    title: "Burmese Ruby & Diamond Heritage Kadas",
    slug: "imperial-polki-rani-haar",
    code: "VDR-PK-108",
    category: "Ruby",
    karat: "18K White Gold & Platinum",
    diamondCarat: 32.0,
    description: "A monumental twin pair of cushion-cut Pigeon Blood Burmese ruby and diamond bangles set in master filigree scrollwork.",
    inspiration: "Courtly regalia handed down through centuries of royal Indian heritage.",
    specifications: {
      "Gold Purity": "18K White Gold",
      "Gold Weight": "95 grams (Pair)",
      "Ruby Weight": "45.00 Carats Unheated Rubies",
      "Diamond Weight": "32.00 Carats VVS Diamonds"
    },
    primaryImage: "/brand/vasundhara-ruby-diamond-bangles.jpg",
    galleryMedia: [
      "/brand/vasundhara-ruby-diamond-bangles.jpg",
      "/brand/vasundhara-emerald-diamond-kada.jpg",
      "/brand/vasundhara-imperial-jade-high-jewellery.jpg"
    ],
    isFeatured: true,
    isPublished: true,
    collectionSlug: "imperial-polki-kundan"
  },
  {
    id: "jewel-4",
    title: "Sacred Nakshi & Syndicate Polki Rajmata Suite",
    slug: "sacred-nakshi-temple-kada",
    code: "VDR-TP-088",
    category: "Temple",
    karat: "22K Gold",
    description: "A solid 22K antique gold bridal choker and grand rani haar featuring hand-chiseled Nakshi engraving, syndicate uncut polki diamonds, and Basra pearl tassels.",
    inspiration: "Southern Indian sacred temple iconography handcrafted by hereditary master artisans.",
    specifications: {
      "Gold Purity": "22K Solid Yellow Gold",
      "Gold Weight": "210 grams",
      "Gemstones": "Natural Syndicate Polki & Basra Pearls",
      "Finish": "Antique Nakshi Patina"
    },
    primaryImage: "/brand/vasundhara-nizam-rajmata-polki-portrait.jpg",
    galleryMedia: [
      "/brand/vasundhara-nizam-rajmata-polki-portrait.jpg",
      "/brand/vasundhara-royal-bridal-trinity.jpg",
      "/brand/vasundhara-temple-peacock-necklace.jpg"
    ],
    isFeatured: true,
    isPublished: true,
    collectionSlug: "temple-gold-heirlooms"
  },
  {
    id: "jewel-5",
    title: "Imperial Jade & Solitaire High Contemporary Suite",
    slug: "imperial-jade-contemporary-suite",
    code: "VDR-HC-099",
    category: "Contemporary",
    karat: "18K White & Yellow Gold",
    description: "A rare collector piece combining carved imperial jade with a sculptural golden eagle, diamond butterfly choker, and mint tourmaline drops.",
    inspiration: "Art deco nature motifs meeting royal Asian jade lapidary craftsmanship.",
    specifications: {
      "Gold Purity": "18K Gold",
      "Gold Weight": "82 grams",
      "Gemstones": "Carved Imperial Jade & Natural Mint Tourmalines",
      "Diamonds": "14.50 Carats Round Brilliant & Marquise"
    },
    primaryImage: "/brand/vasundhara-imperial-jade-high-jewellery.jpg",
    galleryMedia: [
      "/brand/vasundhara-imperial-jade-high-jewellery.jpg",
      "/brand/vasundhara-emerald-solitaire-bib-suite.jpg"
    ],
    isFeatured: true,
    isPublished: true,
    collectionSlug: "contemporary"
  }
];

export const MOCK_EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    title: "The Royal Bridal Soiree 2026",
    slug: "nizam-bridal-soiree-2026",
    eventType: "EVENT",
    category: "Events",
    dateStart: "September 15, 2026",
    dateEnd: "September 17, 2026",
    location: "Taj Falaknuma Palace, Hyderabad",
    venueDetails: "The Grand Ballroom & Royal Gardens",
    description: "An exclusive invitation-only soirée presenting Vasundhara's 2026 high bridal diamond heirlooms amidst the imperial splendor of Falaknuma Palace.",
    story: "Set against the marble courtyards and velvet drawing rooms of Taj Falaknuma Palace, the 2026 Royal Bridal Soiree brings together distinguished patrons and connoisseurs of fine jewellery. Patrons experience live karigar goldsmithing demonstrations, champagne receptions, and private chamber viewings.",
    curatorialStatement: "A celebration of South Indian heritage where historic architecture frames the brilliance of natural syndicate polki gems.",
    coverImage: "/brand/vasundhara-royal-bride-portrait.jpg",
    galleryMedia: [
      "/brand/vasundhara-royal-bride-portrait.jpg",
      "/brand/vasundhara-nizam-emerald-polki-suite.jpg",
      "/brand/vasundhara-masterpiece-jewellery.jpg"
    ],
    isFeatured: true,
    isPublished: true,
    status: "PUBLISHED"
  },
  {
    id: "exp-2",
    title: "Dubai High Jewellery Exhibition",
    slug: "dubai-high-jewellery-2026",
    eventType: "EXHIBITION",
    category: "Exhibitions",
    dateStart: "November 05, 2026",
    dateEnd: "November 08, 2026",
    location: "Armani Hotel, Burj Khalifa, Dubai",
    venueDetails: "Private Salon 1, Executive Suite level",
    description: "A private preview of rare D-flawless solitaires, unheated ruby chokers, and royal uncut polki masterpieces for international collectors.",
    story: "Hosted in the sky suites of Burj Khalifa, the Dubai exhibition marks our international showcase for discerning royal patrons in the UAE and Middle East.",
    curatorialStatement: "Cross-continental high jewellery dialogue connecting Golconda diamond lineages to Middle Eastern collector aesthetics.",
    coverImage: "/brand/vasundhara-ruby-diamond-bangles.jpg",
    galleryMedia: [
      "/brand/vasundhara-ruby-diamond-bangles.jpg",
      "/brand/vasundhara-emerald-diamond-kada.jpg",
      "/brand/vasundhara-masterpiece-jewellery.jpg"
    ],
    isFeatured: true,
    isPublished: true,
    status: "PUBLISHED"
  },
  {
    id: "exp-3",
    title: "Jubilee Hills Private Salon Showcase",
    slug: "jubilee-hills-private-showcase",
    eventType: "PRIVATE",
    category: "Private Experiences",
    dateStart: "By Appointment",
    location: "Flagship Salon, Jubilee Hills, Hyderabad",
    venueDetails: "Private Consultation Suites",
    description: "Private one-on-one bridal trousseau curations held in high-security private salons.",
    story: "Designed for discerning families and collectors seeking complete discretion. Patrons view rare gemstone acquisitions accompanied by private valet service and custom champagne pairings.",
    curatorialStatement: "Discreet high jewellery curation tailored to individual family vault legacies.",
    coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600",
    galleryMedia: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1600"
    ],
    isFeatured: false,
    isPublished: true,
    status: "PUBLISHED"
  }
];

export const MOCK_EVENTS = MOCK_EXPERIENCES;

export const MOCK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    customerName: "Princess Ananya Rao",
    location: "Hyderabad & London",
    quote: "Vasundhara transformed my bridal vision into an immortal heirloom. Wearing their Royal Emerald Choker felt like embodying timeless Indian heritage.",
    occasion: "Royal Bridal Wedding",
    collectionName: "The Royal Bridal Heritage",
    avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "t-2",
    customerName: "Dr. Sunita Reddy",
    location: "Hyderabad",
    quote: "The warmth of Vasundhara's bespoke consultation team and their unmatched diamond brilliance make every visit to their flagship showroom unforgettable.",
    occasion: "25th Anniversary Heirloom",
    collectionName: "Solitaire & Fine Diamonds",
    avatarImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
  }
];

// Helper Query Functions for Dynamic Routes
export function getCollectionBySlug(slug: string): CollectionItem | undefined {
  return MOCK_COLLECTIONS.find((col) => col.slug === slug);
}

export function getJewelleryBySlug(slug: string): JewelleryItem | undefined {
  return MOCK_JEWELLERY.find((j) => j.slug === slug);
}

export function getJewelleryByCollection(collectionSlug: string): JewelleryItem[] {
  return MOCK_JEWELLERY.filter((j) => j.collectionSlug === collectionSlug);
}

export function getRelatedCollections(currentSlug: string): CollectionItem[] {
  return MOCK_COLLECTIONS.filter((col) => col.slug !== currentSlug).slice(0, 3);
}

export function getRelatedJewellery(currentSlug: string): JewelleryItem[] {
  return MOCK_JEWELLERY.filter((j) => j.slug !== currentSlug).slice(0, 3);
}

export function getExperienceBySlug(slug: string): ExperienceItem | undefined {
  return MOCK_EXPERIENCES.find((exp) => exp.slug === slug);
}

export function getEvents(): ExperienceItem[] {
  return MOCK_EXPERIENCES.filter((exp) => exp.eventType === "EVENT" && exp.status === "PUBLISHED");
}

export function getExhibitions(): ExperienceItem[] {
  return MOCK_EXPERIENCES.filter((exp) => exp.eventType === "EXHIBITION" && exp.status === "PUBLISHED");
}

export function getPrivateExperiences(): ExperienceItem[] {
  return MOCK_EXPERIENCES.filter((exp) => exp.eventType === "PRIVATE" && exp.status === "PUBLISHED");
}

export function getRelatedExperiences(currentSlug: string): ExperienceItem[] {
  return MOCK_EXPERIENCES.filter((exp) => exp.slug !== currentSlug).slice(0, 2);
}
