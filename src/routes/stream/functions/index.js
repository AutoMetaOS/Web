import { videoSet } from "./store";
import { onMessage, postMessage, timeSince } from "./processors";

export const processors = {
    videoSet,
    onMessage,
    postMessage,
    timeSince
}