import { stegaClean } from '@sanity/client/stega';

function vimeoPlayerUrl(rawUrl, background = true) {
  if (!rawUrl) return void 0;
  let url;
  try {
    url = new URL(stegaClean(rawUrl));
  } catch {
    return void 0;
  }
  if (!url.hostname.endsWith("vimeo.com")) return void 0;
  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts.find((part) => /^\d+$/.test(part));
  if (!id) return void 0;
  const idIndex = parts.indexOf(id);
  const hash = url.searchParams.get("h") || (parts[idIndex + 1] && !/^\d+$/.test(parts[idIndex + 1]) ? parts[idIndex + 1] : "");
  const params = background ? new URLSearchParams({
    background: "1",
    autoplay: "1",
    loop: "1",
    muted: "1",
    autopause: "0",
    title: "0",
    byline: "0",
    portrait: "0"
  }) : new URLSearchParams({
    title: "0",
    byline: "0",
    portrait: "0"
  });
  if (hash) params.set("h", hash);
  return `https://player.vimeo.com/video/${id}?${params}`;
}

export { vimeoPlayerUrl as v };
