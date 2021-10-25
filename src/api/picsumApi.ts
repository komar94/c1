import { createRequest, FetchResponse } from "../baseApi";

export interface ImageModel {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export function getListOfImages(
  page: number = 1,
  size: number = 12
): FetchResponse<ImageModel[]> {
  return createRequest<ImageModel[]>(
    `https://picsum.photos/v2/list?page=${page}&limit=${size}`
  );
}

export function getImageInfo(id: string): FetchResponse<ImageModel> {
  return createRequest<ImageModel>(`https://picsum.photos/id/${id}/info`);
}
