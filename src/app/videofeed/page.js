'use client';
import VideoFeed from '@/components/VideoFeed';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VideoFeedPage() {
  return (
    <>
        <Header />
            <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-white">All Public Videos</h1>
            <VideoFeed />
            </div>
        <Footer />
    </>
    
  );
}
