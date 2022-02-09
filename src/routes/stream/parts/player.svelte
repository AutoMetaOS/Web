<script>
    import { onMount } from "svelte";
    import { processors } from "../functions";
    import { now_playing, app_behavior } from "../functions/store";
    import Card from "../components/videoCard.svelte";

    let iframe;

    $: rerender = {};

    onMount(() => {
        window.addEventListener("message", processors.onMessage, false);
        const command = { event: "listening" };

        setInterval(() => processors.postMessage(iframe, command), 1e3);
    });
</script>

{#if $now_playing.youtube_id}
    <div class="ƒ cont p-rel ∆-ct">
        <iframe
            bind:this={iframe}
            title="vid"
            class="w-100 h-100 p-abs"
            frameborder="0"
            src={$now_playing.youtube_id}
            allow="fullscreen; clipboard-write; encrypted-media; picture-in-picture"
            sandbox="allow-scripts allow-same-origin"
        />
        {#if $app_behavior?.show_next}
            <div id="magicBox" class="fade-left p-abs p0 rx10">
                <Card get_next={1} />
            </div>
        {/if}
    </div>
{/if}

<style type="text/scss">
    iframe {
        aspect-ratio: 16/10;
        z-index: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .cont {
        height: 100vh;
        width: 100vw;
        align-items: center;
    }
    #magicBox {
        max-width: 300px;
        z-index: 1;
        bottom: 3em;
        right: 2em;

        transition: background 0.2s ease-in;
        background: #0002;
        &:hover {
            background: #000;
        }
    }
</style>
