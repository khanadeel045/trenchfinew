// src/app/blogs/[username]/[slug]/page.js
import { requireMembershipAccess } from '@/lib/requireMembershipAccess';

import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import '@/models/User';
import '@/models/Category';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default async function BlogDetailPage({ params }) {

    const user = await requireMembershipAccess('/blogs');
  
    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
          ❌ Access denied. Upgrade your membership to view this page.
        </div>
      );
    }


    
  const { username, slug } = await params;
  await connectToDatabase();

  const blog = await Blog.findOne({ slug })
    .populate('author', 'username')
    .populate('category', 'name')
    .lean();
  if (!blog || blog.author.username !== username) return notFound();

  const recent = await Blog.find({ _id: { $ne: blog._id } })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate('author', 'username')
    .lean();

  const publishedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
      <Header />

      <div className="max-w-3xl mx-auto py-8 pt-30">
        {/* Main Blog */}
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        {blog.featureImage && (
          <img
            src={blog.featureImage.startsWith('/') ? blog.featureImage : `/${blog.featureImage}`}
            alt={blog.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}
        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-6">
          <div><strong>Category:</strong> {blog.category?.name}</div>
          <div><strong>Author:</strong> {blog.author.username}</div>
          <div><strong>Published:</strong> {publishedDate}</div>
        </div>
        <div className="prose mb-6" dangerouslySetInnerHTML={{ __html: blog.content }} />
        {blog.attachments?.length > 0 && (
          <div className="mt-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">Attachments</h2>
            {blog.attachments.map(att => (
              <div key={att.url} className="mt-1">
                <a href={att.url} download className="text-blue-500 underline">
                  📎 {att.filename}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Recent Blogs Cards */}
        {recent.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map(r => {
                const date = new Date(r.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric'
                });
                return (
                  <Link
                    key={r._id}
                    href={`/blogs/${r.author.username}/${r.slug}`}
                    className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                    {r.featureImage && (
                      <img
                        src={r.featureImage.startsWith('/') ? r.featureImage : `/${r.featureImage}`}
                        alt={r.title}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{r.title}</h3>
                      <p className="text-sm text-gray-500 mb-1">by {r.author.username}</p>
                      <p className="text-sm text-gray-500">{date}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
