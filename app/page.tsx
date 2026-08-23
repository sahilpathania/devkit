import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { PopularTools } from "@/components/home/popular-tools";
import { HomeTrust } from "@/components/home/home-trust";
import {
  FavoritesSection,
  RecentlyUsedSection,
} from "@/components/home/personal-sections";
import { FeaturedTools } from "@/components/home/featured-tools";
import { NewTools } from "@/components/home/new-tools";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { HomeFaq } from "@/components/home/home-faq";
import { JsonLd } from "@/components/seo/json-ld";
import { buildHomeMetadata } from "@/lib/seo";
import { TOOLS } from "@/services/tools";

export const metadata: Metadata = buildHomeMetadata(TOOLS.length);

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesGrid />
      <PopularTools />
      <HomeTrust />
      <RecentlyUsedSection />
      <FavoritesSection />
      <FeaturedTools />
      <NewTools />
      <WhyChooseUs />
      <HomeFaq />
    </>
  );
}
