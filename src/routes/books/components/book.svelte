<script>
    import { process } from "../functions";
    import Functions from "./functions.svelte";
    export let //
        objective = "suggest",
        title = "",
        image = "",
        id,
        published = new Date().getFullYear() || Infinity,
        author = "";

    $: self = {
        title,
        image: image || null,
        bk_id: id,
        published: process.published(published),
        author: process.author(author),
    };
</script>

<div
    {id}
    class="book fade-right ƒ m10"
    data-objective={objective}
    style="--w: 140px;--h: 200px;"
    class:large={objective === "todo"}
>
    <div class="p-rel size">
        {#if !!image}
            <img
                class="w-100 h-100"
                src={`https://covers.openlibrary.org/b/id/${image}-M.jpg`}
                alt={title}
            />
        {:else}
            <div class="dummy size †c ƒ w-100 h-100">{title.trim()}</div>
        {/if}
    </div>
    <div
        class="body size ƒ-col ∆-bw p-{objective !== 'todo'
            ? 'rel'
            : 'abs blur hover'} abs-top abs-left"
    >
        <div class="p10">
            {process.author(author)}
            {#if !Number.isFinite(published)}
                {process.published(published)}
            {/if}
        </div>

        {#if objective === "todo"}
            <h5 class="p10" style="font-size:2rem;max-height:4em;">
                {title.toUpperCase()}
            </h5>
        {/if}

        <Functions {objective} data={self} />
    </div>
</div>

<style type="text/scss">
    .size {
        width: var(--w);
        height: var(--h);
    }
    .book {
        width: 300px;
        max-height: var(--h);
        overflow: hidden;
        word-wrap: break-word;
        .dummy {
            background: #fefef8;
            color: #222;
            align-items: center;
            word-wrap: break-word;
            overflow: hidden;
        }
    }
    .large {
        --w: 280px !important;
        --h: 400px !important;
    }
</style>
