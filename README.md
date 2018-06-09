# AWS Console Keyboard shortcuts

This userscript adds some keyboard shortcuts to the AWS Console.

* Type <kbd>.</kbd> to open the Services menu, a bit like JIRA's shortcut menu. You can then type the name of the service you want, use the arrow keys to navigate the autocomplete suggestions, and hit enter to go to there.
* Type <kbd>Option</kbd><kbd>R</kbd> (<kbd>Alt</kbd><kbd>R</kbd>) to open the Regions menu, and then type a region name. Regions are greyed out if they don't match what you've typed. Once you've typed enough to match just one region, hit enter to go there. You can search by region name (`us-east-1` etc) or the geographic region (`Virginia`).
* You can close the Services and Region menus with <kbd>Escape</kbd>.

I dislike Javascript, so any and all improvements are welcome!

Tested with [Tampermonkey](https://tampermonkey.net) in Chrome. Other browsers/plugins may vary.

![Animated GIF showing use of services menu](https://github.com/jamesoff/tamper-console/raw/master/tamper-monkey-period.gif)

![Animated GIF showing use of region menu](https://github.com/jamesoff/tamper-console/raw/master/tamper-monkey-region.gif)
