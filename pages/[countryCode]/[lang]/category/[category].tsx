import _ from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";

import { useGetToken } from "@hooks/GetToken";
import Page from "@components/Page";
import ProductsList from "@components/ProductsList";
import { Country, Product, Taxonomy } from "@typings/models";
import sanityApi from "@utils/sanity/api";
import { parseLanguageCode } from "@utils/parser";

type Props = {
  lang: string;
  countries: Country[];
  country: Country;
  taxonomies: Taxonomy[];
  buildLanguages?: Country[];
  categoryName: string;
  products: Product[];
};

const ProductListPage = ({
  lang,
  country,
  countries,
  taxonomies,
  buildLanguages,
  categoryName,
  products
}: Props) => {
  const countryCode = country?.code.toLowerCase() as string;
  const clMarketId = country?.marketId as string;
  const clEndpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT as string;
  const clToken = useGetToken({
    scope: clMarketId,
    countryCode: countryCode
  });
  const languageCode = parseLanguageCode(lang, "toLowerCase", true);

  return (
    <Page
      buildLanguages={buildLanguages}
      pageTitle="Cateogry"
      lang={lang}
      clToken={clToken}
      clEndpoint={clEndpoint}
      languageCode={languageCode}
      countryCode={countryCode}
      countries={countries}
      taxonomies={taxonomies}
    >
      <div className="content-container">
        <h2>{categoryName}</h2>
        <div className="flex">
          <div className="hidden basis-1/4 lg:block">Filters and sorting coming soon...</div>
          <ProductsList products={products} />
        </div>
      </div>
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const lang = params?.lang as string;
  const slug = params?.category;
  const countryCode = params?.countryCode as string;
  const countries = await sanityApi.getAllCountries(lang);
  const country = countries.find((country: Country) => country.code.toLowerCase() === countryCode);
  const taxonomies = await sanityApi.getAllTaxonomies(country.catalog.id, lang);
  const { categoryName, products } = await sanityApi.getProducts(slug);
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
      buildLanguages,
      categoryName,
      products
    },
    revalidate: 60
  };
};

export default ProductListPage;
