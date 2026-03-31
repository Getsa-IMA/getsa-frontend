import HeroSection from "@/components/landing-page/HeroSection";
import FeaturedCreators from "@/components/landing-page/FeaturedCreators";
import Categories from "@/components/landing-page/Categories";
import TrustedBrands from "@/components/landing-page/TrustedBrands";
import AnalyticsFeature from "@/components/landing-page/AnalyticsFeature";
import Testimonials from "@/components/landing-page/Testimonials";
import FAQSection from "@/components/landing-page/FAQSection";

const Home = () => {
  return (
    <main className="min-h-screen bg-neutral pb-20">
      <HeroSection />
      <FeaturedCreators />
      <Categories />
      <TrustedBrands />
      <AnalyticsFeature />
      <Testimonials />
      <FAQSection />
    </main>
  );
};

export default Home;