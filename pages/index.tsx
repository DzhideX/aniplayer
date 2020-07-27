import Head from "next/head";
import Layout from "../components/Layout";
import animeListQuery from "../lib/animeListQuery";
import PictureCarousel from "../components/PictureCarousel";

export const getServerSideProps = async (context) => {
  const animeData: any = await animeListQuery();
  return {
    props: {
      topScore: animeData.data.topScore.media,
      mostPopular: animeData.data.mostPopular.media,
    },
  };
};

const Home: React.FunctionComponent<{
  topScore: Array<object>;
  mostPopular: Array<object>;
}> = ({ topScore, mostPopular }) => {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2> Top 20 </h2>
      <PictureCarousel animeData={topScore} number={0} />
      <h2> Popular This Season </h2>
      <PictureCarousel animeData={mostPopular} number={1} />
      <h2> Upcoming next season </h2>
      <PictureCarousel animeData={topScore} number={2} />
      <h2> All-time popular</h2>
      <PictureCarousel animeData={topScore} number={3} />
      <h2>Trending</h2>
      <PictureCarousel animeData={topScore} number={4} />
      <style jsx>{`
        h3 {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        h2 {
          margin: 1rem 0 1rem 2rem;
          color: #e5e5e5;
          cursor: pointer;
        }

        h2:hover {
          color: white;
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
