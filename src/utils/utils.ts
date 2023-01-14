import type { Frontmatter } from "@models/fontmatter";
import type { AstroType } from "./types";

export function onlyUniqueArrayFilter(
  value: string,
  index: number,
  self: string[]
) {
  return (
    self.map((a) => a.toLowerCase()).indexOf(value.toLowerCase()) === index
  );
}

export function getTechPosts(Astro: AstroType) {
  return Astro.glob<Frontmatter>("./posts/tech/*.mdx");
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
    .filter(onlyUniqueArrayFilter);
}
