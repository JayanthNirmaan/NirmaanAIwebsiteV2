"use client";

/**
 * Generate a responsive grid of <rect> children inside an .igrid container,
 * keyed off data-cols / data-rows. Rebuilds on resize.
 */
export function mountIGrid(root: HTMLElement) {
  const cols = parseInt(root.dataset.cols || "20", 10);
  const square = root.dataset.square === "true";

  const build = () => {
    const { width, height } = root.getBoundingClientRect();
    if (!width || !height) return;
    const cellW = width / cols;
    const rows = square ? Math.ceil(height / cellW) : parseInt(root.dataset.rows || "10", 10);
    const cellH = square ? cellW : height / rows;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("preserveAspectRatio", "none");

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", String(c * cellW));
        rect.setAttribute("y", String(r * cellH));
        rect.setAttribute("width", String(cellW));
        rect.setAttribute("height", String(cellH));
        svg.appendChild(rect);
      }
    }
    root.replaceChildren(svg);
  };

  build();

  let raf = 0;
  const onResize = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(build);
  };
  window.addEventListener("resize", onResize);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", onResize);
  };
}

export function mountAllIGrids(scope: ParentNode = document) {
  const nodes = Array.from(scope.querySelectorAll<HTMLElement>("[data-igrid]"));
  const cleanups = nodes.map((n) => mountIGrid(n));
  return () => cleanups.forEach((fn) => fn && fn());
}
