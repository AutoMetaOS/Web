<script>
    import Book from "./components/book.svelte";
    import { process } from "./functions";
    import { added_list } from "./functions";

    export let omni = "";

    const stacker = (id) => {
        added_list.update((list) => [...list, id || "1"]);
        return id;
    };

    const anyIncludes = (strings, text) =>
        strings.some((string) => string.toLowerCase().includes(text));

    $: books = [];
    $: filteredBooks = books.filter((e) =>
        anyIncludes([e.title, e.author], process.form.basic(omni).text)
    );

    onMount(() => SAMOSDB.list("books").then((r) => (books = r)));
</script>

<div class="ƒ ƒ∑ ∆-bw w-100 fade">
    {#if filteredBooks.length > 1}
        <Book
            objective={"todo"}
            id={stacker("123456")}
            title={`${filteredBooks.length}`}
            author={"Manav"}
            published={"2020"}
        />
        {#each filteredBooks as book}
            <Book
                objective={"todo"}
                id={stacker(book.bk_id)}
                title={book.title}
                author={book.author}
                image={book.image}
                published={book.published}
            />
        {/each}
    {/if}
</div>
