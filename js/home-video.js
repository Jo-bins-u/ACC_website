// Keep the large hero background video off the critical page load.
(() => {
  const video = document.querySelector(".vdo-bnr");
  const source = video && video.querySelector("source[data-src]");
  if (!video || !source) return;

  const smallScreen = window.matchMedia("(max-width: 1024px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection && navigator.connection.saveData;

  // The hero remains a lightweight gradient on phones and data-saving setups.
  if (smallScreen || reducedMotion || saveData) return;

  window.addEventListener("load", () => {
    const startVideo = () => {
      if (!video.isConnected || !source.dataset.src) return;
      source.src = source.dataset.src;
      source.removeAttribute("data-src");
      video.load();
      video.play()
        .then(() => video.classList.add("video-ready"))
        .catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(startVideo, { timeout: 2500 });
    } else {
      window.setTimeout(startVideo, 1200);
    }
  }, { once: true });
})();
