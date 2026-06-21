import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { Price, PricesContainer } from "@commercelayer/react-components";

import { Product } from "@typings/models";

type Props = {
  countryCode: string;
  lang: string;
  products: Product[];
};

const Home = ({ countryCode, lang, products }: Props) => {
  return (
    <div className="content-container min-h-[calc(100vh-var(--navigation-height))]">
      <h1 className="text-accent">Home banner</h1>
      <div className="mt-8 flex flex-col md:grid md:grid-cols-5 gap-2 md:gap-4">
        {products?.length > 0 &&
          products.map(({ images, name, variants, slug }, index: number) => {
            const img = _.first(images)?.url;
            const code = _.first(variants)?.code;
            return (
              index < 3 &&
              (index < 1 ? (
                <Link
                  key={index}
                  href={"/[countryCode]/[lang]/[productName]"}
                  as={`/${countryCode}/${lang}/${slug}`}
                  className="md:row-span-2 md:col-span-2 flex flex-col gap-4 background-color-secondary shadow p-4 rounded"
                  passHref
                >
                  <div className="relative max-h-64 md:max-h-full w-full aspect-[1/1]">
                    <Image
                      src={`${img}`}
                      alt="Product"
                      className="object-contain"
                      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 480px, 800px"
                      fill
                    />
                  </div>
                  <div>
                    <div>{name}</div>
                    <div>
                      <PricesContainer skuCode={code}>
                        <Price
                          className="text-accent mr-1 text-base font-bold md:text-sm"
                          compareClassName="text-gray-500 line-through text-sm md:text-xs"
                        />
                      </PricesContainer>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  key={index}
                  href={"/[countryCode]/[lang]/[productName]"}
                  as={`/${countryCode}/${lang}/${slug}`}
                  className="md:col-span-3 md:flex gap-4 background-color-secondary shadow p-4 rounded"
                  passHref
                >
                  <div className="relative basis-[25%] w-full aspect-[1/1]">
                    <Image
                      src={`${img}`}
                      alt="Product"
                      className="object-contain"
                      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 480px, 800px"
                      fill
                    />
                  </div>
                  <div>
                    <div>{name}</div>
                    <div>
                      <PricesContainer skuCode={code}>
                        <Price
                          className="text-accent mr-1 text-base font-bold md:text-sm"
                          compareClassName="text-gray-500 line-through text-sm md:text-xs"
                        />
                      </PricesContainer>
                    </div>
                  </div>
                </Link>
              ))
            );
          })}
      </div>
    </div>
  );
};

export default Home;
