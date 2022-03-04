<script>
  export let set;

  import { F } from "predefined";
  import { youtube, processors } from "../functions";
  import Card from "../components/videoCard.svelte";
  import { onMount } from "svelte";

  const clear = () => (videos = []);

  $: videos = [];

  let slicer = 3;

  onMount(() => {
    const promise = Promise.all(
      set?.map((e) => youtube.getRecents(e.channels))
    );
    promise.then((e) => {
      videos = e.flat();
      const channels = videos.map((e) => F(`#${e.snippet.channelId}`));
      channels.forEach((e) => {
        if (e) e.remove();
      });
    });
  });
</script>

<section class="ƒ p20 ƒ∑" id="updates">
  <div class="w-100 ƒ p5 ∆-bw">
    <span on:click={clear}> Updates ({videos.length})</span>
    <span style="font-size:1.25rem">
      <input
        type="range"
        min={0}
        max={videos.flat().length / 4}
        bind:value={slicer}
      />
    </span>
  </div>
  {#each videos
    .sort((a, b) => new Date(b.contentDetails.videoPublishedAt) - new Date(a.contentDetails.videoPublishedAt))
    .slice(0, slicer * 4) as vid, i}
    <Card
      type={"snippet"}
      count={i}
      title={vid.snippet.title}
      slug={vid.snippet.resourceId.videoId}
      image={vid.snippet.thumbnails.medium.url}
      details={[
        vid.snippet.channelTitle,
        processors.timeSince(vid.contentDetails.videoPublishedAt),
      ]}
    />
  {/each}
</section>
