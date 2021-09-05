<script>
  export let videos = [];

  import Card from "../shared/videoCard.svelte";
  import { Kron } from "$lib/shared/molecular";
</script>

<section class="p20 ƒ ƒ∑" id="search">
  {#if videos.length}
    <div class="p5">
      <div on:click={() => (videos = [])}>Search</div>
    </div>
    {#each videos as vid}
      <Card
        title={vid.snippet.title}
        type="Youtube"
        image={vid.snippet.thumbnails.medium.url}
        slug={vid.id.videoId}
        details={[
          vid.snippet.channelTitle,
          new Kron(vid.snippet.publishedAt).timeSince(),
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
