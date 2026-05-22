import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Country, Taxonomy } from "@typings/models";

type Props = {
  children: React.ReactNode;
  lang: string;
  countryCode: string;
  buildLanguages?: Country[];
  countries?: Country[];
  pageTitle?: string;
  taxonomies?: Taxonomy[];
};

const Layout: React.FC<Props> = ({
  children,
  buildLanguages = [],
  lang,
  countryCode,
  countries = [],
  taxonomies = []
}) => {
  return (
    <>
      <div className="relative bg-ashy overflow-hidden">
        <Header lang={lang} countryCode={countryCode} taxonomies={taxonomies} />

        <main>{children}</main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
