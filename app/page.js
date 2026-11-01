import HeroSection from "@/components/Hero";
import Stats from "@/components/Stats";
import { Button } from "@heroui/react";
import Image from "next/image";
import globe from "../assets/globe.png";

export default function Home() {
  return (
    <div className=" relative w-full h-full  ">
    <div className="absolute inset-0 -z-10 mouse-events-none">
      <Image
        src={globe}
        alt="Hero Background"
        fill
        className="object-cover w-full h-full"
        quality={100}
        priority
      />
    </div>
    <HeroSection />
    <Stats />
    
    </div>
  );
}
