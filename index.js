// ==UserScript==
// @name         youtube新标签页打开
// @namespace    neo_world_js
// @version      0.13
// @description  支持首页，搜索，频道在新标签打开，你懂的
// @author       neoWorld
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @github       https://github.com/lzuliuyun/open-in-new-tab
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const selectorPathMap = {
    "/": {
      observeEle: "#page-manager",
      aEle: ['#dismissible a[href^="/"]'],
    },
    "/results": {
      observeEle: "#page-manager",
      aEle: ['#dismissible a[href^="/"]'],
    },
    "/channel": {
      observeEle: "#page-manager",
      aEle: ['#dismissible a[href^="/"]'],
    },
    "/watch": {
      observeEle: "#secondary",
      aEle: ['#dismissible a[href^="/"]'],
    },
    "/playlist": {
      observeEle: "#page-manager",
      aEle: ['#content a[href^="/"]'],
    },
    "/user": {
      observeEle: "#page-manager",
      aEle: ['#dismissible a[href^="/"]'],
    },
  };

  const updateAEle = function (selector) {
    const aEle = [...document.querySelectorAll(selector)];

    aEle.forEach((ele) => {
      ele.setAttribute("target", "_blank");
      const href = ele.getAttribute("href");
      ele.onclick = (e) => {
        e.stopPropagation();
        window.open(href, "_blank");
        return false;
      };

      ele.setAttribute("href", "#");
    });
  };

  const updateAEleBatch = function (aEleList) {
    aEleList.forEach((curSelector) => {
      updateAEle(curSelector);
    });
  };

  const getSelectorAtCurPath = function () {
    const { pathname } = window.location;
    const secondIndex = pathname.indexOf("/", 2);
    const path =
      secondIndex === -1 ? pathname : pathname.substr(0, secondIndex);

    return (
      selectorPathMap[path] || {
        observeEle: "#page-manager",
        aEle: ["#dismissible a"],
      }
    );
  };

  const initObserver = function (selector) {
    const observeEle = document.querySelector(selector.observeEle);
    if (!observeEle) return;

    new MutationObserver(() => {
      updateAEleBatch(selector.aEle);
    }).observe(observeEle, {
      childList: true,
      subtree: true, // 监视子孙节点
    });
  };

  const selector = getSelectorAtCurPath();

  window.onload = () => {
    initObserver(selector);
    updateAEleBatch(selector.aEle);
  };

  window.addEventListener("popstate", () => {
    initObserver(selector);
    updateAEleBatch(selector.aEle);
  });
})();
