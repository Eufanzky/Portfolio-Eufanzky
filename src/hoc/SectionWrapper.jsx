import { motion, MotionConfig } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

export const SectionWrapper = (Component, idName) =>
  function HOC() {
    // reducedMotion="user": skip transform animations for visitors who ask
    // for less motion. It lives here, not in App, so Framer Motion stays out
    // of the first-load chunks (only the lazy sections use it).
    return (
      <MotionConfig reducedMotion="user">
        <motion.section
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        >
          <span className="hash-span" id={idName}>
            &nbsp;
          </span>
          <Component />
        </motion.section>
      </MotionConfig>
    );
  };
