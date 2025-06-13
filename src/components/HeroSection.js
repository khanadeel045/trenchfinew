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
        <svg width="453" height="622" viewBox="0 0 453 622" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M160.37 -28.3639L161.425 241.132L178.87 241.132L179.071 289.559L158.132 289.559L158.685 433.33C158.098 433.48 157.578 433.821 157.205 434.3C156.832 434.778 156.627 435.366 156.624 435.973C156.624 436.714 156.918 437.425 157.441 437.949C157.965 438.473 158.674 438.767 159.414 438.767C160.154 438.767 160.864 438.473 161.387 437.949C161.91 437.425 162.204 436.714 162.204 435.973C162.174 435.388 161.958 434.828 161.587 434.375C161.216 433.922 160.71 433.6 160.143 433.456L159.59 291.17L211.699 290.968L211.121 145.662L226.027 145.662L225.348 -28.4142L223.916 -28.4142L224.569 144.227L209.663 144.227L209.914 208.688L174.723 208.688L174.396 125.475L190.333 125.475L189.754 -28.3891L188.297 -28.3891L188.875 124.016L172.938 124.016L173.29 210.122L209.889 209.996L210.216 289.383L180.504 289.383L180.303 239.47L162.858 239.47L161.802 -28.5653L160.37 -28.3639Z" fill="#A5BFB3" fill-opacity="0.55" />
          <path d="M304.052 -28.9177L305.611 377.578L351.511 377.402L352.089 522.18C351.593 522.321 351.147 522.598 350.799 522.979C350.452 523.36 350.219 523.831 350.124 524.338C350.03 524.846 350.08 525.369 350.267 525.85C350.454 526.331 350.772 526.749 351.184 527.059C351.596 527.369 352.087 527.557 352.6 527.602C353.113 527.647 353.629 527.548 354.089 527.316C354.549 527.083 354.935 526.727 355.203 526.286C355.472 525.846 355.612 525.339 355.608 524.823C355.605 524.216 355.401 523.628 355.028 523.15C354.655 522.671 354.134 522.331 353.547 522.18L353.296 459.935L382.127 459.733L380.82 120.391L365.964 120.391L365.386 -29.2701L363.928 -29.2701L364.532 121.75L379.362 121.75L380.67 458.198L353.396 458.198L352.893 327.893L366.769 327.893L366.618 284.55L338.817 284.55L338.163 114.35L324.765 114.35L324.212 -29.3707L322.754 -29.3707L323.332 115.81L336.705 115.81L337.384 286.01L365.16 286.01L365.311 326.433L351.435 326.433L351.611 375.665L307.169 375.842L305.586 -29.1945L304.052 -28.9177Z" fill="#A5BFB3" fill-opacity="0.55" />
          <path d="M253.201 520.569C253.194 521.093 253.334 521.608 253.606 522.056C253.878 522.503 254.269 522.865 254.737 523.101C255.204 523.336 255.728 523.435 256.249 523.387C256.77 523.338 257.266 523.144 257.682 522.826C258.098 522.509 258.417 522.081 258.601 521.59C258.786 521.1 258.829 520.568 258.726 520.055C258.623 519.541 258.378 519.067 258.019 518.686C257.66 518.305 257.201 518.033 256.694 517.901L256.091 358.046L294.626 357.895L294.148 220.618L298.925 220.618L297.969 -28.968L296.511 -28.968L297.467 219.158L292.69 219.158L293.218 356.335L185.934 356.763L185.733 305.416L274.114 305.064L273.612 174.179L289.046 174.179L288.266 -28.817L286.809 -28.817L287.588 172.694L272.154 172.694L272.656 303.579L244.277 303.579L243.447 89.7842L255.086 89.7842L254.633 -28.9429L253.175 -28.9429L253.628 88.3243L241.989 88.3243L242.819 303.553L184.275 303.78L184.828 446.066C184.248 446.233 183.737 446.583 183.37 447.063C183.003 447.544 182.801 448.13 182.792 448.734C182.792 449.1 182.864 449.462 183.005 449.799C183.145 450.137 183.351 450.443 183.611 450.701C183.87 450.958 184.178 451.162 184.516 451.299C184.855 451.437 185.217 451.506 185.582 451.503C186.248 451.494 186.888 451.246 187.386 450.803C187.883 450.359 188.204 449.751 188.29 449.09C188.376 448.429 188.22 447.759 187.852 447.204C187.484 446.648 186.928 446.244 186.286 446.066L185.959 357.971L222.659 357.82L223.137 479.844C222.573 479.99 222.07 480.313 221.703 480.766C221.337 481.219 221.125 481.778 221.101 482.361C221.066 482.89 221.181 483.418 221.435 483.883C221.688 484.348 222.068 484.732 222.531 484.989C222.993 485.246 223.519 485.366 224.048 485.335C224.576 485.304 225.085 485.124 225.514 484.814C225.944 484.505 226.277 484.079 226.474 483.588C226.671 483.096 226.725 482.558 226.628 482.037C226.532 481.516 226.289 481.033 225.929 480.645C225.569 480.257 225.106 479.979 224.595 479.844L224.117 357.82L254.683 357.82L255.287 517.7C254.656 517.853 254.1 518.226 253.718 518.751C253.336 519.277 253.152 519.921 253.201 520.569Z" fill="#A5BFB3" fill-opacity="0.55" />
          <path d="M30.6128 364.087L29.7583 146.14L37.2993 146.14L36.6206 -27.9612L35.1626 -27.9612L35.8413 144.655L28.3003 144.655L29.155 365.547L68.7205 365.371L69.7009 616.417C69.1138 616.567 68.593 616.908 68.22 617.386C67.8471 617.865 67.643 618.453 67.6396 619.06C67.6283 619.584 67.7647 620.102 68.0333 620.552C68.302 621.003 68.692 621.369 69.1587 621.608C69.6253 621.847 70.1497 621.949 70.6719 621.904C71.194 621.858 71.6928 621.666 72.111 621.35C72.5292 621.033 72.8499 620.605 73.0365 620.115C73.223 619.625 73.2679 619.091 73.1659 618.577C73.0639 618.062 72.8193 617.586 72.4599 617.204C72.1004 616.822 71.6408 616.549 71.1337 616.417L70.1533 364.087L30.6128 364.087Z" fill="#A5BFB3" fill-opacity="0.55" />
          <path d="M394.017 288.577L393.464 144.73L404.55 144.73L403.871 -29.3455L402.413 -29.3455L403.092 143.271L392.006 143.271L392.584 290.037L430.29 289.886L431.396 574.937C430.736 575.114 430.163 575.525 429.784 576.094C429.404 576.662 429.245 577.35 429.334 578.028C429.423 578.706 429.755 579.328 430.269 579.779C430.782 580.23 431.442 580.479 432.125 580.479C432.808 580.479 433.468 580.23 433.981 579.779C434.495 579.328 434.827 578.706 434.916 578.028C435.005 577.35 434.845 576.662 434.466 576.094C434.086 575.525 433.514 575.114 432.854 574.937L431.848 288.577L394.017 288.577Z" fill="#A5BFB3" fill-opacity="0.55" />
          <path d="M146.796 471.01C146.796 471.751 147.09 472.461 147.613 472.985C148.137 473.509 148.846 473.804 149.586 473.804C150.326 473.804 151.036 473.509 151.559 472.985C152.082 472.461 152.376 471.751 152.376 471.01C152.373 470.403 152.169 469.814 151.796 469.336C151.423 468.858 150.902 468.517 150.315 468.367L149.511 261.972L146.997 261.972L146.293 80.7482L156.021 80.7482L155.619 -28.1374L154.161 -28.1374L154.563 79.3135L144.835 79.3135L145.564 262.124L129.175 262.124L128.723 144.504L122.112 144.504L121.433 -28.1374L120 -28.1374L120.654 145.939L127.29 145.939L127.742 263.558L148.103 263.558L148.907 468.493C148.333 468.631 147.818 468.95 147.438 469.403C147.058 469.856 146.833 470.419 146.796 471.01Z" fill="#A5BFB3" fill-opacity="0.55" />
          <path d="M5.62677 533.658C5.58728 533.072 5.36459 532.514 4.99006 532.062C4.61554 531.61 4.10832 531.288 3.54052 531.141L2.56012 -28.3638L1.10213 -28.3638L2.0072 531.015C1.50673 531.158 1.05653 531.439 0.708627 531.827C0.360726 532.214 0.129173 532.692 0.0404671 533.206C-0.048239 533.719 0.00956492 534.247 0.207239 534.729C0.404912 535.211 0.734378 535.628 1.15785 535.931C1.58132 536.234 2.08161 536.411 2.60111 536.442C3.1206 536.473 3.63823 536.356 4.09453 536.105C4.55084 535.855 4.92734 535.48 5.18062 535.025C5.43389 534.57 5.55366 534.052 5.52628 533.532L5.62677 533.658Z" fill="#A5BFB3" fill-opacity="0.55" />
          <path d="M435.795 183.618L436.172 275.992L436.172 277.427L458.795 277.427L459.499 461.42C458.839 461.597 458.266 462.008 457.887 462.577C457.508 463.145 457.348 463.833 457.437 464.511C457.526 465.189 457.858 465.811 458.372 466.262C458.885 466.713 459.545 466.962 460.228 466.962C460.911 466.962 461.571 466.713 462.084 466.262C462.598 465.811 462.93 465.189 463.019 464.511C463.109 463.833 462.948 463.145 462.569 462.577C462.19 462.008 461.617 461.597 460.957 461.42L460.253 277.074L460.253 275.992L437.63 275.992L437.253 184.952L446.528 184.952L445.699 -29.5469L444.241 -29.5469L445.07 183.517L435.795 183.618Z" fill="#A5BFB3" fill-opacity="0.55" />
          <path d="M54.6687 193.787L55.0962 300.558L87.573 300.558L87.925 388.074L102.203 388.074L102.781 538.415L104.239 538.415L103.661 388.074L128.169 388.074L128.672 519.689C128.11 519.837 127.609 520.161 127.243 520.614C126.877 521.066 126.664 521.624 126.636 522.206C126.601 522.734 126.717 523.262 126.97 523.727C127.223 524.192 127.603 524.576 128.066 524.833C128.528 525.09 129.055 525.211 129.583 525.18C130.111 525.149 130.62 524.968 131.049 524.658C131.479 524.349 131.812 523.924 132.009 523.432C132.206 522.94 132.26 522.403 132.163 521.882C132.067 521.361 131.825 520.878 131.465 520.489C131.105 520.101 130.642 519.823 130.13 519.689L129.627 386.615L103.636 386.615L102.881 192.327L88.6036 192.327L88.3019 111.179L108.411 111.179L107.884 -27.9612L106.426 -27.9612L106.954 109.694L86.8441 109.694L87.1707 192.302L56.1267 192.302L55.9507 146.115L69.3236 146.115L68.6448 -27.9864L67.187 -27.9864L67.8656 144.63L54.4927 144.63L54.6687 192.277L43.8096 192.277L43.8096 193.737L54.6687 193.787ZM101.449 193.611L102.178 386.438L89.3578 386.438L88.6287 193.611L101.449 193.611ZM87.1707 193.611L87.573 298.922L56.5288 298.922L56.1267 193.611L87.1707 193.611Z" fill="#A5BFB3" fill-opacity="0.55" />
          <path d="M43.8351 193.837L43.8351 192.377L43.8351 -28.9177L42.2012 -28.9177L42.2012 193.837L43.8351 193.837Z" fill="#A5BFB3" fill-opacity="0.55" />
          <path d="M103.46 543.826C104.008 543.812 104.54 543.635 104.989 543.319C105.438 543.003 105.784 542.562 105.983 542.051C106.183 541.539 106.228 540.98 106.112 540.443C105.995 539.906 105.724 539.415 105.331 539.032C104.938 538.649 104.441 538.39 103.902 538.288C103.363 538.186 102.805 538.246 102.3 538.459C101.795 538.673 101.363 539.031 101.06 539.489C100.756 539.946 100.594 540.483 100.594 541.033C100.597 541.405 100.674 541.773 100.821 542.115C100.967 542.458 101.179 542.768 101.445 543.028C101.712 543.288 102.027 543.492 102.373 543.629C102.719 543.766 103.088 543.833 103.46 543.826Z" fill="#A5BFB3" fill-opacity="0.55" />
        </svg>
        <svg width="658" height="873" viewBox="0 0 658 873" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0">
          <g filter="url(#filter0_f_102_212)">
            <circle cx="601.5" cy="271.5" r="283.5" fill="#7C3CB4" fill-opacity="0.31" />
          </g>
          <defs>
            <filter id="filter0_f_102_212" x="0.399994" y="-329.6" width="1202.2" height="1202.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="158.8" result="effect1_foregroundBlur_102_212" />
            </filter>
          </defs>
        </svg>


      </div>
      <div className="absolute top-50">

        <svg width="211" height="266" viewBox="0 0 211 266" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M73.3022 87.6029V0" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M78.8125 87.9327L89.5095 0.9198" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M84.251 88.8696L105.484 3.69629" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M89.5454 90.4316L121.008 8.27783" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M94.5889 92.5659L135.887 14.5771" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M99.3452 95.2733L149.869 22.5427" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M103.743 98.5185L162.792 32.0527" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M107.709 102.232L174.458 42.9685" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M111.208 106.362L184.706 55.1335" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M114.17 110.875L193.411 68.3921" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M116.557 115.699L200.428 82.5355" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M118.334 120.749L205.669 97.3904" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M119.501 125.972L209.062 112.749" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M120.003 131.283L210.569 128.367" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M119.86 136.628L210.139 144.055" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M119.07 141.903L207.805 159.587" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M117.634 147.058L203.605 174.755" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M115.588 152.021L197.557 189.332" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M112.932 156.706L189.804 203.111" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M109.737 161.062L180.399 215.901" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M106.04 165.019L169.504 227.545" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M101.876 168.524L157.282 237.854" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M97.3169 171.544L143.856 246.704" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M92.4175 174.008L129.462 253.958" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M87.248 175.9L114.296 259.511" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M81.8818 177.184L98.5376 263.312" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M76.4077 177.861L82.4383 265.273" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M70.8793 177.896L66.1948 265.394" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M65.4051 177.306L50.0596 263.659" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M60.0211 176.091L34.2656 260.084" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M54.8339 174.286L18.9917 254.739" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M49.8983 171.874L4.48975 247.693" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M45.2858 168.941L-9.04297 239.051" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M41.0682 165.487L-21.4448 228.899" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M37.2989 161.583L-32.519 217.428" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M34.05 157.279L-42.1035 204.76" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M31.3221 152.628L-50.0723 191.085" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M29.2044 147.7L-56.3359 176.611" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M27.6969 142.563L-60.769 161.513" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M26.8171 137.287L-63.3359 146.016" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M26.5838 131.942L-64 130.328" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M27.0145 126.632L-62.7437 114.675" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M28.0912 121.391L-59.585 99.282" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M29.7967 116.306L-54.5591 84.3577" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M32.112 111.465L-47.7568 70.11" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M35.0014 106.918L-39.2676 56.7301" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M38.4295 102.718L-29.1987 44.4261" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M42.3424 98.9523L-17.6938 33.3369" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M46.6855 95.6551L-4.93311 23.6534" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M51.406 92.8785L8.94092 15.4971" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M56.4311 90.6571L23.6938 8.97192" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M61.6903 89.0258L39.1655 4.16479" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
          <path d="M67.1106 88.0019L55.0854 1.17993" stroke="#2B3049" stroke-opacity="0.17" stroke-width="1.5" stroke-miterlimit="10" />
        </svg>

      </div>

      <div className="relative  pl-6 flex flex-col md:flex-row items-center md:h-full ">
        {/* Left */}
        <div className="md:w-1/2 flex justify-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900">
              Where crypto <span className="text-[#8787FB]">goes</span> social
            </h1>
            <p className="text-gray-600 max-w-sm">
              Track tokens. Share positions. Stream your trades. Join the most
              connected crypto trading experience.
            </p>
            <div className="flex space-x-4">
              <button className="bg-[#8787FB] text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                Watch Live Trades
              </button>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                Explore Trenches
              </button>
            </div>
          </div>

        </div>


        {/* Right (token cards) */}
        {/* desktop section */}
        <div className="hidden md:block md:w-1/2 relative h-[400px] mt-12 md:mt-0">
          {cards.map((c, i) => (
            <div
              key={i}
              style={{ top: c.top, right: c.right, width: c.width, height: c.height }}
              className="absolute bg-[#8787FB] text-white rounded-xl p-4 w-52 shadow-lg transform hover:scale-105 transition flex"
            >
              <div className="flex justify-between items-center">
                <div className="flex">
                  <img src={c.icon} />
                  <div>
                    <h4 className="font-semibold">{c.symbol}</h4>
                    <p className="text-sm">{c.price}</p>
                  </div>
                </div>

                <svg width="79" height="27" viewBox="0 0 79 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M78.3846 25.8582L0.978516 25.4568V17.2793C5.81639 14.8858 9.19279 11.7693 11.2103 9.26618C12.3205 7.8889 14.3244 5.65357 15.2141 5.65357C16.1038 5.65357 20.5525 9.26618 21.887 10.8718C23.2216 12.4774 29.4497 15.6886 33.0086 14.8858C36.5675 14.083 43.6853 3.64657 49.4685 1.63956C55.2517 -0.367443 55.6966 2.04096 65.9284 6.45638C74.1139 9.98871 77.6431 8.46338 78.3846 7.25918V25.8582Z" fill="url(#paint0_linear_102_662)" stroke="white" />
                  <path d="M0.978516 17.2792C3.92331 16.4615 6.44742 14.8004 8.71912 12.3216C13.6412 6.95084 14.5246 4.47207 17.1048 6.12461C19.685 7.77715 26.7805 16.453 32.586 14.8004C38.3914 13.1479 45.487 -3.37749 57.0979 1.99326C68.7088 7.36401 73.2242 10.2559 78.3846 6.95084" stroke="#C6B164" stroke-width="1.5" />
                  <defs>
                    <linearGradient id="paint0_linear_102_662" x1="0.978516" y1="9.51054" x2="78.3846" y2="9.51054" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#C6B164" stop-opacity="0" />
                      <stop offset="1" stop-color="#C6B164" stop-opacity="0.26" />
                    </linearGradient>
                  </defs>
                </svg>

              </div>
            </div>
          ))}
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

        <div className="hidden md:block absolute bg-[#8787FB] text-white rounded-xl p-4 w-52 shadow-lg transform hover:scale-105 transition flex  h-[200px] w-[300px] right-[420px] top-[50%]"
        >
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex gap-5 w-full">
              <img src='/icons/btc.svg' width={"40px"} />
              <div>
                <h4 className="font-semibold">Bitcoin</h4>
                <p className="text-sm">BTC</p>
              </div>
            </div>

            <svg width="148" height="59" viewBox="0 0 148 59" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.521484 58.0455C1.18869 56.8655 8.58353 38.3804 12.1975 29.2853L23.8736 43.2966L30.5456 21.1734C34.7157 28.302 43.0557 42.4117 43.0557 41.8218C43.0557 41.2318 54.1758 15.0281 59.7358 2L77.2499 29.2853L95.598 21.1734L112.278 38.1346L124.788 6.42464L132.294 21.1734H142.302" stroke="white" />
              <path d="M144.536 18.0682C146.144 18.0684 147.384 19.272 147.384 20.6815C147.384 22.0911 146.144 23.2955 144.536 23.2957C142.927 23.2957 141.686 22.0912 141.686 20.6815C141.686 19.2718 142.927 18.0682 144.536 18.0682Z" stroke="white" />
            </svg>


            <div className="flex justify-between w-full">
              <div>
                $53,519.32
              </div>
              <div>
                +0,25%
              </div>
            </div>
          </div>
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
