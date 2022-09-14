import React, { useState } from "react";
import Form from "./Form";
import NeonCricketForm from "./NeonCricketForm";

const Home = ({ setRegisterSubmitClicked, neonCricket }) => {
  const [enterClicked, setEnterClicked] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = React.useRef(null);

  const onEnterClick = () => {
    if (videoLoaded) {
      document.getElementById("myVideo").play();
      setEnterClicked(true);
    }
  };
  return (
    // <>
    //   {showVideo && (
    //     <>
    //       <video
    //         onLoad={() => setVideoLoaded(true)}
    //         onLoadedData={() => setVideoLoaded(true)}
    //         ref={videoRef}
    //         onClick={() => {
    //           setShowVideo(false);
    //         }}
    //         onEnded={() => {
    //           setShowVideo(false);
    //         }}
    //         preload="metadata"
    //         onLoadedMetadata={() => setVideoLoaded(true)}
    //         id="myVideo"
    //         className="fixed top-0 left-0 w-full z-10 h-screen object-fit md:object-cover bg-inherit cursor-pointer"
    //       >
    //         <source
    //           src={
    //             window.innerWidth < 500
    //               ? "/technitude-intro-small.mp4"
    //               : "/technitude-intro.mp4"
    //           }
    //           type="video/mp4"
    //         />
    //       </video>
    //       <div
    //         className={`fixed bottom-0 right-0 z-10 text-gray-500`}
    //         style={{
    //           fontFamily: "CounterStrike",
    //           fontSize: window.innerWidth <= 450 ? 15 : 15,
    //         }}
    //       >
    //         {enterClicked && "[CLICK TO SKIP]"}
    //       </div>
    //     </>
    //   )}
    //   {!enterClicked && (
    //     <div
    //       onClick={onEnterClick}
    //       className={`fixed top-0 left-0 flex justify-center items-center z-20 w-full h-full text-white ${
    //         videoLoaded && "cursor-pointer"
    //       }`}
    //       style={{
    //         fontFamily: "CounterStrike",
    //         fontSize: window.innerWidth <= 450 ? 20 : 48,
    //       }}
    //     >
    //       {!videoLoaded ? "[LOADING]" : "[CLICK TO ENTER]"}
    //     </div>
    //   )}

    //   {!showVideo &&
    //     (neonCricket ? (
    //       <NeonCricketForm
    //         setRegisterSubmitClicked={setRegisterSubmitClicked}
    //       />
    //     ) : (
    //       <Form setRegisterSubmitClicked={setRegisterSubmitClicked} />
    //     ))}
    // </>
    neonCricket ? (
      <NeonCricketForm setRegisterSubmitClicked={setRegisterSubmitClicked} />
    ) : (
      <Form setRegisterSubmitClicked={setRegisterSubmitClicked} />
    )
  );
};

export default Home;
