import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

// TODO(§8): title must become
//   `AT&T® Fiber, Internet Air, Wireless & Phone Plans — Call [TFN] | Independent Authorized [Agreement-Noun]`
// and `metadataBase`/canonical must point at the real production domain.
// Blocked on the §8 business-identity constants — no placeholder number is used here on purpose.
export const metadata: Metadata = {
  title: "AT&T Fiber, Internet Air, Wireless & Phone Plans | Independent Authorized Reseller",
  description:
    "Order AT&T Fiber, AT&T Internet Air, AT&T wireless plans and AT&T Phone by phone. Independent authorized reseller of AT&T. Not AT&T.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={hanken.variable}>
      <body>{children}</body>
    </html>
  );
}
