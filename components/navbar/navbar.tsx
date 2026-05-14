"use client";

import MenuBar from "./menuBar";
import TopBar from "./TopBar";



export default function Navbar() {
  return (
    <>
      <header className="w-full shadow-sm hidden md:block">
        <TopBar />
        {/* <LogoBar /> */}
      </header>

      <MenuBar />
    </>
  );
}
