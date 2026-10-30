import { stegaClean } from "@sanity/client/stega";

/**
 * Turns a Vimeo watch URL into a full-bleed player URL.
 * `background=1` hides the controls. That mode needs a paid Vimeo plan;
 * on a free plan the player may still show its own chrome.
 */
export function vimeoPlayerUrl(rawUrl: string | undefined, background = true): string | undefined {
  if (!rawUrl) return undefined;

  let url: URL;
  try {
    url = new URL(stegaClean(rawUrl));
  } catch {
    return undefined;
  }

  if (!url.hostname.endsWith("vimeo.com")) return undefined;

  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts.find((part) => /^\d+$/.test(part));
  if (!id) return undefined;

  const idIndex = parts.indexOf(id);
  const hash =
    url.searchParams.get("h") ||
    (parts[idIndex + 1] && !/^\d+$/.test(parts[idIndex + 1])
      ? parts[idIndex + 1]
      : "");

  const params = background
    ? new URLSearchParams({
        background: "1",
        autoplay: "1",
        loop: "1",
        muted: "1",
        autopause: "0",
        title: "0",
        byline: "0",
        portrait: "0",
      })
    : new URLSearchParams({
        title: "0",
        byline: "0",
        portrait: "0",
      });
  if (hash) params.set("h", hash);

  return `https://player.vimeo.com/video/${id}?${params}`;
}
