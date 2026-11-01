"use client";
import Image from "next/image";
import { Magnifier, LocationArrow, Briefcase } from "@gravity-ui/icons";


export default function HeroSection() {
 

  const trendingPositions = [
    { label: "Product Designer", href: "/jobs?query=product-designer" },
    { label: "AI Engineering", href: "/jobs?query=ai-engineering" },
    { label: "Dev-ops Engineer", href: "/jobs?query=dev-ops-engineer" },
  ];

 

  return (
    <section className=" w-full max-w-6xl mx-auto pt-12 pb-8 flex flex-col items-center justify-center text-center px-4 ">
    

      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-md mb-8">
        <Briefcase className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
        <span className="font-semibold text-white">50,000+</span>
        <span className="text-zinc-400 uppercase tracking-wider text-[10px]">
          New Jobs This Month
        </span>
      </div>

      
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
        Find Your Dream Job Today
      </h1>

     
      <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
        HireLoop connects top talent with world-class companies. Browse thousands of
        curated opportunities and land your next role – faster.
      </p>

      
      <form
       
        role="search"
        aria-label="Job Search"
        className="mt-8 w-full max-w-2xl bg-[#121215]/90 border border-zinc-800 rounded-2xl p-1.5 sm:p-2 flex flex-col sm:flex-row items-center gap-2 shadow-2xl focus-within:border-zinc-700 transition-all"
      >
        {/* Job Title Input */}
        <div className="flex items-center gap-2.5 px-3 py-2 w-full sm:flex-1">
          <Magnifier className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
          <input
            type="text"
          
           
            placeholder="Job title, skill or company"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            aria-label="Job title, skill or company"
          />
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-[1px] bg-zinc-800" role="separator" />

        {/* Location Input */}
        <div className="flex items-center gap-2.5 px-3 py-2 w-full sm:flex-1">
          <LocationArrow className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
          <input
            type="text"
           
            placeholder="Location or Remote"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            aria-label="Location or Remote"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          aria-label="Submit Job Search"
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-3 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0 flex items-center justify-center"
        >
          <Magnifier className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>

     
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
        <span className="text-zinc-500 mr-1">Trending Position</span>
        {trendingPositions.map((pos) => (
          <a
            key={pos.label}
            href={pos.href}
            className="px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {pos.label}
          </a>
        ))}
      </div>
    </section>
  );
}