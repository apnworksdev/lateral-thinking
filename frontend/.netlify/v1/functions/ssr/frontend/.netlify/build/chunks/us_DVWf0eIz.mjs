import { r as renderScript, u as urlFor, e as getUsPage, $ as $$Layout } from './Layout_DbODj-rr.mjs';
import { c as createComponent } from './astro-component_C8d3DInK.mjs';
import 'piccolore';
import { m as maybeRenderHead, g as addAttribute, r as renderTemplate, n as renderSlot, k as renderComponent } from './ssr-function_B8RLh-wI.mjs';
import { $ as $$Menu } from './Menu_JDfvcPsK.mjs';
import { $ as $$PortableText } from './PortableText_CCZbX0dj.mjs';
import { $ as $$Constellation, a as $$UsParagraph } from './UsParagraph_ZPITu8lU.mjs';
import 'clsx';
import { $ as $$TextLink } from './TextLink_DRfAeFE9.mjs';

const $$ContactForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ContactForm;
  const { title, sanity } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="us-form" data-us-form hidden> <div class="us-form__panel"> <button type="button" class="us-form__back bull-5-mono bull-5-mono--sm" data-close-form>
[X] BACK
</button> ${title && renderTemplate`<h2 class="us-form__title neu-haas-display" data-typewriter-desktop${addAttribute(sanity, "data-sanity")}> ${title} </h2>`} <form class="us-form__fields" data-contact-form> <label class="us-form__field"> <span class="bull-5-mono bull-5-mono--sm">Name</span> <input name="name" type="text" autocomplete="name" required> </label> <label class="us-form__field"> <span class="bull-5-mono bull-5-mono--sm">Company</span> <input name="company" type="text" autocomplete="organization"> </label> <label class="us-form__field"> <span class="bull-5-mono bull-5-mono--sm">Email</span> <input name="email" type="email" autocomplete="email" required> </label> <label class="us-form__field"> <span class="bull-5-mono bull-5-mono--sm">What are you looking for?</span> <input name="lookingFor" type="text"> </label> <label class="us-form__field"> <span class="bull-5-mono bull-5-mono--sm">Where is it happening?</span> <input name="where" type="text"> </label> <label class="us-form__field"> <span class="bull-5-mono bull-5-mono--sm">Tell us about your project</span> <textarea name="project" rows="5" required></textarea> </label> <button type="submit" class="us-form__back bull-5-mono bull-5-mono--lg">[ Send ]</button> <p class="us-form__status bull-5-mono bull-5-mono--lg" data-form-status hidden></p> </form> </div> </div> ${renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/ContactForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/ContactForm.astro", void 0);

const $$FormOpen = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button type="button" class="us-form-open" data-open-form> ${renderSlot($$result, $$slots["default"])} </button>`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/FormOpen.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$UsPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$UsPage;
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
  return renderTemplate(_a || (_a = __template(["", '<section class="us"> ', " ", " ", ' </section> <script>\n  if (window.matchMedia("(max-width: 1023px)").matches) {\n    document.querySelectorAll("[data-typewriter-desktop]").forEach((node) => {\n      node.classList.remove("is-typing");\n      node.querySelector(".home__type")?.remove();\n    });\n  }\n</script> ', ""])), maybeRenderHead(), images.length > 0 && renderTemplate`<div class="us__scene" data-us-scene> <svg class="us__lines" aria-hidden="true"></svg> <div class="us__node" data-us-node aria-hidden="true"></div> <div class="us__node us__node--small" aria-hidden="true"></div> <ul class="us__gallery"${addAttribute(dataAttr?.scope("images").toString(), "data-sanity")}> ${images.map((image, index) => {
    const spot = place(index);
    return renderTemplate`<li${addAttribute(`--x: ${spot.x}%; --y: ${spot.y}%; --w: ${spot.w}px`, "style")}> <img${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")}> </li>`;
  })} </ul> </div>`, page.sections && page.sections.length > 0 && renderTemplate`<div class="us__sections"${addAttribute(dataAttr?.scope("sections").toString(), "data-sanity")}> ${page.sections.map((section) => renderTemplate`<article class="us__section"> ${section.title && renderTemplate`<h2 class="us__title is-typing bull-5-mono" data-typewriter-desktop> ${section.title} </h2>`} ${section.text && renderTemplate`<div class="us__text is-typing neu-haas-display" data-typewriter-desktop> ${renderComponent($$result, "PortableText", $$PortableText, { "value": section.text, "components": {
    block: { normal: $$UsParagraph },
    mark: { link: $$TextLink, form: $$FormOpen }
  } })} </div>`} </article>`)} ${renderComponent($$result, "ContactForm", $$ContactForm, { "title": page.formTitle, "sanity": dataAttr?.scope("formTitle").toString() })} </div>`, renderComponent($$result, "Constellation", $$Constellation, {}), renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/UsPage.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/UsPage.astro", void 0);

const $$Us = createComponent(async ($$result, $$props, $$slots) => {
  const page = await getUsPage();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Us", "fullBleed": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${page ? renderTemplate`${renderComponent($$result2, "UsPage", $$UsPage, { "page": page })}` : renderTemplate`${maybeRenderHead()}<p class="us-empty">Publica Us en el Studio para verla aquí.</p>`}` })}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/us.astro", void 0);

const $$file = "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/us.astro";
const $$url = "/us";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Us,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
