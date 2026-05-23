import _ from "lodash";
import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { useGetToken } from "@hooks/GetToken";
import Page from "@components/Page";
import Home from "@components/Home";
import { Country, Product, Taxonomy } from "@typings/models";
import { parseLanguageCode } from "@utils/parser";
import sanityApi from "@utils/sanity/api";

type Props = {
  lang: string;
  countries: Country[];
  country: Country;
  taxonomies: Taxonomy[];
  products: Product[];
  buildLanguages: Country[];
};

const HomePage: NextPage<Props> = ({
  lang,
  countries,
  country,
  taxonomies,
  products,
  buildLanguages
}) => {
  const languageCode = parseLanguageCode(lang, "toLowerCase", true);
  const countryCode = country?.code.toLowerCase() as string;
  const clMarketId = country?.marketId as string;
  const clEndpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT as string;
  const clToken = useGetToken({
    scope: clMarketId,
    countryCode: countryCode
  });

  return (
    <Page
      buildLanguages={buildLanguages}
      lang={lang}
      clToken={clToken}
      clEndpoint={clEndpoint}
      languageCode={languageCode}
      countryCode={countryCode}
      countries={countries}
      taxonomies={taxonomies}
    >
      <Home countryCode={countryCode} lang={lang} products={products} />
    </Page>
  );
};

export default HomePage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang as string;
  const countryCode = params?.countryCode as string;
  const countries = await sanityApi.getAllCountries(lang);
  const country = countries.find((country: Country) => country.code.toLowerCase() === countryCode);
  const taxonomies = await sanityApi.getAllTaxonomies(country.catalog.id, lang);
  const products =
    taxonomies[0]?.taxons?.find((taxon: any) => taxon.slug["en_us"].current === "home-decoration")
      ?.products || [];
  const buildLanguages = _.compact(
    process.env.BUILD_LANGUAGES?.split(",").map((l) => {
      const country = countries.find((country: Country) => country.code === parseLanguageCode(l));
      return !_.isEmpty(country) ? country : null;
    })
  );

  return {
    props: {
      lang,
      countries,
      country,
      taxonomies,
      products,
      buildLanguages
    },
    revalidate: 60
  };
};
