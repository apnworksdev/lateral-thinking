import { c as createComponent } from './astro-component_C8d3DInK.mjs';
import 'piccolore';
import { m as maybeRenderHead, n as renderSlot, r as renderTemplate, g as addAttribute, k as renderComponent } from './ssr-function_B8RLh-wI.mjs';
import { u as urlFor, r as renderScript } from './Layout_DbODj-rr.mjs';
import { $ as $$PortableText } from './PortableText_CCZbX0dj.mjs';
import 'clsx';
import { $ as $$TextLink } from './TextLink_DRfAeFE9.mjs';
import { v as vimeoPlayerUrl } from './vimeo_UYoX7-yt.mjs';

const $$HeadlineText = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<span>${renderSlot($$result, $$slots["default"])}</span>`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/HeadlineText.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$HomePage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$HomePage;
  const { home, typewriterSessionKey, landing = false } = Astro2.props;
  const dataAttr = null;
  const imageUrl = home.image?.asset ? urlFor(home.image).width(2e3).height(1200).fit("crop").auto("format").quality(80).url() : void 0;
  const mobileImageUrl = home.mobileImage?.asset ? urlFor(home.mobileImage).width(900).height(1600).fit("crop").auto("format").quality(80).url() : void 0;
  const vimeoSrc = home.backgroundType === "vimeo" ? vimeoPlayerUrl(home.vimeoUrl) : void 0;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(["home", landing && "home--landing"], "class:list")}${addAttribute(typewriterSessionKey, "data-typewriter-session")}> <style>
    .home__headline.is-typing,
    .home__secondary.is-typing,
    .home__highlight.is-typing {
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
    }
    .home__secondary.is-typing,
    .home__highlight.is-typing {
      background: none !important;
      background-color: transparent !important;
    }
    .home__headline.is-typing > :not(.home__type),
    .home__secondary.is-typing > :not(.home__type),
    .home__highlight.is-typing > :not(.home__type) {
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
      background: none !important;
    }
    .home__meta.is-pending {
      opacity: 0 !important;
      visibility: hidden !important;
    }
  </style> ${typewriterSessionKey && renderTemplate(_a || (_a = __template(['<script>\n        (function () {\n          var root = document.currentScript && document.currentScript.parentElement;\n          if (!root) return;\n          var key = root.getAttribute("data-typewriter-session");\n          if (!key) return;\n          try {\n            if (sessionStorage.getItem("lt-typewriter-" + key) === "1") {\n              root\n                .querySelectorAll(".home__headline.is-typing, .home__secondary.is-typing, .home__highlight.is-typing")\n                .forEach(function (el) {\n                  el.classList.remove("is-typing");\n                });\n              root.querySelectorAll(".home__meta.is-pending").forEach(function (el) {\n                el.classList.remove("is-pending");\n              });\n            }\n          } catch (e) {}\n        })();\n      </script>'])))} ${home.backgroundType === "image" && imageUrl && renderTemplate`<img${addAttribute(["home__media", mobileImageUrl && "home__media--desktop"], "class:list")}${addAttribute(imageUrl, "src")}${addAttribute(home.image?.alt || "", "alt")}${addAttribute(dataAttr?.scope("image").toString(), "data-sanity")}>`} ${home.backgroundType === "image" && mobileImageUrl && renderTemplate`<img class="home__media home__media--mobile"${addAttribute(mobileImageUrl, "src")}${addAttribute(home.mobileImage?.alt || home.image?.alt || "", "alt")}${addAttribute(dataAttr?.scope("mobileImage").toString(), "data-sanity")}>`} ${home.backgroundType === "file" && home.videoUrl && renderTemplate`<video class="home__media"${addAttribute(home.videoUrl, "src")} autoplay muted loop playsinline${addAttribute(dataAttr?.scope("videoFile").toString(), "data-sanity")}></video>`} ${home.backgroundType === "vimeo" && vimeoSrc && renderTemplate`<iframe class="home__vimeo"${addAttribute(vimeoSrc, "src")} title="Vídeo de fondo" allow="autoplay; fullscreen"${addAttribute(dataAttr?.scope("vimeoUrl").toString(), "data-sanity")}></iframe>`} <div class="home__veil"></div> <div class="home__content"> ${home.headline && renderTemplate`<h1 class="home__headline is-typing neu-haas-display"${addAttribute(dataAttr?.scope("headline").toString(), "data-sanity")}> ${Array.isArray(home.headline) ? renderTemplate`${renderComponent($$result, "PortableText", $$PortableText, { "value": home.headline, "components": { block: { normal: $$HeadlineText }, mark: { link: $$TextLink } } })}` : renderTemplate`<span>${home.headline}</span>`} </h1>`} ${(home.secondaryText || home.highlight) && renderTemplate`<div class="home__meta bull-5-mono is-pending"> ${home.secondaryText && renderTemplate`<p class="home__secondary is-typing"${addAttribute(dataAttr?.scope("secondaryText").toString(), "data-sanity")}> ${home.secondaryText} </p>`} ${home.highlight && renderTemplate`<p class="home__highlight is-typing"${addAttribute(dataAttr?.scope("highlight").toString(), "data-sanity")}> ${home.highlight} </p>`} </div>`} </div> </section> ${renderScript($$result, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/HomePage.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/lucia/Desktop/SERVERS/LATERAL_THINKING/frontend/src/components/HomePage.astro", void 0);

export { $$HomePage as $ };
