import { getRecents, search, channel } from "./youtube";
import { videoSet } from "./store";
import { onMessage, postMessage, timeSince } from "./processors";


export const youtube = {
    search,
    channel,
    getRecents
};

export const processors = {
    videoSet,
    onMessage,
    postMessage,
    timeSince
}