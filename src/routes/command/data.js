import { base } from "$app/paths";

export const sites = JSON.parse( `{
    "nf":{"name":"Netflix","prelink":"https://netflix.com/search?q="},
    "git":{"name":"GitHub","prelink":"https://github.com/search?&q="},
    "s":{"name":"Amos","prelink":"https://google.com/search?q="},
    "qi":{"name":"Amos","prelink":"https://google.com/search?q=","postlink":"&tbm=isch"},
    "r":{"name":"Reddit","base":"https://reddit.com/","prelink":"https://reddit.com/search?q="},
    "y":{"name":"Youtube","prelink":"/stream?q="},
    "fr":{"name":"Frontier","prelink":"https://frontier.nukes.in/search?query="},
    "dict":{"name":"Webster","prelink":"https://www.merriam-webster.com/dictionary/"},
    "wiki":{"name":"Wikipedia","prelink":"https://en.wikipedia.org/wiki/Special:Search?search="}
}`);

export const quickPages = JSON.parse( `{
    "yt": { "url": "${ base }/stream" },
    "cal": { "url": "${ base }/calendar" },
    "mon": { "url": "${ base }/monitor" },
    "debug": { "url": "${ base }/debug" },"w3": { "url": "${ base }/debug" },"repl": { "url": "${ base }/debug" }
}`);