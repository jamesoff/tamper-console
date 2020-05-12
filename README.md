# AWS Console Keyboard shortcuts

This userscript adds some keyboard shortcuts and other twiddles to the AWS Console.

* Type <kbd>.</kbd> to open the Services menu, a bit like JIRA's shortcut menu. You can then type the name of the service you want, use the arrow keys to navigate the autocomplete suggestions, and hit enter to go to there.
* Type <kbd>Option</kbd><kbd>R</kbd> (<kbd>Alt</kbd><kbd>R</kbd>) to open the Regions menu, and then type a region name. Regions are greyed out if they don't match what you've typed. Once you've typed enough to match just one region, hit enter to go there. You can search by region name (`us-east-1` etc) or the geographic region (`Virginia`).
* You can close the Services and Region menus with <kbd>Escape</kbd>.
* The region menu in the top bar gains a flag and is slightly more prominent.

I dislike Javascript, so any and all improvements are welcome!

Tested with [Tampermonkey](https://tampermonkey.net) in Chrome and FireFox. Other browsers/plugins may vary.

To install: [clicky](https://github.com/jamesoff/tamper-console/raw/master/AWS%20Console%20keyboard%20shortcuts.user.js)

![Animated GIF showing use of services menu](https://github.com/jamesoff/tamper-console/raw/master/tamper-monkey-period.gif)

![Animated GIF showing use of region menu](https://github.com/jamesoff/tamper-console/raw/master/tamper-monkey-region.gif)
