import { useEffect, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import ErrorFallback from "../ErrorFallback";
import Loader from "../shared/Loader";
import Toolbar from "./Toolbar";

interface ImageEditorPathParams {
  id: string;
  height: string;
  width: string;
}

function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}

function useImageUrl() {
  const { height, id, width } = useParams<ImageEditorPathParams>();
  const queryParams = useUrlQuery().toString();

  const url = `https://picsum.photos/id/${id}/${width}/${height}?${queryParams}`;

  return useQuery(["image-download", id, height, width, queryParams], () =>
    fetch(url).then(async (x) => {
      if (x.ok) {
        return x.blob();
      }

      throw new Error(await x.text());
    })
  );
}

function saveImage(imageData: Blob, imageName: string) {
  var element = document.createElement("a");
  element.href = URL.createObjectURL(imageData);
  element.setAttribute("download", `${imageName}.jpg`);
  element.click();
}

const ImageEditor = () => {
  const { data, status, error } = useImageUrl();
  const imageRef = useRef<HTMLImageElement>(null);
  const { height, id, width } = useParams<ImageEditorPathParams>();

  useEffect(() => {
    if (data && imageRef.current) {
      console.log("Changing picture");
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
