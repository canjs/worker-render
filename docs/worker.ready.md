@function worker-render.worker.ready ready
@parent worker-render.worker
@description

Is called after the worker has received the initial HTML from the window and inserted it into the virtual DOM. Any DOM changes from this point on will be synced with the window.

@signature `workerRender.ready(init)`
@param {Function} init

A function that should start up the application and do any initial rendering. This function can assume the same state that exists in the window.

```js
workerRender.ready(function(){
	var app = $("<div>....</div>");

	$("body").html(app);
});
```
