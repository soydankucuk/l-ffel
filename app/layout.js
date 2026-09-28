import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const josefin = Josefin_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-josefin",
});

export const metadata = {
  title: "LÖFFEL",
  description: "The LÖFFEL menu. Coffees, fresh drinks, meals, and snacks.",
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
    <html lang="en" className={`${inter.variable} ${josefin.variable} h-full`}>
      <body className="min-h-full font-sans text-cream antialiased">{children}</body>
    </html>
  );
}
