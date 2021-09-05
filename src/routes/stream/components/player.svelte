<script>
    let maxwell;

    import { vId } from "../shared/store";
    import { AspectRatio } from "$hakama";
</script>

<AspectRatio class="w-100 h-100 †c" ratio="16x10">
    {#if $vId}
        <iframe
            title="vid"
            class="w-100 h-100"
            frameborder="0"
            bind:this={maxwell}
            src={$vId}
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;picture-in-picture"
            sandbox="allow-scripts allow-same-origin"
        />
    {/if}
</AspectRatio>
