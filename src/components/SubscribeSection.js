// src/components/SubscribeSection.js
"use client";

export default function SubscribeSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-xl">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-4">
          Subscribe to <span className="text-indigo-500">always</span> get updates
        </h2>
        {/* Subheading */}
        <p className="text-gray-600 text-center mb-8">
          Consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis. 
          Ipsum dolor sit amet, consectetur adipiscing elit. Ut elit, luctus nec ullamcorper.
        </p>
        {/* Input + Button */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your Email ..."
            className="w-full bg-gray-200 rounded-full py-4 px-6 pr-32 text-gray-700 focus:outline-none"
          />
          <button
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
