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
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://rawgit.com/ticketbase/ticketbase-js/master/ticketbase.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','ticketbase-wjs');</script>
```

Available options
-----------------

* `data-tb` (String) — this should always be `"ticket-form"`.

* `data-event` (String | Number) — the event ID.

* `data-headline` (Boolean) - shows the event name headline when true. (default *false*)

* `data-prefix` (String) - The string to prefix the classnames with. Change this if you'd like to customize the styles. (default *tb*)
