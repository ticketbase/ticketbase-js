---
title: Integration
---

# Integration

Add this bit of HTML (replace the event-id):

```html
<div
  data-tb='ticket-form'
  data-event='768'>

  <a href='http://ticketbase.com/event/yourevent'>Event here</a>
</div>
```

Paste this just before the `<body>`:

```html
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'http';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://cdn.ticketbase.com/widgets/v0.1/ticketbase.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','ticketbase-wjs');</script>
```

Available options
-----------------

You can change any of the options by supplying `data` attributes.

```html
<!-- example: -->
<div
  data-headline='true'
  data-powered-by='false'>
```

* `data-tb` (String) — this can be `"ticket-form"` or `"donation-form"`.

* `data-event` (String | Number) — the event ID.

* `data-headline` (Boolean) - shows the event name headline when true. (default *false*)

* `data-prefix` (String) - The string to prefix the classnames with. Change this if you'd like to customize the styles. (default *tb*)

* `data-powered-by` (Boolean) - shows the "Powered by Ticketbase" if true. (default *true*)
