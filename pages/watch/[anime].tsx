import Layout from "../../components/Layout";
import { useRef, useEffect, useState } from "react";

const Watch: React.FC = () => {
  const videoRef: any = useRef();
  const progressRef: any = useRef();
  const [videoTimer, setVideoTimer] = useState<number | undefined>(0);
  const [playButton, setPlayButton] = useState<boolean>(true);

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
          className="watch__video"
          src="https://storage.googleapis.com/linear-theater-254209.appspot.com/v6.4animu.me/Fullmetal-Alchemist/Fullmetal-Alchemist-Episode-01-1080p.mp4"
        >
          <source
            src="https://storage.googleapis.com/linear-theater-254209.appspot.com/v6.4animu.me/Fullmetal-Alchemist/Fullmetal-Alchemist-Episode-01-1080p.mp4"
            type="video/mp4"
          ></source>
        </video>
        <div className="watch__player">
          <div className="watch__player__progress">
            <progress
              ref={progressRef}
              className="watch__player_progress__bar"
              value={
                videoRef.current ? videoTimer / videoRef.current.duration : 0
              }
              onClick={updateProgressBar}
            />
            <p>
              {`${Math.floor(
                videoRef.current
                  ? (videoRef.current.currentTime - videoTimer) / 60
                  : 0
              )}:`}
            </p>
          </div>
          <div className="watch__player_actions">
            {playButton ? (
              <button
                onClick={() => {
                  videoRef.current.play();
                  setPlayButton(false);
                }}
                className="watch__player_play-button"
              >
                <img src="/images/banner/play-button.png" />
              </button>
            ) : (
              <button
                onClick={() => {
                  videoRef.current.pause();
                  setPlayButton(true);
                }}
              >
                pause
              </button>
            )}
          </div>
        </div>
        <style jsx>{`
          .watch {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            position: relative;
          }

          .watch__video {
            height: 100vh;
            width: 100%;
            position: absolute;
          }

          .watch__player {
            height: 10%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 2;
          }

          .watch__player__progress {
            width: 100%;
            height: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .watch__player_progress__bar {
            width: 90%;
            height: 0.5rem;
            border: none;
          }

          .watch__player__progress p {
            position: absolute;
            right: 2rem;
            color: white;
            font-size: 1rem;
            margin: 0;
          }

          .watch__player_play-button {
            width: 5rem;
            height: 2rem;
            z-index: 2;
          }

          .watch__player_actions {
            width: 90%;
            height: 60%;
            display: flex;
            align-items: center;
            background-color: red;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Watch;
