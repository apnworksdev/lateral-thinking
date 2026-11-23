import { u as urlFor, r as renderScript, d as getServicesPage, $ as $$Layout } from './Layout_DbODj-rr.mjs';
import { c as createComponent } from './astro-component_C8d3DInK.mjs';
import 'piccolore';
import { r as renderTemplate, k as renderComponent, g as addAttribute, m as maybeRenderHead } from './ssr-function_B8RLh-wI.mjs';
import { $ as $$Menu } from './Menu_JDfvcPsK.mjs';
import { $ as $$PortableText } from './PortableText_CCZbX0dj.mjs';
import { $ as $$Constellation, a as $$UsParagraph } from './UsParagraph_ZPITu8lU.mjs';
import { $ as $$TextLink } from './TextLink_DRfAeFE9.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$ServicesPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ServicesPage;
  const { page } = Astro2.props;
  const dataAttr = null;
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
  const images = (page.images ?? []).flatMap((image) => {
    if (!image.asset) return [];
    return [
      {
        key: image.asset._ref,
        alt: image.alt || "",
        src: urlFor(image).width(800).auto("format").quality(80).url()
      }
    ];
  });
  const linkComponents = { block: { normal: $$UsParagraph }, mark: { link: $$TextLink } };
  return renderTemplate(_a || (_a = __template(["", '<section class="us"> ', ' <div class="services__sections"> ', " ", " </div> ", ' </section> <script>\n  if (window.matchMedia("(max-width: 1023px)").matches) {\n    document.querySelectorAll("[data-typewriter-desktop]").forEach((node) => {\n      node.classList.remove("is-typing");\n      node.querySelector(".home__type")?.remove();\n    });\n  }\n</script> ', ""])), maybeRenderHead(), images.length > 0 && renderTemplate`<div class="us__scene" data-us-scene> <svg class="us__lines" aria-hidden="true"></svg> <div class="us__node" data-us-node aria-hidden="true"></div> <div class="us__node us__node--small" aria-hidden="true"></div> <ul class="us__gallery"${addAttribute(dataAttr?.scope("images").toString(), "data-sanity")}> ${images.map((image, index) => {
    const spot = place(index);
    return renderTemplate`<li${addAttribute(`--x: ${spot.x}%; --y: ${spot.y}%; --w: ${spot.w}px`, "style")}> <img${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")}> </li>`;
  })} </ul> </div>`, page.lead && page.lead.length > 0 && renderTemplate`<div class="services__lead is-typing neu-haas-display" data-typewriter-desktop${addAttribute(dataAttr?.scope("lead").toString(), "data-sanity")}> ${renderComponent($$result, "PortableText", $$PortableText, { "value": page.lead, "components": linkComponents })} </div>`, page.sections?.map((section) => renderTemplate`<article class="services__section"${addAttribute(dataAttr?.scope("sections").toString(), "data-sanity")}> ${section.title && renderTemplate`<h2 class="services__title is-typing neu-haas-display" data-typewriter-desktop> ${section.title} </h2>`} ${section.text && renderTemplate`<div class="services__text is-typing bull-5-mono bull-5-mono--sm" data-typewriter-desktop> ${renderComponent($$result, "PortableText", $$PortableText, { "value": section.text, "components": linkComponents })} </div>`} </article>`), renderComponent($$result, "Constellation", $$Constellation, {}), renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/ServicesPage.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/ServicesPage.astro", void 0);

const $$Services = createComponent(async ($$result, $$props, $$slots) => {
  const page = await getServicesPage();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Services", "fullBleed": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${page ? renderTemplate`${renderComponent($$result2, "ServicesPage", $$ServicesPage, { "page": page })}` : renderTemplate`${maybeRenderHead()}<p class="us-empty">Publica Servicios en el Studio para verla aquí.</p>`}` })}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/services.astro", void 0);

const $$file = "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/services.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
