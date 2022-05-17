import { math } from "predefined";

import { errorHandler } from "./error";
import { notifications } from "./notifs";
import { imessage } from "./bridge";

export const errorCatch = errorHandler;
export const run = ( func ) => {
    try {
        return func();
    } catch ( error ) {
        errorCatch( error );
    };
};

export const session = {
    token: null,
    getId: () => {
        if ( !( session.token ) ) session.token = math.uuid().split( "-" )[ 0 ];
        return session.token;
    },
};

export const notifs = notifications;
export const intercom = imessage;