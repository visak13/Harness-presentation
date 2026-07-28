import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDA Claude Harness — Animated Overview",
  description: "A short animated tour of the EDA Claude harness: recipe, planning, specialists, workers, review, and Rx coordination.",
  metadataBase: new URL("https://visak13.github.io/Harness-presentation/"),
  openGraph: {
    title: "One goal. Many clean contexts.",
    description: "See how the EDA Claude harness keeps long-running agent work aligned.",
    type: "website",
    images: [{ url: "https://visak13.github.io/Harness-presentation/og.png", width: 1728, height: 904, alt: "One goal. Many clean contexts. EDA Claude Harness." }],
  },
  twitter: { card: "summary_large_image", title: "EDA Claude Harness", description: "A 60-second animated architecture tour.", images: ["https://visak13.github.io/Harness-presentation/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
