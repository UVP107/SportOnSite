"use client";
import { FiFastForward } from "react-icons/fi";
import Button from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="container mx-auto min-h-screen flex relative overflow-hidden px-4"
    >
      <div className="relative self-center w-full grid lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute left-0 -top-20 pointer-events-none"
        >
          <Image
            src="/images/img-basketball.png"
            width={432}
            height={423}
            alt="image sporton"
            className="grayscale opacity-50 lg:opacity-100"
          />
        </motion.div>

        <div className="relative z-10 lg:ml-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary italic font-medium"
          >
            Friday Sale, 50%
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-extrabold text-5xl md:text-7xl lg:text-[5.9375rem] italic bg-linear-to-b leading-tight from-black to-[#979797] bg-clip-text text-transparent"
          >
            WEAR YOUR <br /> TOP-QUALITY <br /> SPORTSWEAR
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full lg:w-3/4 mt-6 lg:mt-10 leading-loose text-gray-700"
          >
            Engineered for endurance and designed for speed. Experience gear
            that moves as fast as you do. Premium fabrics. Unmatched comfort.
            Limitless motion.
          </motion.p>

          <div className="flex flex-wrap gap-5 mt-10 lg:mt-14">
            <Button className="flex items-center gap-2">
              Explore More <FiFastForward />
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              Watch Video
              <Image
                src="/images/icon-play-video.svg"
                alt="icon"
                width={29}
                height={29}
              />
            </Button>
          </div>
        </div>

        {/* Hero Image Right */}
        <div className="hidden lg:block relative h-full">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -right-10 top-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/img-hero.png"
              width={700}
              height={950}
              alt="hero"
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none -z-10"
      >
        <Image
          src="/images/img-ornament-hero.svg"
          width={420}
          height={420}
          alt="ornament"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
