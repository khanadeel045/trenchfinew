'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Trenches', href: '/comingsoon' },
    { label: 'Video Feed', href: '/videofeed' },
    { label: 'Live Streamx', href: '/comingsoon' },
    { label: 'Features', href: '/comingsoon' },
    { label: 'AI Chat bot', href: '/comingsoon' },
    { label: 'Launchpad', href: '/comingsoon' },
    { label: 'Account', href: '/account' },
  ];

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch('/api/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkLogin();
  }, [pathname]);

  return (
    <header className="absolute z-[999] left-0 right-0 flex justify-center p-4 bg-transparent">
      <div className="flex items-center max-w-7xl w-full px-4 md:px-0">
      <Image
        src="/headerlogo.png"
        alt="Logo"
        width={128} // apni desired width
        height={32} // apni desired height (h-8 = 32px)
      />

        {/* Nav Pill */}
        <div className="relative flex-grow flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 shadow-lg ml-4">
          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-6 text-white font-semibold">
            {navItems.map(({ label, href }) => (
              <li key={label} className="hover:text-gray-200 transition cursor-pointer">
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 ml-auto text-white">
            {authChecked && (
              isLoggedIn ? (
                <span className="font-semibold"><a href="account">👋 {user?.name}</a></span>
              ) : (
                <>
                  <a href="/login" className="hover:text-gray-200 font-semibold transition">
                    Log in
                  </a>
                  <a
                    href="/signup"
                    className="bg-white text-black font-bold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
                  >
                    Join Beta
                  </a>
                </>
              )
            )}

          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden ml-auto text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <ul className="absolute top-15 left-6 w-[90%] bg-[#061524] rounded-lg px-6 py-4 flex flex-col space-y-2">
            {navItems.map(({ label, href }) => (
              <li key={label} className="text-white font-semibold hover:text-gray-200 transition">
                <a href={href}>{label}</a>
              </li>
            ))}
            {authChecked && (
              isLoggedIn ? (
                <li className="text-white font-semibold"><a href="#">👋 {user?.name}</a></li>
              ) : (
                <>
                  <li>
                    <a href="/login" className="text-white font-semibold hover:text-gray-200 transition">Log in</a>
                  </li>
                  <li>
                    <a
                      href="/signup"
                      className="bg-white text-black font-bold px-4 py-2 rounded-full shadow hover:bg-gray-100 transition block text-center"
                    >
                      Beta
                    </a>
                  </li>
                </>
              )
            )}

          </ul>
        )}
      </div>
    </header>
  );
}
