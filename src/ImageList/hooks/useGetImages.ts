import { useQuery } from "react-query";
import { getListOfImages } from "../../api/picsumApi";

export default function useGetImages(page: number) {
  return useQuery(["images", page], () => getListOfImages(page));
}
