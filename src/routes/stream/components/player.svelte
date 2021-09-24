<script>
    import { vId } from "../shared/store";
    import { AspectRatio } from "$hakama";
</script>

{#if $vId}
    <AspectRatio class="w-100 h-100 †c" ratio="16x10">
        <iframe
            title="vid"
            class="w-100 h-100"
            frameborder="0"
            src={$vId}
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;picture-in-picture"
            sandbox="allow-scripts allow-same-origin"
        />
    </AspectRatio>
{/if}
