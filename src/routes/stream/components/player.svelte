<script>
    import { vId } from "../shared/store";

    const allow = [
        "fullscreen",
        "clipboard-write",
        "encrypted-media",
        "picture-in-picture",
    ].join(";");

    const sandbox = ["allow-scripts", "allow-same-origin"].join(" ");
</script>

{#if $vId}
    <div class="ƒ cont ∆-ct">
        <iframe
            title="vid"
            class="w-100 h-100"
            framebor
            der="0"
            src={$vId}
            {allow}
            {sandbox}
            style="aspect-ratio: 16/10;"
        />
    </div>
{/if}

<style>
    .cont {
        height: 100vh;
        width: 100vw;
        justify-content: center;
        align-items: center;
    }
</style>
