# Ticketbase JS client

Embed Ticketbase stuff into your website. Works on both Node and the browser.<br>
__[Demo →](http://rawgit.com/rstacruz/ticketbase-js/master/example/index.html)__

High-level API:

```js
TB.setKey('xxyyzz');

TB.event('my-event')
  .tickets()
  .then((tickets) => {
    // ...
  });
```

Lower-level API (direct access to URLs):

```js
TB.setKey('xxyyzz');

TB.request('GET', '/events/my-event/tickets.json')
  .then((tickets) => {
    // ...
  });
```


<br>

## To do

- [x] Low-level API (`TB.request()`)
- [ ] High-level API
     - [ ] .event()
     - [ ] .event().tickets()
     - [ ] .event().orders()
     - [ ] .currentEvents()
     - [ ] .allEvents()

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
> `request(method, path, data)`

Performs an API request. The client takes care of API authentication details
for you (as long as you used `TB.setKey()`).

Returns a promise that will resolve to the JSON data, or to an error.

`data` may be an Object that will be sent as the body.

```js
// Performs a GET on http://api.ticketbase.com/v1/events.json.

request('GET', '/events.json')
  .then(function (events) {
    events == [ ...list of events... ]
  })
```

Errors look like this:

```js
request('GET', '/events.json')
  .catch(function (err) {
    err.statusCode == 401
    err.message == "Ticketbase: 401 Unauthorized"
    err.body == { ... }
  })
```

<!-- end api -->

## Thanks

Yep.
