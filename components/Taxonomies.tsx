import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";

type Props = {
  taxonomies: {
    name: string;
    label?: string;
    taxons: any[];
  }[];
  countryCode: string;
  lang?: string;
  isMobile?: Boolean;
};

const Taxonomies = ({ taxonomies, countryCode, lang, isMobile }: Props) => {
  return (
    <>
      {taxonomies && taxonomies?.length > 0 && !isMobile ? (
        <ul className="flex flex-row gap-8">
          {taxonomies?.map((t, _) => {
            return t.taxons.slice(0, 6).map((taxon, i) => {
              const { name, products, label, slug } = taxon;
              const pQuantity = products?.length || 0;
              const initialName = label || name;

              return (
                pQuantity > 0 && (
                  <li key={i}>
                    <Link
                      href={"/[countryCode]/[lang]/category/[category]"}
                      as={`/${countryCode}/${lang}/category/${slug.en_us.current}`}
                    >
                      {initialName}
                    </Link>
                  </li>
                )
              );
            });
          })}
        </ul>
      ) : (
        <Popover className="relative">
          <Popover.Button as="div">
            <div className="w-[20px] h-[2px] rounded my-1 bg-white"></div>
            <div className="w-[20px] h-[2px] rounded bg-white"></div>
            <div className="w-[20px] h-[2px] rounded my-1 bg-white"></div>
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 bg-black opacity-40 z-10" />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="fixed text-black top-20 flex flex-col w-[75vw] max-w-xs h-[80vh] overflow-y-auto bg-white [--anchor-gap:2rem] [--anchor-padding:1rem] p-4 rounded z-20">
              {({ close }) => (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <h1>Categories</h1>
                    <button onClick={() => close()}>
                      <div className="text-2xl after:inline-block after:content-['\00d7']"></div>
                    </button>
                  </div>
                  <ul className="flex flex-col gap-8">
                    {taxonomies?.map((t, _) => {
                      return t.taxons.slice(0, 6).map((taxon, i) => {
                        const { name, products, label, slug } = taxon;
                        const pQuantity = products?.length || 0;
                        const initialName = label || name;

                        return (
                          pQuantity > 0 && (
                            <li key={i}>
                              <Link
                                href={"/[countryCode]/[lang]/category/[category]"}
                                as={`/${countryCode}/${lang}/category/${slug.en_us.current}`}
                              >
                                {initialName}
                              </Link>
                            </li>
                          )
                        );
                      });
                    })}
                  </ul>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>
      )}
    </>
  );
};

export default Taxonomies;
