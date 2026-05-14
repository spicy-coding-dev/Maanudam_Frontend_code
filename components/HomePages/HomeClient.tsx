"use client";

import Hero from "@/components/home/HeroSection";
import HistorySection from "@/components/home/HistorySection";
import IlakkiyamSection from "@/components/home/IlakkiyamSection";
import PanpaaduSection from "@/components/home/PanpaaduSection";
import SamugamSection from "@/components/home/SamugamSection";
import SulaliyalSection from "@/components/home/SulaliyalSection";
import ThalayangamSection from "@/components/home/Thalayangam";

export default function HomeClient({ homeData }: any) {
  return (
    <>
      <Hero homeData = {homeData} />
      <HistorySection homeData={homeData} />
      <SamugamSection homeData={homeData} />
      <IlakkiyamSection homeData={homeData} />
      <PanpaaduSection homeData={homeData} />
      <SulaliyalSection homeData={homeData} />
      <ThalayangamSection homeData={homeData} />
    </>
  );
}
