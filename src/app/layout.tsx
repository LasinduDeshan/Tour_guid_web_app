import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.windmarktours.com"),
  title: {
    default: "Windmark Tours | Sri Lanka Travel & Tours",
    template: "%s | Windmark Tours",
  },
  description:
    "Discover Sri Lanka your way with Windmark Tours. Offering flexible private tours, wildlife safaris, scenic hill country escapes, and bespoke itineraries backed by 6+ years of travel experience.",
  keywords: [
    "Windmark Tours",
    "Sri Lanka tours",
    "Sri Lanka travel",
    "private driver Sri Lanka",
    "Sri Lanka holiday packages",
    "wildlife safari Sri Lanka",
    "Sigiriya tour",
    "Ella Sri Lanka",
    "Yala safari",
    "custom Sri Lanka itineraries",
  ],
  authors: [{ name: "Windmark Tours" }],
  creator: "Windmark Tours",
  publisher: "Windmark Tours",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.windmarktours.com",
  },
  openGraph: {
    title: "Windmark Tours | Sri Lanka Travel & Tours",
    description:
      "Discover Sri Lanka your way with Windmark Tours. Tailor-made private journeys, wildlife safaris, and authentic island experiences.",
    url: "https://www.windmarktours.com",
    siteName: "Windmark Tours",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Windmark Tours | Sri Lanka Travel & Tours",
    description:
      "Discover Sri Lanka your way with Windmark Tours. Tailor-made private journeys, wildlife safaris, and authentic island experiences.",
    creator: "@windmarktours",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Windmark Tours",
  "url": "https://www.windmarktours.com",
  "logo": "https://www.windmarktours.com/logo.png",
  "image": "https://www.windmarktours.com/hero-bg.png",
  "description":
    "Discover Sri Lanka your way with Windmark Tours. Offering flexible private tours, day tours, wildlife safaris, and bespoke itineraries.",
  "telephone": "+94742276037",
  "email": "info@windmarktours.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vihara Mawatha, Hewagama",
    "addressLocality": "Kaduwela",
    "addressRegion": "Western Province",
    "addressCountry": "LK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 6.9011,
    "longitude": 79.9806
  },
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
    "opens": "09:00",
    "closes": "19:00"
  },
  "sameAs": [
    "https://www.facebook.com/windmarktours",
    "https://www.instagram.com/windmarktours.lk",
    "https://twitter.com/windmarktours"
  ],
  "priceRange": "$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-black selection:text-white">
        <Providers>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}

