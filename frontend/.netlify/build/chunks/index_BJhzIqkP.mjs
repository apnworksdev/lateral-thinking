import { h as getProjects, $ as $$Layout, r as renderScript } from './Layout_4Ua5HtCJ.mjs';
import { c as createComponent } from './astro-component_DQ6--xB8.mjs';
import 'piccolore';
import { n as renderComponent, h as renderTemplate, m as maybeRenderHead, g as addAttribute, o as Fragment } from './ssr-function_q3Roc35i.mjs';
import { $ as $$Menu } from './Menu_C60B7_Wv.mjs';
/* empty css               */

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await getProjects();
  const listed = Array.from({ length: 4 }, () => projects).flat();
  const categories = [
    ...new Map(
      projects.flatMap((project) => project.categories ?? []).filter((category) => category.slug && category.title).map((category) => [category.slug, category])
    ).values()
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Work", "fullBleed": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${categories.length > 0 && renderTemplate`${maybeRenderHead()}<div class="work__filters bull-5-mono" role="group" aria-label="Categorías"> <span class="work__filters-label"><span>[</span>filters<span>]</span></span> <button type="button" data-filter="all" aria-pressed="true"> <span class="work__filters-bracket">[</span>
All
<span class="work__filters-bracket">]</span> </button> ${categories.map((category) => renderTemplate`<button type="button"${addAttribute(category.slug, "data-filter")} aria-pressed="false"> <span class="work__filters-bracket">[</span> ${category.title} <span class="work__filters-bracket">]</span> </button>`)} </div>`}<section class="work"> ${listed.length > 0 ? renderTemplate`<ul class="work__list"> ${listed.map((project) => {
    const slugs = (project.categories ?? []).map((category) => category.slug).filter(Boolean).join(" ");
    return renderTemplate`<li${addAttribute(slugs, "data-categories")}> <a${addAttribute(`/work/${project.slug}`, "href")}> <span class="work__title  neu-haas-display neu-haas-display--lg">${project.client && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`<span class="work__bracket">[</span>${project.client}<span class="work__bracket">]</span>${" "}` })}`}${project.title}</span> </a> </li>`;
  })} </ul>` : renderTemplate`<p class="work__empty">Publica un proyecto en el Studio para verlo aquí.</p>`} </section> ` })} ${renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/work/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/work/index.astro", void 0);

const $$file = "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/work/index.astro";
const $$url = "/work";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
