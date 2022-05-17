import lsbridge from "lsbridge";

// create function handlers
// types: {
//     silent: will be delivered and acted upon but not alert user
//     log: will only log
//     action: will act and alert user
//     error: will act and alert user
//     alert: will do nothing and only alert user
// }

const defaults = {
    channel: "internal",
    callback: function ( data ) {
        console.log( data );
    }
};

export const imessage = {
    announce: ( channel = defaults.channel, data ) => {
        console.log( channel, data );
        lsbridge.send( channel, data );
        return 0;
    },
    listen: ( channel = callback.channel, callback = defaults.callback ) => {
        lsbridge.subscribe( channel, callback )
        return 0;
    },
    mute: ( channel = defaults.channel ) => lsbridge.unsubscribe( channel )
};