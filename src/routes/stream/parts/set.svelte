<script>
  export let set;

  import { processors } from "../functions";
  import Card from "../components/videoCard.svelte";

  const clear = () => (videos = []);

  $: videos = [];

  let slicer = 4;

  onMount(() => {
    const promise = Promise.all(
      set?.map((e) =>
        API.getYoutubeRecents(e.channels.map((el) => el.id).join("%2C"))
      )
    );
    promise.then((e) => (videos = e.flat()));
  });
</script>

<section class="ƒ p20 ƒ∑" id="updates">
  <div class="w-100 ƒ p5 ∆-bw">
    <span on:click={clear}> Updates ({videos.length})</span>
    <span style="font-size:1.25rem">
      <input
        type="range"
        min={0}
        max={Math.ceil(videos.flat().length / 4)}
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
