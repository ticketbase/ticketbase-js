---
title: CSS customization
---

# CSS customization

Configure your widget with `data-tb-prefix`:

```html
<div
  data-tb='event-tickets'
  data-tb-prefix='xyz'>...</div>
```

The output html will use this prefix for classnames:

```html
<!-- instead of .tb-title -->
<div class='xyz-title'>VIP ticket</div>
<div class='xyz-price'>$250</div>
```

You'll then be able to style it yourself.

