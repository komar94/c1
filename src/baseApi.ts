export function createRequest<T>(url: string): Promise<T> {
  return fetch(url).then(async (x) => {
    if (x.ok) {
      return x.json();
    }

    throw new Error(await x.json());
  });
}
