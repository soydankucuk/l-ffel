import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const display = localFont({
  src: [
    {
      path: "./fonts/BigShouldersDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/BigShouldersDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display-face",
  display: "swap",
});

export const metadata = {
  title: "LÖFFEL",
  description: "LÖFFEL menüsü. Kahveler, taze içecekler, yemekler ve atıştırmalıklar.",
  applicationName: "LÖFFEL",
  appleWebApp: {
    capable: true,
    title: "LÖFFEL",
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  themeColor: "#0A2612",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${display.variable} h-full`}>
      <body className="min-h-full font-sans text-cream antialiased">{children}</body>
    </html>
  );
}
