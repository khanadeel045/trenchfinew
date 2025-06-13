// src/components/SecurePlatformSection.js
"use client";

import Image from "next/image";
import cardBg from "/SecurePlatformSection/card.png";
import chartImg from "/SecurePlatformSection/Chart.png";

export default function SecurePlatformSection() {
  const stats = [
    { label: "Total Transactions", value: "249 K+" },
    { label: "Discord Members",   value: "496 K+" },
    { label: "Total Global Node",  value: "753 M+" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <img
        src="/SecurePlatformSection/sidelines.svg"
        alt="Sidelines"
        className="absolute top-1/2  transform -translate-y-2/5"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
          The most <span className="text-[#8787FB]">secure</span> trading<br/>platform
        </h2>

        {/* Intro paragraph */}
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed w-full lg:w-3/5 mb-12">
          Trusted by over 100,000 traders & creators worldwide, our platform thrives on transparency, 
          community, and real-time insights. With users across 30+ countries and over a million token views 
          tracked, we’ve become a go-to hub for discovering...
        </p>

        {/* 20/80 two-column layout */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">



          {/* Left stats column (20% on lg) */}
          <div className="w-full lg:flex-none lg:w-1/5 h-auto lg:h-[600px] flex flex-col gap-8 lg:gap-[50px] justify-center">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {s.value}
                </div>
                <div className="mt-1 text-gray-500">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Right chart column (80% on lg) */}
          <div className="w-full lg:flex-grow lg:w-4/5 relative flex justify-center lg:justify-end">

            {/* Rotated purple background (desktop only) */}
            <div className="hidden lg:block absolute -top-28 -right-0 w-[20rem] h-[14.7rem]">
              <Image src={cardBg} alt="" fill className="object-cover rounded-2xl" />
            </div>


            
            {/* Chart image container */}
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-none bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              <Image
                src={chartImg}
                alt="Trading chart"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
