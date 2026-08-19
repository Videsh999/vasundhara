import { NextResponse } from "next/server";
import {
  MOCK_COLLECTIONS,
  MOCK_JEWELLERY,
  MOCK_EXPERIENCES,
  MOCK_HERITAGE_CHAPTERS,
  MOCK_BESPOKE_STAGES,
} from "@/lib/supabase/mock-data";

// Simple Server-side Rate Limiting Map (Max 20 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return false;
  }

  if (limit.count >= 25) {
    return true;
  }

  limit.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "client-ip";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          reply: "Our Concierge is receiving high demand. Please wait a moment before sending another message.",
          actions: [{ label: "Request Private Viewing", actionType: "APPOINTMENT" }],
        },
        { status: 429 }
      );
    }

    const { message, history } = await req.json();
    const userQuery = (message || "").trim();
    const apiKey = process.env.OPENAI_API_KEY;

    // Build Knowledge Base JSON for System Prompt
    const dbContext = {
      collections: MOCK_COLLECTIONS.map((c) => ({
        title: c.title,
        slug: c.slug,
        category: c.category,
        description: c.description,
        heroImage: c.heroImage,
      })),
      jewellery: MOCK_JEWELLERY.map((j) => ({
        title: j.title,
        slug: j.slug,
        code: j.code,
        category: j.category,
        karat: j.karat,
        description: j.description,
        primaryImage: j.primaryImage,
        collectionSlug: j.collectionSlug,
      })),
      experiences: MOCK_EXPERIENCES.map((e) => ({
        title: e.title,
        slug: e.slug,
        eventType: e.eventType,
        dateStart: e.dateStart,
        location: e.location,
        description: e.description,
        coverImage: e.coverImage,
      })),
      heritageChapters: MOCK_HERITAGE_CHAPTERS.map((h) => ({
        title: h.title,
        headline: h.headline,
      })),
      bespokeStages: MOCK_BESPOKE_STAGES.map((b) => ({
        stage: b.title,
        subtitle: b.subtitle,
      })),
    };

    if (apiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `You are Vasundhara Concierge, the private luxury assistant for Vasundhara Diamond Roof, Hyderabad.
You communicate with royal Indian hospitality, understated confidence, expert diamond knowledge, and absolute truthfulness.

CRITICAL RULES:
1. Ground ALL answers strictly in the following JSON knowledge base. Do NOT invent prices, non-existent jewellery pieces, fake events, or false historical claims.
2. If pricing or stock is requested and not listed, reply that pieces are available for private inquiry/viewing.
3. Respond in JSON format matching this schema:
{
  "reply": "string (concise, warm, understated response)",
  "intent": "GENERAL" | "COLLECTIONS" | "JEWELLERY" | "EVENTS" | "HERITAGE" | "BESPOKE" | "APPOINTMENT",
  "recommendedCollections": [{"title": "...", "slug": "...", "category": "...", "heroImage": "..."}],
  "recommendedJewellery": [{"title": "...", "slug": "...", "code": "...", "primaryImage": "...", "karat": "..."}],
  "recommendedExperiences": [{"title": "...", "slug": "...", "eventType": "...", "coverImage": "..."}],
  "actions": [{"label": "...", "href": "...", "actionType": "APPOINTMENT" | "LINK"}]
}

VASUNDHARA KNOWLEDGE BASE:
${JSON.stringify(dbContext)}`,
              },
              ...(history || []).map((h: { role: string; content: string }) => ({
                role: h.role === "user" ? "user" : "assistant",
                content: h.content,
              })),
              {
                role: "user",
                content: userQuery,
              },
            ],
            response_format: { type: "json_object" },
          }),
        });

        if (response.ok) {
          const json = await response.json();
          const parsed = JSON.parse(json.choices[0].message.content);
          return NextResponse.json(parsed);
        }
      } catch (e) {
        console.error("OpenAI call failed, reverting to local NLP engine", e);
      }
    }

    // Local Grounded NLP Knowledge Engine Fallback
    const q = userQuery.toLowerCase();

    if (q.includes("bridal") || q.includes("wedding") || q.includes("trousseau") || q.includes("nizam")) {
      const col = MOCK_COLLECTIONS.find((c) => c.slug === "nizam-bridal-heritage") || MOCK_COLLECTIONS[0];
      const jewel = MOCK_JEWELLERY.filter((j) => j.category === "Bridal");

      return NextResponse.json({
        reply: "Our Nizam Bridal Heritage collection revives the regal splendor of 19th-century Hyderabad courts, featuring multi-tiered polki rani haars and Zambian emerald drop neckpieces.",
        intent: "COLLECTIONS",
        recommendedCollections: [col],
        recommendedJewellery: jewel,
        actions: [
          { label: "Explore Nizam Bridal Collection", href: "/collections/nizam-bridal-heritage" },
          { label: "Request Private Viewing", actionType: "APPOINTMENT" },
        ],
      });
    }

    if (q.includes("bespoke") || q.includes("custom") || q.includes("personal") || q.includes("commission")) {
      return NextResponse.json({
        reply: "The Vasundhara Bespoke Journey is an intimate 5-stage atelier process: Discover, Envision, Create, Refine, and Reveal. Our master karigars bring your personal heirloom vision to life.",
        intent: "BESPOKE",
        actions: [
          { label: "Explore Bespoke Journey", href: "/bespoke/process" },
          { label: "Request Bespoke Consultation", href: "/bespoke/enquire" },
        ],
      });
    }

    if (q.includes("heritage") || q.includes("history") || q.includes("about") || q.includes("story")) {
      return NextResponse.json({
        reply: "Rooted in the royal city of Hyderabad, Vasundhara preserves centuries of Indian high jewellery craftsmanship, celebrating 22K Nakshi gold chiseling and natural syndicate polki gems.",
        intent: "HERITAGE",
        actions: [
          { label: "Discover House Story", href: "/heritage/story" },
          { label: "Explore Craftsmanship", href: "/heritage/craftsmanship" },
        ],
      });
    }

    if (q.includes("event") || q.includes("exhibition") || q.includes("preview") || q.includes("showcase")) {
      return NextResponse.json({
        reply: "Vasundhara presents curated high jewellery previews at imperial destinations, including Taj Falaknuma Palace in Hyderabad and Armani Hotel Dubai.",
        intent: "EVENTS",
        recommendedExperiences: MOCK_EXPERIENCES,
        actions: [
          { label: "Explore Events Calendar", href: "/events" },
          { label: "Explore Exhibitions", href: "/exhibitions" },
        ],
      });
    }

    if (q.includes("diamond") || q.includes("solitaire") || q.includes("earring") || q.includes("necklace")) {
      return NextResponse.json({
        reply: "We offer GIA-certified D-flawless solitaires and hand-set polki masterpieces crafted with minimal metal settings for optical fire.",
        intent: "JEWELLERY",
        recommendedJewellery: MOCK_JEWELLERY.slice(0, 2),
        actions: [
          { label: "Explore Collections", href: "/collections" },
          { label: "Request Private Viewing", actionType: "APPOINTMENT" },
        ],
      });
    }

    if (q.includes("appointment") || q.includes("book") || q.includes("visit") || q.includes("salon")) {
      return NextResponse.json({
        reply: "We warmly welcome you to our flagship salon in Jubilee Hills, Hyderabad, or via a private virtual consultation.",
        intent: "APPOINTMENT",
        actions: [{ label: "Request Private Viewing", actionType: "APPOINTMENT" }],
      });
    }

    // Default Fallback
    return NextResponse.json({
      reply: "Namaste. I am your private Vasundhara Concierge. How may I assist your royal exploration of our collections, heritage, or bespoke commissions today?",
      intent: "GENERAL",
      actions: [
        { label: "Explore Collections", href: "/collections" },
        { label: "Discover Heritage", href: "/heritage" },
        { label: "Request Private Viewing", actionType: "APPOINTMENT" },
      ],
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        reply: "Our Concierge team is currently at your service. You may explore our collections or request a private viewing directly.",
        actions: [
          { label: "Explore Collections", href: "/collections" },
          { label: "Request Private Viewing", actionType: "APPOINTMENT" },
        ],
      },
      { status: 500 }
    );
  }
}
