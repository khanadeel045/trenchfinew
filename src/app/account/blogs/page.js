// /src/app/blogs/page.js

import Link from 'next/link';
import { headers } from 'next/headers';

export default async function BlogsListPage() {
  const host = headers().get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  let blogs = [];
  let errorMsg = '';

  try {
    const res = await fetch(`${protocol}://${host}/api/blogs`, {
      cache: 'no-store'
    });
    const data = await res.json();
    if (!res.ok) {
      // throw hata diya, ab yahan set ho raha hai
      errorMsg = data.error || `Error ${res.status}`;
    } else {
      blogs = data;
    }
  } catch (err) {
    console.error('Fetch /api/blogs failed:', err);
    errorMsg = 'Network error fetching blogs';
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>

      {errorMsg ? (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          ❌ {errorMsg}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-gray-600">Koi blog nahin mila.</p>
      ) : (
        <ul className="space-y-6">
          {blogs.map((blog) => (
            <li key={blog._id} className="border-b pb-4">
              <Link href={`/blogs/${blog._id}`}>
                <span className="text-xl font-semibold text-blue-600 hover:underline">
                  {blog.title}
                </span>
              </Link>
              <div className="mt-1 text-gray-600 text-sm">
                by {blog.author.username}
                {blog.category?.name && (
                  <> | Category: <span className="font-medium">{blog.category.name}</span></>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link href="/blogs/new">
        <button className="inline-block mt-6 px-4 py-2 bg-green-600 text-white rounded">
          + Naya Blog
        </button>
      </Link>
    </div>
  );
}
