export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  bioEN: string;
  bioFR: string;
  prefferedSocialMediaURL: string;
}

const AUTHORS: Record<string, Author> = {
  akram_mecheri: {
    id: "akram_mecheri",
    firstName: "Akram",
    lastName: "MECHERI",
    position: "Technical Leader | Blogger | Freelancer",
    prefferedSocialMediaURL:
      "https://www.linkedin.com/in/techlead-java-angular/",
    bioEN:
      "As a passionate technical leader, I am skilled in FullStack Java development and have a strong background in DevOps, " +
      "Cloud, and Kubernetes. I have a track record of delivering high-quality software, and I am always seeking to improve " +
      "my knowledge and skills through continuing education and hands-on experience.",
    bioFR:
      "En tant que leader technique passionné, je suis expert en développement FullStack Java et j'ai une solide expérience en DevOps, " +
      "Cloud et Kubernetes. J'ai déjà démontré ma capacité à livrer du logiciel de haute qualité et je suis constamment à la recherche de moyens " +
      "de perfectionner mes connaissances et compétences grâce à la formation continue et à l'expérience pratique.",
  },
};

export function getAuthorByID(id: string): Author {
  return AUTHORS[id];
}
