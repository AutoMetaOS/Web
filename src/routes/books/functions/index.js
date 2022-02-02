import { search } from "./api";
import { image, isbn, author } from "./processors";

export const api = {
    search,
}

export const process = {
    image,
    isbn,
    author
}