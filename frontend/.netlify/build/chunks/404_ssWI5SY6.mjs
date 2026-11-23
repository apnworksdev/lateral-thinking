import { $ as $$Layout } from './Layout_4Ua5HtCJ.mjs';
import { c as createComponent } from './astro-component_DQ6--xB8.mjs';
import 'piccolore';
import { n as renderComponent, h as renderTemplate, m as maybeRenderHead } from './ssr-function_q3Roc35i.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page not found — Astro + Sanity" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-start px-3 pt-13 gap-3"> <p class="font-mono text-sm font-medium text-gray-600 m-0 tracking-widest">404</p> <h1 class="font-sans text-5xl font-extrabold leading-12 -tracking-[0.025em] m-0 text-black">Page not found</h1> <p class="font-serif text-xl leading-7 text-gray-600 m-0">
The page you're looking for doesn't exist or has been moved.
</p> <a class="font-sans text-base font-medium text-blue-600 no-underline mt-2 hover:underline" href="/">← Back to home</a> </div> ` })}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/404.astro", void 0);

const $$file = "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
