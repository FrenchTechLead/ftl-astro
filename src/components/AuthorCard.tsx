import { Author, getAuthorByID } from "@utils/author.utils";

export type AuthorCardProps = {
  id: string;
  lang: string;
};

export default function AuthorCard(props: AuthorCardProps) {
  const author: Author = getAuthorByID(props.id);
  return (
    <div class="card author-card">
      <img
        src={"/assets/authors/" + author.id + ".jpeg"}
        style="width: 150px !important; "
        class="card-img-top"
        alt={author.firstName + " " + author.lastName}
      />
      <div class="card-body">
        <h5 class="card-title">{author.firstName + " " + author.lastName}</h5>
        <h6>{author.position}</h6>
        <p class="card-text">
          {props.lang === "fr" ? author.bioFR : author.bioEN}
        </p>
        <a href={author.prefferedSocialMediaURL} target="_blank" class="btn">
          Get in Touch
        </a>
      </div>
    </div>
  );
}
