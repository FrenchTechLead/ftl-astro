import type { AstroType } from "./types";

function onlyUniqueArrayFilter(value: string, index: number, self: string[]) {
  return (
    self.map((a) => a.toLowerCase()).indexOf(value.toLowerCase()) === index
  );
}

export function mergeTags(arr: Array<Array<string>>) {
  return arr
    .flat()
    .map((a) => a?.toLowerCase())
    .filter(onlyUniqueArrayFilter)
    .sort();
}

export function getPublishDateFromSlug(slug: string): string {
  const regex = /\d\d\d\d\d\d\d\d/;
  slug = slug.match(regex)[0];
  let year = slug.substring(0, 4);
  let month = slug.substring(4, 6);
  let day = slug.substring(6);
  return year + "-" + month + "-" + day;
}

export async function isDevMode(): Promise<boolean> {
  return import.meta.env.DEV;
}

export function getBaseURL(): Promise<string> {
  return isDevMode().then((a) => {
    return a ? "http://localhost:3000" : "https://frenchtechlead.com";
  });
}

export function buildURL(uri: string): Promise<string> {
  return getBaseURL().then((a) => a + uri);
}
