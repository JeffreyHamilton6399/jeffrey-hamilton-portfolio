import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Carter — Professional Portfolio",
  description:
    "Portfolio of Alex Carter, a dedicated young professional with experience across farm operations, martial arts instruction, and retail customer service.",
  keywords: [
    "Alex Carter",
    "portfolio",
    "resume",
    "martial arts instructor",
    "customer service",
    "farm operations",
    "Bobby Lawrence Karate",
    "Day's Market Place",
  ],
  authors: [{ name: "Alex Carter" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Alex Carter — Professional Portfolio",
    description:
      "Hardworking, reliable, and people-focused. Experience across agriculture, martial arts instruction, and retail.",
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
