// src/components/TestimonialsSection.js
"use client";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "As an investor, getting paid in cryptocurrency has been a game-changer. I no longer have to wait days for bank transfers to clear, and I can access my funds from anywhere in the world!",
      name: "Aurelia Timothy",
      role: "Investor",
      avatar: "/avatars/aurelia.jpg",
    },
    {
      quote:
        "I never thought investing could be this easy! Thanks to cryptocurrency, I've been able to diversify my portfolio and see impressive returns in a short amount of time.",
      name: "Lone Kim",
      role: "Influencer",
      avatar: "/avatars/lone.jpg",
    },
    {
      quote:
        "Cryptocurrency has truly revolutionized the way I do business. With faster transactions and lower fees, I've saved both time and money, allowing my business to go fully digital.",
      name: "Teddy Bone",
      role: "Manager",
      avatar: "/avatars/teddy.jpg",
    },
    {
      quote:
        "Thanks to cryptocurrency, I've been able to send money to my family overseas quickly and affordably. The low transaction fees and near-instant transfers have made a world of difference.",
      name: "Roger Shine",
      role: "Entrepreneur",
      avatar: "/avatars/roger.jpg",
    },
    {
      quote:
        "As someone who values financial privacy, cryptocurrency has been a game-changer for me. I can make secure, anonymous transactions without worrying about third-party interference.",
      name: "Marsha Quen",
      role: "Influencer",
      avatar: "/avatars/marsha.jpg",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Starburst behind */}
      <div className="absolute -left-20 -top-10 z-0">
        <img
          src="/starburst.svg"
          alt=""
          className="w-72 h-72 opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-12">
          More <span className="text-indigo-500">35M+</span> people purchased our tokens
        </h2>

        {/* Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="relative bg-white rounded-2xl shadow-lg p-6 overflow-hidden"
            >
              {/* Top gradient overlay */}
              <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-br from-indigo-300 to-purple-400 mix-blend-overlay opacity-50" />

              <p className="relative text-gray-700 mb-6">{t.quote}</p>

              <div className="relative flex items-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
