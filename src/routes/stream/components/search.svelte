<script>
  export let videos = [];

  const since = (val) => {
    val = 0 | ((Date.now() - new Date(val)) / 1000);
    let unit,
      length = {
        second: 60,
        minute: 60,
        hour: 24,
        day: 7,
        week: 4.35,
        month: 12,
        year: 10000,
      },
      result;

    for (unit in length) {
      result = val % length[unit];
      if (!(val = 0 | (val / length[unit])))
        return result + " " + (result - 1 ? unit + "s" : unit);
    }
  };

  import Card from "./videoCard.svelte";
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
        details={[vid.snippet.channelTitle, since(vid.snippet.publishedAt)]}
      />
    {/each}
  {/if}
</section>

<style>
  .p5 {
    width: 99vw;
  }
</style>
