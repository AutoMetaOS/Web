<script>
    import Player from "./components/player.svelte";

    import VideoArrayHolder from "./parts/videoArray.svelte";
    import { allStreams } from "./functions/streamConfigs";
</script>

<main>
    <Player />
    {#each allStreams as stream}
        <VideoArrayHolder
        exposed={stream.exposed}
            type={stream.type}
            initializedArray={stream.initializedArray}
            prefetch={stream.prefetch}
            postfetch={stream.postfetch}
        />
    {/each}
</main>
