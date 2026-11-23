import { c as createComponent } from './astro-component_DQ6--xB8.mjs';
import 'piccolore';
import { m as maybeRenderHead, g as addAttribute, p as renderSlot, h as renderTemplate } from './ssr-function_q3Roc35i.mjs';
import 'clsx';
import { stegaClean } from '@sanity/client/stega';

const $$TextLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TextLink;
  const raw = stegaClean(Astro2.props.node?.markDef?.href ?? "");
  function linkHref(value) {
    const href2 = value.trim();
    if (!href2 || /^(https?:|mailto:|tel:|\/|#)/i.test(href2)) return href2;
    if (href2.includes("@")) return `mailto:${href2}`;
    if (/^\+?[\d\s()-]{6,}$/.test(href2)) return `tel:${href2.replace(/\s/g, "")}`;
    return href2;
  }
  const href = linkHref(raw);
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}>${renderSlot($$result, $$slots["default"])}</a>`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/TextLink.astro", void 0);

export { $$TextLink as $ };
