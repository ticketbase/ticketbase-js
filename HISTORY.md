## [v0.1.13] - Aug 24, 2015

* Implement promo codes.

## [v0.1.12] - Jul  8, 2015

* Use https on all transactions. This fixes issues with including Ticketbase widgets on https pages.

## [v0.1.11] - Jun 15, 2015

* Internal: instances are now saved in `el.tbInstance` instead of `__tbInstance`
* Internal: ES6 cleanups
* Improve compatibility with legacy IE
* Show 'tickets are not available' when no tickets are for sale

## [v0.1.10] - Apr 16, 2015

* Ticket forms: fix issue with deleted tickets ([#17], [#18])
* Ticket forms: prevent the display of invisible tickets ([#16], [#18])

## [v0.1.9] - Apr 9, 2015

* Ticket forms: Honor a ticket's `min` and `max` quantities ([#15])
* Ticket forms: default the quantity to `1` if it's the only ticket available ([#15])

## [v0.1.8] - Mar 13, 2015

* Hide fees when an event's fee payer is set to "owner" ([#13])

## [v0.1.7] - Mar 12, 2015

* Hide fees when not available ([#12])

## [v0.1.6] - Mar 5, 2015

 * Fix the module not being exported as `window.TB` ([#11])<br>
   This bug affects the Ticketbase.com widget builder, and anything that may access the library programatically.

## [v0.1.5] - Mar 4, 2015

 * Disable https for Petlanthropy

## [v0.1.4] - Mar 4, 2015

 * Docs: document official distribution site (cdn.ticketbase.com) ([#8])
 * Docs: document Bower and npm support ([#8])
 * Add a campaign goal progress bar when available ([#10])
 * The "powered by" badge now depends on which variant of the library you're using ([#9])
 * CSS: Fix 'wiggling spinner' minor glitch
 * CSS: Improve margin/padding resets, improving compatibility with sites
 * Add support for Campaign Recepients
 * Adds a `Function.bind` polyfill, solving some legacy IE issues

## [v0.1.3] - Mar 3, 2015

 * Adds a "Powered by Ticketbase" badge ([#7])

## [v0.1.2] - Mar 3, 2015

This release improves CSS compatibilty for legacy sites, especially those without doctypes.

 * Internal: refactor CSS to use Stylus internally ([#5])
 * Markup: fix donation forms using `tb-price-free` instead of `tb-price-{open,fixed}` ([#6])
 * CSS: apply `box-sizing: border-box` throughout. This fixes problems with the spinner and table misalignments ([#6])
 * CSS: make lines (`.tb-donation`) work on any background ([#6])
 * package.json: fix GitHub references to refer to the correct repo (ticketbase/ticketbase-js)

## [v0.1.1] - Mar 2, 2015

Lots of internal spring-cleaning.

 * Internal: update to ES6, and build using Babel ([#3])
 * Internal: add support for Ticketbase subdomains ([#4])

## [v0.1.0] - Feb 16, 2015

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
[#12]: https://github.com/ticketbase/ticketbase-js/issues/12
[#13]: https://github.com/ticketbase/ticketbase-js/issues/13
[#14]: https://github.com/ticketbase/ticketbase-js/issues/14
[#15]: https://github.com/ticketbase/ticketbase-js/issues/15
[#16]: https://github.com/ticketbase/ticketbase-js/issues/16
[#17]: https://github.com/ticketbase/ticketbase-js/issues/17
[#18]: https://github.com/ticketbase/ticketbase-js/issues/18
[v0.1.13]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.12...v0.1.13
[v0.1.12]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.11...v0.1.12
[v0.1.11]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.10...v0.1.11
[v0.1.10]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.9...v0.1.10
[v0.1.9]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.8...v0.1.9
[v0.1.8]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.7...v0.1.8
[v0.1.7]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.6...v0.1.7
[v0.1.6]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.5...v0.1.6
[v0.1.5]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.4...v0.1.5
[v0.1.4]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.3...v0.1.4
[v0.1.3]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.2...v0.1.3
[v0.1.2]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.1...v0.1.2
[v0.1.1]: https://github.com/ticketbase/ticketbase-js/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/ticketbase/ticketbase-js/compare/v0.0.0-1...v0.1.0
