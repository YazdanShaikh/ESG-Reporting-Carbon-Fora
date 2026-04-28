import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Play from "../../assets/images/auth/play.png";
import Apps from "../../assets/images/auth/app.png";
import Logo from "../../assets/images/logo/logo-car.png";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "CarbonFora Platform", href: "#" },
      { label: "Impact Exchange", href: "#" },
      { label: "CarbonFora App", href: "#" },
      { label: "Launchpad ESG Platform", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "ESG Guide", href: "#" },
      { label: "Climate Reports", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Case Studies", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Contact", href: "mailto:info@carbonfora.com" },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-[#4639AA] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={Logo} alt="CarbonFora" className="w-[220px]" />
              
            </div>

            <p className="text-white/80 text-sm leading-relaxed">
              CarbonFora Launchpad helps businesses measure, manage,
              and reduce carbon emissions through powerful ESG tools.
            </p>

            <p className="text-sm mt-4 text-white/80">
              info@carbonfora.com
            </p>

            {/* App Buttons */}
            <div className="flex gap-3 items-center mt-5">
              <a
                href="https://play.google.com/store/apps/details?id=com.carbonfora.carbon_fora"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Play} alt="Play Store" className="w-28 " />
              </a>

              <a
                href="https://apps.apple.com/us/app/carbonfora-climate-rewards/id6752239906"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Apps} alt="App Store" className="w-28 " />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h4 className="font-semibold text-lg mb-4 text-white">
                {section.title}
              </h4>

              <ul className="space-y-2 text-sm text-white/80">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="hover:text-white transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} CarbonFora. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-200 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <Instagram size={20} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;