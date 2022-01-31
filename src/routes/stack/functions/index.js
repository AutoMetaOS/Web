import { writable } from "svelte/store";
import { stack } from "$lib/db";

export const filter = writable( "" );
export const full_stack = writable( [] );

stack.list( "amos" ).then( async r => full_stack.set( r.reverse() ) );