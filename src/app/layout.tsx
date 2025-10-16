import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CryptoTax",
  description: "Crypto Tax Calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
