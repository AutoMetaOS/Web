<script>
    import { process } from "../functions";
    import Functions from "./functions.svelte";
    export let //
        objective = "sugg",
        title = "",
        image = "",
        tags = [],
        id,
        published = new Date().getFullYear(),
        author = "";

    $: self = {
        title,
        image: image || null,
        tags: process.tags(tags),
        bk_id: id,
        published: process.published(published),
        author: process.author(author),
    };
</script>

<div {id} class="book ƒ m10">
    <div class="p-rel">
        {#if !!image}
            <img
                class="w-100 h-100"
                src={`https://covers.openlibrary.org/b/id/${image}-M.jpg`}
                alt={title}
            />
        {:else}
            <div class="dummy †c ƒ w-100 h-100">{title.trim()}</div>
        {/if}
    </div>
    <div class="body p-rel">
        <div>
            {process.author(author)}
            {#if published}
                ({process.published(published)})
            {/if}
        </div>

        <div class="tags">
            {process.tags(tags)}
        </div>

        <h5 class="title">{title.toUpperCase()}</h5>

        <Functions {objective} data={self} />
    </div>
</div>

<style type="text/scss">
    .book {
        --w: 140px;
        --h: 200px;
        width: 300px;
        max-height: 220px;
        overflow: hidden;
        word-wrap: break-word;
        .body {
            padding: 0 10px;
        }
        .tags {
            padding: 5px 0;
            color: #aaa;
            text-transform: capitalize;
        }
        img {
            width: var(--w);
            height: var(--h);
        }
        .dummy {
            width: var(--w);
            height: var(--h);

            background: #fefef8;
            color: #222;
            align-items: center;
            word-wrap: break-word;
            overflow: hidden;
        }
    }
</style>
