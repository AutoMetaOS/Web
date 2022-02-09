import { search } from "./api";
import { image, author, tags, published } from "./processors";

export const api = {
    search,
}

export const process = {
    image,
    author,
    tags, published
}