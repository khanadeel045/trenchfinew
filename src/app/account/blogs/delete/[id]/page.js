'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function DeleteBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function del() {
      if (!confirm('Kya aap pakka delete karna chahte hain?')) return router.push('/account/blogs');
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Blog delete hogaya');
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
      router.push('/account/blogs');
    }
    del();
  }, [id, router]);

  return <p>Deleting...</p>;
}
