import {  derived } from "svelte/store"

const defaults = {
    message: { title: "Internal", text: "Uncaught error" },
    type: { scale: 'info', from: 'amos' },
    time: 3000
};

function createNotificationStore ( timeout ) {
    const _notifications = writable( [] )

    const send = ( message = defaults.message, timeout = defaults.time, type = defaults.type ) =>
        _notifications.update( state =>
            [ ...state, {
                id: `_${ Math.random().toString( 36 ).slice( 2, 9 ) }`,
                type: type.scale,
                from: type.from,
                message: message.text,
                title: message.title,
                timeout: timeout % 3e3
            } ]
        )

    let timers = []

    const notifications = derived( _notifications, ( $_notifications, set ) => {
        set( $_notifications )

        if ( $_notifications.length > 0 ) {
            const timer = setTimeout( () => {
                _notifications.update( state => {
                    state.shift()
                    return state
                } )
            }, $_notifications[ 0 ].timeout )

            return () => clearTimeout( timer )
        }
    } )
    const { subscribe } = notifications

    return {
        subscribe,
        send
    }
};

export const notifications = createNotificationStore()