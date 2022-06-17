export const added_list = writable( [] );

import { search } from "./api";
import {
    author, published,
    form, results,
    attributes, icons
} from "./processors";

export const api = {
    search,
};

export const process = {
    author, published,
    results, form,
    attributes, icons
};