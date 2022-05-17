import fetch from "node-fetch";

fetch( 'https://kizie.co/api/requests/getTweet', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: ' https://kizie.co/tools/twitter-image', // no-referrer, *client
    body: JSON.stringify( { "id": "1522373961681711105" } )
} )
    .then( r => r.json() )
    .then( console.log )