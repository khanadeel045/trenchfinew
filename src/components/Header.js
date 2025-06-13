// src/components/Header.js
"use client";

import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    "Home",
    "Trenches",
    "Video Feed",
    "Live Streamx",
    "AI Chat bot",
    "Account",
    "Login",
    "Signup",
  ];

  return (
    <header className="absolute z-[999] left-0 right-0 flex justify-center p-4 bg-transparent">
      <div className="flex items-center max-w-7xl w-full px-4 md:px-0">
        {/* Logo Pill */}
        <div className="flex-none bg-[#8787FB] rounded-full px-8 py-3 shadow-md cursor-pointer">
          <img src="/headerlogo.png" alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Nav Pill */}
        <div className="relative flex-grow flex items-center bg-[#8787FB] rounded-full px-6 py-3 shadow-lg ml-4">
          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-6 text-white font-semibold">
            {navItems.slice(0, 6).map((item) => (
              <li key={item} className="hover:text-gray-200 transition cursor-pointer">
                {item}
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 ml-auto text-white">
            <button aria-label="Notifications" className="hover:text-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 
                         0 0118 14.158V11a6 6 0 00-4-5.659V5
                         a2 2 0 10-4 0v.341C7.67 6.165 
                         6 8.388 6 11v3.159c0 .538
                         -.214 1.055-.595 1.436L4 17h5
                         m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </button>
            <a href="/login" className="hover:text-gray-200 font-semibold transition">
              Log in
            </a>
            <a href="/signup"
               className="bg-white text-black font-bold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              Sign up
            </a>
            <button aria-label="Toggle Dark Mode"
                    className="hover:text-gray-200 transition rounded-full bg-[#F4F4F4] p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#8787FB"
                   viewBox="0 0 24 24" stroke="none">
                <path d="M12 3c.132 0 .263.007.393.02a9 
                         9 0 109.586 9.586A7.5 
                         7.5 0 0112 3z"/>
              </svg>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden ml-auto text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
                   viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}
                   viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>


        </div>
                  {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <ul className="absolute top-15 left-6 w-[90%] bg-[#8787FB] rounded-lg px-6 py-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item} className="text-white font-semibold hover:text-gray-200 transition">
                  <a href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item}
                  </a>
                </li>
              ))}
              {/* Dark toggle in mobile */}
              <li className="pt-2">
                <button aria-label="Toggle Dark Mode"
                        className="hover:text-gray-200 transition rounded-full bg-[#F4F4F4] p-2 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#8787FB"
                       viewBox="0 0 24 24" stroke="none">
                    <path d="M12 3c.132 0 .263.007.393.02a9
                             9 0 109.586 9.586A7.5 
                             7.5 0 0112 3z"/>
                  </svg>
                </button>
              </li>
            </ul>
          )}
      </div>
    </header>
  );
}
