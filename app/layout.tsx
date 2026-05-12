import type { Metadata } from "next";
import "./globals.css";
import { seo } from "@/data/portfolio";

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
    <html lang="fr" className="scroll-smooth">
      <body className="bg-bg-base text-text-primary antialiased">
        <a href="#main" className="skip-link">Aller au contenu</a>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
