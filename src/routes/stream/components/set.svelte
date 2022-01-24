<script>
  export let set;

  import { Kron } from "$lib/shared";
  import { getRecents } from "../store";
  import Card from "./videoCard.svelte";

  const promise = getRecents(set?.channels);

  const clear = () => (videos = []);

  let slicer = 1;
</script>

<section class="ƒ p20 ƒ∑" id="search">
  {#await promise}
    Waiting for <i>&nbsp;{set?.class}</i>...
  {:then videos}
    {#if videos.length}
      <div class="w-100 ƒ p5 ∆-bw">
        <span on:click={clear}> {set.class} ({videos.length})</span>
        <span style="font-size:1.25rem">
          0<input type="range" min={0} max={3} bind:value={slicer} />3
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
  {:catch error}
    {typeof error === "string" ? error : JSON.stringify(error)}
  {/await}
</section>
