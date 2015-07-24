@function worker-render.window.updateWith updateWith
@parent worker-render.window
@description

Connect a worker with the window's document. The function
facilitates message passing between the window and the worker
so that any events that occur within the window are passed to the worker
and any changes to the DOM that happen in the worker are applied
on the window side.

@signature `windowRender.updateWith(worker)`
@param {Worker} worker

A [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) where your application is running.
