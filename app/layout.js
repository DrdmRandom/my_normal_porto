import { Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const plausibleDomain =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "myporto.cihuy-familly.my.id";
const plausibleHost =
  process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || "https://analytics.cihuyproject.my.id";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dawwi Portfolio",
  description:
    "Minimal, modern, and elegant portfolio for Dawwi with real-time project and work experience data from Strapi.",
  icons: {
    icon: "/portfolio.png",
    shortcut: "/portfolio.png",
    apple: "/portfolio.png"
  },
  openGraph: {
    title: "Dawwi Portfolio",
    description:
      "Minimal, modern, and elegant portfolio for Dawwi with real-time project and work experience data from Strapi.",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Dawwi Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawwi Portfolio",
    description:
      "Minimal, modern, and elegant portfolio for Dawwi with real-time project and work experience data from Strapi.",
    images: ["/portfolio.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var savedTheme = localStorage.getItem('dawwi-portfolio-theme');
                var theme = savedTheme === 'dark' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (error) {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            })();
          `}
        </Script>
        <script
          defer
          data-domain={plausibleDomain}
          data-api={`${plausibleHost}/api/event`}
          src={`${plausibleHost}/js/script.js`}
        />
      </head>
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
