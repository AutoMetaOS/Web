<script>
    import Book from "./components/book.svelte";
    import Stack from "./parts/stack.svelte";
    import { api, process } from "./functions";
    import buffer from "./data/defaults";

    $: results = [];
    $: searchText = "";

    const anyIncludes = (strings, text) => {
        return strings.some((string) => string?.toLowerCase().includes(text));
    };

    const formSubmit = () => {
        console.log(buffer);
        results = [buffer];
        const formData = process.form.search(searchText);

        api.search(formData).then((res) => (results = res));
    };
</script>

<main class="p0 m0 ƒ ƒ∑ p-rel">
    <form on:submit|preventDefault={formSubmit} class="w-100 p-fix p10 blur">
        <input
            type="text"
            spellcheck="false"
            class="w-50"
            placeholder="Search"
            bind:value={searchText}
        />
        <input type="submit" class="o-0" value="go" />
    </form>
    <Stack omni={searchText} />
    <div class="ƒ ƒ∑ ∆-bw w-100">
        {#each results.map(process.results) as book}
            <Book
                objective={book.objective}
                id={book.cover_edition_key}
                title={book.title}
                author={book.author_name}
                image={book.cover_i}
                tags={book.subject}
                published={book.publish_year}
            />
        {/each}
    </div>
</main>

<style type="text/scss">
    main {
        overflow-x: hidden;
        height: 100vh;
        width: 100vw;
        background: #111;
        color: #fff;
        margin-top: calc(2.5rem + 10px);
    }
    form {
        top: 0;
        font-size: 1.25rem;
        --bg: #222;
        --sz: 8px;
        height: calc(1em + 10px);
        input {
            color: #fff;
        }
    }
</style>
