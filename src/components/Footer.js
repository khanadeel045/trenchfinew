// src/components/Footer.js
"use client";

import Image from "next/image";

export default function Footer() {
  const quickLinks = ["About", "Tokens", "Blog & Articles", "Team", "Contact"];
  const supportLinks = ["Terms & Condition", "Feature Request", "Support", "Privacy Policy"];
  const resourceLinks = ["Webinars & Events", "Tools", "Small Business"];
  const socials = [
    { name: "facebook", url: "/icons/facebook.svg" },
    { name: "twitter",  url: "/icons/twitter.svg" },
    { name: "pinterest",url: "/icons/pinterest.svg" },
    { name: "instagram",url: "/icons/instagram.svg" },
    { name: "linkedin", url: "/icons/linkedin.svg" },
  ];

  return (
    <footer className="bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white py-16 relative overflow-hidden">
      {/* Starburst */}
      <div className="absolute -left-20 -bottom-10 w-72 h-72 opacity-20">
        <Image src="/starburst.svg" alt="" fill className="object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding & App */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="SIETE" width={32} height={32} />
            <span className="font-bold text-xl">SIETE</span>
          </div>
          <p className="text-gray-200">
            Social-driven crypto tracking and trading platform with real-time token tracking, live content, and light AI support.
          </p>
          <p className="font-semibold">Download Our App</p>
          <div className="flex items-center space-x-4">
            <a href="#" aria-label="App Store">
              <Image src="/appstore.svg" alt="App Store" width={120} height={40} />
            </a>
            <a href="#" aria-label="Play Store">
              <Image src="/playstore.svg" alt="Play Store" width={120} height={40} />
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
      <div className="mt-12 border-t border-indigo-400 pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socials.map((s) => (
              <a key={s.name} href={`https://${s.name}.com`} aria-label={s.name}>
                <div className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition">
                  <Image src={s.url} alt={s.name} width={20} height={20} />
                </div>
              </a>
            ))}
          </div>
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} SieteTemplate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
