
// src/components/TokenSaleSection.js
"use client";

export default function TokenSaleSection() {
  // Example stats—you can replace these with dynamic values
  const stats = [
    { label: "Days", value: "266" },
    { label: "Lives", value: "2521" },
    { label: "Signed Up", value: "2323" },
    { label: "Counter", value: "36" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2">
          Token Sale With <span className="text-[#8787FB]">Attractive</span> Discounts
        </h2>
        <p className="text-gray-600 mb-8">
          Join thousands who are already part of the revolution
        </p>

        {/* Info row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 mb-8">
          <div>
            <h4 className="font-semibold">March 08, 2024 (12:00)</h4>
            <p className="text-sm text-gray-500">Start</p>
          </div>
          <div>
            <h4 className="font-semibold">July 10, 2025 (10:00)</h4>
            <p className="text-sm text-gray-500">End</p>
          </div>
          <div>
            <h4 className="font-semibold">700,000 ICC (7%)</h4>
            <p className="text-sm text-gray-500">Number of tokens</p>
          </div>
          <div>
            <h4 className="font-semibold">1 BTC = 1.115 ICC</h4>
            <p className="text-sm text-gray-500">Exchange rate</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Stats + Button */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
          {/* Stats */}
          <div className="flex items-center justify-center space-x-4 flex-wrap">
            {stats.map((s, i) => (
              <div key={i} className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold">{s.value}</span>
                {i < stats.length - 1 && <span className="text-2xl">:</span>}
                <span className="text-sm text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Join Now button */}
          <button className="bg-[#8787FB] text-white px-8 py-3 rounded-lg hover:bg-indigo-600 transition">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
}
