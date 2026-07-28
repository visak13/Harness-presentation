import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDA Claude Harness — How Autonomous Work Keeps Moving",
  description: "A short animated tour of how focused Claude Code shells, services, shared objects, and bidirectional communication drive autonomous work.",
  metadataBase: new URL("https://visak13.github.io/Harness-presentation/"),
  openGraph: {
    title: "Stay in the conversation. Let the system keep moving.",
    description: "See how the EDA Claude harness separates roles, services, state, and live communication.",
    type: "website",
    images: [{ url: "https://visak13.github.io/Harness-presentation/og.png", width: 1728, height: 904, alt: "Stay in the conversation. Let the system keep moving. EDA Claude Harness." }],
  },
  twitter: { card: "summary_large_image", title: "EDA Claude Harness", description: "How focused shells and shared infrastructure drive autonomous work.", images: ["https://visak13.github.io/Harness-presentation/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
