"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { CirclePlus, ArrowUpRightFromSquare } from "@gravity-ui/icons";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = useSession() 
    const router = useRouter();

  const menuItems = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ];
  const handleLogOut = async () => {
    try {
      await signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/auth/login"); 
      setIsMenuOpen(false);
    },
  },
});
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
  // if (isPending) {
  //   return <p>Loading...</p>;
  // }
 console.log("session", session)
  return (
    <header role="banner" className="w-full max-w-7xl mx-auto px-4 py-4 ">
      {/* Semantic landmark containing only one clean <nav> element */}
      <nav aria-label="Main Navigation" className="bg-[#18181b]/90 backdrop-blur-md border border-zinc-800/80 rounded-2xl px-6 py-3 shadow-2xl flex items-center justify-between">
        
        {/* Logo */}
       <Link href="/" className="flex items-center gap-2">
         <Image alt="logo" src="/logo.png" width={100} height={40} />

        </Link>
        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex items-center gap-6">
          <ul className="flex items-center gap-6 list-none m-0 p-0" role="list">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-zinc-300 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1.5 py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Accessible Separator */}
          <div
            className="h-4 w-[1px] bg-zinc-700/80 mx-1"
            role="separator"
            aria-orientation="vertical"
          />

          {/* Authentication Actions */}
          
         <div className="flex items-center gap-3">
  {isPending ? (
    <p>Loading...</p>
  ) : session ? (
    <button
      onClick={handleLogOut}
      className="cursor-pointer rounded-full border border-transparent px-4 py-1 hover:bg-[#FD7100]"
    >
      Log Out
    </button>
  ) : (
    <Link href="/auth/login">
      Sign In
    </Link>
  )}

 <Link
  href="/auth/signup"
  className="inline-flex items-center justify-center bg-gradient-to-r from-[#635BFF] to-[#7970FF] text-white font-medium px-5 py-2 rounded-xl text-sm shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-all duration-200"
>
  <CirclePlus className="w-4 h-4 mr-2" />
  Get Started
</Link>
</div>
          
          
          
        </div>

        {/* Mobile Menu Button Toggle */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            className="text-zinc-300 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
          >
          
              {isMenuOpen ? "X" : "=" }
           
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="sm:hidden mt-2 bg-[#18181b]/95 backdrop-blur-lg border border-zinc-800/80 rounded-2xl p-4 shadow-xl">
          <ul className="flex flex-col gap-3 list-none p-0 m-0" role="list">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  className="w-full text-zinc-200 hover:text-white text-base py-1 block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-3 border-t border-zinc-800" role="separator" />
          <div className="flex flex-col items-center gap-2">
  {isPending ? (
    <p>Loading...</p>
  ) : session ? (
    <button
      onClick={handleLogOut}
      className="cursor-pointer rounded-full border border-transparent px-4 py-1 hover:bg-[#FD7100]"
    >
      Log Out
    </button>
  ) : (
    <Link href="/auth/login"  onClick={() => setIsMenuOpen(false)}>
      Sign In
    </Link>
  )}

  <Link
  href="/auth/signup"
  onClick={() => setIsMenuOpen(false)}
  className="inline-flex items-center justify-center bg-linear-to-r from-[#635BFF] to-[#7970FF] text-white font-medium px-5 py-2 rounded-xl text-sm shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-all duration-200"
>
  <CirclePlus className="w-4 h-4 mr-2" />
  Get Started
</Link>
</div>
        </div>
      )}
    </header>
  );
}