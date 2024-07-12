import type { Metadata } from "next";

import Analytics from "~/components/Analytics";
import "./globals.css";
import { cn } from "~/utils/cn";
import { ThemeProvider } from "~/app/providers";
import { inter } from "~/utils/fontts";

export const metadata: Metadata = {
  title: "Kirk Lin's Portfolio",
  description: "A showcase of projects and skills by Kirk Lin",
  applicationName: "Kirk Lin Portfolio",
  authors: [{ name: "Kirk Lin", url: "https://github.com/kirklin" }],
  keywords: ["portfolio", "Kirk Lin", "projects", "skills"],
  referrer: "origin",
  creator: "Kirk Lin",
  publisher: "Kirk Lin",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://kirklin.cn",
    title: "Kirk Lin's Portfolio",
    description: "A showcase of projects and skills by Kirk Lin",
    siteName: "Kirk Lin's Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased common-bg")}>
        <ThemeProvider attribute="class" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
