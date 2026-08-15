import { Hero } from "@/components/home/hero";
import { PopularTools } from "@/components/home/popular-tools";
import { CategoriesGrid } from "@/components/home/categories-grid";
import {
  FavoritesSection,
  RecentlyUsedSection,
} from "@/components/home/personal-sections";
import { NewTools } from "@/components/home/new-tools";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { HomeFaq } from "@/components/home/home-faq";
import { FeaturedTools } from "@/components/home/featured-tools";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularTools />
      <CategoriesGrid />
      <RecentlyUsedSection />
      <FavoritesSection />
      <FeaturedTools />
      <NewTools />
      <WhyChooseUs />
      <HomeFaq />
    </>
  );
}
