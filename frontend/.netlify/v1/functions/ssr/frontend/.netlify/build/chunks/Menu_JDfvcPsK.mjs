import { c as createComponent } from './astro-component_C8d3DInK.mjs';
import 'piccolore';
import { m as maybeRenderHead, g as addAttribute, r as renderTemplate, k as renderComponent } from './ssr-function_B8RLh-wI.mjs';
import { i as getHomePage, r as renderScript } from './Layout_DbODj-rr.mjs';
import 'clsx';

const $$Banner = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Banner;
  const { tone } = Astro2.props;
  const home = await getHomePage();
  const dataAttr = null;
  return renderTemplate`${(home?.secondaryText || home?.highlight) && renderTemplate`${maybeRenderHead()}<aside class="banner bull-5-mono"${addAttribute(tone, "data-tone")}>${home.secondaryText && renderTemplate`<p${addAttribute(dataAttr?.scope("secondaryText").toString(), "data-sanity")}>${home.secondaryText}</p>`}${home.highlight && renderTemplate`<p${addAttribute(dataAttr?.scope("highlight").toString(), "data-sanity")}>${home.highlight}</p>`}</aside>`}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/Banner.astro", void 0);

const $$Menu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Menu;
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const currentPath = Astro2.url.pathname.replace(/\/$/, "") || "/";
  const toneByPath = {
    "/us": "grey",
    "/services": "grey",
    "/work": "grey",
    "/archive": "black"
  };
  const tone = currentPath.startsWith("/work") ? "grey" : toneByPath[currentPath] ?? "white";
  const items = [
    { href: "/contact", label: "Contact" },
    { href: "/us", label: "Us" },
    { href: "/services", label: "Services" },
    { href: "/archive", label: "Archive" },
    { href: "/work", label: "Work" },
    { href: "/", label: "Home" }
  ];
  return renderTemplate`${renderComponent($$result, "Banner", $$Banner, { "tone": tone })} ${maybeRenderHead()}<nav class="menu bull-5-mono"${addAttribute(tone, "data-tone")} aria-label="Menu"> <div class="menu__intro"> <a class="menu__mark" href="/" aria-label="Lateral"></a> <p class="menu__copy">© ${year}</p> </div> <div class="menu__nav"> <ul class="menu__list"> ${items.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute(
    item.href === "/" ? currentPath === "/" ? "page" : void 0 : currentPath === item.href || currentPath.startsWith(`${item.href}/`) ? "page" : void 0,
    "aria-current"
  )}> <span class="menu__bracket" aria-hidden="true">[</span>${" "}${item.label}${" "}<span class="menu__bracket" aria-hidden="true">]</span> </a> </li>`)} </ul> <a class="menu__brand" href="/" data-open-intro aria-label="Lateral Thinking"></a> </div> </nav> ${renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/Menu.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/Menu.astro", void 0);

export { $$Menu as $ };
