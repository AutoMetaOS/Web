<script>
  import { substack } from "../shared/store";
  import { Kron } from "$lib/shared/molecular";
  import Card from "../shared/videoCard.svelte";

  $: videos = $substack;

  const clear = () => (videos = []);

  let slicer = 2;
</script>

<section class="ƒ p20 ƒ∑" id="search">
  {#if videos.length}
    <div class="w-100 ƒ p5 ∆-bw">
      <span on:click={clear}> Youtube </span>
      <span style="font-size:1.25rem">
        0<input type="range" min={1} max={6} bind:value={slicer}>6
      </span>
    </div>
    {#each videos
      .sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt))
      .slice(0, slicer * 5) as vid, i}
      <Card
        title={vid.snippet.title}
        type="Youtube"
        slug={vid.snippet.resourceId.videoId}
        image={vid.snippet.thumbnails.medium.url}
        details={[
          vid.snippet.channelTitle,
          new Kron(vid.snippet.publishedAt).timeSince(),
        ]}
      />
    {/each}
  {/if}
</section>
