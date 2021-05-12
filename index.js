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

  const itemSelectors = ["#dismissible a"];

  const updateAEle = function (selector) {
    const aEle = [...document.querySelectorAll(selector)];

    aEle.forEach((ele) => {
      if (
        ele.getAttribute("href") === "#" &&
        ele.getAttribute("target") === "_blank"
      )
        return;

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

  const updateAEleBatch = function () {
    itemSelectors.forEach((curSelector) => {
      updateAEle(curSelector);
    });
  };

  const initObserver = function (selectors) {
    selectors.forEach((curSelector) => {
      const curEle = document.querySelector(curSelector);
      if (!curEle) return;

      new MutationObserver(updateAEleBatch).observe(curEle, {
        childList: true,
        subtree: true, // 监视子孙节点
      });
    });
  };

  window.onload = () => {
    initObserver(["#content"]);
    updateAEleBatch();
  };
})();
