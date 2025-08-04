"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const navbar = () => {
  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };

  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  return (
    <>
      <nav
        className="w-full fixed left-0 top-0 pl-0 pr-5 lg:pr-8 xl:pr-[8%] py-1 flex justify-between items-center z-10"
        style={{ margin: 0, left: 0, width: '100vw' }}
      >
        <a href="#top" className="pl-5 lg:pl-8 xl:pl-[8%]">
          <Image
            src={assets.logo}
            alt="logo"
            className="w-28 cursor-pointer mr-14"
          />
        </a>
        <ul className="hidden lg:flex gap-8 rounded-full px-12 py-1 bg-white shadow-md bg-opacity-50">
          <li>
            {" "}
            <a className="font-Ovo" href="#top">
              Home
            </a>{" "}
          </li>
          <li>
            {" "}
            <a className="font-Ovo" href="#about">
              About
            </a>{" "}
          </li>
          <li>
            {" "}
            <a className="font-Ovo" href="#services">
              Services
            </a>{" "}
          </li>
          <li>
            {" "}
            <a className="font-Ovo" href="#recent-projects">
              Projects
            </a>
          </li>
          <li>
            {" "}
            <a className="font-Ovo" href="#contact">
              Contact
            </a>{" "}
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <button className="hover:cursor-pointer">
            <Image src={assets.moon_icon} alt="Dark mode toggle" className="w-6" />
          </button>

          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 border border-gray-500 rounded-full px-4 py-2 font-Ovo"
          >
            Contact{" "}
            <Image src={assets.arrow_icon} alt="arrow" className="w-3" />
          </a>

          <button className="block md:hidden ml-3" onClick={openMenu}>
            <Image src={assets.menu_black} alt="Menu" className="w-6" />
          </button>
        </div>

        {/* ----------------- Mobile Menu ------------------*/}

        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64
                           top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500"
        >
          <div className="absolute top-7 right-7" onClick={closeMenu}>
            <Image
              src={assets.close_black}
              alt="Close menu"
              className="w-6 cursor-pointer"
            />
          </div>

          <li>
            {" "}
            <a className="font-Ovo" onClick={closeMenu} href="#top">
              Home
            </a>{" "}
          </li>
          <li>
            {" "}
            <a className="font-Ovo" onClick={closeMenu} href="#about">
              About
            </a>{" "}
          </li>
          <li>
            {" "}
            <a className="font-Ovo" onClick={closeMenu} href="#services">
              Services
            </a>{" "}
          </li>
          <li>
            {" "}
            <a className="font-Ovo" onClick={closeMenu} href="#recent-projects">
              Projects
            </a>
          </li>
          <li>
            {" "}
            <a className="font-Ovo" onClick={closeMenu} href="#contact">
              Contact
            </a>{" "}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default navbar;
