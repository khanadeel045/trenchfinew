// app/page.js
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ResourcesSection from '../components/ResourcesSection';
import SecurePlatformSection from '../components/SecurePlatformSection';
import StepsSection  from '../components/StepsSection';
import TestimonialsSection  from '../components/TestimonialsSection';
import BlogArticlesSection  from '../components/BlogArticlesSection';
import TokenSaleSection  from '../components/TokenSaleSection';
import SubscribeSection  from '../components/SubscribeSection';
import Footer  from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ResourcesSection />
      <SecurePlatformSection />
      <StepsSection />
      <TestimonialsSection />
      <BlogArticlesSection />
      <TokenSaleSection />
      <SubscribeSection />
      <Footer />

    </>
  );
}
