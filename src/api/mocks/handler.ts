import { rest } from "msw";

const getData = [
  {
    id: "0",
    author: "Alejandro Escamilla",
    width: 5616,
    height: 3744,
    url: "https://unsplash.com/photos/yC-Yzbqy7PY",
    download_url: "https://picsum.photos/id/0/5616/3744",
  },
  {
    id: "1",
    author: "Alejandro Escamilla",
    width: 5616,
    height: 3744,
    url: "https://unsplash.com/photos/LNRyGwIJr5c",
    download_url: "https://picsum.photos/id/1/5616/3744",
  },
  {
    id: "2",
    author: "Ziga Ajdnik",
    width: 5616,
    height: 3744,
    url: "https://unsplash.com/photos/LNRyGwIJr5c",
    download_url: "https://picsum.photos/id/2/5616/3744",
  },
];

export const handlers = [
  rest.get("https://picsum.photos/v2/list", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page")) - 1;

    return res(
      ctx.status(200),
      ctx.json(getData.slice(page * 2, page * 2 + 2))
    );
  }),
];
