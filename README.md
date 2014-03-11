# IG Utils

A collection of front-end utility modules for doing common interactive graphic things.

## Installation

```shell
$ bower install --save https://github.com/ft-interactive/ig-utils.git
```

## Usage

### iframe-utils.js

This is useful when you interactive is going to be embedded as an iframe into an ft.com page.

```javascript
var iframeUtils = require('../bower_components/ig-utils/js/iframe-utils');

iframeUtils.setDocumentDomain();
```

If you include `iframe-utils.js` directly in your page with a `<script>` element, it will attach itself to `window.IG.iframeUtils`.


### handlebars-utils.js

This module doesn't export anything – you just need to `require` it and it will register some Handlebars helpers.

```javascript
require('../bower_components/ig-utils/js/handlebars-utils');
```

It registers the helpers on the Handlebars instance provided by [hbsfy](https://github.com/epeli/node-hbsfy), so you must use this transform to load your templates.
