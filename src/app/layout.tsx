import type { Metadata } from "next";
import { Poppins, Montserrat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/theme/ThemeProvider";
import Providers from "./providers";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

// Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Metadata
export const metadata: Metadata = {
  title: "Times Square - Premium Properties in Tejgaon",
  description: "Times Square",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${poppins.variable}
        ${geistSans.variable}
        ${geistMono.variable}
        ${montserrat.variable}
      `}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <ThemeProvider>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}