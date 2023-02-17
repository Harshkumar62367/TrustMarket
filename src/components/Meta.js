import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="author" content="Sudhanshu Ranjan" />
      <meta name="twitter:title" content="TrustM(:" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Sudhanss_u" />
      <meta name="twitter:creator" content="@Sudhanss_u" />
      <meta
        name="twitter:image"
        content="https://nasgofficialweb.vercel.app/_next/image?url=%2Fimages%2Fhero-img1.png&w=384&q=75"
      />
      <meta property="og:site_name" content="Sudhanshu Ranjan" />
      <meta
        name="og:title"
        content="A DAO data marketplace for the trustless exchange of data."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://nasgofficialweb.vercel.app/_next/image?url=%2Fimages%2Fhero-img1.png&w=384&q=75"
      />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "TrustM(:",
  keywords:
    "DAO, data, marketplace, trustless, exchange, data marketplace, trustless exchange, trustless exchange of data, trustless exchange of data marketplace, trustless exchange of data marketplace DAO",
  description: "A DAO data marketplace for the trustless exchange of data.",
};

export default Meta;
