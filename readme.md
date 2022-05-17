# AutoMetaOS Web Client

<div align="center">
<img src="./static/OUI/icons/amos.svg" alt="amos" width="300px" height="300px"/>
</div>

## Using Internals Functions
### Notification API
```js
import { notifs } from "@internal";
notifs.send({title:"Error Title",text:"Error Text"}, 1000, {
    from: "Error Generated From",
    scale: "danger", // danger, success, warning, info, default
});
```

### Intercom API
Internal Communications between ALL OPEN tabs
```js
import { intercom } from "@internal";
intercom.listen( 'Announcements', console.log ); // Listens to Channel Announcements and logs data
intercom.mute( 'Announcements' ) // Take a guess on what could happen

intercom.announce
```
### Trial & Error API
```js
import { run } from "@internal";
run(()=>doSomething()) // Pass Function, Run will take care of error handling


import { errorCatch } from "@internal";
errorCatch(error) // Pass Caught error as it is
```



## Using Processors Functions
### Heisenberg
Heisenberg will automatically convert JSON to string as needed while compressing and will also return as JSON if data is valid JSON when uncompressed.
```js
import { Heisenberg } from "@process";
Heisenberg.compress(data); // Returns Compressed UTF-16 String

Heisenberg.decompress(data); // Returns unCompressed Data
```

## TODO
- https://danfo.jsdata.org
