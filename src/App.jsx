import { lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { useIsMobile } from "./hooks/useIsMobile";

const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const Contact = lazy(() => import("./components/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  // No Three.js on phones: the Stars canvas is desktop only, like the Hero
  // and Contact canvases.
  const isMobile = useIsMobile();

  return (
    <div className="relative z-0 bg-primary">
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className="relative z-0">
          <Contact />
          {!isMobile && <StarsCanvas />}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
