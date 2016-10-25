# angular-mn-select2


## Installation
Add angular-mn-select2 to your project:

```
bower install --save angular-mn-select2
```

Add it to your HTML file:

```html
<script src="bower_components/angular-mn-select2/angular-mn-select2.js"></script>
```

Reference it as a dependency for your app module:

```js
angular.module('myApp', ['mn.select2']);
```

## Usage
Usage a similar to a normal select with `ngOptions`:

```html

    <p>
        <select select2-local-remote style="width:200px" ng-model="select1" ng-options="item for item in [1,2,3,4,5,6,7]"></select>
    </p>
    <p>
        <select select2-local-remote style="width:200px" ng-model="select2" multiple ng-options="item for item in [1,2,3,4,5,6,7]"></select>
    </p>

    <p>
        <select select2-local-remote="vm.ajaxSelectOption" style="width:200px" ng-model="vm.select3" select-model="vm.cuSelect" multiple></select>
    </p>


```

A multi-selection works similarly: add a `multiple` attribute.

## License 

    (The MIT License)

    Copyright (C) 2013-2015 by Milad Hamzelou <miladhamzelou@gmail.com>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
