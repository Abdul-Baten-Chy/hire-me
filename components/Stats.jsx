"use client";

import Image from "next/image";
import { Briefcase, Persons, CircleQuestion, Star } from "@gravity-ui/icons";
import texture from "../assets/cta-bg.png";

export default function Stats() {
  const stats = [
    {
      value: "50K",
      label: "Active Jobs",
      icon: Briefcase,
    },
    {
      value: "12K",
      label: "Companies",
      icon: Persons,
    },
    {
      value: "2M",
      label: "Job Seekers",
      icon: CircleQuestion,
    },
    {
      value: "97%",
      label: "Satisfaction Rate",
      icon: Star,
    },
  ];

  return (
    <section className="w-full max-w-6xl  mx-auto mt-8 pb-16 px-4 flex flex-col items-center ">
      {/* Globe Background Container */}
      <div className=" w-full max-w-4xl h-[320px] sm:h-[400px] flex flex-col items-center justify-start text-center pt-8 overflow-hidden rounded-t-full">
        

        <div className=" max-w-xl px-4 mt-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-snug">
            Assisting over <span className="font-bold">15,000</span> job seekers
            <br />
            find their dream positions.
          </h2>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4  relative z-20">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#0e0e11]/90 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl hover:border-zinc-700/80 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <IconComponent
                  className="w-5 h-5 text-zinc-400"
                  aria-hidden="true"
                />
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}