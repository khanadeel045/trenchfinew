'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); // loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true); // start loader

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || 'Kuch ghalat ho gaya');
        setIsLoading(false); // stop loader on error
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setErrorMsg('Network error');
      setIsLoading(false); // stop loader on error
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center px-6 lg:px-12 py-8">
        {/* Logo */}
        <div className="mb-6">
          <img src="/logo.png" alt="Logo" />
        </div>

        <h2 className="text-3xl font-semibold mb-2 text-gray-800">Welcome Back 👋</h2>
        <p className="text-gray-500 mb-8 text-center">
          Today is a new day. It’s your day. You shape it.<br />
          Sign in to start managing your projects.
        </p>

        {errorMsg && (
          <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
            disabled={isLoading} // disable input while loading
          />

          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
            disabled={isLoading} // disable input while loading
          />
          <div className="text-right mb-6">
            <a
              href="/forgot-password"
              className={`text-sm text-[rgba(135,135,251,1)]  hover:underline ${
                isLoading ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full flex items-center justify-center
              bg-[rgba(135,135,251,1)]  text-white py-2 rounded
              hover:bg-[rgb(120, 120, 255)] transition
              ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}
            `}
          >
            {isLoading ? (
              <>
                {/* Simple Tailwind spinner */}
                <div className="w-5 h-5 border-2 border-t-white border-gray-200 rounded-full animate-spin mr-2"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center w-full max-w-sm my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <button
            className={`
              w-full flex items-center justify-center border border-gray-300 rounded py-2
              hover:bg-gray-100 transition
              ${isLoading ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            <span className="ml-2 text-gray-700">Sign in with Google</span>
          </button>
          <button
            className={`
              w-full flex items-center justify-center border border-gray-300 rounded py-2
              hover:bg-gray-100 transition
              ${isLoading ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
            <span className="ml-2 text-gray-700">Sign in with Facebook</span>
          </button>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          Don’t have an account?{' '}
          <a
            href="/signup"
            className={`text-purple-600 hover:underline ${
              isLoading ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Sign up
          </a>
        </p>

        <p className="mt-8 text-gray-400 text-xs">© 2023 ALL RIGHTS RESERVED</p>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 flex-col items-center justify-center relative">
        
        <div className="absolute top-0 right-0">
          <svg width="594" height="554" viewBox="0 0 594 554" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_194_722)">
              <ellipse cx="494" cy="77" rx="176" ry="159" fill="#7C3CB4" fillOpacity="0.61" />
            </g>
            <defs>
              <filter
                id="filter0_f_194_722"
                x="0.399994"
                y="-399.6"
                width="987.2"
                height="953.2"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="158.8" result="effect1_foregroundBlur_194_722" />
              </filter>
            </defs>
          </svg>
        </div>
        <div>
          <img src="/logo.svg" alt="Logo" />
        </div>
      </div>
    </div>
  );
}
