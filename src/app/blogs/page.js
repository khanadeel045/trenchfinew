// src/app/blogs/page.js
import Link from 'next/link';
import { headers } from 'next/headers';

export default async function AllBlogsPage() {
  const headerStore = await headers();
  const host        = headerStore.get('host');
  const protocol    = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const res         = await fetch(`${protocol}://${host}/api/blogs`, { cache: 'no-store' });
  const blogs       = await res.json();

  console.log('Frontend fetched blogs:', blogs);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Blog Archive</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map(b => {
          const slug = b.slug || b._id;
          if (!b.slug) console.warn('Missing slug for', b._id);
          return (
            <div key={b._id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition flex flex-col">
              {/* ... card content ... */}
              <Link href={`/blogs/${b.author.username}/${slug}`} className="text-2xl font-bold">
                {b.title || 'Untitled'}
              </Link>
              {/* ... */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
