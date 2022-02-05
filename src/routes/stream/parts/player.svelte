<script>
    import { onMount } from "svelte";
    import { processors } from "../functions";
    import Next from "../components/showNext.svelte";
    import { vId } from "../functions/store";

    let iframe;

    const allow = [
        "fullscreen",
        "clipboard-write",
        "encrypted-media",
        "picture-in-picture",
    ].join(";");

    const sandbox = ["allow-scripts", "allow-same-origin"].join(" ");

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
        <Next />
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
        justify-content: center;
        align-items: center;
    }
</style>
