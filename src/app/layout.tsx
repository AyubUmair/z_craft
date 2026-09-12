import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://zcraft.lk"),
  title: {
    default: "Z Craft — Premium Handmade Gifts & Custom Crafts | Sri Lanka",
    template: "%s | Z Craft",
  },
  description:
    "Award-winning artisanal gift studio crafting personalized velvet Quran covers, luxury wedding hampers, custom wooden crafts, and bespoke gift boxes. Handmade in Sri Lanka since 2018. Island-wide delivery.",
  keywords: [
    "Z Craft",
    "handmade gifts Sri Lanka",
    "custom Quran cover",
    "wedding gifts",
    "nikah nama",
    "personalized gifts",
    "wooden nameplates",
    "gift hampers",
    "Sri Lanka crafts",
    "luxury gift boxes",
    "embroidered velvet",
    "resin art",
  ],
  authors: [{ name: "Z Craft", url: "https://zcraft.lk" }],
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://zcraft.lk",
    siteName: "Z Craft",
    title: "Z Craft — Premium Handmade Gifts & Custom Crafts",
    description:
      "Award-winning artisanal gift studio. Personalized velvet Quran covers, luxury wedding hampers, custom wooden crafts. Handmade in Sri Lanka since 2018.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Z Craft — Premium Handmade Gifts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Z Craft — Premium Handmade Gifts",
    description:
      "Award-winning artisanal gift studio. Handmade in Sri Lanka since 2018.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
