// src/components/Footer.js
"use client";

import Image from "next/image";

export default function Footer() {
  const quickLinks = ["About", "Tokens", "Blog & Articles", "Team", "Contact"];
  const supportLinks = ["Terms & Condition", "Feature Request", "Support", "Privacy Policy"];
  const resourceLinks = ["Webinars & Events", "Tools", "Small Business"];
  const socials = [
    { name: "facebook", url: "/footer/facebook.svg" },
    { name: "twitter", url: "/footer/twitter.svg" },
    { name: "pinterest", url: "/footer/pinterest.svg" },
    { name: "instagram", url: "/footer/instagram.svg" },
    { name: "linkedin", url: "/footer/linkedin.svg" },
  ];

  return (
    <footer className=" bg-[linear-gradient(to_right,_#8787FB,_#505095)] text-white pt-16 pb-8 relative overflow-hidden">

      <img src={"footer/bg.svg"} className="absolute right-0 top-0 w-[400px]" />


      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[40%_20%_20%_20%] gap-8">
        {/* Branding & App */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image src="/headerlogo.png" alt="SIETE" width={32} height={32} />
            <span className="font-bold text-xl">SIETE</span>
          </div>
          <p className="text-white-200">
            Social-driven crypto tracking and trading <br />  platform with real-time token tracking, live<br />  content, and light AI support.
          </p>
          <p className="font-semibold">Download Our App</p>
          <div className="flex items-center space-x-4">
            <a href="#" aria-label="App Store">
              <div className="flex gap-2">
                <Image src="/footer/apple.svg" alt="App Store" width={30} height={40} /> Apple Store
              </div>
            </a>
            <a href="#" aria-label="Play Store">
              <div className="flex gap-2">
                <Image src="/footer/playstore.svg" alt="Play Store" width={30} height={40} />Google Store
              </div>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Link</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link}>
                <a
                  href={"/" + link.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}
                  className="text-gray-200 hover:text-white transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            {supportLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-gray-200 hover:text-white transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            {resourceLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-gray-200 hover:text-white transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social + Copyright */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center pt-8">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socials.map((s) => (
              <a key={s.name} href={`https://${s.name}.com`} aria-label={s.name}>
                <div className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-40 transition border border-white w-[30px] h-[30px] flex justify-center hover:bg-[#1A80EA] hover:border-[#1A80EA]">
                  <img src={s.url} alt={s.name} width={"15px"} />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white-500  mt-8 mb-8"></div>

      <p className="text-white-300 text-sm text-center">
        &copy;2025 Siete. All rights reserved.
      </p>

<img src={"/footer/circle.svg"} className="absolute bottom-0" />

    </footer>
  );
}
