@module {{}} worker-render.worker worker-render/worker
@parent worker-render.modules

A module that runs within your Web Worker to handle communication with the [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window).

@body

Import this module and call the [worker-render.worker.ready] function to start your application. You can use any JavaScript framework to render your application as a virtual DOM is implemented that looks exactly like the real DOM.

## Example

```js
var workerRender = require("worker-render/worker");
var $ = require("jquery");
var app = require("./app");

workerRender.ready(function(){
	$("body").html(
		app()
	);
});
```
