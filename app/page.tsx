import { Hero } from "@/components/home/hero";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { PopularTools } from "@/components/home/popular-tools";
import { RecentlyAdded } from "@/components/home/recently-added";
import { FeaturedTools } from "@/components/home/featured-tools";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesGrid />
      <PopularTools />
      <RecentlyAdded />
      <FeaturedTools />
      <Newsletter />
    </>
  );
}
