// ==UserScript==
// @name         AWS Console keyboard shortcuts
// @namespace    https://jamesoff.net/
// @version      1.0
// @description  AWS Console keyboard shortcuts for services menu
// @author       James Seward
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.onkeydown = function(e){
        // Escape to close Services menu
        if (e.code === 'Escape') {
            if (document.getElementById("servicesMenuContent").style.display === 'block') {
                document.getElementById('nav-servicesMenu').click();
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
        }
    };
})();
