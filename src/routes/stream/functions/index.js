import { getRecents, search, channel } from "./youtube";
import { videoSet } from "./store";
import { videoProcessor, onMessage, postMessage, timeSince } from "./processors";


export const youtube = {
    search,
    channel,
    getRecents
};

export const processors = {
    videoSet,
    videoProcessor,
    onMessage,
    postMessage,
    timeSince
}