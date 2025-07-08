// src/app/blogs/[id]/page.js
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

export default async function BlogDetailPage({ params }) {
  const { id } = params;
  const host = headers().get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const res = await fetch(`${protocol}://${host}/api/blogs/${id}`, { cache: 'no-store' });
  if (!res.ok) return notFound();
  const blog = await res.json();

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="prose mb-6">{blog.content}</p>

      {blog.attachments?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Attachments</h2>
          {blog.attachments.map((att) => (
            <div key={att.url} className="mt-1">
              <a href={att.url} download className="text-blue-500 underline">
                📎 {att.filename}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
