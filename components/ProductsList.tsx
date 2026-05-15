import _ from "lodash";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Price, PricesContainer } from "@commercelayer/react-components";
import { Product } from "@typings/models";

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  const {
    query: { countryCode, lang }
  } = useRouter();

  return (
    <div className="w-full grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {products?.map(({ images, name, variants, slug }, key: number) => {
        const img = _.first(images)?.url;
        const code = _.first(variants)?.code;

        return (
          <div key={key}>
            <div className="background-color-secondary h-full rounded">
              <Link
                href={"/[countryCode]/[lang]/[productName]"}
                as={`/${countryCode}/${lang}/${slug}`}
                passHref
              >
                <div className="relative aspect-[5/6]">
                  {/* <div className="aspect-w-3 aspect-h-2 mb-5"> */}
                  <Image
                    src={`${img}`}
                    alt="Placeholder image"
                    className="object-contain"
                    sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 480px, 800px"
                    fill

                    // width={200}
                    // height={50}
                  />
                </div>
                <div className="p-2">{name}</div>
                <div className="p-2">
                  <PricesContainer skuCode={code}>
                    <Price
                      className="text-indigo-600 mr-1 text-base font-bold md:text-sm"
                      compareClassName="text-gray-500 line-through text-sm md:text-xs"
                    />
                  </PricesContainer>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
