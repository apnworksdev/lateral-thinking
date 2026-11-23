import { g as getArchiveProjects, $ as $$Layout, r as renderScript, u as urlFor } from './Layout_4Ua5HtCJ.mjs';
import { c as createComponent } from './astro-component_DQ6--xB8.mjs';
import 'piccolore';
import { n as renderComponent, h as renderTemplate, m as maybeRenderHead, g as addAttribute } from './ssr-function_q3Roc35i.mjs';
import { $ as $$Menu } from './Menu_C60B7_Wv.mjs';

const $$Archive = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await getArchiveProjects();
  const listed = Array.from({ length: 10 }, () => projects).flat();
  const categories = [
    ...new Map(
      projects.flatMap((project) => project.categories ?? []).filter((category) => category.slug && category.title).map((category) => [category.slug, category])
    ).values()
  ];
  function formatDate(value) {
    const [year, month, day] = value?.slice(0, 10).split("-") ?? [];
    if (!year || !month || !day) return null;
    return { day, month, year };
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Archive", "fullBleed": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Menu", $$Menu, {})} ${categories.length > 0 && renderTemplate`${maybeRenderHead()}<div class="archive__filters bull-5-mono" role="group" aria-label="Categorías"> <span class="archive__filters-label"><span>[</span>filters<span>]</span></span> <button type="button" data-filter="all" aria-pressed="true"> <span class="archive__filters-bracket">[</span>
All
<span class="archive__filters-bracket">]</span> </button> ${categories.map((category) => renderTemplate`<button type="button"${addAttribute(category.slug, "data-filter")} aria-pressed="false"> <span class="archive__filters-bracket">[</span> ${category.title} <span class="archive__filters-bracket">]</span> </button>`)} </div>`}<section class="archive"> ${listed.length > 0 ? renderTemplate`<ul class="archive__list"> ${listed.map((project) => {
    const date = formatDate(project.date);
    const projectServices = (project.services ?? []).filter(Boolean);
    const image = project.mainImage?.asset ? urlFor(project.mainImage).width(1600).auto("format").quality(80).url() : void 0;
    return renderTemplate`<li class="archive__item"${addAttribute((project.categories ?? []).map((category) => category.slug).filter(Boolean).join(" "), "data-categories")}> <div class="archive__line bull-5-mono uppercase"> <span class="archive__hit" aria-hidden="true"></span> ${date && renderTemplate`<div class="archive__field archive__date"> <span class="archive__field-text"><span class="archive__date-rest">${date.day} ${date.month} </span>${date.year}</span> </div>`} ${project.location && renderTemplate`<div class="archive__field archive__location"> <span class="archive__field-text">${project.location}</span> </div>`} ${project.client && renderTemplate`<div class="archive__field archive__client"> <span class="archive__field-text"><span class="archive__bracket">[</span>${project.client}]</span> </div>`} ${project.title && renderTemplate`<div class="archive__field archive__title"> <span class="archive__field-text">${project.title}</span> </div>`} ${projectServices.length > 0 && renderTemplate`<div class="archive__field archive__services"> <span class="archive__field-text">${projectServices.join(", ")}</span> </div>`} </div> ${image && renderTemplate`<img class="archive__hover"${addAttribute(image, "src")}${addAttribute(project.mainImage?.alt || "", "alt")}>`} </li>`;
  })} </ul>` : renderTemplate`<p class="archive__empty">Publica un proyecto en Archivo para verlo aquí.</p>`} </section> ` })} ${renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/archive.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/archive.astro", void 0);

const $$file = "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/archive.astro";
const $$url = "/archive";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Archive,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
