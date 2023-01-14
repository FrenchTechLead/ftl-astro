import { Author, getAuthorByID } from "@utils/author.utils";

export type AuthorCardProps = {
  id: string;
  lang: string;
};

export default function AuthorCard(props: AuthorCardProps) {
  const author: Author = getAuthorByID(props.id);
  return (
    <div class="author-card">
      <img
        src={"/assets/authors/" + author.id + ".png"}
        alt={author.firstName + " " + author.lastName}
        class="author-photo"
      />
      <div class="author-info">
        <div class="author-name">
          {author.firstName + " " + author.lastName}
        </div>
        <div class="author-position">{author.position}</div>
        <p class="author-bio">
          {props.lang === "fr" ? author.bioFR : author.bioEN}
        </p>
      </div>
    </div>
  );
}
