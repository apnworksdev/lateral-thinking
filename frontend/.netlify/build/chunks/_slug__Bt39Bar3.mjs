import { b as getPost, u as urlFor, $ as $$Layout, c as buildSrcSet } from './Layout_4Ua5HtCJ.mjs';
import { c as createComponent } from './astro-component_DQ6--xB8.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as renderTemplate, n as renderComponent, o as Fragment, u as unescapeHTML, g as addAttribute } from './ssr-function_q3Roc35i.mjs';
import { $ as $$PortableText } from './PortableText_Cpl5X6au.mjs';
import { createHighlighter, bundledLanguages } from 'shiki';

const $$CodeBlock = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CodeBlock;
  const { node } = Astro2.props;
  const { code, language, filename } = node;
  const langAliases = {
    groq: "javascript",
    astro: "tsx"
  };
  const resolvedLang = langAliases[language] ?? language ?? "text";
  const lang = resolvedLang in bundledLanguages ? resolvedLang : "text";
  const highlighter = await createHighlighter({
    themes: ["github-dark-dimmed"],
    langs: [lang]
  });
  const html = highlighter.codeToHtml(code, {
    lang,
    theme: "github-dark-dimmed"
  });
  return renderTemplate`${maybeRenderHead()}<div class="code-block"> ${filename && renderTemplate`<div class="code-block__filename">${filename}</div>`} ${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(html)}` })} </div>`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/CodeBlock.astro", void 0);

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const post = await getPost(slug);
  if (!post) {
    return Astro2.rewrite("/404");
  }
  const dataAttr = null;
  const seoTitle = post.seo?.metaTitle || post.title;
  const seoDescription = post.seo?.metaDescription || post.excerpt;
  const ogImageSource = post.seo?.ogImage ?? post.mainImage;
  const ogImage = ogImageSource ? urlFor(ogImageSource).width(1200).height(630).fit("crop").auto("format").quality(80).url() : void 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": seoTitle ?? "Post", "description": seoDescription, "image": ogImage }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="w-full my-1 mb-5"> ${post.mainImage ? renderTemplate`<img class="w-full h-50 object-cover md:w-187.5 md:h-95"${addAttribute(urlFor(post.mainImage).width(750).auto("format").quality(85).url(), "src")}${addAttribute(buildSrcSet(post.mainImage, [375, 750, 1200], 85), "srcset")} sizes="(max-width: 800px) 100vw, 750px"${addAttribute(post.mainImage.width, "width")}${addAttribute(post.mainImage.height, "height")} loading="eager" decoding="sync"${addAttribute(post.mainImage.alt || "", "alt")}${addAttribute(dataAttr?.scope("mainImage").toString(), "data-sanity")}>` : renderTemplate`<div class="w-full h-50 bg-black md:w-187.5 md:h-95"></div>`} <div class="px-3"> <h1 class="font-sans font-extrabold text-4xl leading-9 my-5 md:text-7xl md:leading-18 md:mt-13 md:mb-0 md:-tracking-[0.025em]">${post.title}</h1> <p class="font-serif font-normal text-2xl leading-7 mt-0 md:leading-8 md:mt-3 md:mb-3"${addAttribute(dataAttr?.scope("excerpt").toString(), "data-sanity")}>${post.excerpt}</p> <p class="font-sans font-semibold text-sm leading-5 mt-5 md:text-lg md:leading-6 md:mt-0"> ${formatDate(post._createdAt)} </p> <div class="prose prose-lg prose-serif mt-13 md:mt-21 max-w-none prose-blockquote:border-l-[5px] prose-blockquote:border-black prose-blockquote:pl-3 prose-blockquote:ml-5 prose-a:text-blue-600 prose-a:no-underline"${addAttribute(dataAttr?.scope("body").toString(), "data-sanity")}> ${renderComponent($$result2, "PortableText", $$PortableText, { "value": post.body, "components": { type: { code: $$CodeBlock } } })} </div> </div> </section> ` })}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/post/[slug].astro", void 0);
const $$file = "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/post/[slug].astro";
const $$url = "/post/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
