import { useQuery, UseQueryResult } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { ImageEditorPathParams } from "../types";

function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function useImageData(): UseQueryResult<Blob> {
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
