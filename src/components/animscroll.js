import React, { useRef } from "react";

import Lottie, { LottiePlayer } from "lottie-react";

const AnimationScroll = ({ data }) => {
  const container = useRef(LottiePlayer);

  return (
    <Lottie
      className="anim-standard"
      lottieRef={container}
      animationData={data}
      autoplay
      loop
      suppressHydrationWarning
    ></Lottie>
  );
};

export default AnimationScroll;