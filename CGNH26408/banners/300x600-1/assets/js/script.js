/* global gsap */
(function () {
  function initBanner() {
    var button = document.querySelector("#clickthrough-button");
    var banner = document.querySelector(".banner");
    button.onclick = function () { window.open(window.clickTag); };
    banner.style.display = "block";
    gsap.timeline({ defaults: { ease: "power2.out" } })
      .from(".plaid", { autoAlpha: 0, y: -18, duration: 1.15 })
      .from(".logo", { autoAlpha: 0, y: -14, duration: 0.65 }, "<0.58")
      .from(".headline", { autoAlpha: 0, y: 22, duration: 0.8 }, "-=0.3")
      .from(".cta", { autoAlpha: 0, y: 16, duration: 0.6 }, "-=0.35");
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBanner);
  } else {
    initBanner();
  }
})();
