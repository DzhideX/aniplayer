import { useState } from "react";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push({
        pathname: "/search",
        query: {
          name: searchInputValue,
        },
      });
    }
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <h2 onClick={() => router.push("/")} className="navbar__left__logo">
          ANIFLIX
        </h2>
        <h4>Home</h4>
        <h4>TV Shows</h4>
        <h4>Movies</h4>
        <h4>Latest</h4>
        <h4>My List</h4>
      </div>
      <div className="navbar__right">
        {searchInput ? (
          <div className={"navbar__right__search-input"}>
            <img
              className="navbar__right__search"
              src="/images/navbar/search.png"
            />
            <input
              className="navbar__right__search-input"
              type="text"
              placeholder="Search for anime.."
              autoFocus
              onBlur={() => setSearchInput(false)}
              onKeyDown={handleSearch}
              onChange={(e) => setSearchInputValue(e.target.value)}
              value={searchInputValue}
            />
          </div>
        ) : (
          <img
            className="navbar__right__search"
            src="/images/navbar/search.png"
            onClick={() => setSearchInput(true)}
          />
        )}
        <h4>KIDS</h4>
        <img className="navbar__right__gift" src="/images/navbar/gift.png" />
        <img className="navbar__right__bell" src="/images/navbar/bell.png" />
        <div className="navbar__right__profile">
          <img
            className="navbar__right__profile__icon"
            src="https://occ-0-2705-2706.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABe-LEO8t6a99v1FNdfQpwsYRkPGS5tS7CRU-wSuJHmJZrxsTk2t2RwmLz6eOIibJHtrcS9B9iokIiLXlq60bXc4.png?r=418"
          />
          <img
            className="navbar__right__profile__arrow"
            src="/images/navbar/down-arrow.png"
          />
        </div>
      </div>
      <style jsx>{`
        .navbar {
          width: 100%;
          height: 3.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 5rem 0 1.5rem;
          background-color: rgba(0, 0, 0, 1);
          position: fixed;
          top: 0;
          z-index: 10;
        }

        .navbar h4 {
          margin-left: 1.5rem;
          font-family: Roboto;
          font-weight: 400;
          color: white;
          cursor: pointer;
        }

        .navbar h4:hover {
          font-weight: 500;
        }

        .navbar__left {
          display: flex;
          align-items: center;
        }

        .navbar__left__logo {
          font-family: "Bebas Neue", cursive;
          letter-spacing: 0.15rem;
          margin: 0 2rem;
          color: rgb(217, 9, 19);
          padding-top: 0.3rem;
          font-size: 2rem;
          cursor: pointer;
        }

        .navbar__right {
          display: flex;
          align-items: center;
        }

        .navbar__right__search {
          height: 1.3rem;
          cursor: pointer;
        }

        .navbar__right__search-input {
          display: flex;
          align-items: center;
        }

        .navbar__right__search-input input {
          border: 0.02rem solid white;
          background-color: rgb(0, 0, 0, 0.5);
          padding: 0.3rem 0.3rem 0.3rem 2rem;
          color: white;
          height: 2.3rem;
          width: 20rem;
          animation: right_to_left 0.6s;
        }

        @keyframes right_to_left {
          from {
            width: 0;
          }
          to {
            width: 20rem;
          }
        }

        @keyframes left_to_right {
          from {
            width: 20rem;
          }
          to {
            width: 0;
          }
        }

        .navbar__right__search-input img {
          margin-right: -1.7rem;
          margin-bottom: 0.13rem;
          z-index: 1;
        }

        .navbar__right__search-input input:focus {
          outline: none;
        }

        .navbar__right__gift {
          height: 1.4rem;
          margin-left: 1.7rem;
          cursor: pointer;
        }

        .navbar__right__bell {
          height: 1.4rem;
          margin-left: 1.7rem;
          cursor: pointer;
        }

        .navbar__right__profile {
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .navbar__right__profile__icon {
          height: 2rem;
          margin-left: 1.7rem;
        }

        .navbar__right__profile__arrow {
          height: 0.8rem;
          margin-left: 0.7rem;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
