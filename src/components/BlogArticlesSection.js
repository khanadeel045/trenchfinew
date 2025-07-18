// src/components/BlogArticlesSection.js
"use client";

import Image from "next/image";

export default function BlogArticlesSection() {
  const posts = [
    {
      category: "STRATEGIES",
      title: "Mastering Market Volatility",
      description:
        "Learn effective strategies to navigate volatile cryptocurrency markets and maximize your trading profits.",
      author: "Emily Chang",
      date: "April 15, 2024",
      readTime: "8 minutes",
      image: "/blog/volatility.png",
      avatar: "/blog/emily.png",
    },
    {
      category: "CRYPTO",
      title: "The Rise of Decentralized Finance",
      description:
        "Explore the growing trend of decentralized finance and its impact on the cryptocurrency ecosystem.",
      author: "James Thompson",
      date: "April 20, 2024",
      readTime: "6 minutes",
      image: "/blog/defi.png",
      avatar: "/blog/james.png",
    },
    {
      category: "UPDATES",
      title: "Introducing MergeMint 2.0: What's New?",
      description:
        "Discover the latest features and improvements in MergeMint's newest platform update.",
      author: "Jessica Rodriguez",
      date: "April 25, 2024",
      readTime: "5 minutes",
      image: "/blog/merge2.png",
      avatar: "/blog/jessica.png",
    },
    {
      category: "CRYPTOCURRENCY",
      title: "Understanding Blockchain Technology",
      description:
        "Get a beginner-friendly overview of blockchain technology and its applications beyond cryptocurrencies.",
      author: "Michael Smith",
      date: "April 30, 2024",
      readTime: "7 minutes",
      image: "/blog/blockchain.png",
      avatar: "/blog/michael.png",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-2">
          Our <span className="text-white">Blog</span> &amp; Articles
        </h2>
        <p className="text-gray-600 mb-8">
          Explore the latest insights and updates from the SIETE team.
        </p>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.title} className="flex flex-col md:flex-row items-start md:items-center">
              {/* Thumbnail */}
              <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <span className="text-xs font-medium text-indigo-500 uppercase">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold mt-1">{post.title}</h3>
                <p className="text-gray-700 mt-2">{post.description}</p>
                <div className="flex items-center mt-4 space-x-3">
                  <div className="w-8 h-8 relative rounded-full overflow-hidden">
                    <Image
                      src={post.avatar}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div>
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-sm text-gray-500">· {post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
