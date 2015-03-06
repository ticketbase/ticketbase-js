## v0.1.6 - Mar 5, 2015

 * Fix the module not being exported as `window.TB` ([#11])<br>
   This bug affects the Ticketbase.com widget builder, and anything that may access the library programatically.

## v0.1.5 - Mar 4, 2015

 * Disable https for Petlanthropy

## v0.1.4 - Mar 4, 2015

 * Docs: document official distribution site (cdn.ticketbase.com) ([#8])
 * Docs: document Bower and npm support ([#8])
 * Add a campaign goal progress bar when available ([#10])
 * The "powered by" badge now depends on which variant of the library you're using ([#9])
 * CSS: Fix 'wiggling spinner' minor glitch
 * CSS: Improve margin/padding resets, improving compatibility with sites
 * Add support for Campaign Recepients
 * Adds a `Function.bind` polyfill, solving some legacy IE issues

## v0.1.3 - Mar 3, 2015

 * Adds a "Powered by Ticketbase" badge ([#7])

## v0.1.2 - Mar 3, 2015

This release improves CSS compatibilty for legacy sites, especially those without doctypes.

 * Internal: refactor CSS to use Stylus internally ([#5])
 * Markup: fix donation forms using `tb-price-free` instead of `tb-price-{open,fixed}` ([#6])
 * CSS: apply `box-sizing: border-box` throughout. This fixes problems with the spinner and table misalignments ([#6])
 * CSS: make lines (`.tb-donation`) work on any background ([#6])
 * package.json: fix GitHub references to refer to the correct repo (ticketbase/ticketbase-js)

## v0.1.1 - Mar 2, 2015

Lots of internal spring-cleaning.

 * Internal: update to ES6, and build using Babel ([#3])
 * Internal: add support for Ticketbase subdomains ([#4])

## v0.1.0 - Feb 16, 2015

Donation forms are now supported.

 * Implement donations (`data-tb='donations-form'`)
 * Internal: upgrade to [ministache](https://www.npmjs.com/package/ministache) template engine
 * Internal: lots of cleanups

## v0.0.0-1

Initial preview release

[#3]: https://github.com/ticketbase/ticketbase-js/issues/3
[#4]: https://github.com/ticketbase/ticketbase-js/issues/4
[#5]: https://github.com/ticketbase/ticketbase-js/issues/5
[#6]: https://github.com/ticketbase/ticketbase-js/issues/6
[#7]: https://github.com/ticketbase/ticketbase-js/issues/7
[#8]: https://github.com/ticketbase/ticketbase-js/issues/8
[#9]: https://github.com/ticketbase/ticketbase-js/issues/9
[#10]: https://github.com/ticketbase/ticketbase-js/issues/10
[#11]: https://github.com/ticketbase/ticketbase-js/issues/11
