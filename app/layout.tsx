import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
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
  console.log("language", language, pars);

  return (
    <html lang={language ?? "en"}>
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/png"
        sizes="32x32"
      />
      <body className={`${inter.className} antialiased`}>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: "10px solid gray",
          }}
        >
          <div style={{ border: "2px solid cyan" }}>layout!!!---</div>
          <div style={{ border: "12px solid pink", flexGrow: 2 }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
