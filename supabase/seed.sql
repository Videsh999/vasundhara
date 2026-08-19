-- Vasundhara Diamond Roof — Initial Seed Data

-- 1. Homepage Sections Seed
INSERT INTO public.homepage_sections (section_key, title, subtitle, content, is_active, display_order)
VALUES
('hero', 'Vasundhara Diamond Roof', 'Royal Indian Heritage & Bespoke Diamond Fine Jewellery', '{"video_url": "https://assets.mixkit.co/videos/preview/mixkit-luxury-diamond-ring-glimmering-in-light-42867-large.mp4", "poster_url": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=2000", "headline": "Where Heritage Meets Timeless Brilliance", "subheadline": "Hyderabad''s premier maison of bespoke diamond heirlooms & royal Nizam craftsmanship."}'::jsonb, true, 1),
('brand_intro', 'The Legacy of Vasundhara', 'A Heritage of Royal Nizam Elegance', '{"body": "For decades, Vasundhara Diamond Roof has stood as the pinnacle of bespoke Indian high jewellery. Born in the royal city of Hyderabad, our maison crafts legendary diamond chokers, ethereal polki neckpieces, and gold heirlooms that transcend generations."}'::jsonb, true, 2),
('featured_collections', 'Featured Collections', 'Curated Masterpieces', '{"description": "Explore our iconic bridal, polki, and contemporary diamond collections."}'::jsonb, true, 3),
('bespoke_section', 'Begin Your Bespoke Journey', 'Private Curation & Commission', '{"headline": "Your Dream. Our Master Artisans.", "body": "Collaborate with our master craftsmen to create a unique heirloom tailored exclusively to your royal occasion."}'::jsonb, true, 4)
ON CONFLICT (section_key) DO UPDATE SET content = EXCLUDED.content;

-- 2. Collections Seed
INSERT INTO public.collections (id, title, slug, category, description, is_featured, is_published, display_order, seo_title, seo_description)
VALUES
('a1000000-0000-0000-0000-000000000001', 'The Nizam Bridal Heritage', 'nizam-bridal-heritage', 'Bridal', 'Royal bridal necklaces, tiered uncut diamond rani haars, and chokers encrusted with rare South Sea pearls and Zambian emeralds.', true, true, 1, 'Nizam Bridal Heritage Collection | Vasundhara Diamonds', 'Discover royal Nizam bridal diamond jewellery crafted with rare pearls and emeralds.'),
('a1000000-0000-0000-0000-000000000002', 'Imperial Polki & Kundan', 'imperial-polki-kundan', 'Polki', 'Uncut diamond gems set in traditional gold foil settings, showcasing centuries of royal Indian goldsmithing.', true, true, 2, 'Imperial Polki & Kundan Jewellery | Vasundhara Diamonds', 'Authentic uncut diamond polki and kundan neckpieces for grand celebrations.'),
('a1000000-0000-0000-0000-000000000003', 'Solitaire & Fine Diamonds', 'solitaire-fine-diamonds', 'Diamond', 'Modern high-jewellery solitaires, pave diamond cuffs, and ethereal chandelier earrings engineered for international galas.', true, true, 3, 'Solitaire & Fine Diamonds | Vasundhara Diamonds', 'International quality solitaire diamond rings, bangles, and gala necklaces.'),
('a1000000-0000-0000-0000-000000000004', 'Temple Gold Heirlooms', 'temple-gold-heirlooms', 'Temple', 'Hand-carved 22K gold temple jewellery depicting sacred motifs, rubies, and antique nakshi detail.', false, true, 4, 'Temple Gold Heirlooms | Vasundhara Diamonds', 'Hand-carved 22K gold temple neckpieces and nagas bangles.')
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- 3. Jewellery Seed Items
INSERT INTO public.jewellery (title, slug, code, category, karat, diamond_carat, description, specifications, is_featured, is_published, display_order, collection_id)
VALUES
('The Royal Nizam Emerald Choker', 'royal-nizam-emerald-choker', 'VDR-BD-001', 'Bridal', '18K Gold', 42.50, 'A majestic multi-strand uncut diamond polki choker centered with a 65-carat natural Zambian emerald drop.', '{"gold_weight_g": 185, "diamond_clarity": "VVS1-VS1", "gemstones": "Zambian Emeralds & Basra Pearls"}'::jsonb, true, true, 1, 'a1000000-0000-0000-0000-000000000001'),
('Solitaire Symphony Cascade Earrings', 'solitaire-symphony-earrings', 'VDR-DM-042', 'Diamond', '18K White Gold', 14.20, 'Ethereal chandelier earrings featuring 28 pear-cut solitaires cascading like shimmering raindrops.', '{"gold_weight_g": 38, "diamond_clarity": "FL-IF", "diamond_color": "D-E"}'::jsonb, true, true, 2, 'a1000000-0000-0000-0000-000000000003'),
('Imperial Heritage Polki Rani Haar', 'imperial-polki-rani-haar', 'VDR-PK-108', 'Polki', '22K Yellow Gold', 88.00, 'A seven-line royal rani haar adorned with syndicate polki diamonds and carved ruby beads.', '{"gold_weight_g": 310, "gemstones": "Carved Burmese Rubies"}'::jsonb, true, true, 3, 'a1000000-0000-0000-0000-000000000002')
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- 4. Events & Exhibitions Seed
INSERT INTO public.events (title, slug, event_type, date_start, date_end, location, venue_details, description, is_featured, is_published)
VALUES
('The Royal Nizam Bridal Soiree 2026', 'nizam-bridal-soiree-2026', 'EVENT', '2026-09-15 18:00:00+00', '2026-09-17 21:00:00+00', 'Hyderabad', 'Taj Falaknuma Palace, Hyderabad', 'An invitation-only private exhibition of Vasundhara''s 2026 Royal Bridal Diamond Collection.', true, true),
('Dubai High Jewellery Exhibition', 'dubai-high-jewellery-2026', 'EXHIBITION', '2026-11-05 10:00:00+00', '2026-11-08 20:00:00+00', 'Dubai', 'Armani Hotel, Burj Khalifa, Dubai', 'Exclusive preview of bespoke diamond solitaires and heritage polki for international royal patrons.', true, true)
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- 5. Testimonials Seed
INSERT INTO public.testimonials (customer_name, location, quote, occasion, collection_name, is_published, display_order)
VALUES
('Princess Ananya Rao', 'Hyderabad', 'Vasundhara transformed my bridal vision into an immortal masterpiece. Wearing the Nizam Emerald Choker felt like carrying royal Indian history.', 'Royal Nizam Wedding', 'The Nizam Bridal Heritage', true, 1),
('Dr. Sunita Reddy', 'London', 'The precision of their diamond cut and the warmth of their bespoke consultation in Hyderabad is unmatched across the globe.', '25th Anniversary Heirloom', 'Solitaire & Fine Diamonds', true, 2);

-- 6. Audio Track Seed
INSERT INTO public.audio_tracks (title, composer, audio_url, is_active)
VALUES
('Vasundhara Heritage Symphony', 'Ambient Indian Classical Sitar & Cello Ambient', 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-relaxation-114986.mp3', true);
