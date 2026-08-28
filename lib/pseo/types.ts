import type { CategorySlug } from "@/types/category";
import type { ToolFAQ } from "@/types";

export type PseoCluster = "image" | "pdf" | "json" | "text";

export interface PseoFeature {
  title: string;
  body: string;
}

export interface PseoStep {
  name: string;
  text: string;
}

export interface PseoUseCase {
  title: string;
  body: string;
}

export interface PseoExample {
  title: string;
  body: string;
}

/** Long-tail landing page. Must embed a real shipped tool. */
export interface PseoLanding {
  type: "landing";
  slug: string;
  cluster: PseoCluster;
  keyword: string;
  h1: string;
  title: string;
  description: string;
  hubSlug: string;
  toolSlug: string;
  categorySlug: CategorySlug;
  intent: string;
  audience: string;
  whatItDoes: string;
  whyThisVersion: string;
  whoShouldUse: string;
  whenToUse: string[];
  commonMistakes: string[];
  tips: string[];
  features: PseoFeature[];
  benefits: PseoFeature[];
  steps: PseoStep[];
  useCases: PseoUseCase[];
  examples: PseoExample[];
  faqs: ToolFAQ[];
  relatedSlugs: string[];
  body: string[];
}

/** Cluster hub such as /image-tools. */
export interface PseoHub {
  type: "hub";
  slug: string;
  cluster: PseoCluster;
  keyword: string;
  h1: string;
  title: string;
  description: string;
  categorySlug: CategorySlug;
  intro: string[];
  faqs: ToolFAQ[];
  relatedHubSlugs: string[];
}

export type PseoPage = PseoLanding | PseoHub;
