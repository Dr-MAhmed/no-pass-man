"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <nav className="w-full h-16 bg-purple-600 flex justify-between items-center px-8 md:px-20 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-white">
        <span className="text-purple-950"> &lt;</span>
        <span className="text-white"> No Pass </span>
        <span className="text-purple-950">/&gt;</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 items-center">
        <ul className="flex gap-6 text-lg font-semibold text-white">
          <li>
            <Link href="/" className="hover:text-purple-200 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-purple-200 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-purple-200 transition">
              Services
            </Link>
          </li>
        </ul>

        {/* Sign-up Button */}
        <button
          className="px-4 py-2 border border-white rounded-md font-semibold text-white hover:bg-white hover:text-purple-600 transition duration-300"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
