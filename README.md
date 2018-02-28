Delighters
==========

Add CSS animations to delight users as they scroll down.
A tiny javascript library by [Q42](https://q42.com).
It was written by [Martin Kool](https://twitter.com/mrtnkl).

See the demo [here](https://q42.github.io/delighters)

Usage
---
1. Include the script.
``` js
<script type="text/javascript" src="delighters.js">
```
2. Add delighter attributes
```
<div class="foo" data-delighter>
```
3. Style the delighter (or its children) using built-in classes `.started` and `.ended`

When the library loads, each [data-delighter] gets the .delighter class.
```
.foo.delighter {
  transition: all .3s ease-out;
  transform: translateX(-100%);
  opacity: 0;
}
```
The `.started` class is set when the top of [data-delighter] element is at 0.75 of the viewport (where 0 is top and 1 is bottom).
```
.foo.delighter.started {
  transform: none;
  opacity: 1;
}
```
An extra `.ended` class is set when the bottom of [data-delighter] element is at 0.75 of the viewport (where 0 is top and 1 is bottom).
```
.foo.delighter.started.ended {
  border: solid red 10px;
}
```
How it works
---
* Delighters.js toggles classes when you scroll down. You do the rest!
* Each delighter gets a `.started` class when its *top* raises above 75% of the browser's viewport height
* When the *bottom* of the delighter is at 75%, an extra class `.ended` is added
* You can change any of these like so: `data-delighter="start:0.5;end:0.95;`
* Remember: 0 = top, 1 = bottom
* Values outside the viewport are allowed, such as `start:1.2;end:-0.3`

Debugging
---
* Set the `data-delighter="debug"` flag to enable debugging for that delighter
* This will give the delighter a red outline
* Also, a dotted red hint line is shown when the delighter is within the viewport
* The hint line is positioned at the defined start, which by default is `0.75`
* The line is removed when the bottom of the delighter is above the end position, by default also `0.75`

Customizing
---
By default, delighters.js intializes automatically when the DOM is ready, and with the following configuration:
```
  options = {
    attribute:  'data-delighter',
    classNames: ['delighter', 'started', 'ended'],
    start:      0.75, // default start threshold
    end:        0.75, // default end threshold
    autoInit:   true  // initialize when DOMContentLoaded
  }
 ```
You can customize any or all of the above properties using:
```
  Delighters.config({    
    // set the default start threshold at the bottom
    start: 1,
    // let's call Delighters.init() manually later
    autoInit: false 
    // ... etc ...
  })
```