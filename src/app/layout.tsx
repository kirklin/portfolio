import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "~/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kirk Lin",
  description: "Product Founder. Building the bridge between AI and the human body.",
  metadataBase: new URL("https://kirk.hk"),
  openGraph: {
    title: "Kirk Lin",
    description: "Product Founder. Building the bridge between AI and the human body.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: "index,follow",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
