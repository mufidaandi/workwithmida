import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhamida | Virtual Assistant — Reliable Support for Your Business",
  description:
    "Professional Virtual Assistant based in Davao City, Philippines. Specializing in administrative support, data management, calendar scheduling, and graphic design. Let's work together.",
  keywords: [
    "virtual assistant",
    "VA services",
    "administrative support",
    "Davao City",
    "Philippines",
    "remote assistant",
    "data entry",
    "graphic design",
    "email management",
  ],
  openGraph: {
    title: "Muhamida | Virtual Assistant",
    description:
      "Professional Virtual Assistant — Reliable support for your business operations.",
    url: "https://workwithmida.com",
    siteName: "Muhamida VA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
