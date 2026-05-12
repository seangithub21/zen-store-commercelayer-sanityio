import _ from "lodash";
import { GetStaticProps, NextPage } from "next";

import SEOHead from "@components/SEO";
import Countries from "@components/Countries";
import sanityApi from "@utils/sanity/api";

type Props = {
  countries: any[];
};

const IndexPage: NextPage<Props> = ({ countries }) => {
  return (
    <>
      <SEOHead />
      <div className="m-16 mx-auto container">
        <Countries items={countries} />
      </div>
      <hr />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const countries = await sanityApi.getAllCountries();
  return {
    props: {
      countries
    },
    revalidate: false
  };
};

export default IndexPage;
