<script>
    export let title = "",
        item = [];

    import Link from "./link.svelte";
</script>

<article class="rpm-10">
    {#if title}
        <div class="w-100 h-100 ƒ-col ∆-ct">
            <h1 class="w-100 †c">{title}</h1>
        </div>
    {:else}
        <h3>{item.title}</h3>
        {#if item.comment}
            <div>{item.comment}</div>
        {/if}
        <div class="†c p0">
            {#if item.multiple}
                {#each item.multiple as src, i}
                    <Link url={src} />
                    {#if i !== item.multiple.length - 1}
                        <hr class="w-50 o-20" />
                    {/if}
                {/each}
            {/if}
            {#if item.url}
                <Link src={item.src} url={item.url} />
            {:else}
                &nbsp;
            {/if}
        </div>
    {/if}
</article>

<style>
    article {
        width: 300px;
        max-height: 175px;
        overflow-y: scroll;
        background: linear-gradient(to bottom, #111 0%, #222 100%);
    }
    .†c {
        width: calc(100% - 10px);
    }
    h1 {
        color: #6f86d6;
        letter-spacing: 1px;
        font-size: 2em;
        background: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
        background: -moz-linear-gradient(transparent, transparent);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
