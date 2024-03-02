// import React from 'react';
// import { animated, useSpring } from 'react-spring';

// const Loader = () => {
//   // Define spring animation
//   const props = useSpring({
//     loop: true,
//     from: { rotate: 0 },
//     to: { rotate: 360 },
//     config: { duration: 1000 },
//   });

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <animated.div
//         style={{
//           width: 50,
//           height: 50,
//           border: '2px solid #333',
//           borderRadius: '50%',
//           borderLeftColor: '#00adb5',
//           animation: 'spin 1s linear infinite',
//           transform: props.rotate.interpolate((r) => `rotate(${r}deg)`),
//         }}
//       />
//     </div>
//   );
// };

// export default Loader;

import Lottie from "react-lottie";
import animationData from "../../Assests/animations/Animation - 1709193562996.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export default Loader;
