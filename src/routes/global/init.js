import { math } from "predefined";

import { session } from "@internal";

const state = {
    ctr: 3
};

export const parts = [
    { name: "Home", href: "/", icon: "amos" },
    { name: "Stream", href: "/stream", icon: "stream" },
    { name: "Debug", href: "/debug", icon: "debug" },
    { name: "Books", href: "/books", icon: "books" },
    { name: "Projects", href: "/projects", icon: "worker" },
    { name: "Plutonium", href: "/plutonium", icon: "pluto" },
    { name: "Stack", href: "/stack", icon: "stack" },
];

export const listeners = () => {
    intercom.listen( 'internal', console.log );

    intercom.announce( 'internal', {
        type: 'action',
        message: {
            token: session.getId(),
            from: window.location.pathname
        }
    } );
};

export const auth = {
    check: () => {
        state.ctr--;

        const token = localStorage.getItem( "amos_master_hash" );
        let pass =
            localStorage.getItem( "user_pass" ) ||
            prompt( `Enter Password [${ state.ctr } more tries left]` );
        const hashing = math.hash( pass );

        localStorage.setItem( "user_pass", pass );
        hashing.then( ( p ) => {
            if ( p === token ) null;
            else {
                if ( state.ctr === 0 )
                    window.location.href = "https://google.com";
                else authCheck();
            }
        } );
    }
}