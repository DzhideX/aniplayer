import useWindowDimensions from "../lib/useWindowDimensions";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <h2 className="navbar__left__logo">ANIFLIX</h2>
        <h4>Home</h4>
        <h4>TV Shows</h4>
        <h4>Movies</h4>
        <h4>Latest</h4>
        <h4>My List</h4>
      </div>
      <div className="navbar__right">
        <img
          className="navbar__right__search"
          src="/images/navbar/search.png"
        />
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
          background-color: black;
          position: absolute;
          top: 0;
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
        }

        .navbar__right {
          display: flex;
          align-items: center;
        }

        .navbar__right__search {
          height: 1.3rem;
          cursor: pointer;
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
