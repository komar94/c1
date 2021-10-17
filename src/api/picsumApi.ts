import { createRequest } from "../baseApi";

export interface ImageModel {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export function getListOfImages(page: number = 1): Promise<ImageModel[]> {
    return createRequest<ImageModel[]>(`https://picsum.photos/v2/list?page=${page}&limit=12`);
}