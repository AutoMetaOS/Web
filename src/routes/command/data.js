import { base } from "$app/paths";

export const sites = JSON.parse( `{
    "nf":{"name":"Netflix","prelink":"https://netflix.com/search?q="},
    "git":{"name":"GitHub","prelink":"https://github.com/search?&q="},
    "s":{"name":"Amos","prelink":"https://google.com/search?q="},
    "qi":{"name":"Amos","prelink":"https://google.com/search?q=","postlink":"&tbm=isch"},
    "r":{"name":"Reddit","base":"https://reddit.com/","prelink":"https://reddit.com/search?q="},
    "y":{"name":"Youtube","prelink":"/stream?q="},
    "dict":{"name":"Webster","prelink":"https://www.merriam-webster.com/dictionary/"},
    "wiki":{"name":"Wikipedia","prelink":"https://en.wikipedia.org/wiki/Special:Search?search="}
}`);

export const quickPages = JSON.parse( `{
    "yt": { "url": "${ base }/stream" },
    "math": { "url": "${ base }/math" },
    "books": { "url": "${ base }/books" },
    "debug": { "url": "${ base }/debug" },
    "stack": { "url": "${ base }/stack" }
}`);