// ==UserScript==
// @name         Hypothesis
// @namespace    https://github.com/invisprints/hypothesis-userscript/
// @version      0.1
// @description  Load hypothes.is via Tampermonkey
// @author       https://github.com/invisprints
// @match        *://*/*
// @grant        GM_addStyle
// @downloadURL    https://github.com/invisprints/hypothesis-userscript/raw/main/hypothesis.user.js
// @updateURL    https://github.com/invisprints/hypothesis-userscript/raw/main/hypothesis.user.js
// ==/UserScript==

(function() {
    function loadHypothesis() {
        window.hypothesisConfig = function() {
            return { showHighlights: true, appType: 'bookmarklet' };
        };
        var d = document, s = d.createElement('script');
        s.setAttribute('src', 'https://hypothes.is/embed.js');
        d.body.appendChild(s)

        var css = ""; css += [
            "[class^=\"annotator-bucket-bar\"]{display:none;}"
        ].join("\n");
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) { heads[0].appendChild(node); }
        else { document.documentElement.appendChild(node); }
    }

    // Create a new button
    var btn = document.createElement("button");
    btn.innerHTML = "H";
    btn.style.position = "fixed";
    btn.style.top = "33vh";
    btn.style.right = "0px";
    btn.style.zIndex = 5;
    btn.onclick = loadHypothesis;


    // Add the button to the body of the webpage
    document.body.appendChild(btn);

    // Add styles for the button
    GM_addStyle(`
        button {
            padding: 10px;
            background-color: #444;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #555;
        }
    `);
})();
