import _ from "lodash";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  AvailabilityContainer,
  AvailabilityTemplate,
  Price,
  PricesContainer
} from "@commercelayer/react-components";
import { Product } from "@typings/models";

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  const {
    query: { countryCode, lang }
  } = useRouter();

  return (
    <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {products?.map(({ images, name, variants, slug }, key: number) => {
        const img = _.first(images)?.url;
        const code = _.first(variants)?.code;

        return (
          <div key={key} className="h-full rounded shadow-sm">
            <Link
              href={"/[countryCode]/[lang]/[productName]"}
              as={`/${countryCode}/${lang}/${slug}`}
              passHref
            >
              <div className="relative aspect-[1/1]">
                <Image
                  src={`${img}`}
                  alt="Product"
                  className="object-contain"
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 480px, 800px"
                  fill
                />
              </div>
              <div className="text-sm px-2 mt-2">{name}</div>
              <div className="px-2">
                <PricesContainer skuCode={code}>
                  <Price
                    className="text-accent mr-1 text-base font-bold"
                    compareClassName="text-gray-500 line-through text-sm md:text-xs"
                  />
                </PricesContainer>
              </div>
              <div className="px-2 mb-2">
                <AvailabilityContainer skuCode={code}>
                  <AvailabilityTemplate
                    className="text-xs text-slate-500"
                    labels={{ available: "Delivery" }}
                    showShippingMethodPrice
                    timeFormat="days"
                  />
                </AvailabilityContainer>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
