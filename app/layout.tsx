import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDA Harness — One Board. A Real Team. Humans Included.",
  description: "A 60-second visual tour of how humans and focused agent seats move work through a shared, restart-proof Board.",
  metadataBase: new URL("https://visak13.github.io/Harness-presentation/"),
  openGraph: {
    title: "One board. A real team. Humans included.",
    description: "Bring a goal. The right specialist appears, works from the record, and leaves proof on the Board.",
    type: "website",
    images: [{ url: "https://visak13.github.io/Harness-presentation/og.png", width: 1600, height: 900, alt: "One board. A real team. Humans included." }],
  },
  twitter: { card: "summary_large_image", title: "EDA Harness", description: "Focused contexts change. Shared truth remains.", images: ["https://visak13.github.io/Harness-presentation/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
