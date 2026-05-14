"use client";

import { motion } from "framer-motion";
import Image from "next/image";


import heroImg from "@/assets/HeroSection.jpeg";
import EditorialHoverHero from "./EditorialHoverHero";
import { HomeData } from "@/app/types/HomeContextTypes";
type Props = {
  homeData:HomeData;
};
const Hero = ({homeData}:Props) => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">

      {/* Particles Background */}
      <div className="absolute inset-0 h-full w-full z-0 pointer-events-none">
        {/* <ParticlesBg /> */}
      </div>

      {/* Hero Content */}
      <div
        className="relative z-20 max-w-6xl mx-auto px-6 pt-28 lg:pt-0
        text-center text-white"
      >

        {/* Hero Image */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl max-h-100 mx-auto rounded-xl shadow-2xl overflow-hidden"
        >
          <Image
            src={heroImg}
            alt="Hero Banner"
        
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 text-gray-300 max-w-2xl mx-auto"
        >
          தமிழ் மொழி, இலக்கியம், கலை, வரலாறு மற்றும் பண்பாடு பற்றிய தரமான கட்டுரைகள் மற்றும் ஆய்வுகள்
        </motion.p>

        {/* Editorial Slider */}
        <div>
          <EditorialHoverHero homeData = {homeData} />
        </div>

      </div>
    </section>
  );
};

export default Hero;
