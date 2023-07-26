// ==UserScript==
// @name         Anti French Layout
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Anti-French-English
// @author       SecretIdetity
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

let blocklist = ['fr', 'ja', 'en']; //add ur own here if u see one not using standart

(function () {
    'use strict';
    function w(a) {
        for (let i of blocklist) {
            if (a.startsWith(`https:\/\/${i}.wikipedia.org\/`) && !a.includes('useskin=vector')) {
                let b = a.includes('#') ? a.substring(a.indexOf('#'), a.length) : '';
                a = a.replace(b, '');
                if (a.includes('?')) {
                    a += '&useskin=vector';
                }
                else {
                    a += '?useskin=vector';
                }
                a += b;
            }
        }
        return a;
    }
    //add to url to use normal layout
    let a = w(window.location.href);
    window.location.href != a ? window.location.href = a : null;
    //add to all urls on site to not load the clicked page twice (bc browser will reload when editing the url)
    var s, l;
    s = document.evaluate("//a[@href]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < s.snapshotLength; i++) {
        l = s.snapshotItem(i);
        a = w(l.href);
        l.href != a ? l.href = a : null;
    }
})();
