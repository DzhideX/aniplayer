import { useState } from "react";

const CarouselPicture: React.FC<{
  backgroundImage: string;
  css: boolean;
}> = ({ backgroundImage, css }) => {
  const [moreInfoView, setMoreInfoView] = useState<boolean>(false);

  return (
    <div
      className={`carousel-picture${moreInfoView ? " active" : ""}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
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
          transform: scale(1.25);
          min-width: 21.5rem;
          max-width: 21.5rem;
          animation: in-data 0.5s;
        }

        @keyframes in-data {
          0% {
            transform: scale(1);
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: scale(1.25);
          }
        }
      `}</style>
    </div>
  );
};

export default CarouselPicture;
