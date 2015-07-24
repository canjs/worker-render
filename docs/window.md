@module {{}} worker-render.window worker-render/window
@parent worker-render.modules

A module which handles passing messages between a browser [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window) and a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) so that the DOM stays in sync between the two.

@body

# Use

This module provides the primary interface in which to hook a Web Worker to the window side of your application. The script running in the worker should import and use [worker-render.worker].

```js
var windowRender = require("worker-render/window");
var worker = new Worker("app.js");

windowRender.updateWith(worker);
```
