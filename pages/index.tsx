import Head from "next/head";
import Layout from "../components/Layout";
import animeListQuery from "../lib/animeListQuery";
import PictureCarousel from "../components/PictureCarousel";

export const getServerSideProps = async (context) => {
  const topScore = await animeListQuery();
  return {
    props: {
      topScore: topScore.data.topScore.media,
    },
  };
};

const Home: React.FunctionComponent<{ topScore: Array<object> }> = ({
  topScore,
}) => {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PictureCarousel topScore={topScore} />
      <style jsx>{`
        h3 {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
