// src/components/StepsSection.js
"use client";

import Image from "next/image";

export default function StepsSection() {
  const steps = [
    {
      icon: '/steps/signup.svg',
      title: 'Sign up',
      desc: 'Create your account in seconds and get started right away. No hidden fees, just seamless access.',
    },
    {
      icon: '/steps/wallet.svg',
      title: 'Connect your wallet',
      desc: 'Link up your favorite wallets for instant balance updates and one-click trading capabilities.',
    },
    {
      icon: '/steps/share.svg',
      title: 'Share positions',
      desc: 'Effortlessly share your open positions and performance with your network or social channels.',
    },
    {
      icon: '/steps/badges.svg',
      title: 'Earn badges',
      desc: 'Level up as you trade—unlock achievements, go live, and build your own community on MergeMint.',
    },
  ];

  return (
    <section className="py-16 bg-[linear-gradient(to_right,_#8787FB,_#505095)] text-white relative md:h-[600px] flex flex-col justify-center">

    <img src={"steps/bg.svg"} className="absolute right-0 top-0 w-[400px]" />


      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          Simplified trading at the palm of your hand
        </h2>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.title}
            className="bg-opacity-10 rounded-2xl p-6 flex flex-col hover:bg-opacity-20 transition"
          >
            <div className="bg-opacity-30 rounded-full mb-4">
              <img src={step.icon} alt={step.title} className="w-full" />
            </div>
            <h3 className="text-start text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-start text-sm text-gray-100">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
