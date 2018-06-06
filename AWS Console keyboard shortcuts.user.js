// ==UserScript==
// @name         AWS Console keyboard shortcuts
// @namespace    https://jamesoff.net/
// @version      1.1
// @description  AWS Console keyboard shortcuts for services menu
// @author       James Seward
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// @updateURL    https://github.com/jamesoff/tamper-console/raw/master/AWS%20Console%20keyboard%20shortcuts.user.js
// @downloadURL  https://github.com/jamesoff/tamper-console/raw/master/AWS%20Console%20keyboard%20shortcuts.user.js
// ==/UserScript==

(function() {
    'use strict';

    window.onkeydown = function(e){
        // Escape to close Services menu
        if (e.code === 'Escape') {
            if (document.getElementById("servicesMenuContent").style.display === 'block') {
                document.getElementById('nav-servicesMenu').click();
                return;
            }
            if (document.getElementById("regionMenuContent").style.display === 'block') {
                document.getElementById('nav-regionMenu').click();
                return;
            }
        }

        // Don't eat keystrokes if we're trying to type normally
        if(e.target.nodeName.toLowerCase() === 'input'){
            return;
        }
        if(e.target.nodeName.toLowerCase() === 'textarea'){
            return;
        }

        // Period to open Services menu
        if(e.code === 'Period') {
            document.getElementById('nav-servicesMenu').click();
            return;
        }

        console.log(e.code);

        if (e.code === 'KeyR' && event.getModifierState("Alt") === true) {
            document.getElementById('nav-regionMenu').click();
            return;
        }

        // TODO: add region filter box
    };
})();
