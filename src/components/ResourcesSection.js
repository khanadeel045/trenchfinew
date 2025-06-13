// src/components/ResourcesSection.js
export default function ResourcesSection() {
  const features = [
    {
      icon: '/ResourcesSection/token.svg',
      title: 'Token Tracker',
      desc: 'Shows new, trending, migrated, and graduated meme coins · Filter/sort options · Boosting functionality for visibility.',
      bg: 'bg-purple-50',
    },
    {
      icon: '/ResourcesSection/position.svg',
      title: 'Position Sharing',
      desc: 'Users can share active trading positions only with friends · Visibility controlled through permission system.',
      bg: 'bg-white',
    },
    {
      icon: '/ResourcesSection/device.svg',
      title: 'Video Feed',
      desc: 'Short-form, TikTok-style video content for traders · Reactions: Rocket (bullish), Fire (like), Thumbs Down (dislike) · Comment threads under each video.',
      bg: 'bg-white',
    },
    {
      icon: '/ResourcesSection/chart.svg',
      title: 'Live Streams',
      desc: 'Traders can go live and stream trading sessions · Viewers can join and comment in real time.',
      bg: 'bg-purple-50',
    },
    {
      icon: '/ResourcesSection/device.svg',
      title: 'Creator Profiles',
      desc: 'Public user pages showing videos, live streams, rankings · Profile stats: followers, badges, top tokens, etc.',
      bg: 'bg-purple-50',
    },
    {
      icon: '/ResourcesSection/chart.svg',
      title: 'AI Chatbot Support',
      desc: 'Basic troubleshooting and platform navigation only · Available 24/7 on site.',
      bg: 'bg-white',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Build, <span className="text-[#8787FB]">Share</span> &amp; Explore?
        </h2>
        <p className="text-gray-600 mb-6">
          Sign up today to create your own profile, access exclusive builds, and become part of the community.
        </p>
        <button className="bg-[#8787FB] text-white px-8 py-3 rounded-lg hover:bg-[#8787FB] transition mb-12">
          Create Account
        </button>

        <h3 className="text-2xl font-semibold mb-8">
          All your resources on <span className="text-[#8787FB]">one</span> platform!
        </h3>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className={`${f.bg} p-6 rounded-xl shadow-md`}>
            <div className="flex items-center mb-4">
              <img src={f.icon} alt={f.title} className="w-8 h-8 mr-3" />
              <h4 className="text-lg font-semibold">{f.title}</h4>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
