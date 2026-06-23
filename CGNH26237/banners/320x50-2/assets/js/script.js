/* global gsap */
(function () {
  if (typeof window.CustomEvent === "function") return;
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

var timeline = (function MasterTimeline() {
  var tl, win = window;
  function doClickTag() { window.open(window.clickTag); }
  function initTimeline() {
    document.querySelector("#clickthrough-button").onclick = doClickTag;
    tl = createTimeline();
    win.dispatchEvent(new CustomEvent("start", { detail: { hasStarted: true } }));
  }
  function createTimeline() {
    var tl = gsap.timeline({
      paused: false,
      onComplete: function () { win.dispatchEvent(new CustomEvent("complete", { detail: { hasStopped: true } })); },
    });
    tl
      // 1. open on blue bg + plaid + logo lockup
      .set(".feed-right, .feed-left, .bags, .headline, .cta", { autoAlpha: 0 })
      .set(".plaid, .harvestblend, .nutrena", { autoAlpha: 0 })
      .to(".plaid, .harvestblend, .nutrena", { duration: 0.5, autoAlpha: 1, ease: "power2.out" }, 0.1)
      // 2. feed piles slide in from their sides
      .fromTo(".feed-right", { xPercent: 110 , autoAlpha: 1 }, { duration: 0.8, xPercent: 0, yPercent: 0, autoAlpha: 1, ease: "power2.out" }, 0.6)
      .fromTo(".feed-left", { xPercent: -110 , autoAlpha: 1 }, { duration: 0.8, xPercent: 0, yPercent: 0, autoAlpha: 1, ease: "power2.out" }, 0.78)
      // 3. bags slide up from the bottom frame
      .fromTo(".bags", { yPercent: 120, autoAlpha: 1 }, { duration: 0.8, yPercent: 0, ease: "power2.out" }, 1.46)
      // 4. headline + CTA fade in
      .to(".headline", { duration: 0.6, autoAlpha: 1, ease: "power2.out" }, 2.36)
      .to(".cta", { duration: 0.5, autoAlpha: 1, ease: "power2.out" }, 2.61)
      .to({}, { duration: 1.0 });
    return tl;
  }
  function getTimeline() { return tl; }
  return { init: initTimeline, get: getTimeline };
})();

(function (funcName, baseObj) {
  "use strict";
  funcName = funcName || "documentReady";
  baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false;
  function ready() {
    if (!readyFired) {
      readyFired = true;
      for (var i = 0; i < readyList.length; i++) readyList[i].fn.call(window, readyList[i].ctx);
      readyList = [];
    }
  }
  function readyStateChange() { if (document.readyState === "complete") ready(); }
  baseObj[funcName] = function (callback, context) {
    if (readyFired) { setTimeout(function () { callback(context); }, 1); return; }
    else { readyList.push({ fn: callback, ctx: context }); }
    if (document.readyState === "complete") { setTimeout(ready, 1); }
    else if (!readyEventHandlersInstalled) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
        window.addEventListener("load", ready, false);
      } else {
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }
      readyEventHandlersInstalled = true;
    }
  };
})("documentReady", window);

function initBanner() {
  if (typeof gsap !== "undefined") {
    document.querySelector(".banner").style.display = "block";
    timeline.init();
  } else {
    setTimeout(initBanner, 50);
  }
}
window.documentReady(initBanner);
