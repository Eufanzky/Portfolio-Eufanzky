import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const TechBall = ({ icon, name }) => {
  return (
    <div className="w-28 h-32 flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-[#fff8eb] flex items-center justify-center shadow-lg hover:shadow-[0_0_25px_rgba(247,37,133,0.4)] transition-all duration-300 hover:scale-110 cursor-pointer">
        <img
          src={icon}
          alt={name}
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="color-secondary font-semibold mt-1">{name}</p>
    </div>
  );
};

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <TechBall key={technology.name} icon={technology.icon} name={technology.name} />
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
