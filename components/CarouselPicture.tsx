import { useState, useEffect } from "react";
import shortenText from "../lib/shortenText";
import { useRouter } from "next/router";

const CarouselPicture: React.FC<{
  backgroundImage: string;
  title: string;
  englishTitle: string;
}> = ({ backgroundImage, title, englishTitle }) => {
  const [moreInfoView, setMoreInfoView] = useState<boolean>(false);
  const [pictureLoadedOnce, setPictureLoadedOnce] = useState<boolean>(false);
  const [animeData, setAnimeData] = useState<
    string | undefined | null | string[]
  >();
  const router = useRouter();

  const getAnimeData = async () => {
    return await fetch(`http://localhost:4000/anime/${englishTitle}`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const moveToWatch = async () => {
    const { name } = await getAnimeData();
    if (name) {
      router.push(`/watch/${name}-episode-01`);
    } else {
      router.push("/watch/fullmetal-alchemist-brotherhood-episode-01");
    }
  };

  return (
    <div
      className={`carousel-picture${
        moreInfoView ? " active" : pictureLoadedOnce ? " inactive" : ""
      }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      onMouseEnter={() => {
        setMoreInfoView(true);
        setPictureLoadedOnce(true);
      }}
      onMouseLeave={() => setMoreInfoView(false)}
      onClick={() => moveToWatch()}
    >
      {animeData && console.log(animeData)}
      {moreInfoView && (
        <>
          <div className="carousel-picture__left">
            <div>
              <div>
                <img src="/images/banner/play-button.png" />
              </div>
              <p>{shortenText(title, 45)}</p>
            </div>
          </div>
          <div className="carousel-picture__right">
            <div className="carouse-picture__right__sign"></div>
          </div>
        </>
      )}
      <style jsx>{`
        .carousel-picture {
          min-height: 12rem;
          max-height: 12rem;
          min-width: 18rem;
          background-repeat: no-repeat;
          background-size: auto;
          background-size: 18rem;
          margin-right: 0.8rem;
          background-position: center;
          scroll-snap-align: start;
          display: flex;
        }

        .inactive {
          animation: out-data 0.5s;
          z-index: 1;
        }

        .active {
          transform: scale(1.15);
          min-width: 21.5rem;
          max-width: 21.5rem;
          background-size: 21.5rem;
          animation: in-data 0.5s;
          cursor: pointer;
          z-index: 10;
          box-shadow: inset 0 0 0 100vmax rgba(0, 0, 0, 0.2);
        }

        .carousel-picture__left {
          width: 80%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .carousel-picture__left div {
          padding-left: 2rem;
        }

        .carousel-picture__left > div > div {
          width: 3rem;
          height: 3rem;
          box-sizing: border-box;
          background-color: white;
          padding: 0.5rem 0.5rem 0.5rem 0.8rem;
          border-radius: 2.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .carousel-picture__left img {
          height: 1.5rem;
          width: 1.5rem;
        }

        .carousel-picture__left p {
          color: white;
          font-family: "Bebas Neue", cursive;
          text-shadow: 0rem 0rem 0.1rem black;
          font-size: 1.2rem;
          letter-spacing: 0.05rem;
        }

        .carousel-picture__right {
          width: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 1.3rem;
        }

        .carouse-picture__right__sign {
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          width: 2rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          align-item: center;
          padding-top: 0.1rem;
          border-radius: 2.5rem;
          border: 0.1rem solid rgba(255, 255, 255, 0.7);
        }

        @keyframes in-data {
          0% {
            transform: scale(1);
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: scale(1.15);
          }
        }

        @keyframes out-data {
          0% {
            transform: scale(1.15);
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CarouselPicture;
