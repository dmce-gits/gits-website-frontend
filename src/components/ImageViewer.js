import React from "react";
import Viewer from "react-viewer";

const ImageViewer = ({ src }) => {
  const [visible, setVisible] = React.useState(false);
  return !visible ? (
    <img
      onClick={() => setVisible(true)}
      src={src}
      alt="imagee"
      className="h-full w-10"
      style={{ cursor: "pointer" }}
    ></img>
  ) : (
    <Viewer
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
      images={[{ src: src, alt: "" }]}
    />
  );
};

export default ImageViewer;
