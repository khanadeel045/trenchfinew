// src/components/StepsSection.js
export default function StepsSection() {
  const steps = [
    {
      icon: '/icons/signup.svg',
      title: 'Sign up',
      desc: 'Seamlessly integrate your existing exchange accounts with MergeMint for unified trading experience.',
    },
    {
      icon: '/icons/wallet.svg',
      title: 'Connect your wallet',
      desc: 'Browse through diverse markets and assets supported by MergeMint, giving you access to endless trading opportunities.',
    },
    {
      icon: '/icons/share.svg',
      title: 'Share active positions',
      desc: 'Utilize MergeMint’s advanced analytics tools to track market trends and make informed trading decisions.',
    },
    {
      icon: '/icons/badges.svg',
      title: 'Earn badges, go live, create community',
      desc: 'Execute buy and sell orders with just a few clicks, knowing that your transactions are secure and reliable.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
      <div className="max-w-4xl mx-auto text-center mb-12 px-6">
        <h2 className="text-3xl font-semibold">
          Simplified trading at the palm of your hands
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between space-y-8 md:space-y-0">
        {steps.map((step, idx) => (
          <div key={step.title} className="flex-1 flex-col flex items-start md:items-center">
            {/* Icon */}
            <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-full p-4">
              <img src={step.icon} alt={step.title} className="w-6 h-6" />
            </div>

            {/* Text */}
            <div className="ml-4">
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-sm mt-1 text-gray-100">{step.desc}</p>
            </div>

            {/* Arrow */}
            {idx < steps.length - 1 && (
              <div className="hidden md:flex flex-shrink-0 mx-6">
                <svg
                  className="w-6 h-6 text-white opacity-50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
