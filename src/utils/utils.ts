import type { AstroType } from "./types";

function onlyUniqueArrayFilter(value: string, index: number, self: string[]) {
  return (
    self.map((a) => a.toLowerCase()).indexOf(value.toLowerCase()) === index
  );
}

export function getFileName(Astro: AstroType) {
  const url: string = Astro.props.url;
  const lastIndex = url.lastIndexOf("/");
  return url.substring(lastIndex + 1);
}

export function mergeTags(arr: Array<Array<string>>) {
  return arr
    .flatMap((a) => a)
    .map((a) => a.toLowerCase())
    .filter(onlyUniqueArrayFilter)
    .sort();
}

export function getPublishDateStrFromFileName(str: string): string {
  const regex = /\d\d\d\d\d\d\d\d/;
  str = str.match(regex)[0];
  let year = str.substring(0, 4);
  let month = str.substring(4, 6);
  let day = str.substring(6);
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
