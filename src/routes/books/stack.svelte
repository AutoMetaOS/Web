<script>
    import { stack } from "$lib/db";
    import { onMount } from "svelte";
    import Book from "./components/book.svelte";
    import { process } from "./functions";
    import { added_list } from "./functions/store";

    export let omni = "";

    const stacker = (id) => {
        added_list.update((list) => [...list, id || "1"]);
        return id;
    };

    const anyIncludes = (strings, text) => {
        return strings.some((string) => string.toLowerCase().includes(text));
    };

    $: books = [];

    onMount(() => stack.list("books").then((r) => (books = r)));
</script>

<div class="ƒ ƒ∑ ∆-bw w-100">
    {#each books.filter( (e) => anyIncludes([e.title, e.author], process.form.basic(omni).text) ) as book}
        <Book
            objective={"todo"}
            id={stacker(book.bk_id)}
            title={book.title}
            author={book.author}
            image={book.image}
            published={book.published}
        />
    {/each}
</div>

<style type="text/scss">
    .ƒ {
        max-height: 250px;
        transition: height 0.2s ease;
        overflow: hidden;
        &::after {
            position: absolute;
            top: 150px;
            content: " ";
            height: 100px;
            width: 100%;
            transition: top 0.2s ease;
            background: linear-gradient(transparent, #000);
        }
        &:hover {
            overflow-y: scroll;
            max-height: 66%;
            &::after {
                top: calc(66% - 100px);
            }
        }
    }
</style>
