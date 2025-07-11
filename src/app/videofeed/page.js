// ❌ remove 'use client'
import { requireMembershipAccess } from '@/lib/requireMembershipAccess';
import VideoHero from '@/components/VideoHero';
import VideoFeed from '@/components/VideoFeed';
import VideoFeedSection from '@/components/VideoFeedSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function VideoFeedPage() {


    const user = await requireMembershipAccess('/videofeed');
  
    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
          ❌ Access denied. Upgrade your membership to view this page.
        </div>
      );
    }
  return (
    <>
        {/* <Header /> */}
        {/* <VideoHero />
        <VideoFeedSection /> */}
            <div className="max-w-xl mx-auto">
            {/* <h1 className="text-3xl font-bold mb-6 text-white">All Public Videos</h1> */}
            <VideoFeed />
            </div>
        {/* <Footer /> */}
    </>
    
  );
}
