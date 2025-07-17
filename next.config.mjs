// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // poori app ko by default dynamic (on‑demand SSR) mode me chalayega
    defaultDynamic: 'force-dynamic',
  },
  // agar pages router bhi ho to ye use hoga:
  // compiler: { reactRemoveProperties: true }, // aapki baqi settings
};

export default nextConfig;
