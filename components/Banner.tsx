import shortenText from "../lib/shortenText";

const Banner: React.FC<{
  image: string;
  title: string;
  description: string;
}> = ({ image, title, description }) => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="banner__data">
        <h2>{title}</h2>
        <p>{shortenText(description.split("<br>")[2], 250)}</p>
      </div>
      <div className="banner__actions"></div>
      <div className="banner__fade"></div>
      <style jsx>{`
        .banner {
          width: 100%;
          height: 45rem;
          background-repeat: no-repeat;
          background-position: 50% 45%;
          background-size: cover;
          display: flex;
          flex-direction: column;
          position: relative;
          justify-content: center;
        }

        .banner__data {
          height: 50%;
          width: 100%;
          padding-left: 4rem;
        }

        .banner__data h2 {
          color: white;
          text-shadow: 0 0 0.4rem rgb(0, 0, 0, 1);
          font-size: 2rem;
        }

        .banner__data p {
          width: 35%;
          color: white;
          text-shadow: 0rem 0rem 0.3rem black;
          font-size: 1.2rem;
        }

        .banner__fade {
          width: 100%;
          height: 10rem;
          position: absolute;
          bottom: 0;
          background-image: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(19, 19, 19, 1) 100%
          );
        }
      `}</style>
    </div>
  );
};

export default Banner;
