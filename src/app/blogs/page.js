// ❌ remove 'use client'
import { requireMembershipAccess } from '@/lib/requireMembershipAccess';

import Link from 'next/link';
import { headers } from 'next/headers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function AllBlogsPage() {
    const user = await requireMembershipAccess('/blogs');
  
    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
          ❌ Access denied. Upgrade your membership to view this page.
        </div>
      );
    }
  
  const headerStore = await headers();
  const host        = headerStore.get('host');
  const protocol    = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const res         = await fetch(`${protocol}://${host}/api/blogs`, { cache: 'no-store' });
  const blogs       = await res.json();

  return (
    <>
    <Header />
      <div className="max-w-7xl mx-auto py-12 px-4 pt-30">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Blog Archive</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map(b => (
            <div
              key={b._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition flex flex-col"
            >
              {/* Feature Image */}
              {b.featureImage ? (
                <img
                  src={b.featureImage.startsWith('/') ? b.featureImage : `/${b.featureImage}`}
                  alt={b.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                {/* Category Badge */}
                {b.category?.slug && (
                  <Link
                    href={`/blogs/category/${b.category.slug}`}
                    className="text-xs font-semibold uppercase bg-indigo-100 text-indigo-700 px-2 py-1 rounded inline-block mb-2"
                  >
                    {b.category.name}
                  </Link>
                )}

                {/* Title with slug */}
                <h2 className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition mb-2">
                  <Link href={`/blogs/${b.author.username}/${b.slug}`}>
                    {b.title || 'Untitled'}
                  </Link>
                </h2>

                {/* Author */}
                <p className="text-sm text-gray-500 mb-4">
                  by{' '}
                  <Link href={`/blogs/${b.author.username}`} className="font-medium hover:underline">
                    {b.author.username}
                  </Link>
                </p>

                {/* Snippet */}
                <p className="text-gray-700 flex-1 mb-4">
                  {b.content.length > 100
                    ? b.content.substring(0, 100) + '...'
                    : b.content}
                </p>

                {/* Read More */}
                <div className="mt-auto">
                  <Link
                    href={`/blogs/${b.author.username}/${b.slug}`}
                    className="inline-block text-indigo-600 font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    <Footer />
    </>
  );
}
