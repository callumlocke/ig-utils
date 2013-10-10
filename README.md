# IG Utils

A collection of front-end utility libraries for going common interactive graphic things.

## Installation

```shell
$ bower install -S https://github.com/ft-interactive/ig-utils.git
```

The utilities are separated out into a number standalone scripts (that do not depend on each other). Each groups collects together a bunch of related methods that deal with a certain set of common functionality.

As there are no dependencies on the scripts they can be installed individually and in any order in your web page.

i.e. 

```html
<body>

  ...

  <script src="some-script.js"></script>
  
  <!-- utility scripts can go in any order -->
  <script src="bower_components/ig-utils/js/iframe-utils.js"></script>

  <script src="another-script.js"></script>
</body>
```

## Usage

### iframe-utils.js

This is useful when you interactive is going to be embedded as an iframe into an ft.com page
