import { useRef, useState, useEffect } from "react";
import CarouselPicture from "./CarouselPicture";

const PictureCarousel: React.FC<{
  animeData: Array<object>;
  number: number;
}> = ({ animeData, number }) => {
  const carousel = useRef();
  const [pictureCount, setPictureCount] = useState<number>(0);
  const [moreInfoViewVisible, setMoreInfoViewVisible] = useState(false);

  const scroll = async (direction) => {
    document
      .getElementsByClassName("picture-carousel__items")
      [number].scrollBy({
        left: direction === "right" ? 1000 : -1000,
        behavior: "smooth",
      });
  };

  return (
    <div className="picture-carousel">
      <div ref={carousel} className="picture-carousel__items">
        <div
          onClick={() => scroll("left")}
          className="picture-carousel__items__scroll-left"
        >
          <img src="images/carousel/left-arrow.png" />
        </div>
        {animeData &&
          animeData.map((anime: any, i) => (
            <CarouselPicture
              key={anime.id}
              backgroundImage={anime.coverImage.extraLarge}
            />
          ))}
        <div
          onClick={() => scroll("right")}
          className="picture-carousel__items__scroll-right"
        >
          <img src="images/carousel/right-arrow.png" />
        </div>
      </div>
      <style jsx>{`
        .picture-carousel {
          height: 15rem;
          width: 100%;
          display: flex;
          overflow-x: scroll;
          position: relative;
          margin-bottom: 0rem;
          padding: 0 4rem;
        }

        .picture-carousel__items {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          overflow-x: scroll;
          -webkit-overflow-scrolling: touch;
        }

        .picture-carousel::-webkit-scrollbar {
          display: none;
        }

        .picture-carousel__items::-webkit-scrollbar {
          display: none;
        }

        .picture-carousel__items__scroll-right,
        .picture-carousel__items__scroll-left {
          width: 3rem;
          height: 12rem;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          cursor: pointer;
          z-index: 5;
        }

        .picture-carousel__items__scroll-right:hover,
        .picture-carousel__items__scroll-left:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }

        .picture-carousel__items__scroll-right:hover img,
        .picture-carousel__items__scroll-left:hover img {
          height: 2.5rem;
        }

        .picture-carousel__items__scroll-right {
          right: 4rem;
        }

        .picture-carousel__items__scroll-right img,
        .picture-carousel__items__scroll-left img {
          height: 2rem;
        }
      `}</style>
    </div>
  );
};

export default PictureCarousel;

// PROPOSED SOLUTION

// const items = ["a", "b", "c", "d", "e"];
// const itemsPerPage = 3;

// let count = 0;
// window.setInterval(() => {
//     count++;
// }, 1000);

// const itemsToShow = ;
