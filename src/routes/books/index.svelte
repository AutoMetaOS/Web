<script>
    import { onMount } from "svelte";
    import Book from "./components/book.svelte";
    import Stack from "./parts/stack.svelte";
    import { api } from "./functions";

    $: results = [];
    onMount(() => {
        // api.search({ author: "Vaclav Smil" }).then((res) => {
        //     results = res;
        // });
    });
</script>

<main class="p0 m0 ƒ ƒ∑">
    <Stack />
    <h1 class="w-100">RAW</h1>
    {#each results as book}
        <Book
            objective={"sugg"}
            id={book.cover_edition_key}
            title={book.title}
            author={book.author_name}
            image={book.cover_i}
            tags={book.subject}
            published={book.publish_year}
        />
    {/each}
</main>

<style>
    main {
        overflow-x: hidden;
        height: 100vh;
        width: 100vw;
        background: #111;
        color: #fff;
    }
</style>
