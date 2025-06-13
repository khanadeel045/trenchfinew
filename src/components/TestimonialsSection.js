// src/components/TestimonialsSection.js
"use client";

import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "As an investor, getting paid in cryptocurrency has been a game-changer. I no longer have to wait days for bank transfers to clear, and I can access my funds from anywhere in the world!",
      name: "Aurelia Timothy",
      role: "Investor",
      avatar: "/testimonial/aurelia.png",
    },
    {
      quote:
        "I never thought investing could be this easy! Thanks to cryptocurrency, I've been able to diversify my portfolio and see impressive returns in a short amount of time.",
      name: "Lone Kim",
      role: "Influencer",
      avatar: "/testimonial/lone.png",
    },
    {
      quote:
        "Cryptocurrency has truly revolutionized the way I do business. With faster transactions and lower fees, I've saved both time and money, allowing my business to go fully digital.",
      name: "Teddy Bone",
      role: "Manager",
      avatar: "/testimonial/teddy.png",
    },
    {
      quote:
        "Thanks to cryptocurrency, I've been able to send money to my family overseas quickly and affordably. The low transaction fees and near-instant transfers have made a world of difference.",
      name: "Roger Shine",
      role: "Entrepreneur",
      avatar: "/testimonial/roger.png",
    },
    {
      quote:
        "As someone who values financial privacy, cryptocurrency has been a game-changer for me. I can make secure, anonymous transactions without worrying about third-party interference.",
      name: "Marsha Quen",
      role: "Influencer",
      avatar: "/testimonial/marsha.png",
    },
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Starburst behind */}
        <img
          src="/testimonial/starburst.svg"
          className="absolute top-0"
        />


      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 align-end justify-end">
          {/* Heading wrapper: 20% width on md+ */}
          <div className="hidden md:block w-full absolute left-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-0">
              More <span className="text-indigo-500">35M+</span> people <br/>purchased our tokens
            </h2>
          </div>

          <div className="md:hidden ">
            <h2 className="text-3xl sm:text-4xl font-bold mb-0">
              More <span className="text-indigo-500">35M+</span> people <br/>purchased our tokens
            </h2>
          </div>


          {/* Grid wrapper: 80% width on md+ */}
          <div className="w-full md:w-4/5">
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-5 md:grid-rows-3 gap-8">
              {testimonials.map((t, i) => {
                const posClasses = [
                  "md:col-start-2 md:row-start-1",
                  "md:col-start-1 md:row-start-2",
                  "md:col-start-2 md:row-start-2",
                  "md:col-start-1 md:row-start-3",
                  "md:col-start-2 md:row-start-3",
                ][i];

                return (
                  <div
                    key={t.name}
                    className={`relative bg-white rounded-2xl shadow-lg p-6 overflow-hidden ${posClasses}`}
                  >
                    
                    <svg width="369" height="372" viewBox="0 0 369 372" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[-200px] left-[-150px]"> 
                      <g filter="url(#filter0_f_634_516)">
                        <ellipse cx="59.5" cy="61" rx="59.5" ry="61" transform="matrix(-1 0 0 1 244 125)" fill="#9300E3" fill-opacity="0.65" />
                        <path d="M184.5 125.6C151.984 125.6 125.6 152.628 125.6 186C125.6 219.372 151.984 246.4 184.5 246.4C217.016 246.4 243.4 219.372 243.4 186C243.4 152.628 217.016 125.6 184.5 125.6Z" stroke="#D7D0D0" stroke-width="1.2" />
                      </g>
                      <defs>
                        <filter id="filter0_f_634_516" x="0" y="0" width="369" height="372" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                          <feGaussianBlur stdDeviation="62.5" result="effect1_foregroundBlur_634_516" />
                        </filter>
                      </defs>
                    </svg>

                    {/* Gradient overlay */}
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-br from-indigo-300 to-purple-400 mix-blend-overlay opacity-50 rounded-t-2xl " />

                    <p className="relative text-gray-700 mb-6">{t.quote}</p>

                    <div className="relative flex items-center">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{t.name}</h4>
                        <p className="text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
