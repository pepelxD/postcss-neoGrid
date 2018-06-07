# PostCSS NeoGrid [![Build Status][ci-img]][ci]

[PostCSS] plugin grid.
Simple grid is a simple postcss plugin that will help you create a grid system with minimal settings. There is no need to specify every single column any more.
***

#### Install
```
npm i postcss-neogrid -D
```

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/pepelxD/postcss-neoGrid.svg
[ci]:      https://travis-ci.org/pepelxD/postcss-neoGrid


### Wrapper
You can use a simple shortcode, while all the credits will be taken from the settings
```css
.foo {
    wrapper: "";
}
```

```css
.foo {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 5px;
    padding-right: 5px
}
```
or you can pass the width and alignment
```css
.foo {
    wrapper: 1200 right;
}
```

```css
.foo {
    max-width: 1200px;
    margin-left: auto;
    padding-left: 5px;
    padding-right: 5px
}
```
If the user writes a compound rule, margin or padding - it will unfold, the same properties will be overwritten in favor of plugin [settings](#settings)
```css
.foo {
    wrapper: 1200 right;
    margin: 10px 20px;
}
```

```css
.foo {
    max-width: 1200px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    padding-left: 5px;
    padding-right: 5px
}
```

### Row
The plug-in supports 2 kinds of a grid - flex and inline-block, accordingly generates for everyone its rules
#### Flex
```css
.foo {
    row: "";
}
```

```css
.foo {
    margin-left: -15px;
    margin-right: -15px;
    display: flex;
    flex-wrap: wrap;
}
```
#### Inline-block
```css
.foo {
    row: "";
}
```

```css
.foo {
    margin-left: -15px;
    margin-right: -15px;
    font-size: 16px;
    word-spacing: 4px;
}
```
Expanding and deleting a duplicated property also works

### Col
With columns as well as with lines, depending on the type of grid, the necessary rules will be generated.
Example for flex mesh
```css
.foo {
    col: "";
    col-size: 4;
}
```

```css
.foo {
    margin-left: 15px;
    margin-right: 15px;
    width: 30.8333%;
}
```
Columns can use built-in media queries
```css
.foo {
    col: "";
    col-size: 4;
    col-size: 3 500 900;
}
```

```css
.foo {
    margin-left: 15px;
    margin-right: 15px;
    width: 30.8333%;
}
@media (min-width: 500px) and (max-width: 900px) {

    .foo {
        width: 22.5%
    }
}
```

Expanding and deleting a duplicated property also works

### Media
The plug-in supports built-in media expressions
```css
.foo {
    wrapper: 1200 right;
    margin: 10px 20px;
    media(500) {
        max-width: 600px;
    }
}
```

```css
.foo {
    max-width: 1200px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    padding-left: 5px;
    padding-right: 5px
}
@media (max-width: 500px) {

    .foo {
        max-width: 600px
    }
}
```
You can also transfer the required units to a media query
```css
.foo {
    wrapper: 1200 right;
    margin: 10px 20px;
    media(45em) {
        max-width: 600px;
    }
}
```
```css
.foo {
    max-width: 1200px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    padding-left: 5px;
    padding-right: 5px
}
@media (max-width: 45em) {

    .foo {
        max-width: 600px
    }
}
```
or entire query string
```css
.foo {
    wrapper: 1200 right;
    margin: 10px 20px;
    media(only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)) {
        max-width: 600px;
    }
}
```
```css
.foo {
    max-width: 1200px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    padding-left: 5px;
    padding-right: 5px
}
@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {

    .foo {
        max-width: 600px
    }
}
```

## <a name="settings">Settings</a>
The plug-in supports the following kind of settings
### wrapper
___type___: *number*

___default___: *1200*

___units___: *px*

Used to set the width of the wrapper

### grid
___type___: *string*

___default___: *flex*

___possible disagreements___: *flex, inline-block*

Grid sistem

### fields
___type___: *number*

___default___: *5*

___units___: *px*

Used to specify the fields of the wrapper

### offset
___type___: *number*

___default___: *30*

___units___: *px*

Used to specify the intercolumn

### offsetWithPercent
___type___: *boolean*

___default___: *false*

Turns the intercolumn in percentages

### useCalc
___type___: *boolean*

___default___: *false*

Whether to use the calc function to calculate the column width

### duple
___type___: *string*

___default___: *remove*

___possible disagreements___: *remove, initial*

In duplicate properties, you can ignore plugin settings and use the values entered by the user

### roundSize
___type___: *number*

___default___: *4*

Leaves the specified number of decimal places in the calculated fractional values

### columns
___type___: *number*

___default___: *12*

Used to specify the number of columns





## Usage

```js
postcss([ require('postcss-neoGrid')(options) ])
```

See [PostCSS] docs for examples for your environment.
