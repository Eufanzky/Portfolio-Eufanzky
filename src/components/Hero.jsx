import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto hero-background-animation">
      <div id="retrobg" className="absolute brightness-50">
        <div id="retrobg-sky">
          <div id="retrobg-stars">
            <div
              className="retrobg-star"
              style={{left:  "5%", top: "55%", transform: "scale( 2 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left:  "7%", top:  "5%", transform: "scale( 2 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "10%", top: "45%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "12%", top: "35%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "15%", top: "39%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "20%", top: "10%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "35%", top: "50%", transform: "scale( 2 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "40%", top: "16%", transform: "scale( 2 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "43%", top: "28%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "45%", top: "30%", transform: "scale( 3 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "55%", top: "18%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "60%", top: "23%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "62%", top: "44%", transform: "scale( 2 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "67%", top: "27%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "75%", top: "10%", transform: "scale( 2 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "80%", top: "25%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "83%", top: "57%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "90%", top: "29%", transform: "scale( 2 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "95%", top:  "5%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "96%", top: "72%", transform: "scale( 1 )"}}
            ></div>
            <div
              className="retrobg-star"
              style={{left: "98%", top: "70%", transform: "scale( 3 )"}}
            ></div>
          </div>
          <div id="retrobg-sunWrap">
            <div id="retrobg-sun"></div>
          </div>
          <div id="retrobg-mountains">
            <div id="retrobg-mountains-left" className="retrobg-mountain"></div>
            <div id="retrobg-mountains-right" className="retrobg-mountain"></div>
          </div>
          <div id="retrobg-cityWrap">
            <div id="retrobg-city">
              <div
                style={{left:  "4.0%", height: "20%", width: "3.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left:  "6.0%", height: "50%", width: "1.5%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left:  "8.0%", height: "25%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "12.0%", height: "30%", width: "3.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "13.0%", height: "55%", width: "3.0%"}}
                className="retrobg-building retrobg-antenna"
              ></div>
              <div
                style={{left: "17.0%", height: "20%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "18.5%", height: "70%", width: "1.5%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "20.0%", height: "30%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "21.5%", height: "80%", width: "2.0%"}}
                className="retrobg-building retrobg-antenna"
              ></div>
              <div
                style={{left: "25.0%", height: "60%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "28.0%", height: "40%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "30.0%", height: "70%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "35.0%", height: "65%", width: "4.0%"}}
                className="retrobg-building retrobg-antenna"
              ></div>
              <div
                style={{left: "38.0%", height: "40%", width: "3.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "42.0%", height: "60%", width: "2.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "43.0%", height: "85%", width: "4.0%"}}
                className="retrobg-building retrobg-antenna"
              ></div>
              <div
                style={{left: "45.0%", height: "40%", width: "3.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "48.0%", height: "25%", width: "3.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "50.0%", height: "80%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "52.0%", height: "32%", width: "5.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "55.0%", height: "55%", width: "3.0%"}}
                className="retrobg-building retrobg-antenna"
              ></div>
              <div
                style={{left: "58.0%", height: "45%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "61.0%", height: "90%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "66.0%", height: "99%", width: "4.0%"}}
                className="retrobg-building retrobg-antenna"
              ></div>
              <div
                style={{left: "69.0%", height: "30%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "73.5%", height: "90%", width: "2.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "72.0%", height: "70%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "75.0%", height: "60%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "80.0%", height: "40%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "83.0%", height: "70%", width: "4.0%"}}
                className="retrobg-building retrobg-antenna"
              ></div>
              <div
                style={{left: "87.0%", height: "60%", width: "3.0%"}}
                className="retrobg-building retrobg-antenna"
              ></div>
              <div
                style={{left: "93.0%", height: "50%", width: "3.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "91.0%", height: "30%", width: "4.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "94.0%", height: "20%", width: "3.0%"}}
                className="retrobg-building"
              ></div>
              <div
                style={{left: "98.0%", height: "35%", width: "2.0%"}}
                className="retrobg-building"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div id="retrobg-ground" className="absolute brightness-50">
        <div id="retrobg-linesWrap">
          <div id="retrobg-lines">
            <div id="retrobg-vlines">
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
              <div className="retrobg-vline"></div>
            </div>
            <div id="retrobg-hlines">
              <div className="retrobg-hline"></div>
              <div className="retrobg-hline"></div>
              <div className="retrobg-hline"></div>
              <div className="retrobg-hline"></div>
              <div className="retrobg-hline"></div>
              <div className="retrobg-hline"></div>
              <div className="retrobg-hline"></div>
              <div className="retrobg-hline"></div>
            </div>
          </div>
        </div>
        <div id="retrobg-groundShadow"></div>
      </div>
      

      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#F72585]" />
          <div className="w-1 sm:h-80 h-40 pink-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}`}>
            Hi, I'm <span className="text-[#F72585]">Eugenio</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            A passionate web developer, <br className="sm:block hidden" /> up
            for a new challenge !!!
          </p>
        </div>
      </div>
      <ComputersCanvas />
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[#F72585] flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-[#F72585] mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
