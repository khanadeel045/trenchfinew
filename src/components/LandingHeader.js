'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-3/4">
        
        {/* Mobile Logo - Only visible on mobile */}
        <div className="md:hidden flex items-center">
          <Image
            src="/logo.png"
            alt="SIETE Logo"
            width={120}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </div>

        {/* Desktop Navigation - Hidden on mobile, no logo */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          <a 
            href="/" 
            className="text-white hover:text-white/80 transition-colors duration-300 font-medium text-lg"
          >
            Home
          </a>
          <a 
            href="/features" 
            className="text-white hover:text-white/80 transition-colors duration-300 font-medium text-lg"
          >
            Features
          </a>          
          <a 
            href="/videofeed" 
            className="text-white hover:text-white/80 transition-colors duration-300 font-medium text-lg"
          >
            Video Feed
          </a>
          <a 
            href="/launchpad" 
            className="text-white hover:text-white/80 transition-colors duration-300 font-medium text-lg"
          >
            Launchpad
          </a>
          <a 
            href="/account" 
            className="text-white hover:text-white/80 transition-colors duration-300 font-medium text-lg"
          >
            Account
          </a>
        </nav>

        {/* Desktop Action Buttons - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <button
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 lg:px-6 py-2.5 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 cursor-pointer text-sm lg:text-base"
            onClick={() => window.location.href = '/signup'}
          >
            Join Beta
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-2.5 rounded-full font-semibold transition-all duration-300 cursor-pointer text-sm lg:text-base"
            onClick={() => window.location.href = '/login'}
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <svg 
            className={`w-6 h-6 text-white transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu Overlay - Only visible when menu is open */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              
              {/* Mobile Navigation Links */}
              <nav className="space-y-4">
                <a 
                  href="/" 
                  className="block text-white hover:text-white/80 transition-colors duration-300 font-medium text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="/features" 
                  className="block text-white hover:text-white/80 transition-colors duration-300 font-medium text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="/launchpad" 
                  className="block text-white hover:text-white/80 transition-colors duration-300 font-medium text-lg py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Launchpad
                </a>
              </nav>

              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                  onClick={() => {
                    window.location.href = '/signup';
                    setIsMenuOpen(false);
                  }}
                >
                  Join Beta
                </button>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                  onClick={() => {
                    window.location.href = '/login';
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;