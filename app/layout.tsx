import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: "%s | Liga nova",
    default: "Liga nova",
  },
  description: "Фітнес клуб Ліга",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "ua" }>;
}) {
  const pars = await params;
  const language = pars?.lang;

  return (
    <html lang={language ?? "en"}>
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/png"
        sizes="32x32"
      />
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
