"use client";

export default function HeroSection() {
  const cards = [
    { symbol: "Bitcoin", price: "$53,519.32", top: "0%", right: "-10px", width: "230px", icon: "/icons/btc.svg", height: "auto" },
    { symbol: "Ethereum", price: "$3,400.25", top: "25%", right: "-10px", width: "400px", icon: "/icons/eth.svg", height: "auto" },
    { symbol: "Litecoin", price: "$145.00", top: "50%", right: "-10px", width: "330px", icon: "/icons/luna.svg", height: "auto" },
    { symbol: "Tether", price: "$216.62", top: "75%", right: "-10px", width: "200px", icon: "/icons/usdt.svg", height: "auto" },
    { symbol: "Tron", price: "$216.62", top: "100%", right: "-10px", width: "320px", icon: "/icons/eth.svg", height: "auto" },
  ];

  const ticker = [
    { symbol: "Ethereum", price: "757.36 USD", change: "+0.35%", icon: "/icons/eth.svg" },
    { symbol: "Bitcoin", price: "993.32 USD", change: "-0.11%", icon: "/icons/btc.svg" },
    { symbol: "LUNA", price: "351.73 USD", change: "+0.15%", icon: "/icons/luna.svg" },
    { symbol: "Tether", price: "216.92 USD", change: "+1.35%", icon: "/icons/usdt.svg" },
    { symbol: "Uniswap", price: "579.25 USD", change: "-2.62%", icon: "/icons/uni.svg" },
  ];

  return (
    <section className="relative bg-white overflow-hidden pt-20 pb-12  h-screen">
      {/* Background circles */}

      <div className="md:hidden h-[50px] "></div>

      <div className="absolute -top-20 -right-0" >
        <svg width="628" height="679" viewBox="0 0 628 679" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_712_657)">
            <ellipse cx="502.5" cy="136.5" rx="184.5" ry="224.5" fill="#7C3CB4" fillOpacity="0.61" />
          </g>
          <defs>
            <filter id="filter0_f_712_657" x="0.399994" y="-405.6" width="1004.2" height="1084.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="158.8" result="effect1_foregroundBlur_712_657" />
            </filter>
          </defs>
        </svg>


      </div>
      <div className="absolute top-50">

        <svg width="211" height="266" viewBox="0 0 211 266" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M73.3022 87.6029V0" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M78.8125 87.9327L89.5095 0.9198" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M84.251 88.8696L105.484 3.69629" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M89.5454 90.4316L121.008 8.27783" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M94.5889 92.5659L135.887 14.5771" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M99.3452 95.2733L149.869 22.5427" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M103.743 98.5185L162.792 32.0527" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M107.709 102.232L174.458 42.9685" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M111.208 106.362L184.706 55.1335" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M114.17 110.875L193.411 68.3921" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M116.557 115.699L200.428 82.5355" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M118.334 120.749L205.669 97.3904" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M119.501 125.972L209.062 112.749" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M120.003 131.283L210.569 128.367" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M119.86 136.628L210.139 144.055" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M119.07 141.903L207.805 159.587" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M117.634 147.058L203.605 174.755" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M115.588 152.021L197.557 189.332" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M112.932 156.706L189.804 203.111" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M109.737 161.062L180.399 215.901" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M106.04 165.019L169.504 227.545" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M101.876 168.524L157.282 237.854" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M97.3169 171.544L143.856 246.704" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M92.4175 174.008L129.462 253.958" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M87.248 175.9L114.296 259.511" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M81.8818 177.184L98.5376 263.312" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M76.4077 177.861L82.4383 265.273" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M70.8793 177.896L66.1948 265.394" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M65.4051 177.306L50.0596 263.659" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M60.0211 176.091L34.2656 260.084" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M54.8339 174.286L18.9917 254.739" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M49.8983 171.874L4.48975 247.693" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M45.2858 168.941L-9.04297 239.051" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M41.0682 165.487L-21.4448 228.899" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M37.2989 161.583L-32.519 217.428" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M34.05 157.279L-42.1035 204.76" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M31.3221 152.628L-50.0723 191.085" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M29.2044 147.7L-56.3359 176.611" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M27.6969 142.563L-60.769 161.513" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M26.8171 137.287L-63.3359 146.016" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M26.5838 131.942L-64 130.328" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M27.0145 126.632L-62.7437 114.675" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M28.0912 121.391L-59.585 99.282" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M29.7967 116.306L-54.5591 84.3577" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M32.112 111.465L-47.7568 70.11" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M35.0014 106.918L-39.2676 56.7301" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M38.4295 102.718L-29.1987 44.4261" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M42.3424 98.9523L-17.6938 33.3369" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M46.6855 95.6551L-4.93311 23.6534" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M51.406 92.8785L8.94092 15.4971" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M56.4311 90.6571L23.6938 8.97192" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M61.6903 89.0258L39.1655 4.16479" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M67.1106 88.0019L55.0854 1.17993" stroke="#2B3049" strokeOpacity="0.17" strokeWidth="1.5" strokeMiterlimit="10" />
        </svg>

      </div>

      <div className="relative  pl-6 flex flex-col md:flex-row items-center md:h-full ">
        {/* Left */}
        <div className="md:w-1/2 flex justify-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900">
              The Pulse of <span className="text-[#8787FB]">Crypto</span> <br /> in Motion
            </h1>
            <p className="text-gray-600 max-w-sm">
              Track the hottest meme coins in real-time. Filter by trends, migrations,
              and community boosts — all powered by the hype, your squad, and market buzz.
            </p>
            <div className="flex space-x-4">
              <button className="bg-[#8787FB] text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                Connect Wallet
              </button>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                Explore Trenches
              </button>
            </div>
          </div>

        </div>

        {/*right */}
        <div className="hidden md:block md:w-1/2 relative h-[400px] mt-12 md:mt-0">
          <img src={'/videofeed/token.png'} />
        </div>

        {/* mobile section */}
        <div className="md:hidden w-full overflow-x-auto flex space-x-4 mt-8 pb-4 flex flex-col gap-2">
          {cards.map((c, i) => (
            <div
              key={i}
              className="max-w-[96%] bg-[#8787FB] text-white rounded-xl p-4 shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <img src={c.icon} className="w-6 h-6" />
                <div>
                  <h4 className="font-semibold text-sm">{c.symbol}</h4>
                  <p className="text-xs">{c.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>



      </div>

      {/* Bottom ticker */}
      <div className="sw-full">
        <div className="flex space-x-8 bg-gradient-to-r from-[#8787FB] to-[#505095] text-white py-3 px-6  overflow-x-auto">
          {ticker.map((t) => (
            <div
              key={t.symbol}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <img src={t.icon} alt={t.symbol} className="w-5 h-5" />
              <span className="font-medium">{t.symbol}</span>
              <span className="text-sm">{t.price}</span>
              <span
                className={`text-sm ${t.change.startsWith("+") ? "text-green-300" : "text-red-300"
                  }`}
              >
                {t.change}
              </span>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}
