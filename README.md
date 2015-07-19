[![Build Status](https://travis-ci.org/canjs/can-worker.svg?branch=id-rewrite)](https://travis-ci.org/canjs/can-worker)

# worker-render

Run your applications in a WebWorker and have changes automatically update the DOM.

## Install

```shell
npm install worker-render --save
```

## Usage

To use worker-render you need a module that runs in the window and one that runs in a Web Worker.
Getting your app to run in a Web Worker is up to you, but it is easy with [StealJS](http://stealjs.com/).

### window.js

```js
var windowRender = require("worker-render/window");

var worker = new Worker(...);
windowRender.updateWith(worker);
```

### worker.js

**worker-render** will work with any JavaScript framework. In this example `todoApp` is a
function that returns a DocumentFragment. How you initialize your application is up
to you, but you should do so in the `ready` callback.

```js
var renderer = require("worker-render/worker");
var $ = require("jquery");
var todoApp = require("./todo-app");

renderer.ready(render);

function render(){
  $("#app").html(todoApp());
}
```

## License

MIT
