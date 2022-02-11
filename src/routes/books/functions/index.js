import { search } from "./api";
import {
    author, tags, published,
    form, results,
    attributes, icons
} from "./processors";

export const api = {
    search,
};

export const process = {
    author, tags, published,
    results, form,
    attributes, icons
};