# AutoMetaOS Web Client

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/AutoMetaOS/UI@latest/icons/amos.png" alt="amos" width="300px" height="300px"/>
</div>

## Globally Provided JS
### Shorthand
For QuerySelectors
```js
ƒ = document.querySelector;
ƒA = document.querySelectorAll;
```

### New Functions
Run function externally in a worker (run long function while keeping interactive )
```js
thread(reallyReallyLongFunction).then(console.log) // logs return value of reallyReallyLongFunction
```

Escape and Unescape HTML
```js
HTML2String('<a href="#">Me & you</a>'); //returns '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'
String2HTML('&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'); // returns // '<a href="#">Me & you</a>'
```

URL Params
```js
getµ().q // returns the value of (?/&)q= from all params
setµ(key, value) // adds to URL (?/&)key=value
```

#### Generic Functions
UUID
```js
uuid() // c0c40fe5-f9fe-491c-83d1-4c605fef672e
```

Hash Calculator (SHA-256)
```js
hashBrowser(String).then(DoSomething)
```

Cookie Parser
```js
//takes in cookie string (value of cookie)
```

copyToClipboard
```js
copyToClipboard(String) // Copies to clipboard
```

## Globally Provided CSS
Along with standard Hakama UI

### Box Model
RPM For 0px, 5px, 10px
```css
rpm-X{
    margin: Xpx;
    padding: Xpx;
    border-radius: Xpx;
}
```

M,P For 0px, 5px, 20px
```css
.pX{ padding:Xpx; }
.mX{ margin:Xpx; }
<!-- and -->
.mx-a{ margin: 0 auto; }
```

### Font
For X={1..7}
```css
.fwX{font-weight:X00;}
```