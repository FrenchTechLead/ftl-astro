import type { AstroType } from "./types";

export function onlyUniqueArrayFilter(
  value: string,
  index: number,
  self: string[]
) {
  return self.indexOf(value) === index;
}

export async function getTechPosts(Astro: AstroType) {
  return await Astro.glob("./posts/tech/*.mdx");
}

export function getFileName(Astro: AstroType) {
  const url: string = Astro.props.url;
  const lastIndex = url.lastIndexOf("/");
  return url.substring(lastIndex + 1);
}
