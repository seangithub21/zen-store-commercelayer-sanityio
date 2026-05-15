import React from "react";
import Link from "next/link";
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
        <div className="flex gap-4">
          <div className="flex items-center md:hidden">
            {/* TODO: Mobile menu */}
            Mobile menu
            {/* <NavigationMobile productCategories={productCategories} /> */}
          </div>
          <div>
            <Link href={"/[countryCode]/[lang]/"} as={`/${countryCode}/${lang}/`}>
              Zen Store
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <Taxonomies taxonomies={taxonomies} countryCode={countryCode} lang={lang} />
        </div>
        <Link href={"/[countryCode]/[lang]/cart"} as={`/${countryCode}/${lang}/cart`}>
          <div className="flex items-center">
            <span>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27 6H5C4.44772 6 4 6.44772 4 7V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V7C28 6.44772 27.5523 6 27 6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 10H28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 14C21 15.3261 20.4732 16.5979 19.5355 17.5355C18.5979 18.4732 17.3261 19 16 19C14.6739 19 13.4021 18.4732 12.4645 17.5355C11.5268 16.5979 11 15.3261 11 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <LineItemsContainer>
              <LineItemsCount className="-ml-4 md:ml-2 inline-flex items-center px-2 py-1 rounded-full text-sm font-medium leading-5 text-gray-50" />
            </LineItemsContainer>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
