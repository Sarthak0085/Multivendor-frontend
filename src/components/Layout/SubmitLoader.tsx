import { animated, useSpring } from "react-spring";

const SubmitLoader = () => {
  // Define spring animation
  const props = useSpring({
    loop: true,
    from: { rotate: 0 },
    to: { rotate: 360 },
    config: { duration: 1000 },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <animated.div
        style={{
          width: 50,
          height: 50,
          border: "2px solid #333",
          borderRadius: "50%",
          borderLeftColor: "#00adb5",
          animation: "spin 1s linear infinite",
          transform: props.rotate.interpolate((r) => `rotate(${r}deg)`),
        }}
      />
    </div>
  );
};

export default SubmitLoader;
