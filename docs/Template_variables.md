# Template variables

**NB:** This is an internal document for now.


## Top-level

 * `tb` - class prefix. Defaults to *tb*
 * `config` - some constants, see below
 * `event` - see below
 * `error` - Error instance, if an error happened

## `event`

In addition to the attributes in the `event` object as returned by Ticketbase, the following values are also available:

 * `event`:
   * `is_closed` - is *false* when the event is closed (sold out, no sales yet, etc)
   * `is_live` - is *true* when the event is open to the public
   * `form_hidden` - HTML snippet for hidden input fields
   * `order_action_url` - the URL for the form to submit to
   * `has_goal` - is *true* when there's a campaign goal and it's over 0
   * `campaign_goal_percent` - the percentage of the campaign raised, maxes at 1 (0..1)
   * `tickets`
   * `donations`

## `config`

Some useful constants.

 * `config`:
   * `apihost` - API host
   * `url` - site URL
   * `site_name` - "Ticketbase"
   * `powered_by_img` - image URL
