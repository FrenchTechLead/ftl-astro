export function onlyUniqueArrayFilter(
  value: string,
  index: number,
  self: string[]
) {
  return self.indexOf(value) === index;
}

export async function getTechPosts() {
  return await Astro.glob("./posts/tech/*.mdx");
}
