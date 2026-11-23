import { c as createComponent } from './astro-component_C8d3DInK.mjs';
import 'piccolore';
import { r as renderTemplate, m as maybeRenderHead, n as renderSlot } from './ssr-function_B8RLh-wI.mjs';
import 'clsx';
import { r as renderScript } from './Layout_DbODj-rr.mjs';

const $$Constellation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/Constellation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/Constellation.astro", void 0);

const $$UsParagraph = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<p>${renderSlot($$result, $$slots["default"])}</p>`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/UsParagraph.astro", void 0);

export { $$Constellation as $, $$UsParagraph as a };
