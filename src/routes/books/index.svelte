<script>
    import Book from "./components/book.svelte";
    import Stack from "./stack.svelte";
    import { api, process } from "./functions";

    let tab = 0;
    const clickHandler = () => (tab = !tab);

    $: results = [];
    $: searchText = "";

    const formSubmit = () => {
        results = [{}];
        console.log(results);
        results = new Array(5).fill(0).map((e) => {
            return {
                objective: "add",
                cover_edition_key: "default",
                title: "Fetching...",
                author_name: ["Getting Books"],
                publish_year: [],
                cover_i: null,
            };
        });
        const formData = process.form.search(searchText);

        api.search(formData).then((res) => (results = res));
    };
</script>

<main class="p0 m0 ƒ ƒ∑ p-rel">
    <div class="blur w-100 p-fix" id="nav">
        <form
            on:submit|preventDefault={formSubmit}
            class="w-100 p10"
            style="top:0;"
        >
            <input
                type="text"
                spellcheck="false"
                class="w-50"
                placeholder="Search"
                bind:value={searchText}
            />
            <input type="submit" class="o-0" value="go" />
        </form>
        <div
            class="w-100 †c p10 ƒ"
            style="top:calc(3rem + 2px);"
            on:click={clickHandler}
        >
            <div class:active={!tab} class="fw7 tab">My Books</div>
            <div class:active={tab} class="fw7 tab">All Books</div>
        </div>
    </div>

    <div style="margin-top:6rem;">
        {#if !tab}
            <Stack omni={searchText.toLowerCase()} />
        {:else}
            <div class="ƒ ƒ∑ ∆-bw w-100">
                {#each results.map(process.results) as book}
                    <Book
                        objective={book.objective}
                        id={book.cover_edition_key}
                        title={book.title}
                        author={book.author_name}
                        image={book.cover_i}
                        published={book.publish_year}
                    />
                {/each}
            </div>
        {/if}
    </div>
</main>

<style type="text/scss">
    .tab {
        width: 25%;
        color: #fff;
        text-transform: uppercase;
        margin: 0 12.5%;
        padding: 2px 0;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.1s ease;
        &.active {
            background-color: #fff;
            color: #000;
        }
        &:not(.active):hover {
            background-color: #fff4;
        }
    }
    main {
        overflow-x: hidden;
        height: 100vh;
        width: 100vw;
    }
    .blur {
        z-index: 1;
        --bg: #0008 !important;
        --sz: 8px;
    }
    form {
        font-size: 1.25rem;
        height: calc(1em + 10px);
        input {
            background: transparent;
            color: #fff;
        }
    }
</style>
