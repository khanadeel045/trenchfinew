'use client';
import CreateBlogProfessional from '@/components/CreateBlog';
import { useRouter } from 'next/navigation';

export default function CreateBlogPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/account/blogs');
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Naya Blog Banayein</h1>
      <CreateBlogProfessional onSuccess={handleSuccess} />
    </div>
  );
}
