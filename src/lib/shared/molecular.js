"use strict";

export const serverURL = 'https://ronin.host:1872/';
export const cloudURL = 'https://api.nukes.in';

export class Kron extends Date {
    #months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    timeSince ( val = this.getTime() ) {
        val = 0 | ( Date.now() - new Date( val ) ) / 1000;
        let unit, length = {
            second: 60, minute: 60, hour: 24, day: 7, week: 4.35,
            month: 12, year: 10000
        }, result;

        for ( unit in length ) {
            result = val % length[ unit ];
            if ( !( val = 0 | val / length[ unit ] ) )
                return result + ' ' + ( result - 1 ? unit + 's' : unit );
        }
    };

    toLocal ( loc = "en-GB" ) {
        return new Date( this.getTime() || new Date() ).toLocaleDateString( loc, {
            weekday: "short", day: "numeric",
            hour12: false, hour: "2-digit",
            month: "short", minute: "2-digit"
        } );
    };

    secondsToClock ( seconds ) {
        return [ 3600, 60 ]
            .reduceRight(
                ( p, b ) => r => [ Math.floor( r / b ) ].concat( p( r % b ) ),
                r => [ r ]
            )( seconds )
            .map( a => a.toString().padStart( 2, '0' ) )
            .join( ':' );
    };

    clockToSeconds ( hhmmss ) {
        const span = hhmmss.split( ":" );
        const duration = +span[ 0 ] * 3600 + +span[ 1 ] * 60 + +span[ 2 ];
        return duration;
    };
};

export class Riquest {
    #base;
    #type;
    #config;
    constructor ( base_url, type, config ) {
        this.#base = base_url;
        this.#type = type || 'json';
        this.#config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: config?.identity === 'anonymous' ? 'no-referrer' : 'strict-origin-when-cross-origin'
        };
    }

    change_type = ( type ) => this.#type = type || 'json';
    // JSON & TXT PROCESSOR
    async response_processor ( response ) {
        const { headers } = response;
        const contentType = headers.get( "content-type" ) || "";
        if ( contentType.includes( "application/json" ) )
            return await response.json();
        else return await response.text();
    }
    // CONFIG BODY PROCESSOR
    data_processor ( data ) {
        let temp;
        if ( typeof data === 'object' ) temp = JSON.stringify( data );
        if ( typeof data === 'string' ) temp = data;
        this.#config.body = temp;
    }
    handleError = ( e ) => console.warn( e );
    // MAIN
    async requester ( endpoint = '' ) {
        let response = await ( fetch( this.#base + endpoint, this.#config ).catch( this.handleError ) );

        if ( response && !response.ok ) return `An ${ response.status } has occured on: ${ this.#config.method }`;
        if ( !response ) return 'Request Failed';

        const processed = await this.response_processor( response );
        if ( this.#config.body ) delete this.#config.body;
        return processed
    }

    // ENDPOINT OPTION TYPES
    async get ( endpoint ) {
        this.#config.method = 'GET';
        if ( this.#config.body ) delete this.#config.body;
        return await this.requester( endpoint );
    }
    async post ( endpoint, data ) {
        this.#config.method = 'POST';
        if ( data ) this.data_processor( data );
        return await this.requester( endpoint );
    }
    async delete ( endpoint, data ) {
        this.#config.method = 'DELETE';
        if ( data ) this.data_processor( data );
        return await this.requester( endpoint );
    }
    async put ( endpoint, data ) {
        this.#config.method = 'PUT';
        if ( data ) this.data_processor( data );
        return await this.requester( endpoint );
    }
    async patch ( endpoint, data ) {
        this.#config.method = 'PATCH';
        if ( data ) this.data_processor( data );
        return await this.requester( endpoint );
    }

};

export const debounce = function ( func, wait, immediate ) {
    let timeout;
    return () => {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if ( !immediate ) func.apply( context, args );
        };
        let callNow = immediate && !timeout;
        clearTimeout( timeout );
        timeout = setTimeout( later, wait );
        if ( callNow ) func.apply( context, args );
    };
};