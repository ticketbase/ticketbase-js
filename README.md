# Ticketbase JS client

Embed Ticketbase stuff into your website.

Works on both Node and the browser.

```js
TB.setKey('xxyyzz');

TB.event('my-event')
  .tickets()
  .then((tickets) => {
    // ...
  });
```

<br>

## API docuemntation

<!-- begin api -->

### TB.setKey()
> `setKey(key)`

Sets the API key to given `key` string. Use this before running any other
function, otherwise, errors will be thrown.

```js
TB.setKey('a0b1cd30a91adc0ffee');
```

### TB.getKey
> `getKey()`

Returns the API key, or throws an error if no key is set yet.

### TB.request()
> `request(method, path, options, callback)`

Performs an API request.

```js
// Performs a GET on http://api.ticketbase.com/v1/events.json
request('GET', '/events.json')
.then(function (res) {
  res.statusCode == 200
  res.getBody()
});
```

<!-- end api -->

## Thanks

Yep.
