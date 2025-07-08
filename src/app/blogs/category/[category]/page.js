// src/app/blogs/category/[category]/page.js
import Link from 'next/link';
import { headers } from 'next/headers';

export default async function CategoryArchivePage({ params }) {
  const { category } = params;
  const host     = headers().get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const res      = await fetch(`${protocol}://${host}/api/blogs`, { cache: 'no-store' });
  const blogs    = await res.json();
  const filtered = blogs.filter(b => b.category?.slug === category);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Category: {category}</h1>
      {filtered.length === 0 ? (
        <p>No blogs found in this category.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map(b => (
            <li key={b._id} className="border-b pb-4">
              <Link href={`/blogs/${b.author.username}/${b.slug}`}>
                <a className="text-xl font-semibold text-blue-600 hover:underline">{b.title}</a>
              </Link>
              <p className="text-sm text-gray-500">by {b.author.username}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
