import Layout from "../../components/Layout";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export async function getServerSideProps({ query }) {
  const watchData = await fetch(`http://localhost:4000/watch/${query.anime}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return {
    props: {
      animeName: query.anime.split("-episode")[0].split("-").join(" "),
      episodeNumber: query.anime.split("-episode-")[1],
      query: query.anime,
      videoUrl: watchData ? watchData.videoUrl : null,
      hasNextEpisode: watchData.hasNextEpisode,
    },
  };
}

const Watch: React.FC<{
  animeName: string;
  episodeNumber: string;
  videoUrl: string;
  query: string;
  hasNextEpisode: boolean;
}> = ({ animeName, episodeNumber, videoUrl, query, hasNextEpisode }) => {
  const router = useRouter();
  const videoRef: any = useRef();
  const progressRef: any = useRef();
  const watchRef: any = useRef();
  const volumeRef: any = useRef();
  const [videoTimer, setVideoTimer] = useState<number | undefined>(0);
  const [videoDuration, setVideoDuration] = useState<number | undefined>();
  const [playButton, setPlayButton] = useState<boolean>(true);
  const [metaDataLoaded, setMetaDataLoaded] = useState<boolean>(false);
  const [mouseMoveOnVideo, setMouseMoveOnVideo] = useState<boolean>(false);
  const [mouseOnPlayer, setMouseOnPlayer] = useState<boolean>(false);
  const [volumeBarVisible, setVolumeBarVisible] = useState<boolean>(false);
  const [mouseOnVolumeBar, setMouseOnVolumeBar] = useState<boolean>(false);
  const [volumeState, setVolumeState] = useState<number | undefined>();

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoTimer(videoRef.current.currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateVideoTime = (e) => {
    const progressBarPercentage =
      (e.pageX -
        (progressRef.current.offsetLeft * progressRef.current.max) /
          progressRef.current.offsetWidth) /
      (0.9 * window.innerWidth);
    console.log(progressBarPercentage - 0.0526, videoDuration);
    videoRef.current.currentTime =
      (progressBarPercentage - 0.0526) * videoDuration;
    if (videoRef.current.currentTime <= 5) {
      videoRef.current.currentTime = 0;
    }
    setVideoTimer(videoRef.current.currentTime);
  };

  const updateProgressBar = (e) => {
    const percentageOfVideoFinished = videoTimer / videoDuration;
    progressRef.current.value = percentageOfVideoFinished;
  };

  const toggleFullscreen = () => {
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

  const setVolume = (e) => {
    let clickedPercentage =
      (volumeRef.current.getBoundingClientRect().bottom - e.pageY) /
      volumeRef.current.offsetHeight;
    if (clickedPercentage <= 0.02) {
      clickedPercentage = 0;
    }
    videoRef.current.volume = clickedPercentage;
    setVolumeState(clickedPercentage);
  };

  return (
    <Layout navbar={false}>
      <Head>
        <title>
          {animeName.charAt(0).toUpperCase() + animeName.slice(1)}: Episode{" "}
          {Number(episodeNumber)}
        </title>
      </Head>
      <div
        ref={watchRef}
        className="watch"
        onMouseMove={(e) => {
          if (!mouseMoveOnVideo) {
            setMouseMove(e);
          }
        }}
      >
        <video
          onLoadedMetadata={() => {
            setVideoDuration(videoRef.current.duration);
            setMetaDataLoaded(true);
          }}
          ref={videoRef}
          className="watch__video"
          src={
            videoUrl
              ? videoUrl
              : "https://storage.googleapis.com/linear-theater-254209.appspot.com/v6.4animu.me/Fullmetal-Alchemist/Fullmetal-Alchemist-Episode-01-1080p.mp4"
          }
        >
          <source
            src={
              videoUrl
                ? videoUrl
                : "https://storage.googleapis.com/linear-theater-254209.appspot.com/v6.4animu.me/Fullmetal-Alchemist/Fullmetal-Alchemist-Episode-01-1080p.mp4"
            }
            type="video/mp4"
          ></source>
        </video>
        <img
          className="watch__back-button"
          src="/images/carousel/left-arrow.png"
          onClick={() => router.push("/")}
          style={{ visibility: mouseMoveOnVideo ? "visible" : "hidden" }}
        />
        {!metaDataLoaded && (
          <p className="watch__loading">
            Loading..(refresh if this takes too long)
          </p>
        )}
        <div
          className="watch__player"
          style={{
            visibility: mouseOnPlayer
              ? "visible"
              : mouseMoveOnVideo
              ? "visible"
              : "hidden",
            display: metaDataLoaded ? "flex" : "none",
          }}
          onMouseEnter={() => setMouseOnPlayer(true)}
          onMouseLeave={() => setMouseOnPlayer(false)}
        >
          <div className="watch__player__progress">
            <progress
              ref={progressRef}
              className="watch__player__progress__bar"
              value={videoDuration ? videoTimer / videoDuration : 0}
              onClick={updateVideoTime}
            />
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
              <div className="watch__player__actions__left__volume">
                <div
                  style={{
                    visibility: mouseOnVolumeBar
                      ? "visible"
                      : volumeBarVisible
                      ? "visible"
                      : "hidden",
                  }}
                  onMouseEnter={() => setMouseOnVolumeBar(true)}
                  onMouseLeave={() => setMouseOnVolumeBar(false)}
                  className="watch__player__actions__left__volume__bar"
                >
                  <div
                    onClick={setVolume}
                    ref={volumeRef}
                    style={{ width: "0.7rem", height: "5rem" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${
                          volumeState
                            ? (1 - volumeState) * 100
                            : videoRef.current
                            ? (1 - videoRef.current.volume) * 100
                            : 0
                        }%`,
                        backgroundColor: "rgb(30,30,30)",
                        cursor: "pointer",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "100%",
                        height: `${
                          volumeState
                            ? volumeState * 100
                            : videoRef.current
                            ? videoRef.current.volume * 100
                            : 5
                        }%`,
                        backgroundColor: "red",
                        cursor: "pointer",
                      }}
                    ></div>
                  </div>
                </div>
                <img
                  onMouseEnter={() => setVolumeBarVisible(true)}
                  onMouseLeave={() =>
                    setTimeout(() => setVolumeBarVisible(false), 1000)
                  }
                  src="/images/watch/speaker.png"
                />
              </div>
              <p className="watch__player__actions__left__anime-name">
                {animeName}: <span>Episode {Number(episodeNumber)}</span>
              </p>
            </div>
            <div className="watch__player__actions__right">
              <img onClick={toggleFullscreen} src="/images/watch/expand.png" />
              {hasNextEpisode && videoTimer >= videoDuration - 20 && (
                <div
                  onClick={() => {
                    const episodeNumber =
                      Number(query.substring(query.length - 2)) + 1;
                    router.push(
                      `/watch/${
                        query.slice(0, query.length - 2) +
                        (episodeNumber < 10
                          ? `0${episodeNumber}`
                          : `${episodeNumber}`)
                      }`
                    );
                  }}
                  className="watch__player__actions__right__next-episode"
                >
                  <img src="/images/watch/play-button-black.png" />
                  <p> Next Episode </p>
                  {console.log(hasNextEpisode)}
                </div>
              )}
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

          .watch__back-button {
            position: absolute;
            top: 1.5rem;
            left: 6rem;
            width: 2rem;
            height: 2rem;
            z-index: 2;
            cursor: pointer;
          }

          .watch__video {
            height: 100vh;
            width: 100%;
            position: absolute;
          }

          video::-webkit-media-controls-enclosure {
            display: none !important;
          }
          .watch__loading {
            position: absolute;
            top: 50%;
            left: 40%;
            z-index: 2;
            color: white;
          }

          .watch__player {
            height: 13%;
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
            padding-bottom: 0.5rem;
          }

          .watch__player__actions__left {
            height: 100%;
            display: flex;
            align-items: center;
            padding-bottom: 0.6rem;
          }

          .watch__player__actions__left > img {
            height: 2.5rem;
            width: 2.5rem;
            margin-left: 3rem;
            cursor: pointer;
            margin-bottom: 0.2rem;
          }

          .watch__player__actions__left img:hover {
            animation: in-data 0.3s;
          }

          .watch__player__actions__left__play-button {
            width: 3rem;
            height: 3rem;
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
            height: 2rem;
            width: 2rem;
          }

          .watch__player__actions__left__volume {
            height: 100%;
            width: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 3rem;
            display: relative;
          }

          .watch__player__actions__left__volume img {
            height: 2.5rem;
            width: 2.5rem;
            cursor: pointer;
          }

          .watch__player__actions__left__volume__bar {
            position: absolute;
            min-height: 7rem;
            min-width: 2rem;
            background-color: rgb(10, 10, 10);
            margin-top: -12rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }

          .watch__player__actions__left__anime-name {
            margin-left: 2rem;
            font-size: 1.2rem;
            color: white;
            text-transform: capitalize;
          }

          .watch__player__actions__left__anime-name span {
            color: rgb(180, 180, 180);
            font-weight: 500;
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
            height: 2rem;
            width: 2.6rem;
            margin-left: 2rem;
            cursor: pointer;
            margin-bottom: 0.2rem;
          }

          .watch__player__actions__right img:hover {
            animation: in-data 0.3s;
          }

          .watch__player__actions__right__next-episode {
            position: absolute;
            width: 10rem;
            height: 3rem;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            cursor: pointer;
            bottom: 7.5rem;
            right: 6rem;
          }

          .watch__player__actions__right__next-episode:hover {
            background-color: rgba(255, 255, 255, 0.7);
          }

          .watch__player__actions__right__next-episode img {
            height: 1.5rem;
            margin-right: 0.5rem;
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
declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

export default Watch;
