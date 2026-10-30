import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Slug } from "@sanity/types";
import groq from "groq";

const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
const token = import.meta.env.SANITY_API_READ_TOKEN;

// visualEditingEnabled=true: fetch draft content with stega encoding (local/staging with Presentation tool)
// visualEditingEnabled=false: fetch published content from CDN (production)
async function loadQuery<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  return sanityClient.fetch<T>(
    query,
    params,
    {
      perspective: visualEditingEnabled ? 'drafts' : 'published',
      useCdn: false,
      ...(visualEditingEnabled && token ? { token, stega: true } : {}),
    }
  );
}

// Shared image projection — dereferences asset to include dimensions and LQIP
const imageProjection = `{
  ...,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
}`;

const mediaProjection = `{
  _key,
  source,
  alt,
  image ${imageProjection},
  "videoUrl": videoFile.asset->url,
  vimeoUrl
}`;

export async function getPosts(): Promise<Post[]> {
  return loadQuery<Post[]>(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
      ...,
      mainImage ${imageProjection}
    }`,
  );
}

export async function getIntroPage(): Promise<IntroPage | null> {
  return loadQuery<IntroPage | null>(
    groq`*[_id == "introPage"][0]{
      _id,
      _type,
      images[] ${imageProjection}
    }`,
  );
}

export async function getServicesPage(): Promise<ServicesPage | null> {
  return loadQuery<ServicesPage | null>(
    groq`*[_id == "servicesPage"][0]{
      _id,
      _type,
      images[] ${imageProjection},
      lead,
      sections[]{
        _key,
        title,
        text
      }
    }`,
  );
}

export async function getArchiveProjects(): Promise<ArchiveProject[]> {
  return loadQuery<ArchiveProject[]>(
    groq`*[_type == "project" && placement in ["archive", "both"]] | order(date desc){
      _id,
      _type,
      title,
      client,
      location,
      date,
      services,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      mainImage ${imageProjection}
    }`,
  );
}

export async function getProjects(): Promise<Project[]> {
  return loadQuery<Project[]>(
    groq`*[_type == "project" && defined(slug.current) && placement != "archive"] | order(title asc){
      _id,
      _type,
      title,
      "slug": slug.current,
      client,
      description,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      "cover": files[source == "image"][0] ${mediaProjection}
    }`,
  );
}

export async function getProject(slug: string): Promise<Project | null> {
  return loadQuery<Project | null>(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      "slug": slug.current,
      client,
      description,
      longDescription,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      files[] ${mediaProjection},
      extras[]{
        _key,
        text
      }
    }`,
    { slug },
  );
}

export async function getUsPage(): Promise<UsPage | null> {
  return loadQuery<UsPage | null>(
    groq`*[_id == "usPage"][0]{
      _id,
      _type,
      images[] ${imageProjection},
      formTitle,
      sections[]{
        _key,
        title,
        text
      }
    }`,
  );
}

export async function getContactPage(): Promise<HomePage | null> {
  return loadQuery<HomePage | null>(
    groq`*[_id == "contactPage"][0]{
      _id,
      _type,
      backgroundType,
      headline,
      image ${imageProjection},
      mobileImage ${imageProjection},
      "videoUrl": videoFile.asset->url,
      vimeoUrl
    }`,
  );
}

export async function getHomePage(): Promise<HomePage | null> {
  return loadQuery<HomePage | null>(
    groq`*[_id == "homePage"][0]{
      _id,
      _type,
      backgroundType,
      headline,
      secondaryText,
      highlight,
      image ${imageProjection},
      mobileImage ${imageProjection},
      "videoUrl": videoFile.asset->url,
      vimeoUrl
    }`,
  );
}

export async function getPost(slug: string): Promise<Post> {
  return loadQuery<Post>(
    groq`*[_type == "post" && slug.current == $slug][0] {
      ...,
      mainImage ${imageProjection},
      seo {
        ...,
        ogImage ${imageProjection}
      }
    }`,
    { slug },
  );
}

export interface SanityImage {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  /** Original image width in pixels, from asset metadata */
  width: number;
  /** Original image height in pixels, from asset metadata */
  height: number;
  /** Low-quality image placeholder (base64 data URL) */
  lqip?: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface IntroPage {
  _id: string;
  _type: "introPage";
  images?: SanityImage[];
}

export interface UsSection {
  _key: string;
  title?: string;
  text?: PortableTextBlock[];
}

export interface ProjectCategory {
  _id: string;
  title?: string;
  slug?: string;
}

export interface MediaItem {
  _key?: string;
  source?: "image" | "file" | "vimeo";
  alt?: string;
  image?: SanityImage;
  videoUrl?: string;
  vimeoUrl?: string;
}

export interface ProjectExtra {
  _key: string;
  text?: PortableTextBlock[];
}

export interface ArchiveProject {
  _id: string;
  _type: "project";
  title?: string;
  client?: string;
  location?: string;
  date?: string;
  services?: string[];
  categories?: ProjectCategory[];
  mainImage?: SanityImage;
}

export interface Project {
  _id: string;
  _type: "project";
  title?: string;
  slug?: string;
  client?: string;
  description?: PortableTextBlock[];
  longDescription?: PortableTextBlock[];
  categories?: ProjectCategory[];
  cover?: MediaItem;
  files?: MediaItem[];
  extras?: ProjectExtra[];
}

export interface UsPage {
  _id: string;
  _type: "usPage";
  images?: SanityImage[];
  formTitle?: string;
  sections?: UsSection[];
}

export interface ServicesPage {
  _id: string;
  _type: "servicesPage";
  images?: SanityImage[];
  lead?: PortableTextBlock[];
  sections?: UsSection[];
}

export interface HomePage {
  _id: string;
  _type: "homePage" | "contactPage";
  backgroundType?: "image" | "file" | "vimeo";
  headline?: string | PortableTextBlock[];
  secondaryText?: string;
  highlight?: string;
  image?: SanityImage;
  mobileImage?: SanityImage;
  videoUrl?: string;
  vimeoUrl?: string;
}

export interface Post {
  _id: string;
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: SanityImage;
  body: PortableTextBlock[];
  seo?: Seo;
}
