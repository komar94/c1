import { useParams } from "react-router-dom";

interface ImageEditorPathParams {
  id: string;
  height: string;
  width: string;
}

function createImageUrl(id: string, grayscale?: boolean, blur?: number) {
  const queryParams = new URLSearchParams();
  if (grayscale) {
    queryParams.append("grayscale", "");
  }

  if (blur) {
    queryParams.append("blur", blur.toString());
  }

  return `https://picsum.photos/id/${id}/768/1024?${queryParams.toString()}`;
}

const ImageEditor = () => {
  const { height, id, width } = useParams<ImageEditorPathParams>();

  return (
    <div>
      <img src={createImageUrl(id, false, 0)}></img>
    </div>
  );
};

export default ImageEditor;
