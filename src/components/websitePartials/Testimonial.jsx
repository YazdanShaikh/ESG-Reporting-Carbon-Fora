import { useState, useRef, useEffect } from "react";
import User1 from "../../assets/images/users/user-1.jpg"
import User2 from "../../assets/images/users/user-2.jpg"
import User3 from "../../assets/images/users/user-3.jpg"
import User4 from "../../assets/images/users/user-4.jpg"
import User5 from "../../assets/images/users/user-5.jpg"
import User6 from "../../assets/images/users/user-6.jpg"

const Testimonial = () => {
   const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;

    const handleScroll = () => {
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;

      setShowTopShadow(scrollTop > 0);
      setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 1);
    };

    handleScroll(); // run once on mount
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);
  const testimonials = [
    {
      avatar: User1,
      name: "Emily R.",
      role: "Sustainability Lead",
      text: "I was searching for a new tool, and I can’t believe the difference. Setup was a breeze, and every question I had was answered within minutes. That level of care is rare.",
    },
    {
      avatar: User2,
      name: "Jason M.",
      role: "Product Manager",
      text: "The features are great, but the support from this SaaS stood apart. From onboarding to daily use, it has saved me countless hours. This is exactly the kind of experience modern SaaS should offer: reliable, fast, and stress-free.",
    },
    {
      avatar: User3,
      name: "Sara D.",
      role: "Freelancer",
      text: "This platform completely transforms how I manage my workflow. The intuitive UI, along with a support team that truly cares, makes this one of the best SaaS experiences I’ve had.",
    },
    {
      avatar: User4,
      name: "Mark T.",
      role: "Startup Founder",
      text: "I love how everything just works. No steep learning curves, no messy configurations just a clean, powerful dashboard that delivers on its promises.",
    },
    {
      avatar: User5,
      name: "Lena K.",
      role: "Consultant",
      text: "This SaaS solution is a gem. It adapts perfectly to varied tasks, scales effortlessly, and the team behind it feels more like a partner than a provider.",
    },
    {
      avatar: User6,
      name: "David V.",
      role: "Data Scientist",
      text: "Smooth, fast, and reliable. Our team instantly became more productive, because this platform simplified onboarding and made a huge difference.",
    },
    {
      avatar: User1,
      name: "John Doe",
      role: "Developer",
      text: "Beyond the robust features, what really impressed me was the focus on user feedback. They actually listen and improve constantly. Huge respect for that approach!",
    },
    {
      avatar: User2,
      name: "Aliana Lorel",
      role: "Advisor – Lead Technology",
      text: "As someone who’s tried countless platforms, this one stands out. It’s efficient, intuitive, and gives me confidence every time I log in.",
    },
    {
      avatar: User3,
      name: "Peter Brandson",
      role: "User-Friendly Designer",
      text: "User-friendly, beautifully designed, and efficient. This SaaS made my workflow seamless, with zero friction. Support is always speedy and helpful. Worth every penny.",
    },
  ];



  return (
    <section className="bg-white py-20 px-6">
      <div className=" text-center">
        {/* Section Testimonial */}
        <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block text-sm font-medium border  border-purple-600 px-4 py-1 rounded-full mb-4">
          Testimonials & Reviews
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          “Hear from Our Happy Clients”
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Real stories, real impact: straight from the people making a difference with CarbonFora.
        </p>
        </div>
        <div className="relative">
          {/* Top Shadow */}
          <div
            className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/100 to-white/0 pointer-events-none transition-opacity duration-300 ${
              showTopShadow ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Bottom Shadow */}
          <div
            className={`absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/100 to-white/0 pointer-events-none transition-opacity duration-300 ${
              showBottomShadow ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Scrollable Testimonials */}
          <div
            ref={scrollRef}
            className="scroll-smooth overflow-y-auto snap-y snap-mandatory h-[80vh] scroll-hide"
          >
            <div className="max-w-7xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="bg-[#463CAA] text-white text-left rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex justify-start gap-4 items-center">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full border-2 "
                    />
                    <span>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-purple-200 text-xs">{t.role}</div>
                    </span>
                  </div>
                  <div className="text-[#F79720] text-xl my-2">★★★★★</div>
                  <p className="mb-4 text-sm leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:opacity-90">
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
