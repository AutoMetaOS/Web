export { default as Editor } from './editor.svelte';
export { default as Iframe } from './frame.svelte';

export const w3 = `<svg viewbox="0 0 512 512" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="a" x1="0" y1="0" x2="60%" y2="60%">
    <stop offset="0" stop-color="#2af"/>
    <stop offset="1" stop-color="rgba(250,220,240)"/>
  </linearGradient>
</defs>
<g fill="url(#a)">
  <path transform="scale(0.64) translate(150,150)" d="M380 125l-9-1s-96-7-134 119c-34 110-111 105-115 105h-5a102 102 0 015-204c35 0 67 18 86 47l16-11a122 122 0 10-100 188c17 0 97-6 132-119 33-110 111-105 115-105h7a102 102 0 11-94 157l-16 11a122 122 0 10112-187z"/>
    <circle stroke="url(#a)" fill="none" stroke-width="8" cx="50%" cy="50%" r="49%" />
 </g>
</svg>
<style>
svg{
    width: 700px;
    height: 700px;
    border: 1px solid #aaa8;
    border-radius:5px;
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