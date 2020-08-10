import { useRef } from "react";

const SearchItem: React.FC<{ picture: string; url: string; name: string }> = ({
  picture,
  url,
  name,
}) => {
  const imgRef = useRef();

  return (
    <div className="search-item">
      <img
        ref={imgRef}
        onClick={() => window.open(url)}
        src={picture}
        onError={(e: any) => {
          e.target.src = "/images/search/default.jpg";
        }}
      />
      <h2>{name}</h2>
      <style jsx>{`
        .search-item {
          display: flex;
          background-color: rgba(0, 0, 0, 0.5);
          align-items: center;
          margin-bottom: 1rem;
          cursor: pointer;
        }

        .search-item h2 {
          color: white;
          text-align: center;
          margin: 0 auto;
          font-size: 1.2rem;
        }

        .search-item img {
          width: 8rem;
          height: 10rem;
        }
      `}</style>
    </div>
  );
};

export default SearchItem;
