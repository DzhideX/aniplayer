import { useState } from "react";

const CarouselPicture: React.FC<{
  backgroundImage: "string";
}> = ({ backgroundImage }) => {
  const [moreInfoView, setMoreInfoView] = useState<boolean>(false);

  return (
    <div
      className={`carousel-picture${moreInfoView ? " active" : ""}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      onMouseEnter={() => setMoreInfoView(true)}
      onMouseLeave={() => setMoreInfoView(false)}
    >
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
        }

        .active {
          min-width: 25rem;
          min-height: 15rem;
          max-height: 15rem;
          background-size: 25rem;
          animation: in-data 1s;
        }

        @keyframes in-data {
          0% {
            transform: scale(0.8);
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
