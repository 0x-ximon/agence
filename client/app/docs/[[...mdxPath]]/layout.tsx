import type { Metadata } from "next";
import { Banner } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import "nextra-theme-docs/style.css";

export const metadata: Metadata = {
  title: "Docs",
  description: "Documentation for Agence",

  robots: {
    index: true,
    follow: true,
  },
};

const banner = <Banner storageKey="some-key">Agence is Live 🎉</Banner>;
const navbar = <Navbar logo={<b>Agence</b>} />;
const footer = <Footer>{new Date().getFullYear()} © Agence.</Footer>;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Layout
      banner={banner}
      navbar={navbar}
      pageMap={await getPageMap()}
      docsRepositoryBase="https://github.com/0x-ximon/agence/tree/main/app/docs"
      footer={footer}
    >
      {children}
    </Layout>
  );
}
