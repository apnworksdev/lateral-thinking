import { f as getProject, u as urlFor, $ as $$Layout, r as renderScript } from './Layout_DbODj-rr.mjs';
import { c as createComponent } from './astro-component_C8d3DInK.mjs';
import 'piccolore';
import { k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as Fragment, g as addAttribute } from './ssr-function_B8RLh-wI.mjs';
import { $ as $$PortableText } from './PortableText_CCZbX0dj.mjs';
import { $ as $$Menu } from './Menu_JDfvcPsK.mjs';
import { $ as $$TextLink } from './TextLink_DRfAeFE9.mjs';
import { v as vimeoPlayerUrl } from './vimeo_UYoX7-yt.mjs';
/* empty css               */

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const components = { mark: { link: $$TextLink } };
  function plainText(blocks) {
    const text = blocks?.flatMap(
      (block) => block._type === "block" && Array.isArray(block.children) ? block.children.map((child) => "text" in child ? child.text : "") : []
    ).join(" ").replace(/\s+/g, " ").trim();
    return text || void 0;
  }
  const { slug } = Astro2.params;
  const project = slug ? await getProject(slug) : null;
  if (!project) {
    return Astro2.rewrite("/404");
  }
  const files = (project.files ?? []).flatMap((file) => {
    if (file.source === "image" && file.image?.asset) {
      return [
        {
          key: file._key,
          source: "image",
          alt: file.alt || "",
          src: urlFor(file.image).width(1600).auto("format").quality(80).url(),
          full: urlFor(file.image).width(2800).auto("format").quality(85).url()
        }
      ];
    }
    if (file.source === "file" && file.videoUrl) {
      return [{ key: file._key, source: "file", src: file.videoUrl }];
    }
    if (file.source === "vimeo") {
      const src = vimeoPlayerUrl(file.vimeoUrl, false);
      if (src) return [{ key: file._key, source: "vimeo", src }];
    }
    return [];
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": project.title || "Work", "description": plainText(project.description), "fullBleed": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${maybeRenderHead()}<article class="project"> <header class="project__header"> ${(project.title || project.client) && renderTemplate`<h1 class="project__title neu-haas-display neu-haas-display--lg">${project.client && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`<span class="work__bracket">[</span>${project.client}<span class="work__bracket">]</span>${" "}` })}`}${project.title}</h1>`} ${(project.description && project.description.length > 0 || project.extras && project.extras.length > 0) && renderTemplate`<div class="project__intro neu-haas-display font-neu-haas-size-xss"> ${project.description && project.description.length > 0 && renderTemplate`<div class="project__copy"> ${renderComponent($$result2, "PortableText", $$PortableText, { "value": project.description, "components": components })} </div>`} ${project.extras && project.extras.length > 0 && renderTemplate`<div class="project__extras uppercase"> ${project.extras.map((extra) => renderTemplate`<section class="project__copy"> ${extra.text && renderTemplate`${renderComponent($$result2, "PortableText", $$PortableText, { "value": extra.text, "components": components })}`} </section>`)} </div>`} </div>`} </header> ${files.length > 0 && renderTemplate`<ul class="project__gallery"> ${files.map((file) => renderTemplate`<li> ${file.source === "image" && renderTemplate`<img${addAttribute(file.src, "src")}${addAttribute(file.alt, "alt")}>`} ${file.source === "file" && renderTemplate`<video${addAttribute(file.src, "src")} controls playsinline></video>`} ${file.source === "vimeo" && renderTemplate`<iframe${addAttribute(file.src, "src")} title="Vídeo" allow="autoplay; fullscreen; picture-in-picture"></iframe>`} </li>`)} </ul>`} ${files.length > 0 && renderTemplate`<div class="project__viewer" hidden> <button type="button" class="us-form__back bull-5-mono bull-5-mono--sm" data-project-back>
[X] BACK
</button> <ul class="project__viewer-track"> ${files.map((file) => renderTemplate`<li> ${file.source === "image" && renderTemplate`<img${addAttribute(file.full, "src")}${addAttribute(file.alt, "alt")} draggable="false">`} ${file.source === "file" && renderTemplate`<video${addAttribute(file.src, "src")} controls playsinline></video>`} ${file.source === "vimeo" && renderTemplate`<iframe${addAttribute(file.src, "src")} title="Vídeo" allow="autoplay; fullscreen; picture-in-picture"></iframe>`} </li>`)} </ul> </div>`} ${project.longDescription && project.longDescription.length > 0 && renderTemplate`<div class="project__copy project__long uppercase bull-5-mono bull-5-mono--sm"> ${renderComponent($$result2, "PortableText", $$PortableText, { "value": project.longDescription, "components": components })} </div>`} </article> ` })} ${renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/work/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/work/[slug].astro", void 0);

const $$file = "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/work/[slug].astro";
const $$url = "/work/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
