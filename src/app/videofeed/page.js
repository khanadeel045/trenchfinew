// ❌ remove 'use client'
import { requireMembershipAccess } from '@/lib/requireMembershipAccess';
import VideoHero from '@/components/VideoHero';
import VideoFeed from '@/components/VideoFeed';
import VideoFeedSection from '@/components/VideoFeedSection';

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
<div
  className="min-h-screen"
style={{
  backgroundImage: `
    linear-gradient(45deg, #0D2242 35%, transparent 90%),
    linear-gradient(45deg, #1BD2A0 0%, transparent 90%),
    linear-gradient(45deg, #FFB037 100%)`
}}
>      
    <div className="max-w-xl mx-auto">
      <VideoFeed />
      </div>
    </div>
    </>
    
  );
}
