// src/app/blogs/page.js
import Link from 'next/link';
import { headers } from 'next/headers';

export default async function AllBlogsPage() {
  const host     = headers().get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const res      = await fetch(`${protocol}://${host}/api/blogs`, { cache: 'no-store' });
  const blogs    = await res.json();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Blog Archive</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map(b => (
          <div
            key={b._id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition flex flex-col"
          >
            <div className="relative h-48">
              {b.featureImage ? (
                <img
                  src={b.featureImage}
                  alt={b.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              {b.category?.name && (
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {b.category.name}
                </span>
              )}
            </div>
            <div className="p-6 flex flex-col flex-1">
              <Link
                href={`/blogs/${b.author.username}/${b.slug}`}
                className="text-2xl font-bold text-gray-800 hover:text-indigo-600 mb-2"
              >
                {b.title}
              </Link>
              <p className="text-sm text-gray-500 mb-4">
                by{' '}
                <Link
                  href={`/blogs/${b.author.username}`}
                  className="font-medium text-gray-700 hover:underline"
                >
                  {b.author.username}
                </Link>
              </p>
              <p className="text-gray-700 flex-1 mb-4">
                {b.content.length > 120
                  ? b.content.substring(0, 120) + '...'
                  : b.content
                }
              </p>
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
  );
}
