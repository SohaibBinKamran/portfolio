import type { Metadata } from "next";
import { Bebas_Neue, Caveat, Gloria_Hallelujah, Instrument_Serif, Inter, JetBrains_Mono, Manrope, Mulish } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { SiteCursor } from "@/components/ui/SiteCursor";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const gloriaHallelujah = Gloria_Hallelujah({
  variable: "--font-gloria",
  subsets: ["latin"],
  weight: ["400"],
});

// CabinBlu case study only — the design's real typeface, self-hosted from
// the user's own licensed Circular Std files (src/app/fonts/circular-std).
const circularStd = localFont({
  variable: "--font-cabinblu-sans",
  src: [
    { path: "./fonts/circular-std/CircularStd-Book.otf", weight: "400", style: "normal" },
    { path: "./fonts/circular-std/CircularStd-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/circular-std/CircularStd-Bold.otf", weight: "700", style: "normal" },
  ],
});

// WanderLens case study only — the design's display face (Mulish Black wordmark).
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

// Cinefatic case study only — condensed display face for the hero headline.
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

// Cinefatic case study only — handwritten pull-quotes.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// OpenSeat case study only — the design's warm sans ("a warm sans serif for
// headlines and body gives the interface an inviting, menu-like character").
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-cabinblu-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sohaibbinkamran.com"),
  title: "Sohaib Bin Kamran | Product Designer",
  description: "Crafting Real Impact, through Human-First Design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${gloriaHallelujah.variable} ${circularStd.variable} ${mulish.variable} ${bebasNeue.variable} ${caveat.variable} ${manrope.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-base text-ink">
        <Script id="hotjar" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6532500,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
        <SiteCursor />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
