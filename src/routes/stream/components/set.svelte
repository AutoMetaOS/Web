<script>
  export let set;

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

  import { getRecents } from "../store";
  import Card from "./videoCard.svelte";

  const promise = Promise.all(set?.map((e) => getRecents(e.channels)));

  const clear = () => (videos = []);

  let slicer = 3;
</script>

<section class="ƒ p20 ƒ∑" id="search">
  {#await promise}
    Waiting for Updates...
  {:then videos}
    <div class="w-100 ƒ p5 ∆-bw">
      <span on:click={clear}> Updates ({videos.length})</span>
      <span style="font-size:1.25rem">
        <input
          type="range"
          min={0}
          max={videos.flat().length / 5}
          bind:value={slicer}
        />
      </span>
    </div>
    {#each videos
      .flat()
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, slicer * 5) as vid, i}
      <Card
        type="snippet"
        count={i}
        title={vid.title}
        slug={vid.resourceId.videoId}
        image={vid.thumbnails.medium.url}
        details={[vid.channelTitle, since(vid.publishedAt)]}
      />
    {/each}
  {:catch error}
    {typeof error === "string" ? error : JSON.stringify(error)}
  {/await}
</section>
