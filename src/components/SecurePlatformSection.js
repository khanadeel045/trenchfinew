// src/components/SecurePlatformSection.js
"use client";

import Image from "next/image";

export default function SecurePlatformSection() {
  const stats = [
    { label: "Total Transactions", value: "249 K+" },
    { label: "Discord Members",   value: "496 K+" },
    { label: "Total Global Node",  value: "753 M+" },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          The most <span className="text-indigo-500">secure</span> trading<br/>platform
        </h2>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: description + stats */}
          <div className="lg:w-1/2 space-y-6">
            <p className="text-gray-600 max-w-lg mx-auto lg:mx-0">
              Trusted by over 100,000 traders & creators worldwide, our platform thrives on transparency, 
              community, and real-time insights. With users across 30+ countries and over a million token views 
              tracked, we’ve become a go-to hub for discovering...
            </p>
            <ul className="space-y-4">
              {stats.map((s) => (
                <li key={s.label} className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900 mr-3">{s.value}</span>
                  <span className="text-gray-600">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: chart card with overlay */}
          <div className="lg:w-1/2 relative">
            {/* Overlay card */}
            <div className="absolute -top-8 -right-8">
                <img src="/SecurePlatformSection/Card.png" />

            </div>

            {/* Chart card */}
            <div className="">
                              <img src="/SecurePlatformSection/Chart.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
