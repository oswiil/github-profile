import React, { useRef } from "react";

import Lottie, { LottiePlayer } from "lottie-react";

const AnimationCli = ({ data }) => {
  const container = useRef(LottiePlayer);
  const handleMouseLeave = () => {
    container.current.setSpeed(1);
  };
  const handleMouseEnter = () => {
    container.current.setSpeed(5);
  };
  return (
    <Lottie
      className="anim-standard"
      lottieRef={container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animationData={data}
      autoplay
      loop
      suppressHydrationWarning
    ></Lottie>
  );
};

export default AnimationCli;
