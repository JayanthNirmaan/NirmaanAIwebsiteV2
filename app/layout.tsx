import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { WaitlistProvider } from "@/components/ui/WaitlistContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Nirmaan — A superhuman AI tutor for every K-12 classroom",
  description:
    "Nirmaan diagnoses gaps, teaches through conversation, illustration, and thought — at the cost of computation. An AI-native learning stack for K-12 schools.",
  metadataBase: new URL("https://nirmaan.education"),
  openGraph: {
    title: "Nirmaan — A superhuman AI tutor for every K-12 classroom",
    description:
      "Personalized learning used to be a luxury of the top 1%. Nirmaan collapses it to the cost of computation.",
    images: ["/og-image.png"],
    url: "https://nirmaan.education",
    siteName: "Nirmaan",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirmaan — A superhuman AI tutor for every K-12 classroom",
    description:
      "Personalized learning used to be a luxury of the top 1%. Nirmaan collapses it to the cost of computation.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body>
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
        {/* Analytics slot — drop a snippet here when ready. */}
        <Script id="analytics-slot" strategy="afterInteractive">{`/* analytics pixel goes here */`}</Script>
      </body>
    </html>
  );
}
