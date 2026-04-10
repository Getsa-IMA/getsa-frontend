import HeroSection from "@/components/landing-page/HeroSection";
import FeaturedCreators from "@/components/landing-page/FeaturedCreators";
import Categories from "@/components/landing-page/Categories";
import HowItWorks from "@/components/landing-page/HowItWorks";
import FAQSection from "@/components/landing-page/FAQSection";

const Home = () => {
  return (
    <main className="min-h-screen bg-neutral pb-20">
      <HeroSection />
      <FeaturedCreators />
      <Categories />
      <HowItWorks />
      <FAQSection />
    </main>
  );
};

export default Home;