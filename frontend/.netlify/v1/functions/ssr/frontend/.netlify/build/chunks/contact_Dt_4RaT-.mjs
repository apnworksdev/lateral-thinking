import { a as getContactPage, $ as $$Layout } from './Layout_4Ua5HtCJ.mjs';
import { c as createComponent } from './astro-component_DQ6--xB8.mjs';
import 'piccolore';
import { n as renderComponent, h as renderTemplate, m as maybeRenderHead } from './ssr-function_q3Roc35i.mjs';
import { $ as $$HomePage } from './index_hXoGaqc2.mjs';
import { $ as $$Menu } from './Menu_C60B7_Wv.mjs';

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const contact = await getContactPage();
  function headlineDescription(headline) {
    if (!headline) return void 0;
    if (typeof headline === "string") return headline;
    const text = headline.flatMap(
      (block) => block._type === "block" && Array.isArray(block.children) ? block.children.map((child) => "text" in child ? child.text : "") : []
    ).join(" ").replace(/\s+/g, " ").trim();
    return text || void 0;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact", "description": headlineDescription(contact?.headline), "fullBleed": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${contact ? renderTemplate`${renderComponent($$result2, "HomePage", $$HomePage, { "home": contact, "typewriterSessionKey": "contact" })}` : renderTemplate`${maybeRenderHead()}<p class="home-empty">Publica Contact en el Studio para verla aquí.</p>`}` })}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/contact.astro", void 0);

const $$file = "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
