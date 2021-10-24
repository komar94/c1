export type DataWithHeaders<T> = {
  data: T;
  headers: Headers;
};

export type FetchResponse<T> = Promise<DataWithHeaders<T>>;

export function createRequest<T>(url: string): FetchResponse<T> {
  return fetch(url).then(async (x) => {
    if (x.ok) {
      return {
        data: await x.json(),
        headers: x.headers,
      };
    }

    throw new Error(await x.json());
  });
}
