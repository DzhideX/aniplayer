import Layout from "../../components/Layout";
import { useRef, useEffect, useState } from "react";

const Watch: React.FC = () => {
  const videoRef: any = useRef();
  const progressRef: any = useRef();
  const watchRef: any = useRef();
  const [videoTimer, setVideoTimer] = useState<number | undefined>(0);
  const [playButton, setPlayButton] = useState<boolean>(true);
  const [mouseMoveOnVideo, setMouseMoveOnVideo] = useState<boolean>(false);
  const [mouseOnPlayer, setMouseOnPlayer] = useState<boolean>(false);

  const updateVideoTime = (e) => {
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
    setVideoTimer(videoRef.current.currentTime);
  };

  const updateProgressBar = (e) => {
    const percentageOfVideoFinished =
      videoRef.current.currentTime / videoRef.current.duration;
    progressRef.current.value = percentageOfVideoFinished;
  };

  const setMouseMove = (e) => {
    e.preventDefault();
    setMouseMoveOnVideo(true);

    let timeout;
    (() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setMouseMoveOnVideo(false), 4000);
    })();
  };

  return (
    <Layout navbar={false}>
      <div
        ref={watchRef}
        className="watch"
        onMouseMove={(e) => setMouseMove(e)}
      >
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
        <div
          className="watch__player"
          style={{
            visibility: mouseOnPlayer
              ? "visible"
              : mouseMoveOnVideo
              ? "visible"
              : "hidden",
          }}
          onMouseEnter={() => setMouseOnPlayer(true)}
          onMouseLeave={() => setMouseOnPlayer(false)}
        >
          <div className="watch__player__progress">
            <progress
              ref={progressRef}
              className="watch__player__progress__bar"
              value={
                videoRef.current ? videoTimer / videoRef.current.duration : 0
              }
              onClick={updateVideoTime}
            />
            <p>
              {`${Math.floor(
                videoRef.current
                  ? (videoRef.current.currentTime - videoTimer) / 60
                  : 0
              )}:`}
            </p>
          </div>
          <div className="watch__player__actions">
            <div className="watch__player__actions__left">
              {playButton ? (
                <button
                  onClick={() => {
                    videoRef.current.play();
                    setPlayButton(false);
                  }}
                  className="watch__player__actions__left__play-button"
                >
                  <img src="/images/watch/play-button.png" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    videoRef.current.pause();
                    setPlayButton(true);
                  }}
                  className="watch__player__actions__left__play-button"
                >
                  <img src="/images/watch/pause.png" />
                </button>
              )}
              <img
                onClick={(e) => {
                  videoRef.current.currentTime -= 10;
                  updateProgressBar(e);
                }}
                src="/images/watch/rewind.png"
              />
              <img
                onClick={(e) => {
                  videoRef.current.currentTime += 10;
                  updateProgressBar(e);
                }}
                src="/images/watch/skip.png"
              />
            </div>
            <div className="watch__player__actions__right">
              <img
                onClick={() => {
                  if (document.fullscreenElement) {
                    if (
                      document.fullscreenElement ||
                      document.webkitFullscreenElement ||
                      document.mozFullScreenElement
                    ) {
                      document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                      /* Firefox */
                      document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                      /* Chrome, Safari and Opera */
                      document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                      /* IE/Edge */
                      document.msExitFullscreen();
                    }
                  } else {
                    if (watchRef.current.requestFullscreen) {
                      watchRef.current.requestFullscreen();
                    } else if (watchRef.current.mozRequestFullScreen) {
                      /* Firefox */
                      watchRef.current.mozRequestFullScreen();
                    } else if (watchRef.current.webkitRequestFullscreen) {
                      /* Chrome, Safari & Opera */
                      watchRef.current.webkitRequestFullscreen();
                    } else if (watchRef.current.msRequestFullscreen) {
                      /* IE/Edge */
                      watchRef.current.msRequestFullscreen();
                    }
                  }
                }}
                src="/images/watch/expand.png"
              />
            </div>
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

          video::-webkit-media-controls-enclosure {
            display: none !important;
          }

          .watch__player {
            height: 10%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 2147483647;
          }

          .watch__player__progress {
            width: 100%;
            height: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .watch__player__progress__bar {
            width: 90%;
            height: 0.3rem;
            border: none;
            cursor: pointer;
          }

          .watch__player__progress__bar::-webkit-progress-bar {
            background: rgb(0, 0, 0, 0.8);
            box-shadow: 0 0 0.1rem rgb(255, 255, 255, 0.5);
          }

          .watch__player__progress__bar::-webkit-progress-value {
            background-color: red;
          }

          .watch__player__progress p {
            position: absolute;
            right: 2rem;
            color: white;
            font-size: 1rem;
            margin: 0;
          }

          .watch__player__actions {
            width: 90%;
            height: 60%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .watch__player__actions__left {
            height: 100%;
            display: flex;
            align-items: center;
            padding-bottom: 0.6rem;
          }

          .watch__player__actions__left > img {
            height: 2rem;
            width: 2rem;
            margin-left: 2rem;
            cursor: pointer;
            margin-bottom: 0.2rem;
          }

          .watch__player__actions__left img:hover {
            animation: in-data 0.3s;
          }

          .watch__player__actions__left__play-button {
            width: 2rem;
            height: 2rem;
            border: none;
            background: none;
            margin-left: -0.35rem;
            cursor: pointer;
          }

          .watch__player__actions__left__play-button:focus {
            outline: none;
          }

          .watch__player__actions__left__play-button:hover img {
            animation: in-data 0.3s;
          }

          .watch__player__actions__left__play-button img {
            height: 1.5rem;
            width: 1.5rem;
          }

          .watch__player__actions__fullscreen {
            justify-self: flex-end;
          }

          .watch__player__actions__right {
            height: 100%;
            display: flex;
            align-items: center;
            padding-bottom: 0.6rem;
          }

          .watch__player__actions__right > img {
            height: 1.7rem;
            width: 2.1rem;
            margin-left: 2rem;
            cursor: pointer;
            margin-bottom: 0.2rem;
          }

          .watch__player__actions__right img:hover {
            animation: in-data 0.3s;
          }

          @keyframes in-data {
            0% {
              transform: scale(0.95);
            }
            60% {
              opacity: 1;
            }
            100% {
              transform: none;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Watch;
