---
title: Overriding templates
---

# Overriding templates

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
