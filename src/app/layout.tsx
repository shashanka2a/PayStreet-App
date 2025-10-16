import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Theme Provider wraps client components that rely on next-themes
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PayFlow",
  description: "Cross-border payments and global financial infrastructure.",
  applicationName: "PayFlow",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "PayFlow",
    description: "Cross-border payments and global financial infrastructure.",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "PayFlow" },
    ],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
