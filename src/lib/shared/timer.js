// REFER https://github.com/husa/timer.js/
class Timer {
    constructor ( options = '' ) {
        this.defaultOptions = {
            tick: 1,
            onstart: null,
            ontick: null,
            onpause: null,
            onstop: null,
            onend: null
        };
        this._ = {
            id: +new Date,
            options: {},
            duration: 0,
            status: 'initialized',
            start: 0,
            measures: []
        };
        for ( let prop in this.defaultOptions ) this._.options[ prop ] = this.defaultOptions[ prop ];
        this.options( options );
    };

    start ( duration ) {
        if ( !+duration && !this._.duration ) return this
        duration && ( duration *= 1000 )
        if ( this._.timeout && this._.status === 'started' ) return this
        this._.duration = duration || this._.duration
        this._.timeout = setTimeout( this.end.bind( this ), this._.duration )
        if ( typeof this._.options.ontick === 'function' )
            this._.interval = setInterval( function () {
                this.trigger.call( this, 'ontick', this.getDuration() )
            }.bind( this ), +this._.options.tick * 1000 )
        this._.start = +new Date
        this._.status = 'started'
        this.trigger.call( this, 'onstart', this.getDuration() )
        return this
    };

    pause () {
        if ( this._.status !== 'started' ) return this
        this._.duration -= ( +new Date - this._.start )
        this.clear.call( this, false )
        this._.status = 'paused'
        this.trigger.call( this, 'onpause' )
        return this
    };

    stop () {
        if ( !/started|paused/.test( this._.status ) ) return this
        this.clear.call( this, true )
        this._.status = 'stopped'
        this.trigger.call( this, 'onstop' )
        return this
    };

    getDuration () {
        if ( this._.status === 'started' )
            return this._.duration - ( +new Date - this._.start )
        if ( this._.status === 'paused' ) return this._.duration
        return 0
    };

    getStatus () {
        return this._.status
    };

    options ( option, value ) {
        if ( option && value ) this._.options[ option ] = value
        if ( !value && typeof option === 'object' )
            for ( let prop in option )
                if ( this._.options.hasOwnProperty( prop ) )
                    this._.options[ prop ] = option[ prop ]
        return this
    };

    on ( option, value ) {
        if ( typeof option !== 'string' || typeof value !== 'function' ) return this
        if ( !( /^on/ ).test( option ) )
            option = 'on' + option
        if ( this._.options.hasOwnProperty( option ) )
            this._.options[ option ] = value
        return this
    };

    off ( option ) {
        if ( typeof option !== 'string' ) return this
        option = option.toLowerCase()
        if ( option === 'all' ) {
            this._.options = this.defaultOptions
            return this
        };
        if ( !( /^on/ ).test( option ) ) option = 'on' + option
        if ( this._.options.hasOwnProperty( option ) )
            this._.options[ option ] = this.defaultOptions[ option ]
        return this
    };

    measureStart ( label ) {
        this._.measures[ label || '' ] = +new Date
        return this
    };

    measureStop = ( label ) => +new Date - this._.measures[ label || '' ];

    end () {
        this.clear.call( this )
        this._.status = 'stopped'
        this.trigger.call( this, 'onend' )
    };

    trigger ( event ) {
        let callback = this._.options[ event ],
            args = [].slice.call( arguments, 1 )
        typeof callback === 'function' && callback.apply( this, args )
    };

    clear ( clearDuration ) {
        clearTimeout( this._.timeout )
        clearInterval( this._.interval )
        if ( clearDuration === true ) this._.duration = 0
    };
}
export default Timer;