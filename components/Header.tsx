import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LineItemsContainer, LineItemsCount } from "@commercelayer/react-components";

import Taxonomies from "@components/Taxonomies";
import SEOHead from "@components/SEO";
import { Taxonomy } from "@typings/models";

type Props = {
  lang: string;
  countryCode: string;
  pageTitle?: string;
  taxonomies: Taxonomy[];
};

const Header: React.FC<Props> = ({ lang, countryCode, pageTitle, taxonomies }) => {
  return (
    <div className="w-full background-color-accent text-white">
      <SEOHead productName={pageTitle} />
      <nav className="content-container navigation">
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <div className="flex items-center md:hidden">
            <Taxonomies
              taxonomies={taxonomies}
              countryCode={countryCode}
              lang={lang}
              isMobile={true}
            />
          </div>
          <div className="relative">
            <Link href={"/[countryCode]/[lang]/"} as={`/${countryCode}/${lang}/`}>
              Zen Store
            </Link>
            <span className="absolute -top-0.5 -right-10.5 text-[10px] font-bold leading-3 text-accent bg-white rounded-md px-2">
              Demo
            </span>
          </div>
        </div>
        <div className="hidden md:block">
          <Taxonomies taxonomies={taxonomies} countryCode={countryCode} lang={lang} />
        </div>
        <Link href={"/[countryCode]/[lang]/cart"} as={`/${countryCode}/${lang}/cart`}>
          <div className="relative flex items-center">
            <Image
              title="Cart"
              src="/cartShopping.svg"
              className="w-[23px] h-[23px]"
              alt="Cart shopping SVG icon"
              width={20}
              height={20}
            />
            <LineItemsContainer>
              <LineItemsCount className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium leading-5 text-gray-50" />
            </LineItemsContainer>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
