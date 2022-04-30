import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const LoaderSync = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <SyncLoader color="#0277bd" />
    </div>
  );
};

export default LoaderSync;
