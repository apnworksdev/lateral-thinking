export const typeStep = 20;

const mobileTypewriterQuery = "(max-width: 1023px)";

function mobileViewport() {
  return window.matchMedia(mobileTypewriterQuery).matches;
}

function desktopOnlyTarget(target: HTMLElement) {
  return target.hasAttribute("data-typewriter-desktop");
}

function releaseTypewriter(target: HTMLElement) {
  target.classList.remove("is-typing");
  target.querySelector(".home__type")?.remove();
  delete target.dataset.typing;
}

function textNodes(root: ParentNode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!(node instanceof Text) || !node.textContent) continue;
    if (node.parentElement === root && !node.textContent.trim()) continue;
    nodes.push(node);
  }
  return nodes;
}

function typewrite(target: HTMLElement, signal?: AbortSignal) {
  return new Promise<void>((resolve) => {
    let settled = false;
    let timer = 0;
    let cleanup = 0;
    let layer: HTMLElement | null = null;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    const abort = () => {
      window.clearInterval(timer);
      window.clearTimeout(cleanup);
      layer?.remove();
      finish();
    };
    if (signal?.aborted) {
      finish();
      return;
    }
    signal?.addEventListener("abort", abort, { once: true });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.classList.remove("is-typing");
      finish();
      return;
    }
    if (desktopOnlyTarget(target) && mobileViewport()) {
      releaseTypewriter(target);
      finish();
      return;
    }
    target.classList.add("is-typing");
    // El original se deja intacto (da el tamaño/centrado); solo se oculta con CSS.
    const source = textNodes(target);
    const sourceTexts = source.map((node) => node.textContent ?? "");
    const total = sourceTexts.reduce((sum, text) => sum + text.length, 0);
    if (!total) {
      target.classList.remove("is-typing");
      finish();
      return;
    }
    layer = document.createElement("div");
    layer.className = "home__type";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = target.innerHTML;
    const typed = textNodes(layer);
    typed.forEach((node) => {
      const ink = document.createElement("span");
      ink.className = "home__ink";
      node.parentNode?.insertBefore(ink, node);
      ink.appendChild(node);
      node.textContent = "";
    });
    target.appendChild(layer);

    let count = 0;
    timer = window.setInterval(() => {
      if (desktopOnlyTarget(target) && mobileViewport()) {
        releaseTypewriter(target);
        abort();
        return;
      }
      if (signal?.aborted || !target.isConnected) {
        abort();
        return;
      }
      if (count >= total) {
        window.clearInterval(timer);
        finish();
        cleanup = window.setTimeout(() => {
          if (!layer?.isConnected) return;
          layer.remove();
          target.classList.remove("is-typing");
        }, 350);
        return;
      }
      count += 1;
      let left = count;
      typed.forEach((node, index) => {
        const full = sourceTexts[index] ?? "";
        const take = Math.min(full.length, Math.max(0, left));
        const next = full.slice(0, take);
        if (node.textContent !== next) node.textContent = next;
        node.parentElement?.classList.toggle("is-on", take > 0);
        left -= full.length;
      });
      const active = [...typed].reverse().find((node) => node.textContent);
      const caret = layer?.querySelector(".home__caret");
      if (active?.parentNode && caret?.previousSibling !== active) {
        caret?.remove();
        const nextCaret = document.createElement("span");
        nextCaret.className = "home__caret";
        active.parentNode.insertBefore(nextCaret, active.nextSibling);
      } else if (!active) {
        caret?.remove();
      }
    }, typeStep);
  });
}

export function typewriteText(target: HTMLElement, signal?: AbortSignal) {
  return typewrite(target, signal);
}

async function typewriteSequence(nodes: HTMLElement[], signal?: AbortSignal) {
  for (const node of nodes) {
    if (signal?.aborted || !node.isConnected) return;
    if (desktopOnlyTarget(node) && mobileViewport()) {
      releaseTypewriter(node);
      continue;
    }
    // Meta solo se revela cuando le toca (tras el headline), no al arrancar la secuencia.
    node.closest(".home__meta")?.classList.remove("is-pending");
    await typewrite(node, signal);
  }
}

function whenVisible(start: () => void, nodes: HTMLElement[]) {
  if (!document.documentElement.classList.contains("intro-open")) {
    start();
    return () => {};
  }
  const observer = new MutationObserver(() => {
    if (nodes.some((node) => !node.isConnected)) {
      observer.disconnect();
      return;
    }
    if (!document.documentElement.classList.contains("intro-open")) {
      observer.disconnect();
      start();
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const bound = new Set<string>();

export function playTypewriter(target: HTMLElement) {
  if (desktopOnlyTarget(target) && mobileViewport()) {
    releaseTypewriter(target);
    return;
  }
  if (target.dataset.typing === "1") return;
  target.dataset.typing = "1";
  target.classList.add("is-typing");
  target.querySelector(".home__type")?.remove();
  void typewrite(target).finally(() => {
    delete target.dataset.typing;
  });
}

function sessionTypewriterKey(node: HTMLElement) {
  return (
    node.dataset.typewriterSession ||
    node.closest("[data-typewriter-session]")?.getAttribute("data-typewriter-session") ||
    null
  );
}

function sessionTypewriterSeen(key: string) {
  try {
    return sessionStorage.getItem(`lt-typewriter-${key}`) === "1";
  } catch {
    return false;
  }
}

function markSessionTypewriter(key: string) {
  try {
    sessionStorage.setItem(`lt-typewriter-${key}`, "1");
  } catch {
    /* private mode */
  }
}

export function bindTypewriter(selector: string) {
  const run = () => {
    document.querySelectorAll(selector).forEach((node) => {
      if (!(node instanceof HTMLElement) || node.dataset.typewriter === "1") return;
      const sessionKey = sessionTypewriterKey(node);
      if (sessionKey && sessionTypewriterSeen(sessionKey)) {
        releaseTypewriter(node);
        node.dataset.typewriter = "1";
        return;
      }
      if (sessionKey) markSessionTypewriter(sessionKey);
      node.dataset.typewriter = "1";
      whenVisible(() => void typewrite(node), [node]);
    });
  };

  run();
  if (!bound.has(selector)) {
    bound.add(selector);
    document.addEventListener("astro:page-load", run);
  }
}

type TypewriterStore = {
  onLoad: Map<string, () => void>;
  onMedia: Map<string, () => void>;
  mediaBound: boolean;
};

function typewriterStore() {
  const root = window as Window & { __ltTypewriter?: TypewriterStore };
  root.__ltTypewriter ??= {
    onLoad: new Map(),
    onMedia: new Map(),
    mediaBound: false,
  };
  return root.__ltTypewriter;
}

function listenSequence(key: string, run: () => void) {
  const state = typewriterStore();
  const previous = state.onLoad.get(key);
  if (previous) document.removeEventListener("astro:page-load", previous);
  state.onLoad.set(key, run);
  document.addEventListener("astro:page-load", run);
  state.onMedia.set(key, run);
  if (state.mediaBound) return;
  state.mediaBound = true;
  window.matchMedia(mobileTypewriterQuery).addEventListener("change", () => {
    typewriterStore().onMedia.forEach((fn) => fn());
  });
}

export function bindTypewriterSequence(
  selector: string,
  options?: { desktopOnly?: boolean; oncePerSession?: boolean; skipOnClick?: boolean },
) {
  const key = `sequence:${selector}`;
  let controller: AbortController | null = null;
  let cancelWait = () => {};
  let skipHandler: ((event: Event) => void) | null = null;

  const nodesOf = () =>
    [...document.querySelectorAll(selector)].filter((node): node is HTMLElement => node instanceof HTMLElement);

  const desktopOnlyFor = (nodes: HTMLElement[]) =>
    options?.desktopOnly === true || nodes.some((node) => desktopOnlyTarget(node));

  const clearSkip = () => {
    if (!skipHandler) return;
    document.removeEventListener("click", skipHandler, true);
    skipHandler = null;
  };

  const revealAll = (nodes: HTMLElement[]) => {
    nodes.forEach((node) => {
      if (!node.isConnected) return;
      releaseTypewriter(node);
      node.dataset.typewriter = "1";
      node.closest(".home__meta")?.classList.remove("is-pending");
    });
  };

  const armSkip = (nodes: HTMLElement[], sessionKey: string | null) => {
    clearSkip();
    if (!options?.skipOnClick) return;
    skipHandler = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("a, button, input, textarea, label, select, [data-open-form]")
      ) {
        return;
      }
      clearSkip();
      controller?.abort();
      controller = null;
      revealAll(nodes);
      if (sessionKey) markSessionTypewriter(sessionKey);
    };
    document.addEventListener("click", skipHandler, true);
  };

  const stop = (nodes: HTMLElement[]) => {
    cancelWait();
    cancelWait = () => {};
    clearSkip();
    controller?.abort();
    controller = null;
    nodes.forEach((node) => {
      releaseTypewriter(node);
      delete node.dataset.typewriter;
    });
  };

  const run = () => {
    const nodes = nodesOf();
    if (!nodes.length) return;
    const pending = nodes.filter((node) => node.dataset.typewriter !== "1");
    const sessionKey = options?.oncePerSession ? sessionTypewriterKey(nodes[0]) : null;
    // Si esta montura ya arrancó, no volver a revealAll por un segundo astro:page-load
    // (antes marcábamos sesión al inicio y el 2º run mataba la secuencia del meta).
    if (sessionKey && sessionTypewriterSeen(sessionKey)) {
      if (!pending.length) return;
      revealAll(nodes);
      return;
    }
    const desktopOnly = desktopOnlyFor(nodes);
    if (desktopOnly && mobileViewport()) {
      stop(nodes);
      return;
    }
    if (!pending.length) return;
    pending.forEach((node) => {
      node.dataset.typewriter = "1";
      node.classList.add("is-typing");
    });
    cancelWait();
    cancelWait = whenVisible(() => {
      const current = pending.filter((node) => node.isConnected);
      if (!current.length) return;
      if (desktopOnlyFor(current) && mobileViewport()) {
        stop(current);
        return;
      }
      controller?.abort();
      const active = new AbortController();
      controller = active;
      armSkip(current, sessionKey);
      void typewriteSequence(current, active.signal)
        .then(() => {
          if (!active.signal.aborted && sessionKey) markSessionTypewriter(sessionKey);
        })
        .finally(clearSkip);
    }, pending);
  };

  listenSequence(key, run);
  run();
}
