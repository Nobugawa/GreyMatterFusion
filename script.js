const routes = ["emc2", "poa", "gaea"];
const map = document.querySelector(".constellation-map");
const svg = document.querySelector(".route-lines");

function drawRoutes() {
  if (!map || !svg) return;

  const mapRect = map.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${mapRect.width} ${mapRect.height}`);

  routes.forEach((route) => {
    const marker = document.querySelector(`[data-route="${route}"]`);
    const card = document.querySelector(`[data-card="${route}"]`);
    const path = document.querySelector(`[data-line="${route}"]`);
    if (!marker || !card || !path) return;

    const markerRect = marker.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const startX = markerRect.left + markerRect.width / 2 - mapRect.left;
    const startY = markerRect.top + markerRect.height / 2 - mapRect.top;
    const endX = cardRect.left + cardRect.width / 2 - mapRect.left;
    const endY = cardRect.top - mapRect.top;
    const bendY = startY + Math.max(56, (endY - startY) * 0.5);

    path.setAttribute(
      "d",
      `M ${startX} ${startY} C ${startX} ${bendY}, ${endX} ${bendY}, ${endX} ${endY}`
    );
  });
}

let frame;
function queueDraw() {
  window.cancelAnimationFrame(frame);
  frame = window.requestAnimationFrame(drawRoutes);
}

window.addEventListener("load", drawRoutes);
window.addEventListener("resize", queueDraw, { passive: true });
document.fonts?.ready.then(drawRoutes);

document.querySelector("#year").textContent = new Date().getFullYear();
