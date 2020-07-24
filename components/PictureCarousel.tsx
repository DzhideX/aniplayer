const PictureCarousel: React.FC<{ topScore: Array<object> }> = ({
  topScore,
}) => {
  return (
    <div className="picture-carousel">
      {topScore.map((anime, i) => (
        <div
          className="picture-carousel__item"
          key={anime.id}
          style={{ backgroundImage: `url(${anime.coverImage.large})` }}
        />
      ))}
      <style jsx>{`
        .picture-carousel {
          height: 10rem;
          width: 100%;
          display: flex;
          overflow-x: scroll;
          padding-left: 2rem;
        }

        .picture-carousel::-webkit-scrollbar {
          display: none;
        }

        .picture-carousel__item {
          min-height: 8rem;
          min-width: 10rem;
          background-repeat: no-repeat;
          background-size: auto;
          background-size: 10rem;
          margin-left: 1rem;
          background-position: center;
        }
      `}</style>
    </div>
  );
};

export default PictureCarousel;
