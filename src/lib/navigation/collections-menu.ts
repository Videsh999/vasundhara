export interface MenuCategoryItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  badge?: string;
}

export interface FeaturedVisualItem {
  eyebrow: string;
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  alt: string;
}

export const SHOP_BY_JEWELLERY: MenuCategoryItem[] = [
  {
    id: "shop-rings",
    title: "Rings",
    description: "Solitaire, statement & heirloom designs",
    slug: "/collections?category=rings",
  },
  {
    id: "shop-earrings",
    title: "Earrings",
    description: "From refined studs to sculptural masterpieces",
    slug: "/collections?category=earrings",
  },
  {
    id: "shop-necklaces",
    title: "Necklaces",
    description: "Diamond, gold & ceremonial creations",
    slug: "/collections?category=necklaces",
  },
  {
    id: "shop-pendants",
    title: "Pendants",
    description: "Elegant pieces for every expression",
    slug: "/collections?category=pendants",
  },
  {
    id: "shop-bangles",
    title: "Bangles & Bracelets",
    description: "Crafted movement in gold and diamonds",
    slug: "/collections?category=bangles-bracelets",
  },
  {
    id: "shop-bridal",
    title: "Bridal Jewellery",
    description: "Timeless pieces for the most meaningful celebrations",
    slug: "/collections?category=bridal",
  },
  {
    id: "shop-mangalsutra",
    title: "Mangalsutra",
    description: "Contemporary expressions of tradition",
    slug: "/collections?category=mangalsutra",
  },
];

export const EXPLORE_COLLECTIONS: MenuCategoryItem[] = [
  {
    id: "col-high-jewellery",
    title: "High Jewellery",
    description: "Exceptional creations for extraordinary moments",
    slug: "/collections/high-jewellery",
  },
  {
    id: "col-diamond",
    title: "Diamond Jewellery",
    description: "Rare brilliance, elegantly composed",
    slug: "/collections/diamond-jewellery",
  },
  {
    id: "col-gold",
    title: "Gold Jewellery",
    description: "18KT & 22KT creations shaped by Indian craftsmanship",
    slug: "/collections/gold-jewellery",
  },
  {
    id: "col-polki",
    title: "Polki",
    description: "Uncut diamond artistry with timeless character",
    slug: "/collections/polki",
  },
  {
    id: "col-kundan",
    title: "Kundan",
    description: "Traditional craftsmanship with contemporary refinement",
    slug: "/collections/kundan",
  },
  {
    id: "col-temple",
    title: "Temple Jewellery",
    description: "Inspired by India's rich jewellery traditions",
    slug: "/collections/temple-jewellery",
  },
  {
    id: "col-heirloom",
    title: "Heirloom",
    description: "Pieces created to be cherished across generations",
    slug: "/collections/heirloom",
  },
  {
    id: "col-contemporary",
    title: "Contemporary",
    description: "Modern silhouettes with timeless elegance",
    slug: "/collections/contemporary",
  },
];

export const SIGNATURE_COLLECTIONS: MenuCategoryItem[] = [
  {
    id: "sig-bespoke",
    title: "Bespoke Jewellery",
    description: "Create something uniquely yours",
    slug: "/bespoke",
  },
  {
    id: "sig-bridal-couture",
    title: "Bridal Couture",
    description: "A complete expression for your celebration",
    slug: "/collections/bridal-couture",
  },
  {
    id: "sig-heritage",
    title: "Heritage",
    description: "Stories preserved through jewellery",
    slug: "/about",
  },
  {
    id: "sig-new-arrivals",
    title: "New Arrivals",
    description: "The latest expressions from Vasundhara",
    slug: "/collections?filter=new-arrivals",
    badge: "NEW",
  },
];

export const FEATURED_COLLECTION: FeaturedVisualItem = {
  eyebrow: "FEATURED",
  title: "Bespoke High Jewellery",
  description: "One-of-a-kind heirlooms handcrafted in our private ateliers.",
  ctaText: "DISCOVER",
  ctaLink: "/bespoke",
  image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200",
  alt: "Vasundhara Bespoke High Jewellery Masterpiece",
};
