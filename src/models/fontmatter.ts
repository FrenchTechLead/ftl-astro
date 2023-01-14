export interface Frontmatter {
  layout: string;
  title: string;
  publishDate: string;
  authorName: string;
  authorSocial: string;
  postImageAlt: string;
  postImageWidth: number;
  postImageHeight: number;
  keywords: string[];
  tags: string[];
  description: string;
  lang: string;
  draft: boolean;
}
