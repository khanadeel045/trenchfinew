'use client';
import UploadVideo from '@/components/UploadVideo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UploadVideoPage() {
  return (
  <>
      <Header />

          <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6 text-white">Upload a New Video</h1>
            <UploadVideo />
          </div>
      
      <Footer />
  </>  
  );
}
