import type { Metadata } from "next";
import { Inter, Spectral } from "next/font/google";
import "./globals.css";
import { seo } from "@/data/portfolio";
import { JsonLdSchema } from "./schema";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  metadataBase: new URL(seo.url),
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    images: [{ url: seo.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${spectral.variable} scroll-smooth`}>
      <body className="bg-bg-base text-text-primary antialiased">
        <JsonLdSchema />
        <a href="#main" className="skip-link">Aller au contenu</a>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
