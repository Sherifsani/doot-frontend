/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import bgDesktopDark from "../assets/images/bg-desktop-dark.jpg";
import bgDesktopLight from "../assets/images/bg-desktop-light.jpg";
import bgMobileDark from "../assets/images/bg-mobile-dark.jpg";
import bgMobileLight from "../assets/images/bg-mobile-light.jpg";
import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const bg = isMobile
    ? isDark
      ? bgMobileDark
      : bgMobileLight
    : isDark
    ? bgDesktopDark
    : bgDesktopLight;
  return (
    <div
      className={` bg-cover bg-center w-full min-h-40`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex items-center justify-between py-6 px-4 max-w-lg mx-auto pt-10">
        <h1 className="text-3xl font-bold tracking-[0.3em] text-white ">
          TODO
        </h1>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setIsDark(!isDark);
          }}
        >
          <img src={isDark ? sun : moon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
