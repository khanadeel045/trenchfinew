'use client';
import VideoHero from '@/components/VideoHero';
import VideoFeed from '@/components/VideoFeed';
import VideoFeedSection from '@/components/VideoFeedSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VideoFeedPage() {
  return (
    <>
        <Header />
        <VideoHero />
        <VideoFeedSection />
            <div className="max-w-4xl mx-auto mt-10 pt-30">
            <h1 className="text-3xl font-bold mb-6 text-white">All Public Videos</h1>
            <VideoFeed />
            </div>
        <Footer />
    </>
    
  );
}
