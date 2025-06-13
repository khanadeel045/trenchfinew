'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Passwords match check
    if (password !== confirmPassword) {
      setErrorMsg('Password aur Confirm Password match nahi kar rahe.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || 'Kuch ghalat ho gaya');
        setIsLoading(false);
      } else {
        router.push('/login');
      }
    } catch (err) {
      setErrorMsg('Network error');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT PANEL (White background with form) */}
      <div className="w-full lg:w-1/2 flex flex-col relative justify-center px-[10px] md:px-[150px] bg-white">
        <div className="absolute top-0 right-0">

          <svg width="197" height="139" viewBox="0 0 197 139" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M98.5337 11.5483V-51" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M102.468 11.7837L110.105 -50.3433" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M106.351 12.4528L121.511 -48.3608" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M110.131 13.568L132.596 -45.0896" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M113.732 15.0918L143.219 -40.592" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M117.128 17.0249L153.202 -34.9045" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M120.268 19.3419L162.429 -28.1145" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M123.1 21.9937L170.759 -20.3206" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M125.599 24.9426L178.076 -11.6348" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M127.713 28.1642L184.291 -2.16821" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M129.417 31.6088L189.301 7.93018" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M130.686 35.2145L193.043 18.5366" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M131.52 38.9442L195.466 29.5024" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M131.878 42.7357L196.542 40.6541" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M131.775 46.552L196.234 51.8552" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M131.212 50.3186L194.569 62.9447" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M130.187 53.9988L191.57 73.7743" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M128.726 57.5427L187.251 84.1827" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M126.829 60.8879L181.715 94.0207" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M124.548 63.998L175 103.153" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M121.908 66.8232L167.222 111.467" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M118.935 69.3262L158.495 118.827" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M115.68 71.4822L148.909 125.146" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M112.182 73.2417L138.632 130.326" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M108.491 74.5923L127.803 134.291" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M104.659 75.509L116.551 137.004" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M100.751 75.9922L105.057 138.404" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M96.8037 76.0171L93.459 138.491" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M92.8952 75.5959L81.9385 137.252" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M89.051 74.7285L70.6616 134.7" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M85.3472 73.4397L59.7559 130.883" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M81.823 71.7175L49.4014 125.853" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M78.5299 69.6235L39.7393 119.682" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M75.5185 67.1577L30.8843 112.433" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M72.8274 64.3699L22.9775 104.243" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M70.5078 61.2969L16.1343 95.1979" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M68.5598 57.9763L10.4443 85.4341" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M67.0478 54.4573L5.97217 75.1002" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M65.9716 50.7898L2.80713 64.3204" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M65.3432 47.0227L0.974121 53.2552" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M65.1766 43.2065L0.5 42.0542" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M65.4841 39.4149L1.39697 30.8777" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M66.253 35.673L3.65234 19.8872" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M67.4706 32.0425L7.24072 9.2312" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M69.1238 28.5854L12.0977 -0.94165" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M71.1866 25.3391L18.1587 -10.4949" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M73.6346 22.3406L25.3481 -19.2798" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M76.4282 19.6518L33.5625 -27.1975" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M79.5294 17.2977L42.6738 -34.1113" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M82.8996 15.3151L52.5796 -39.9351" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M86.4876 13.7291L63.1133 -44.594" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M90.2428 12.5642L74.1602 -48.0264" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
            <path d="M94.1128 11.8332L85.5269 -50.1575" stroke="#1A40FF" stroke-opacity="0.19" stroke-width="1.5" stroke-miterlimit="10" />
          </svg>

        </div>
        <div className="absolute top-70 left-0">

          <svg width="125" height="314" viewBox="0 0 125 314" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-81.4803 237.815L4.09178 237.313L4.09178 229.026L19.4687 228.93L19.4687 238.878L65.1199 238.615C65.1676 238.894 65.2759 239.141 65.4277 239.318C65.5796 239.496 65.7664 239.593 65.9591 239.594C66.1944 239.594 66.42 239.455 66.5864 239.206C66.7528 238.957 66.8462 238.62 66.8462 238.269C66.8462 237.917 66.7528 237.58 66.5864 237.331C66.42 237.083 66.1944 236.943 65.9591 236.943C65.7734 236.958 65.5956 237.06 65.4518 237.237C65.308 237.413 65.2057 237.653 65.1599 237.922L19.9802 238.185L19.9162 213.43L-26.2225 213.705L-26.2225 206.624L-81.4963 206.946L-81.4963 207.627L-26.678 207.316L-26.678 214.398L-6.21012 214.278L-6.21012 230.996L-32.6322 231.152L-32.6322 223.581L-81.4883 223.855L-81.4883 224.548L-33.0958 224.273L-33.0958 231.844L-5.75456 231.677L-5.79452 214.29L19.4127 214.135L19.4127 228.25L3.56427 228.345L3.56427 236.633L-81.5442 237.134L-81.4803 237.815Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M-81.6567 169.558L47.4167 168.817L47.3608 147.012L93.3317 146.737C93.3764 146.973 93.4642 147.185 93.5853 147.35C93.7064 147.515 93.8559 147.626 94.0169 147.671C94.178 147.715 94.3443 147.692 94.4969 147.603C94.6495 147.514 94.7825 147.363 94.8808 147.167C94.9791 146.971 95.0388 146.738 95.0532 146.495C95.0676 146.251 95.0361 146.006 94.9623 145.787C94.8885 145.569 94.7753 145.385 94.6354 145.258C94.4956 145.13 94.3347 145.064 94.1708 145.066C93.9782 145.067 93.7913 145.164 93.6395 145.341C93.4876 145.518 93.3794 145.766 93.3317 146.045L73.5671 146.164L73.5031 132.467L-34.2472 133.088L-34.2472 140.146L-81.7686 140.42L-81.7686 141.113L-33.8156 140.826L-33.8156 133.781L73.0156 133.16L73.0156 146.116L31.6402 146.355L31.6402 139.764L17.8777 139.835L17.8777 153.042L-36.1653 153.353L-36.1653 159.718L-81.8005 159.981L-81.8005 160.673L-35.7018 160.399L-35.7018 154.046L18.3412 153.723L18.3412 140.528L31.1766 140.456L31.1766 147.048L46.8093 146.964L46.8653 168.077L-81.7446 168.829L-81.6567 169.558Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M92.8204 193.715C92.9866 193.718 93.1502 193.652 93.2923 193.523C93.4345 193.393 93.5494 193.207 93.6242 192.985C93.6989 192.763 93.7303 192.514 93.7149 192.267C93.6995 192.02 93.6379 191.784 93.537 191.586C93.4362 191.388 93.3002 191.237 93.1446 191.15C92.989 191.062 92.82 191.041 92.6569 191.09C92.4939 191.139 92.3433 191.256 92.2224 191.426C92.1015 191.597 92.0152 191.815 91.9732 192.055L41.215 192.342L41.167 174.036L-2.4222 174.262L-2.4222 171.994L-81.6724 172.447L-81.6724 173.14L-2.88576 172.686L-2.88576 174.955L40.6715 174.704L40.8074 225.671L24.5034 225.766L24.3915 183.78L-17.1678 184.019L-17.1678 176.687L-81.6245 177.057L-81.6245 177.749L-17.6393 177.379L-17.6393 184.711L23.92 184.472L23.92 197.954L-43.9654 198.348L-43.9654 192.82L-81.6645 193.035L-81.6645 193.727L-44.429 193.512L-44.429 199.041L23.912 198.647L23.9839 226.459L69.1636 226.196C69.2167 226.472 69.3277 226.715 69.4803 226.889C69.6328 227.063 69.8188 227.159 70.0107 227.163C70.1269 227.163 70.2419 227.129 70.349 227.062C70.4562 226.995 70.5535 226.898 70.6352 226.774C70.717 226.651 70.7816 226.505 70.8253 226.344C70.869 226.183 70.8909 226.011 70.8899 225.838C70.8872 225.522 70.8083 225.217 70.6676 224.981C70.5268 224.745 70.3338 224.592 70.1238 224.551C69.9139 224.511 69.7012 224.585 69.5247 224.76C69.3483 224.934 69.2201 225.199 69.1636 225.503L41.191 225.659L41.1431 208.224L79.889 207.997C79.9352 208.265 80.0378 208.504 80.1817 208.678C80.3256 208.852 80.5032 208.953 80.6883 208.964C80.8561 208.981 81.0237 208.926 81.1715 208.806C81.3192 208.686 81.441 208.505 81.5226 208.285C81.6043 208.065 81.6424 207.815 81.6326 207.564C81.6228 207.313 81.5654 207.072 81.4671 206.868C81.3689 206.664 81.2338 206.506 81.0777 206.412C80.9216 206.318 80.7508 206.293 80.5854 206.339C80.42 206.384 80.2666 206.5 80.1433 206.671C80.02 206.842 79.9319 207.061 79.889 207.305L41.1431 207.531L41.1431 193.011L91.9093 192.724C91.9579 193.024 92.0762 193.288 92.2431 193.469C92.4099 193.651 92.6145 193.738 92.8204 193.715Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M43.1331 299.457L-26.0711 299.863L-26.0711 296.281L-81.3528 296.603L-81.3528 297.296L-26.5426 296.973L-26.5426 300.556L43.5966 300.15L43.5407 281.354L123.254 280.888C123.302 281.167 123.41 281.415 123.562 281.592C123.714 281.769 123.901 281.866 124.094 281.867C124.26 281.873 124.425 281.808 124.568 281.68C124.711 281.553 124.827 281.367 124.903 281.146C124.979 280.924 125.011 280.675 124.997 280.427C124.982 280.179 124.921 279.942 124.821 279.743C124.72 279.545 124.584 279.392 124.429 279.304C124.273 279.215 124.104 279.194 123.94 279.242C123.777 279.291 123.626 279.407 123.504 279.578C123.383 279.748 123.297 279.967 123.254 280.208L43.1331 280.673L43.1331 299.457Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M19.1568 126.819L-26.5184 127.082L-26.5184 121.815L-81.7922 122.138L-81.7922 122.83L-26.9819 122.508L-26.9819 127.774L19.6203 127.5L19.5724 109.587L110.084 109.062C110.14 109.375 110.27 109.647 110.451 109.828C110.631 110.008 110.85 110.084 111.065 110.041C111.28 109.999 111.478 109.841 111.621 109.597C111.764 109.353 111.843 109.04 111.843 108.715C111.843 108.391 111.764 108.078 111.621 107.834C111.478 107.59 111.28 107.432 111.065 107.389C110.85 107.347 110.631 107.423 110.451 107.603C110.27 107.784 110.14 108.056 110.084 108.369L19.1568 108.847L19.1568 126.819Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M65.671 36.696L-0.9596 37.0901L-0.959599 45.4492L-82.0001 45.9149L-82.0001 46.6075L-0.480092 46.1298L-0.480092 37.7708L65.2235 37.3886L65.2714 55.3009L8.607 55.6352L8.69491 95.4483L-6.10655 95.5319L-6.20246 58.8953L-19.8451 58.9789L-19.8451 73.4042L-81.9442 73.7744L-81.9442 74.4551L-19.3815 74.0968L-19.4215 59.6715L-6.65802 59.6237L-6.57011 95.5676L-19.2856 95.6393L-19.2856 89.6685L-81.8483 90.0387L-81.8483 90.6717L-19.7492 90.3015L-19.7492 96.2722L9.15846 96.105L9.05456 56.3637L104.817 55.8144C104.865 56.0921 104.973 56.338 105.125 56.5131C105.277 56.6883 105.464 56.7828 105.656 56.7816C105.822 56.7848 105.986 56.7181 106.128 56.589C106.27 56.46 106.385 56.2738 106.46 56.0518C106.534 55.8298 106.566 55.5809 106.55 55.3335C106.535 55.0861 106.473 54.85 106.372 54.6524C106.272 54.4549 106.136 54.3036 105.98 54.2159C105.824 54.1283 105.655 54.1078 105.492 54.1567C105.329 54.2056 105.179 54.322 105.058 54.4927C104.937 54.6633 104.851 54.8813 104.809 55.1218L65.719 55.3486L65.671 36.696Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M77.084 244.263C77.3193 244.263 77.545 244.124 77.7113 243.875C77.8777 243.627 77.9712 243.29 77.9712 242.938C77.9712 242.586 77.8777 242.249 77.7113 242.001C77.545 241.752 77.3193 241.612 77.084 241.612C76.8914 241.614 76.7045 241.711 76.5527 241.888C76.4008 242.065 76.2926 242.313 76.2449 242.592L10.7091 242.974L10.7091 244.168L-46.8344 244.502L-46.8344 239.881L-81.4085 240.072L-81.4085 240.765L-47.29 240.574L-47.29 245.195L10.7571 244.849L10.7571 252.634L-26.5903 252.849L-26.5903 255.99L-81.4085 256.313L-81.4085 256.993L-26.1347 256.683L-26.1347 253.53L11.2127 253.315L11.2127 243.643L76.2848 243.26C76.3288 243.533 76.4302 243.778 76.574 243.958C76.7178 244.139 76.8966 244.246 77.084 244.263Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M96.9764 311.327C96.7903 311.346 96.613 311.452 96.4695 311.629C96.3261 311.807 96.2238 312.048 96.1772 312.318L-81.4806 312.784L-81.4806 313.476L96.1372 313.046C96.1826 313.284 96.2719 313.498 96.395 313.663C96.518 313.829 96.6698 313.939 96.8328 313.981C96.9959 314.023 97.1636 313.995 97.3166 313.902C97.4697 313.808 97.6019 313.651 97.698 313.45C97.7942 313.249 97.8505 313.011 97.8603 312.764C97.8701 312.518 97.833 312.272 97.7535 312.055C97.6739 311.838 97.5551 311.659 97.4105 311.539C97.266 311.419 97.1017 311.362 96.9364 311.375L96.9764 311.327Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M-14.1709 106.972L15.1604 106.793L15.6159 106.793L15.6159 96.0454L74.0386 95.711C74.0948 96.0244 74.2254 96.2967 74.406 96.4769C74.5865 96.6571 74.8048 96.7331 75.0201 96.6907C75.2354 96.6484 75.433 96.4905 75.5762 96.2466C75.7194 96.0026 75.7983 95.6892 75.7983 95.3647C75.7983 95.0403 75.7194 94.7269 75.5762 94.4829C75.433 94.239 75.2354 94.0811 75.0201 94.0387C74.8048 93.9964 74.5865 94.0724 74.406 94.2527C74.2254 94.4329 74.0948 94.7051 74.0386 95.0185L15.504 95.3528L15.1604 95.3528L15.1604 106.1L-13.7473 106.279L-13.7473 101.873L-81.8565 102.267L-81.8565 102.96L-14.2028 102.566L-14.1709 106.972Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M-10.3185 2.30467L99.0782 1.64789C99.1218 1.93422 99.2296 2.18968 99.3837 2.37208C99.5377 2.55447 99.7288 2.65284 99.9253 2.65093C100.092 2.65409 100.255 2.58735 100.397 2.4583C100.539 2.32925 100.654 2.14313 100.729 1.92113C100.804 1.69914 100.835 1.4502 100.82 1.20278C100.805 0.955355 100.743 0.719406 100.642 0.521812C100.541 0.324219 100.405 0.172966 100.25 0.0853043C100.094 -0.00235933 99.925 -0.0229568 99.7619 0.0259744C99.5989 0.0749074 99.4483 0.191332 99.3274 0.361975C99.2065 0.53262 99.1201 0.750668 99.0782 0.991121L-10.8141 1.62399L-10.7421 29.6865L-10.2786 29.6865L-10.3185 2.30467Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M-10.9418 288.029L22.9609 287.826L22.9609 272.398L50.7497 272.231L50.7497 265.448L98.4868 265.173L98.4868 264.481L50.7497 264.755L50.7497 253.112L92.5406 252.873C92.5879 253.141 92.6908 253.378 92.8345 253.552C92.9782 253.726 93.1552 253.827 93.3399 253.841C93.5077 253.857 93.6753 253.802 93.823 253.682C93.9708 253.562 94.0926 253.381 94.1742 253.161C94.2559 252.942 94.294 252.692 94.2842 252.441C94.2744 252.19 94.2169 251.948 94.1187 251.744C94.0204 251.54 93.8854 251.382 93.7293 251.288C93.5732 251.194 93.4024 251.169 93.237 251.215C93.0716 251.261 92.9182 251.376 92.7949 251.547C92.6716 251.718 92.5835 251.938 92.5406 252.181L50.2861 252.42L50.2861 264.767L-11.4054 265.125L-11.4054 271.908L-37.1721 272.052L-37.1721 262.498L-81.3528 262.749L-81.3528 263.442L-37.6437 263.191L-37.6437 272.744L-11.4134 272.589L-11.4134 287.337L-26.079 287.42L-26.079 281.067L-81.3608 281.39L-81.3608 282.082L-26.5505 281.76L-26.5505 288.113L-11.4214 288.029L-11.4214 293.188L-10.9578 293.188L-10.9418 288.029ZM-10.9978 265.806L50.2301 265.46L50.2301 271.55L-10.9978 271.896L-10.9978 265.806ZM-10.9978 272.589L22.4414 272.398L22.4414 287.146L-10.9978 287.337L-10.9978 272.589Z" fill="#7C3CB4" fill-opacity="0.55" />
            <path d="M100.205 264.851C100.2 264.59 100.144 264.337 100.044 264.124C99.9436 263.911 99.8035 263.747 99.641 263.652C99.4786 263.557 99.301 263.536 99.1305 263.591C98.9601 263.646 98.8042 263.775 98.6826 263.962C98.5609 264.148 98.4787 264.385 98.4464 264.641C98.4141 264.897 98.433 265.161 98.5007 265.402C98.5685 265.642 98.6822 265.847 98.8275 265.991C98.9728 266.135 99.1434 266.212 99.3178 266.212C99.436 266.21 99.5529 266.174 99.6616 266.104C99.7703 266.035 99.8688 265.934 99.9513 265.808C100.034 265.681 100.099 265.531 100.142 265.367C100.186 265.203 100.207 265.027 100.205 264.851Z" fill="#7C3CB4" fill-opacity="0.55" />
          </svg>


        </div>
        {/* Logo */}
        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" />
        </div>

        {/* Heading & Subtitle */}
        <h2 className="text-3xl font-bold mb-2">Sign Up & Start <span className="text-[#8787FB]">Trading</span> Smarter</h2>
        <p className="text-gray-600 mb-6">
          Create your free account to access real-time <br /> insights, charts, and token trends.
        </p>

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Your full name"
              required
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="example@email.com"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="At least 8 characters"
              required
              disabled={isLoading}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Re-enter your password"
              required
              disabled={isLoading}
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className={`
              w-full flex items-center justify-center 
              bg-[rgba(135,135,251,1)] text-white py-2 rounded transition 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[rgba(115,115,240,1)]'}
            `}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              'Signup'
            )}
          </button>

        </form>

        {/* Or Separator */}
        <div className="flex items-center my-8">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Signup Buttons */}
        <button
          type="button"
          className={`w-full flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-100 transition mb-4
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          <img src="/google.svg" alt="Google icon" className="h-5 w-5 mr-2" />
          Signup with Google
        </button>
        <button
          type="button"
          className={`w-full flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-100 transition
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          <img src="/facebook.svg" alt="Facebook icon" className="h-5 w-5 mr-2" />
          Signup with Facebook
        </button>

        {/* Already have account */}
        <p className="mt-8 text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <a
            href="/login"
            className={`${isLoading ? 'pointer-events-none text-gray-400' : 'text-indigo-600 font-semibold hover:underline'}`}
          >
            Login
          </a>
        </p>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-400 text-xs">
          © 2025 ALL RIGHTS RESERVED
        </p>
      </div>

      {/* RIGHT PANEL (Dark Gradient) */}
      <div className="hidden lg:flex w-1/2 bg-black relative flex justify-center items-center overflow-hidden">
        <div className="absolute top-0 right-0">
          <svg width="594" height="554" viewBox="0 0 594 554" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_194_722)">
              <ellipse cx="494" cy="77" rx="176" ry="159" fill="#7C3CB4" fillOpacity="0.61" />
            </g>
            <defs>
              <filter
                id="filter0_f_194_722"
                x="0.399994"
                y="-399.6"
                width="987.2"
                height="953.2"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="158.8" result="effect1_foregroundBlur_194_722" />
              </filter>
            </defs>
          </svg>
        </div>
        <div>
          <img src="/logo.svg" alt="Logo" />
        </div>
      </div>
    </div>
  );
}
