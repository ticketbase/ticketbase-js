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
