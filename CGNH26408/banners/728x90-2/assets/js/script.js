/* global gsap */
(function () {
  function initBanner() {
    var button = document.querySelector("#clickthrough-button");
    var banner = document.querySelector(".banner");
    button.onclick = function () { window.open(window.clickTag); };
    banner.style.display = "block";
    gsap.timeline({ defaults: { ease: "power2.out" } })
      .from(".plaid", { autoAlpha: 0, y: -18, duration: 0.65 })
      .from(".logo", { autoAlpha: 0, y: -14, duration: 0.65 }, "-=0.48")
      .from(".headline", { autoAlpha: 0, y: 22, duration: 0.7 }, "-=0.4")
      .from(".cta", { autoAlpha: 0, y: 16, duration: 0.55 }, "-=0.42");
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBanner);
  } else {
    initBanner();
  }
})();
