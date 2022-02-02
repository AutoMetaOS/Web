<script>
    import { onMount } from "svelte";
    import Book from "./components/book.svelte";
    import { api } from "./functions";

    $: results = [];
    onMount(() => {
        api.search({ author: "Jon Ronson" }).then((res) => {
            results = res;
        });
    });
</script>

<main class="p0 m0 ƒ ƒ∑">
    {#each results as book}
        <Book
            id={book.cover_edition_key}
            title={book.title}
            author={book.author_name}
            description={book.description}
            image={book.cover_i}
            tags={book.subject}
            isbn={book.isbn}
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
