import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
    title: "AI for Advocates | VLS Law Academy",
    description:
      "A practical VLS Law Academy masterclass on using AI for case analysis, litigation strategy, and legal drafting—responsibly and professionally.",
    icons: {
      icon: "/vls-logo.png",
      shortcut: "/vls-logo.png",
    },
    openGraph: {
      title: "AI for Advocates | VLS Law Academy",
      description: "Your judgment leads. AI accelerates.",
      type: "website",
      images: [{ url: socialImage, width: 1736, height: 910, alt: "AI for Advocates by VLS Law Academy" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI for Advocates | VLS Law Academy",
      description: "Your judgment leads. AI accelerates.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

