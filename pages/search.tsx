import Layout from "../components/Layout";
import SearchItem from "../components/SearchItem";

export async function getServerSideProps({ query }) {
  const searchData = await fetch(`http://localhost:4000/search/${query.name}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return {
    props: {
      anime: searchData.anime,
    },
  };
}

const Search: React.FC<{
  anime: Array<{ showName: string; showPicture: string; showUrl: string }>;
}> = ({ anime }) => {
  const searchGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(5,1fr)",
    gridGap: "0 1rem",
  };

  const searchFlex = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Layout navbar={true}>
      <div
        className="search"
        style={anime.length === 0 ? searchFlex : searchGrid}
      >
        {anime.map((anime, i) => (
          <SearchItem
            key={i}
            picture={anime.showPicture}
            url={anime.showUrl}
            name={anime.showName}
          />
        ))}
        {anime.length === 0 && <h2>There were no results..</h2>}
        <style jsx>{`
          .search {
            margin-top: 5rem;
            padding: 0 3rem;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: 0 1rem;
          }

          .search h2 {
            color: white;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Search;
