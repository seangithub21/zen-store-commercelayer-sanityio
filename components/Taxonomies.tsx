import Link from "next/link";

type Props = {
  taxonomies: {
    name: string;
    label?: string;
    taxons: any[];
  }[];
  countryCode: string;
  lang?: string;
};

const Taxonomies = ({ taxonomies, countryCode, lang }: Props) => {
  return (
    <>
      {taxonomies && taxonomies?.length > 0 && (
        <ul className="flex flex-row gap-8">
          {taxonomies?.map((t, k) => {
            return t.taxons.slice(0, 6).map((taxon, i) => {
              const { name, products, label, slug } = taxon;
              const pQuantity = products?.length || 0;
              const initialName = label || name;

              return (
                pQuantity > 0 && (
                  <li key={i}>
                    <Link
                      href={`/[countryCode]/[lang]/product-list/${slug.en_us.current}`}
                      as={`/${countryCode}/${lang}/product-list/${slug.en_us.current}`}
                    >
                      {initialName}
                    </Link>
                  </li>
                )
              );
            });
          })}
        </ul>
      )}
    </>
  );
};

export default Taxonomies;
