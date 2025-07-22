import Head from "next/head";

const HeadSection = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel='icon' href='/favicon.svg' type='image/x-icon' />
    </Head>
  );
};

export default HeadSection;
