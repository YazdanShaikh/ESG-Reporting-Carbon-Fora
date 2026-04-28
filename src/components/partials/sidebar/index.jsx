import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import { menuItems } from "@/constant/data";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import { Icon } from "@iconify/react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "@/store/slice/auth"; // adjust path if needed

const Sidebar = () => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);

  const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = () => {
  dispatch(clearAuth());
  localStorage.clear(); // or remove specific keys
  navigate("/");
};

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState(false);

  // semi dark option
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={`sidebar-wrapper  bg-gradient-to-bl from-[#4639AA] via-[#5a4fd6] to-[#1893A1] dark:bg-slate-800     ${
          collapsed ? "w-[72px] close_sidebar" : "w-[248px]"
        }
      ${menuHover ? "sidebar-hovered" : ""}
      ${skin === "bordered" ? "border-r border-slate-200 dark:border-slate-700" : "shadow-base"}
      `}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >
        <SidebarLogo menuHover={menuHover} />
        <div
          className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
            scroll ? " opacity-100" : " opacity-0"
          }`}
        ></div>

        <SimpleBar
          className="sidebar-menu p-4 h-[calc(96%-120px)]"
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          <Navmenu menus={menuItems} />
          
        </SimpleBar>
        <div className="p-4 border-t border-white/20">
          <button
          onClick={handleLogout}
            className="
              w-full flex items-center justify-center gap-2
              py-2 rounded-md
              bg-white
              text-[#4639AA] font-semibold
              hover:shadow-lg
              transition-all duration-200
              group
            "
          >

            <Icon
              icon="lucide:power"
              className="text-2xl text-red-500 group-hover:rotate-12 transition bg-red-50 rounded-full p-1 border border-red-400"
            />
            {!collapsed && <span className="text-transparent text-lg bg-clip-text bg-gradient-to-br from-[#4834AA] to-[#1893A1]">Logout</span>}
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default Sidebar;
