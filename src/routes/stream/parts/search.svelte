<script>
  export let videos = [];

  import { processors } from "../functions";
  import Card from "../components/videoCard.svelte";
</script>

<section class="p20 ƒ ƒ∑" id="search">
  {#if videos.length}
    <div class="p5">
      <div on:click={() => (videos = [])}>Search</div>
    </div>
    {#each videos as vid}
      <Card
        title={vid.snippet.title}
        image={vid.snippet.thumbnails.medium.url}
        slug={vid.id.videoId}
        details={[
          vid.snippet.channelTitle,
          processors.timeSince(vid.snippet.publishedAt),
        ]}
      />
    {/each}
  {/if}
</section>

<style>
  .p5 {
    width: 99vw;
  }
</style>
