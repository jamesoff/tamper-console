// ==UserScript==
// @name         AWS Console keyboard shortcuts
// @namespace    https://jamesoff.net/
// @version      1.2
// @description  AWS Console keyboard shortcuts for services menu
// @author       James Seward
// @match        https://*.console.aws.amazon.com/*
// @exclude      https://console.aws.amazon.com/iam/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @updateURL    https://github.com/jamesoff/tamper-console/raw/master/AWS%20Console%20keyboard%20shortcuts.user.js
// @downloadURL  https://github.com/jamesoff/tamper-console/raw/master/AWS%20Console%20keyboard%20shortcuts.user.js
// ==/UserScript==

(function() {
    'use strict';

    window.onkeydown = function(e){
        // Escape to close Services or Region menu
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

        // Alt-R (Option-R) to open Region menu
        // TODO: might be nice to make this work if the user clicks the menu too
        if (e.code === 'KeyR' && e.getModifierState("Alt") === true) {
            document.getElementById('nav-regionMenu').click();
            $("#regionMenuContent").prepend('<input type="text" id="regionSearch" placeholder="type a region" style="margin-left: 8px; border-radius: 5px; font-size: 13px; padding: 7px 10px; outline: 0; border: 1px solid #ccc;" />');

            var availableRegionList = [];

            $("a.available-region").each(function(index) {
                availableRegionList.push($(this).attr("data-region-id"));
            });

            $("#regionSearch").bind('input', function(e) {
                var findRegion = $(this).val().toLowerCase();
                $("a.available-region").each(function(index) {
                    var region = $(this).attr("data-region-id");
                    var regionName = $(this).text().toLowerCase();
                    if (region.startsWith(findRegion) || regionName.includes(findRegion)) {
                        $(this).css("color", "");
                    }
                    else {
                        $(this).css("color", "#ddd");
                    }
                });
            });

            $("#regionSearch").bind('keydown', function(e) {
                if (e.key === 'Enter') {
                    var found = false;
                    var targetRegion = $(this).val().toLowerCase();
                    var candidateRegions = [];
                    $("a.available-region").each(function(index) {
                        if ($(this).attr("data-region-id") === targetRegion || $(this).text().toLowerCase().includes(targetRegion)) {
                            // TODO: understand why this needs the array index
                            $(this)[0].click();
                            found = true;
                            return false;
                        }
                        if ($(this).attr("data-region-id").startsWith(targetRegion)) {
                              candidateRegions.push($(this));
                        }
                    });
                    if (!found) {
                        if (candidateRegions.length == 1) {
                            // exactly one region matched the prefix
                            candidateRegions[0][0].click();
                        }
                        else {
                            $(this).effect("shake");
                        }
                    }
                }
            });
            $("#regionSearch").focus();
            e.preventDefault();
            return;
        }
    };
})();
