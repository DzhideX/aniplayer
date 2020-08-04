import Layout from "../../components/Layout";
import { useRef, useEffect, useState } from "react";

const Watch: React.FC = () => {
  const videoRef: any = useRef();
  const progressRef: any = useRef();
  const [videoTimer, setVideoTimer] = useState<number | undefined>(0);

  const updateProgressBar = (e) => {
    const progressBarPercentage =
      (e.pageX -
        (progressRef.current.offsetLeft * progressRef.current.max) /
          progressRef.current.offsetWidth) /
      (0.9 * window.innerWidth);
    videoRef.current.currentTime =
      (progressBarPercentage - 0.0526) * videoRef.current.duration;
    if (videoRef.current.currentTime <= 5) {
      videoRef.current.currentTime = 0;
    }

    // videoRef.current.currentTime =
    //   (e.pageX / window.innerWidth) * videoRef.current.duration;
    // videoRef.current.currentTime =
    //   (progressBarProgress / progressBarLength) * videoRef.current.duration;
    setVideoTimer(videoRef.current.currentTime);
  };

  useEffect(() => {}, []);

  return (
    <Layout navbar={false}>
      <div className="watch">
        <video
          ref={videoRef}
          className="watch__player"
          src="https://storage.googleapis.com/linear-theater-254209.appspot.com/v6.4animu.me/Fullmetal-Alchemist/Fullmetal-Alchemist-Episode-01-1080p.mp4"
        >
          <source
            src="https://storage.googleapis.com/linear-theater-254209.appspot.com/v6.4animu.me/Fullmetal-Alchemist/Fullmetal-Alchemist-Episode-01-1080p.mp4"
            type="video/mp4"
          ></source>
        </video>
        <button
          onClick={() => videoRef.current.play()}
          className="watch__play-button"
        >
          <img src="/images/banner/play-button.png" />
        </button>
        <button onClick={() => videoRef.current.pause()}>pause</button>
        <progress
          ref={progressRef}
          className="watch__progress-bar"
          value={videoRef.current ? videoTimer / videoRef.current.duration : 0}
          onClick={updateProgressBar}
        />
        <style jsx>{`
          .watch {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            position: relative;
          }

          .watch__player {
            height: 100vh;
            width: 100%;
            position: absolute;
          }

          .watch__progress-bar {
            z-index: 2;
            width: 90%;
            position: absolute;
            bottom: 5%;
          }

          .watch__progress-bar progress {
            width: 100%;
          }

          .watch__play-button {
            width: 5rem;
            height: 2rem;
            z-index: 2;
          }

          button {
            z-index: 2;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Watch;
