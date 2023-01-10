export type AuthorCardProps = {
  id: string;
  lang: string;
};

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  bioEN: string;
  bioFR: string;
}

const authors: Array<Author> = [
  {
    id: "akram_mecheri",
    firstName: "Akram",
    lastName: "MECHERI",
    position: "Technical Leader | Blogger | Freelancer",
    bioEN:
      "As a passionate technical leader, I am skilled in FullStack Java development and have a strong background in DevOps, " +
      "Cloud, and Kubernetes. I have a track record of delivering high-quality software, and I am always seeking to improve " +
      "my knowledge and skills through continuing education and hands-on experience.",
    bioFR:
      "En tant que leader technique passionné, je suis expert en développement FullStack Java et j'ai une solide expérience en DevOps, " +
      "Cloud et Kubernetes. J'ai déjà démontré ma capacité à livrer du logiciel de haute qualité et je suis constamment à la recherche de moyens " +
      "de perfectionner mes connaissances et compétences grâce à la formation continue et à l'expérience pratique.",
  },
];

export default function AuthorCard(props: AuthorCardProps) {
  const author: Author = authors.find((a) => a.id === props.id);
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
