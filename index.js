// ==UserScript==
// @name         新标签页打开
// @namespace    neo_world_js
// @version      0.1
// @description  open in new tab (youtube)
// @author       neoWorld
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  window.onload = () => {
    const aEle = [...document.querySelectorAll("#dismissible a")];

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
})();
