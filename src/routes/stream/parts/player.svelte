<script>
    import { onMount } from "svelte";
    import { processors } from "../functions";
    import { tracker, vId, playNext } from "../functions/store";

    let iframe;

    const allow = [
        "fullscreen",
        "clipboard-write",
        "encrypted-media",
        "picture-in-picture",
    ].join(";");

    const sandbox = ["allow-scripts", "allow-same-origin"].join(" ");

    const handleClick = (e) => playNext($tracker);

    onMount(() => {
        window.addEventListener("message", processors.onMessage, false);
        const command = { event: "listening" };

        setInterval(() => processors.postMessage(iframe, command), 1e3);
    });
</script>

{#if $vId}
    <div class="ƒ cont p-rel ∆-ct">
        <iframe
            bind:this={iframe}
            title="vid"
            class="w-100 h-100 p-abs"
            framebor
            der="0"
            src={$vId}
            {allow}
            {sandbox}
        />
        <div
            on:click|preventDefault={handleClick}
            id="magicBox"
            class="fw5 p10 p-abs visible"
        >
            Play {$tracker || "URL"} Next
        </div>
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
    #magicBox {
        z-index: 1;
        bottom: 3em;
        width: 250px;
        background: #000a;
        font-size: 2rem;
        border: 1px solid #fff4;
        color: #fff;

        right: -350px;
        opacity: 0;
        transition: all 0.2s ease-in;
    }
    .visible {
        opacity: 1 !important;
        right: -1px !important;
        &:hover {
            cursor: pointer;
            border: 1px solid #fff;
            background: #000;
            color: #fff;
        }
    }
    .cont {
        height: 100vh;
        width: 100vw;
        justify-content: center;
        align-items: center;
    }
</style>
