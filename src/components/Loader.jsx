
import Indicator from "./LoadingIndicator";

const Loader = ({ style }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        ...style
      }}
    >
      <Indicator />
    </div>
  );
};

export default Loader;

