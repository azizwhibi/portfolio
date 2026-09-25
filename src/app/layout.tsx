import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aziz Ouhibi | Backend, Mobile and CI/CD Developer",
  description: "Portfolio of Aziz Ouhibi, a software engineering student focused on backend development, mobile applications, REST APIs, CI/CD automation, Docker, and cloud technologies.",
  openGraph: {
    title: "Aziz Ouhibi — Software Engineering Portfolio",
    description: "Discover Aziz Ouhibi's backend, mobile development, CI/CD automation, and software engineering projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aziz Ouhibi — Software Engineering Portfolio",
    description: "Discover Aziz Ouhibi's backend, mobile development, CI/CD automation, and software engineering projects.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
