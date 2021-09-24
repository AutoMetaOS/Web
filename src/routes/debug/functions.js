export { default as Editor } from './editor.svelte';
export { default as Iframe } from './frame.svelte';

export const w3 = `<svg>
const h1 = document.querySelector('h1');
const number = [ 1 || "One" ];
</svg>
<style>
svg{
    width: 700px;
    height: 700px;
    border: 1px solid green;
}
</style>`;

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

export const wordCount = ( str ) =>
    str
        .replace( /(^\s*)|(\s*$)/gi, "" )
        .replace( /[ ]{2,}/gi, " " )
        .replace( /\n /, "\n" )
        .split( ' ' ).length;