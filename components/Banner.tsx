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
      <div className="banner__actions">
        <div className="banner__actions__play">
          <img src="/images/banner/play-button.png" />
          <h2>Play</h2>
        </div>
        <div className="banner__actions__info">
          <img src="/images/banner/info.png" />
          <h2>More info</h2>
        </div>
      </div>
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
          height: 40%;
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

        .banner__actions {
          height: 3.75rem;
          width: 100%;
          display: flex;
          padding-left: 4rem;
        }

        .banner__actions__play {
          height: 100%;
          width: 11rem;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content center;
          border-radius:0.3rem;
          cursor:pointer;
        }

        .banner__actions__play:hover {
          background-color:rgba(255,255,255,0.8);
        }

        .banner__actions__play img{
          height:1.5rem;
          margin-right:1rem;
        }

        .banner__actions__info{
          background-color:rgb(109,109,110);
          height:100%;
          width:13rem;
          margin-left:1rem;
          border-radius:0.3rem;
          cursor:pointer;
          display: flex;
          align-items: center;
          justify-content center;
        }

        .banner__actions__info:hover {
          background-color: rgba(109,109,110,0.7);
        }

        .banner__actions__info img{
          height:1.6rem;
          margin-right:1rem;
        }

        .banner__actions__info h2{
          color:white;
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
