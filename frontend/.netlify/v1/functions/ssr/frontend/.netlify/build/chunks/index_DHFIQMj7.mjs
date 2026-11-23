import { i as getHomePage, $ as $$Layout } from './Layout_DbODj-rr.mjs';
import { c as createComponent } from './astro-component_C8d3DInK.mjs';
import 'piccolore';
import { k as renderComponent, r as renderTemplate, m as maybeRenderHead } from './ssr-function_B8RLh-wI.mjs';
import { $ as $$HomePage } from './index_CNt4ok3Z.mjs';
import { $ as $$Menu } from './Menu_JDfvcPsK.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const home = await getHomePage();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lateral Thinking", "description": home?.secondaryText, "fullBleed": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${home ? renderTemplate`${renderComponent($$result2, "HomePage", $$HomePage, { "home": home, "typewriterSessionKey": "home", "landing": true })}` : renderTemplate`${maybeRenderHead()}<p class="home-empty">Publica la Homepage en el Studio para verla aquí.</p>`}` })}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/index.astro", void 0);

const $$file = "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
