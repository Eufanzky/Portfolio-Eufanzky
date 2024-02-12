import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  figma,
  //companies
  new_relic_logo,
  platzi_logo,
  //projects
  educolab,
  rastreo_satelital,
  rick_and_morty,
  tic_tac_toe,
  clock_time,
  calculator,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Frontend Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },

  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
];

const experiences = [
  {
    title: "Hackathon",
    company_name: "Platzi and New Relic",
    icon: new_relic_logo,
    iconBg: "#383E56",
    date: "May 2023",
    points: [
      "Developing a web applications using Next.js and other related technologies.",
      "Collaborating with a team including frontend developers and backend developers",
    ],
  },
  {
    title: "Platzi Challenge (Satellite)",
    company_name: "Platzi",
    icon: platzi_logo,
    iconBg: "#E6DEDD",
    date: "August 2023",
    points: [
      "Developing a web application using HTML, CSS, JavaScript and other related technologies.",
      "Collaborating with a frontend team.",
      "Implementing responsive design.",
    ],
  },
];

const projects = [
  {
    name: "Educolab",
    description:
      "Hackathon web project that allows users search, upload and watch courses online. Web app created for helping students with career decisions.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "next-js",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: educolab,
    source_code_link: "https://github.com/",
  },
  {
    name: "Rastreo Satelital",
    description:
      "Web application that enables users watch the platzi satellite (platzi-sat-1) and check the coordinates and data that it provides.",
    tags: [
      {
        name: "html",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: rastreo_satelital,
    source_code_link: "https://github.com/",
  },
  {
    name: "Rick And Morty App",
    description:
      "A website that allows users check Rick and Morty's Characters.",
    tags: [
      {
        name: "reactjs",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: rick_and_morty,
    source_code_link: "https://github.com/",
  },
  {
    name: "Tic Tac Toe",
    description:
      "Tic Tac Toe is a game where a player needs to draw a line of 3 figures in order to win the game.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tic_tac_toe,
    source_code_link: "https://github.com/",
  },
  {
    name: "Clock Time",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: clock_time,
    source_code_link: "https://github.com/",
  },
  {
    name: "Calculator",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: calculator,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, projects };
