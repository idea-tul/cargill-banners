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
  var tl, win = window, done = false;
  function doClickTag() { window.open(window.clickTag); }
  function initTimeline() {
    document.querySelector("#clickthrough-button").onclick = doClickTag;
    tl = createTimeline();
    win.dispatchEvent(new CustomEvent("start", { detail: { hasStarted: true } }));
  }
  function createTimeline() {
    var tl = gsap.timeline({
      paused: false,
      repeat: -1,
      onRepeat: function () {
        if (!done) { done = true; win.dispatchEvent(new CustomEvent("complete", { detail: { hasStopped: true } })); }
      },
    });
    tl
      // foreground static; only the background photos rotate (3 photos)
      .set(".feed, .bags, .plaid, .harvestblend, .nutrena, .headline, .cta, .photo", { autoAlpha: 1 })
      .set(".photo1, .photo2", { autoAlpha: 0 })
      .to(".photo1", { autoAlpha: 1, duration: 0.7, ease: "power1.inOut" }, 2)
      .to(".photo0", { autoAlpha: 0, duration: 0.7, ease: "power1.inOut" }, 2)
      .to(".photo2", { autoAlpha: 1, duration: 0.7, ease: "power1.inOut" }, 4.7)
      .to(".photo1", { autoAlpha: 0, duration: 0.7, ease: "power1.inOut" }, 4.7)
      .to(".photo0", { autoAlpha: 1, duration: 0.7, ease: "power1.inOut" }, 7.4)
      .to(".photo2", { autoAlpha: 0, duration: 0.7, ease: "power1.inOut" }, 7.4)
    ;
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
