import { useState, useCallback } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { getListOfImages, ImageModel } from "../../api/picsumApi";

type UseGetImageResult = {
  hasNext: boolean;
  hasPrevious: boolean;
  next: () => void;
  previous: () => void;
  data: ImageModel[] | undefined;
} & Pick<UseQueryResult, "status" | "error">;

export default function useGetImages(): UseGetImageResult {
  const [page, setPage] = useState(1);
  const {
    data: rawData,
    error,
    status,
  } = useQuery(["images", page], () => getListOfImages(page));
  const { headers, data } = rawData ?? {};
  const linkHeader = headers?.get("link") ?? "";

  const hasNext = linkHeader.includes(`rel="next"`);
  const hasPrevious = linkHeader.includes(`rel="prev"`);

  const next = useCallback(() => {
    if (hasNext) {
      setPage((x) => x + 1);
    }
  }, [hasNext]);

  const previous = useCallback(() => {
    if (hasPrevious) {
      setPage((x) => x - 1);
    }
  }, [hasPrevious]);

  return {
    data,
    next,
    previous,
    hasNext,
    hasPrevious,
    error,
    status,
  };
}
