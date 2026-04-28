import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/logo-car.png";
import LogoWhite from "@/assets/images/logo/logo-car.png";
import MobileLogo from "@/assets/images/logo/logo-car.png";
import MobileLogoWhite from "@/assets/images/logo/logo-car.png";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/dashboard">
        {width >= breakpoints.xl ? (
          <img src={isDark ? LogoWhite : MainLogo} alt="" className="w-32" />
        ) : (
          <img src={isDark ? MobileLogoWhite : MobileLogo} alt="" className="w-32" />
        )}
      </Link>
    </div>
  );
};

export default Logo;
