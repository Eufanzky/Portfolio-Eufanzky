import {
  mobile,
  backend,
  creator,
  web,

  //technologies
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  figma,
  nextjs,
  python,

  //companies
  new_relic_logo,
  platzi_logo,
  nasa_space_apps_challenge_logo,
  delve_logo,

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
  {
    title: "Self Taught Dev",
    icon: mobile,
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
    name: "NextJS",
    icon: nextjs,
  },
  {
    name: "Python",
    icon: python,
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
    name: "Git",
    icon: git,
  },
  {
    name: "Figma",
    icon: figma,
  },
];

const experiences = [
  {
    title: "Course Project",
    company_name: "Delve Education",
    icon: delve_logo,
    iconBg: "#383E56",
    date: "Nov 2024",
    points: [
      "Developing a web and android application using React Native",
      "Using computer vision with python to detect recharge cards and convert them to text",
      "Collaborating with a backend developer",
    ],
  },
  {
    title: "Hackathon",
    company_name: "Nasa Spaces Apss Challenge",
    icon: nasa_space_apps_challenge_logo,
    iconBg: "#383E56",
    date: "Oct 2024",
    points: [
      "Developing a web applications using React.js to help SDG in education area.",
      "Collaborating with a team of UX designers and frontend developers",
    ],
  },
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
  {
    title: "Platzi Challenge",
    company_name: "Platzi",
    icon: platzi_logo,
    iconBg: "#E6DEDD",
    date: "September 2021",
    points: [
      "Developing a web applications using HTML, CSS, JavaScript and other related technologies.",
      "Building challenge apps to learn more about web development.",
      "Implementing responsive design.",
    ],
  },
];

export { services, technologies, experiences };
