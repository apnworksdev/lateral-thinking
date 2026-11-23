import { c as createComponent } from './astro-component_C8d3DInK.mjs';
import 'piccolore';
import { o as createRenderInstruction, g as addAttribute, r as renderTemplate, k as renderComponent, m as maybeRenderHead, n as renderSlot, p as renderHead } from './ssr-function_B8RLh-wI.mjs';
import 'clsx';
import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient } from '@sanity/client';
import groq from 'groq';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const sanityClient = createClient(
            {"apiVersion":"2026-03-26","projectId":"44td79qb","dataset":"production","useCdn":false,"stega":{"studioUrl":"http:\u002F\u002Flocalhost:3333"}}
          );

globalThis.sanityClient = sanityClient;

const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/node_modules/astro/components/ClientRouter.astro", void 0);

const $$VisualEditing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$VisualEditing;
  const { enabled, zIndex } = Astro2.props;
  return renderTemplate`${enabled ? renderTemplate`${renderComponent($$result, "VisualEditingComponent", null, { "client:only": "react", "zIndex": zIndex, "client:component-hydration": "only", "client:component-path": "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/node_modules/@sanity/astro/dist/visual-editing/visual-editing-component", "client:component-export": "VisualEditingComponent" })}` : null}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/node_modules/@sanity/astro/dist/visual-editing/visual-editing.astro", void 0);

const builder = createImageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}
function buildSrcSet(source, widths, quality = 80) {
  return widths.map(
    (w) => `${builder.image(source).width(w).auto("format").quality(quality).url()} ${w}w`
  ).join(", ");
}

async function loadQuery(query, params = {}) {
  return sanityClient.fetch(
    query,
    params,
    {
      perspective: "published",
      useCdn: false,
      ...{}
    }
  );
}
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
async function getIntroPage() {
  return loadQuery(
    groq`*[_id == "introPage"][0]{
      _id,
      _type,
      images[] ${imageProjection}
    }`
  );
}
async function getServicesPage() {
  return loadQuery(
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
    }`
  );
}
async function getArchiveProjects() {
  return loadQuery(
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
    }`
  );
}
async function getProjects() {
  return loadQuery(
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
    }`
  );
}
async function getProject(slug) {
  return loadQuery(
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
    { slug }
  );
}
async function getUsPage() {
  return loadQuery(
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
    }`
  );
}
async function getContactPage() {
  return loadQuery(
    groq`*[_id == "contactPage"][0]{
      _id,
      _type,
      backgroundType,
      headline,
      image ${imageProjection},
      mobileImage ${imageProjection},
      "videoUrl": videoFile.asset->url,
      vimeoUrl
    }`
  );
}
async function getHomePage() {
  return loadQuery(
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
    }`
  );
}
async function getPost(slug) {
  return loadQuery(
    groq`*[_type == "post" && slug.current == $slug][0] {
      ...,
      mainImage ${imageProjection},
      seo {
        ...,
        ogImage ${imageProjection}
      }
    }`,
    { slug }
  );
}

const $$Intro = createComponent(async ($$result, $$props, $$slots) => {
  const page = await getIntroPage();
  const slots = [
    { x: 28, y: 16, w: 150 },
    { x: 42, y: 7, w: 96 },
    { x: 56, y: 11, w: 124 },
    { x: 82, y: 14, w: 196 },
    { x: 52, y: 30, w: 156 },
    { x: 32, y: 38, w: 132 },
    { x: 66, y: 42, w: 148 },
    { x: 88, y: 36, w: 108 },
    { x: 72, y: 56, w: 164 },
    { x: 90, y: 64, w: 136 },
    { x: 46, y: 60, w: 154 },
    { x: 26, y: 74, w: 124 },
    { x: 70, y: 76, w: 200 },
    { x: 36, y: 90, w: 176 },
    { x: 74, y: 92, w: 210 }
  ];
  function place(index) {
    const slot = slots[index];
    if (slot) return slot;
    const n = index - slots.length;
    const angle = -1.1 + n * 0.65;
    return {
      x: Math.min(88, Math.max(24, 58 + Math.cos(angle) * 26)),
      y: Math.min(90, Math.max(12, 50 + Math.sin(angle) * 38)),
      w: 140
    };
  }
  const images = (page?.images ?? []).flatMap((image) => {
    if (!image.asset) return [];
    return [
      {
        key: image.asset._ref,
        alt: image.alt || "",
        src: urlFor(image).width(800).auto("format").quality(80).url()
      }
    ];
  });
  return renderTemplate`${images.length > 0 && renderTemplate`${maybeRenderHead()}<div class="intro" data-intro><div class="us"><div class="us__scene" data-us-scene><svg class="us__lines" aria-hidden="true"></svg><div class="us__node" data-us-node aria-hidden="true"></div><div class="us__node us__node--small" aria-hidden="true"></div><ul class="us__gallery">${images.map((image, index) => {
    const spot = place(index);
    return renderTemplate`<li${addAttribute(`--x: ${spot.x}%; --y: ${spot.y}%; --w: ${spot.w}px`, "style")}><img${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")}></li>`;
  })}</ul></div></div></div>`}${renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/Intro.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/Intro.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, image, fullBleed = false } = Astro2.props;
  const canonicalURL = Astro2.url;
  const visualEditingEnabled = false;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head>', '<meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', '><link rel="canonical"', "><!-- Primary meta -->", '<!-- Open Graph --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', ">", "", '<!-- Twitter --><meta name="twitter:card"', '><meta name="twitter:title"', ">", "", '<!-- Google fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=Inter:wght@500;700;800&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"><title>', "</title>", '</head> <body> <script>\n      var seenIntro = document.cookie.split("; ").some(function (part) {\n        return part.indexOf("lt-intro=") === 0;\n      });\n      if (!seenIntro) document.documentElement.classList.add("intro-open");\n    </script> ', " ", " <div", "> ", " <main", "> ", " </main> ", " </div> </body></html>"])), renderComponent($$result, "ClientRouter", $$ClientRouter, {}), addAttribute(Astro2.generator, "content"), addAttribute(canonicalURL, "href"), description && renderTemplate`<meta name="description"${addAttribute(description, "content")}>`, addAttribute(canonicalURL, "content"), addAttribute(title, "content"), description && renderTemplate`<meta property="og:description"${addAttribute(description, "content")}>`, image && renderTemplate`<meta property="og:image"${addAttribute(image, "content")}>`, addAttribute(image ? "summary_large_image" : "summary", "content"), addAttribute(title, "content"), description && renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>`, image && renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>`, title, renderHead(), renderComponent($$result, "Intro", $$Intro, {}), renderComponent($$result, "VisualEditing", $$VisualEditing, { "enabled": visualEditingEnabled }), addAttribute([!fullBleed && "mx-auto sm:max-w-3xl sm:px-5"], "class:list"), !fullBleed && renderTemplate`<header class="fixed left-0 right-0 top-0 z-10 flex border-b border-gray-200 bg-white px-1 sm:static sm:my-3 sm:border-b-0 sm:bg-transparent sm:py-2"> <a class="my-3 pl-2 text-lg leading-5 font-extrabold text-black no-underline sm:my-3 sm:mb-2 sm:text-2xl" href="/">
Astro + Sanity
</a> </header>`, addAttribute([!fullBleed && "mt-[45px] sm:mt-0"], "class:list"), renderSlot($$result, $$slots["default"]), !fullBleed && renderTemplate`<footer class="flex justify-end px-3 sm:my-3"> <p class="flex items-center gap-0.5 text-sm leading-5">
Made with${" "} <svg data-sanity-icon="heart-filled" width="1em" height="1em" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z" fill="currentColor" stroke="currentColor" stroke-width="1.2"></path> </svg>
at Sanity
</p> </footer>`);
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $, getContactPage as a, getPost as b, buildSrcSet as c, getServicesPage as d, getUsPage as e, getProject as f, getArchiveProjects as g, getProjects as h, getHomePage as i, renderScript as r, urlFor as u };
