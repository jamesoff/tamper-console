// ==UserScript==
// @name         AWS Console keyboard shortcuts
// @namespace    https://jamesoff.net/
// @version      1.2
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
            var inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.id = "regionSearch";
            inputElement.placeholder = "type a region";
            inputElement.style = "margin-left: 8px; border-radius: 5px; font-size: 13px; padding: 7px 10px; outline: 0; border: 1px solid #ccc;";
            document.getElementById("regionMenuContent").prepend(inputElement);

            var availableRegionList = [];

            var availableRegions = document.evaluate(
            "//a[contains(@class,'available-region')]",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
            for (var i = 0; i < availableRegions.snapshotLength; i++) {
                var thisLink = availableRegions.snapshotItem(i);
                availableRegionList.push(thisLink.getAttribute("data-region-id"));
            };
            //console.log(availableRegionList);

            document.getElementById("regionSearch").addEventListener('input', function(e) {
                var findRegion = document.getElementById("regionSearch").value.toLowerCase();
                for (var i = 0; i < availableRegions.snapshotLength; i++) {
                    var thisLink = availableRegions.snapshotItem(i);
                    var region = thisLink.getAttribute("data-region-id");
                    var regionName = thisLink.text.toLowerCase();
                    if (region.startsWith(findRegion) || regionName.includes(findRegion)) {
                        thisLink.style.color = "";
                    }
                    else {
                        thisLink.style.color = "#ddd";
                    }
                };
            });

            document.getElementById("regionSearch").addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    var found = false;
                    var targetRegion = document.getElementById("regionSearch").value.toLowerCase();
                    var candidateRegions = [];
                    //$("a.available-region").each(function(index) {
                    for (var i = 0; i < availableRegions.snapshotLength; i++) {
                        var thisLink = availableRegions.snapshotItem(i);
                        if (thisLink.getAttribute("data-region-id") === targetRegion || thisLink.text.toLowerCase().includes(targetRegion)) {
                            // TODO: understand why this needs the array index
                            thisLink.click();
                            found = true;
                            return false;
                        }
                        if (thisLink.getAttribute("data-region-id").startsWith(targetRegion)) {
                              candidateRegions.push(thisLink);
                        }
                    };
                    if (!found) {
                        if (candidateRegions.length == 1) {
                            // exactly one region matched the prefix
                            candidateRegions[0].click();
                        }
                        else {
                            //$(this).effect("shake");
                            console.log("no match");
                        }
                    }
                }
            });
            document.getElementById("regionSearch").focus();
            e.preventDefault();
            return;
        }
    };
})();
