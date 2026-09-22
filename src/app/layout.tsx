import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/context";
import { AuthProvider } from "@/lib/auth/context";
import { Header } from "@/components/Header";
import { PreviewBanner } from "@/components/PreviewBanner";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Closer — Cold Call Trainer",
  description:
    "Enter the League and take on an AI prospect. Practice cold calls out loud for 3 minutes and get scored by an AI coach.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <LocaleProvider>
          <AuthProvider>
            <PreviewBanner />
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
