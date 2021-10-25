import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

import ErrorFallback from "../ErrorFallback";
import useImageData from "../hooks/useImageData";
import Loader from "../shared/Loader";
import { ImageEditorPathParams } from "../types";
import Toolbar from "./Toolbar";

function saveImage(imageData: Blob, imageName: string) {
  var element = document.createElement("a");
  element.href = URL.createObjectURL(imageData);
  element.setAttribute("download", `${imageName}.jpg`);
  element.click();
}

const ImageEditor = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  const { data, status, error } = useImageData();
  const { height, id, width } = useParams<ImageEditorPathParams>();

  useEffect(() => {
    if (data && imageRef.current) {
      const imageUrl = window.URL.createObjectURL(data);
      imageRef.current.src = imageUrl;
      imageRef.current.onload = () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [data]);

  const downloadImage = () => {
    saveImage(data as Blob, "image");
  };

  if (status === "error") {
    throw error;
  }

  return (
    <div>
      <Toolbar id={id} height={Number(height)} width={Number(width)} />
      <button onClick={downloadImage}>Download</button>
      {status === "loading" && <Loader />}
      <img className="my-2" ref={imageRef}></img>
    </div>
  );
};

const SafeImageEditor = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ImageEditor />
  </ErrorBoundary>
);

export default SafeImageEditor;
