import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    // { label: "Solutions", href: "/index" },
    // { label: "For SMEs", href: "/index" },
    // { label: "For Enterprises", href: "/index" },
    { label: "Carbon Integration", href: "/carbon-integration" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
    // { label: "About CarbonFora", href: "/index" },
    // { label: "Book Demo", href: "/book-demo" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className=" mx-auto flex items-center justify-between px-6 md:px-10 ">
        <Link to="/" className="flex items-center gap-1.5">
        
            <Icon icon="mdi:leaf" className="text-[#4639AA] text-2xl" />
       
          <span className="text-2xl text-nowrap font-bold bg-gradient-to-r from-[#4639AA] to-[#1893A1] text-transparent bg-clip-text">
            CarbonFora
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 text-[16px] font-semibold text-gray-600">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={link.href}
                className="relative hover:text-[#4639AA] transition-colors group"
              >
                {link.label}

                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#4639AA] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/book-demo"
            className="px-6 py-2.5 bg-gradient-to-br from-[#1C8BA2] to-[#633DB7] text-white rounded-full text-sm font-semibold shadow  transition"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white shadow-xl border-t mt-3"
          >
            <ul className="flex flex-col gap-4 px-6 py-6 text-gray-700 font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 border-b border-gray-100 hover:text-[#4639AA]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <Link
                to="/assessment"
                className="mt-4 text-center px-6 py-3 bg-gradient-to-r from-[#4639AA] to-[#633DB7] text-white rounded-full font-semibold"
              >
                Start Free Assessment
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;