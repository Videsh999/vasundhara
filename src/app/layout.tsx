import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vasundhara Diamond Roof | Luxury Heritage Indian Jewellery",
  description: "Experience the pinnacle of royal Indian craftsmanship, bespoke bridal diamond jewellery, polki, and high-fine gold heirlooms from Vasundhara Diamond Roof, Hyderabad.",
  keywords: ["Vasundhara Diamonds", "Hyderabad Jewellery", "Royal Indian Jewellery", "Bridal Diamonds", "Bespoke Polki", "High Jewellery India"],
  openGraph: {
    title: "Vasundhara Diamond Roof | Luxury Heritage Indian Jewellery",
    description: "Royal elegance, diamond heirlooms, and bespoke craftsmanship from Vasundhara Diamond Roof, Hyderabad.",
    siteName: "Vasundhara Diamond Roof",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FDFBF7] text-[#1C1A17] flex flex-col font-sans selection:bg-[#8C734B] selection:text-[#FDFBF7]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JewelryStore",
              "name": "Vasundhara Diamond Roof",
              "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
              "@id": "https://vasundharadiamondroof.com",
              "url": "https://vasundharadiamondroof.com",
              "telephone": "+91-40-2355-8888",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Road No. 36, Jubilee Hills",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500033",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.4319,
                "longitude": 78.4071
              },
              "priceRange": "$$$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "11:00",
                "closes": "20:00"
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
