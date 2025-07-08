'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CreateBlogProfessional from '@/components/CreateBlogProfessional';

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/blogs/${id}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setInitial({
          title: data.title,
          content: data.content,
          category: data.category?._id,
          featureImageUrl: data.featureImage
        });
      }
    }
    load();
  }, [id]);

  const handleUpdate = async (formData) => {
    const res = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: formData
    });
    if (res.ok) router.push('/account/blogs');
    else alert('Update failed');
  };

  if (!initial) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Blog Edit Karein</h1>
      <CreateBlogProfessional
        initialData={initial}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
