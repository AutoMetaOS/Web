<script>
    import { stack } from "$lib/db";
    import Book from "../components/book.svelte";

    const promises = stack.list("books");
</script>

{#await promises}
    Fetching...
{:then books}
    <div class="ƒ ƒ∑ w-100">
        {#each books as book}
            <Book
                objective={"todo"}
                id={book.bk_id}
                title={book.title}
                author={book.author}
                image={book.image}
                tags={book.tags.split(",")}
                published={book.published}
            />
        {/each}
    </div>
{/await}
