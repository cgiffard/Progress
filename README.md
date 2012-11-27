# Progress

Little JS+CSS progress bar for your dashboard. Doesn't try to do everything in
the known universe. You could change the gradient colours to suit your app.

![Progress Example Screenshot](https://raw.github.com/cgiffard/Progress/master/screenshot.png)

## Example

```javascript
var myProgressBar = new ProgressBar();
	myProgressBar.label = "Uploading data";
	myProgressBar.appendTo(document.querySelector(".mycontainer"));
	myProgressBar.setValue(12.5); // 12.5 percent
```

In order to get that to work, just include progress.css/js in your document.

## Compatibility

Nice browsers. Not crappy ones. If you get it to work, send a pull request.

## Licence

I hereby grant you a license to do anything.