<script>
    import { vId } from "../shared/store";
    import { AspectRatio } from "$oui";

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
        <AspectRatio class="†c w-100 h-100" ratio="16x10">
            <iframe
                title="vid"
                class="w-100 h-100"
                framebor
                der="0"
                src={$vId}
                {allow}
                {sandbox}
            />
        </AspectRatio>
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
