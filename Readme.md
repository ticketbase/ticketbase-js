# ticketbase widgets

features:

 * lightweight
 * no dependencies (no jQuery!!)
 * little effort to get started as possible
 * super configurable

Embed into your page like so:

```html
<div
  data-tb='event-tickets'
  data-event='768'>

  <a href='http://ticketbase.com/event/yourevent'>Event here</a>
</div>
```

Add to the bottom:

```html
<script>
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/
  .test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.
  createElement(s);js.id=id;js.src=
  p+'://URL_TO_TICKETBASE_WIDGET_JS.js';
  fjs.parentNode.insertBefore(js,fjs);}}
  (document,'script','ticketbase-wjs');</script>
```

Don't like the template? Override:

```js
<script type='text/x-template' id='new-template'>
  <h1>{{event.name}}</h1>

  <h3>Tickets:</h3>

  <div class='tickets'>
    {{#closed}}
      Tickets are not available at this time.
    {{/closed}}

    {{#ticket}}
      <div class='ticket'>
        <h3>{{ticket.title}}</h3>
        <p>{{ticket.price}}</p>
      </div>
    {{/ticket}}
  </div>
</script>
```

```html
<div
  data-tb='event-tickets'
  data-template='#new-template'  ◀️ 
  ...>
```
