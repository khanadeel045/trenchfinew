// Basic Page Template
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Landing from '@/components/Landing';

export default function comingsoon() {
  return (
    <>
      <Header />


    <div className="min-h-screen relative overflow-hidden" style={{
      background: `
        radial-gradient(ellipse at top right, #FFB037 0%, transparent 50%),
        radial-gradient(ellipse at center, #1BD6A2 0%, transparent 40%),
        radial-gradient(ellipse at top right, #FF5C33  0%, transparent 40%),
        linear-gradient(135deg, #0B1F3F 20%, #1a3a5c 100%)
      `
    }}>
      {/* Background with exact color positioning */}
      <div className="absolute inset-0">
        {/* Flowing curves matching reference image */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice">
            
            {/* Large flowing curve from top left to center */}
            <path 
              d="M0 100 Q300 200 600 300 Q900 400 1200 300 Q1500 200 1920 400"
              stroke="rgba(27, 214, 162, 0.4)" 
              strokeWidth="3" 
              fill="none"
            />
            
            {/* Bottom flowing curve */}
            <path 
              d="M0 800 Q400 600 800 700 Q1200 800 1920 600"
              stroke="rgba(255, 176, 55, 0.4)" 
              strokeWidth="3" 
              fill="none"
            />
            
            {/* Additional accent curves */}
            <path 
              d="M200 0 Q500 100 800 50 Q1100 0 1400 100"
              stroke="rgba(255, 92, 51, 0.3)" 
              strokeWidth="2" 
              fill="none"
            />
            
            <path 
              d="M0 1080 Q300 980 600 1000 Q900 1020 1200 980 Q1500 940 1920 1000"
              stroke="rgba(27, 214, 162, 0.3)" 
              strokeWidth="2" 
              fill="none"
            />
            
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            
            {/* Logo and Brand */}
            <div>
              <div className="flex items-center justify-center">
                <p className='text-7xl text-white'>Coming Soon ⏳</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}