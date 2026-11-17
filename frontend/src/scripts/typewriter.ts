export const typeStep = 20;

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
    const source = textNodes(target);
    const total = source.reduce((sum, node) => sum + (node.textContent?.length ?? 0), 0);
    if (!total) {
      target.classList.remove("is-typing");
      finish();
      return;
    }
    layer = document.createElement("div");
    layer.className = "home__type";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = target.innerHTML;
    target.appendChild(layer);
    const typed = textNodes(layer);
    typed.forEach((node) => {
      const ink = document.createElement("span");
      ink.className = "home__ink";
      node.parentNode?.insertBefore(ink, node);
      ink.appendChild(node);
      node.textContent = "";
    });

    let count = 0;
    timer = window.setInterval(() => {
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
        const full = source[index]?.textContent ?? "";
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

async function typewriteSequence(nodes: HTMLElement[]) {
  for (const node of nodes) {
    if (!node.isConnected) return;
    await typewrite(node);
  }
}

function whenVisible(start: () => void, nodes: HTMLElement[]) {
  if (!document.documentElement.classList.contains("intro-open")) {
    start();
    return;
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
}

const bound = new Set<string>();

export function playTypewriter(target: HTMLElement) {
  if (target.dataset.typing === "1") return;
  target.dataset.typing = "1";
  target.classList.add("is-typing");
  target.querySelector(".home__type")?.remove();
  void typewrite(target).finally(() => {
    delete target.dataset.typing;
  });
}

export function bindTypewriter(selector: string) {
  const run = () => {
    document.querySelectorAll(selector).forEach((node) => {
      if (!(node instanceof HTMLElement) || node.dataset.typewriter === "1") return;
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

export function bindTypewriterSequence(selector: string) {
  const key = `sequence:${selector}`;
  const run = () => {
    const nodes = [...document.querySelectorAll(selector)].filter(
      (node): node is HTMLElement => node instanceof HTMLElement && node.dataset.typewriter !== "1",
    );
    nodes.forEach((node) => {
      node.dataset.typewriter = "1";
    });
    if (!nodes.length) return;
    whenVisible(() => void typewriteSequence(nodes), nodes);
  };

  run();
  if (!bound.has(key)) {
    bound.add(key);
    document.addEventListener("astro:page-load", run);
  }
}
