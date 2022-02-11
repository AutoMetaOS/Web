# AutoMetaOS Web Client

<div align="center">
<img src="https://cdn.jsdelivr.net/gh/AutoMetaOS/UI@latest/icons/amos.png" alt="amos" width="300px" height="300px"/>
</div>

## Globally Provided JS
### New Functions
Run function externally in a worker (run long function while keeping interactive )
```js
thread(reallyReallyLongFunction).then(console.log) // logs return value of reallyReallyLongFunction
```

## Globally Provided CSS
Along with standard UI

### Box Model
RPM For 0px, 5px, 10px
```css
rpm-X{
    margin: Xpx;
    padding: Xpx;
    border-radius: Xpx;
}
```

M,P,RX For 0px, 5px, 10px, 20px
```css
.pX{ padding:Xpx; }
.mX{ margin:Xpx; }
.rxX{ border-radius:Xpx; }
<!-- and -->
.mx-a{ margin: 0 auto; }
```

### Font
For X={1..7}
```css
.fwX{font-weight:X00;}
```