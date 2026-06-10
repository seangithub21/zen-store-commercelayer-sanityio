import _ from "lodash";
import React, { useState, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Price, PricesContainer, AddToCartButton } from "@commercelayer/react-components";

import { useGetToken } from "@hooks/GetToken";
import locale from "@locale/index";
import Page from "@components/Page";
import Carousel from "@components/Carousel";
import { Product, Country, Taxonomy } from "@typings/models";
import { parseLanguageCode } from "@utils/parser";
import sanityApi from "@utils/sanity/api";

type Props = {
  lang: string;
  countries: Country[];
  country: Country;
  taxonomies: Taxonomy[];
  product: Product;
  buildLanguages?: Country[];
};

const ProductPage: React.FC<Props> = ({
  lang,
  country,
  countries,
  taxonomies,
  buildLanguages,
  product
}) => {
  const countryCode = country?.code.toLowerCase() as string;
  const clMarketId = country?.marketId as string;
  const clEndpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT as string;
  const clToken = useGetToken({
    scope: clMarketId,
    countryCode: countryCode
  });
  const languageCode = parseLanguageCode(lang, "toLowerCase", true);

  const images =
    product?.images.length > 0
      ? product?.images.map((image) => {
          return { url: image?.url };
          //  TODO: parseImg() fetches jpg and causes black background. Necessary?
          // return { url: parseImg(image?.url as string) };
        })
      : [];
  const firstVariantCode = _.first(product?.variants)?.code as string;
  const variantOptions = product?.variants?.map((variant) => {
    return {
      label: variant.size.name,
      code: variant.code,
      lineItem: {
        name: product.name,
        imageUrl: _.first(variant.images)?.url
      }
    };
  });

  const [selectedVariant, setSelectedVariant] = useState<string>();

  useEffect(() => {
    setSelectedVariant(firstVariantCode);
  }, [firstVariantCode]);

  return !lang || !product ? null : (
    <Page
      buildLanguages={buildLanguages}
      pageTitle={product.name}
      lang={lang}
      clToken={clToken}
      clEndpoint={clEndpoint}
      languageCode={languageCode}
      countryCode={countryCode}
      countries={countries}
      taxonomies={taxonomies}
    >
      <div className="content-container min-h-[calc(100vh-var(--navigation-height))]">
        <div className="w-full py-5 text-sm text-gray-700">
          <Link
            href={{
              pathname: "/[countryCode]/[lang]",
              query: {
                countryCode,
                lang
              }
            }}
          >
            <Image
              title="back"
              src="/back.svg"
              className="w-5 h-5 inline-block"
              alt="Back to previous page SVG icon"
              width={20}
              height={20}
            />
            <p className="ml-2 hover:underline inline-block align-middle">
              {locale[lang].backToHomePage}
            </p>
          </Link>
        </div>
        <div className="block md:flex w-full">
          <div className="left basis-1/2">
            <Carousel images={images} />
          </div>
          <div className="right basis-1/2 p-4 md:p-8 md:pt-0">
            <div className="text-2xl font-semibold">{product.name}</div>
            <div className="text-gray-600 mt-1">{selectedVariant}</div>
            <div className="py-4">{product.description}</div>
            <div className="flex flex-col gap-y-2">
              <div className="mb-4">
                <select
                  placeholder={locale[lang].selectSize as string}
                  className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-blue-500 text-base pl-3 pr-10"
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                >
                  {variantOptions?.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <span className="title-font font-medium text-2xl text-gray-900">
                <PricesContainer>
                  <Price
                    skuCode={selectedVariant}
                    className="text-accent mr-1"
                    compareClassName="text-gray-500 line-through text-lg"
                  />
                </PricesContainer>
              </span>
            </div>
            <AddToCartButton
              skuCode={selectedVariant}
              label={locale[lang].addToCart as string}
              className="bg-accent w-full rounded items-center px-4 py-2 border border-gray-300 shadow-sm text-sm md:text-base font-medium rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
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
  const slug = params?.product;
  const countryCode = params?.countryCode as string;
  const countries = await sanityApi.getAllCountries(lang);
  const country = countries.find((country: Country) => country.code.toLowerCase() === countryCode);
  const taxonomies = await sanityApi.getAllTaxonomies(country.catalog.id, lang);
  const product = await sanityApi.getProduct(slug, lang);
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
      product,
      buildLanguages
    },
    revalidate: 60
  };
};

export default ProductPage;
