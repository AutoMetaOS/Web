<script>
    import { subscriptions } from "../shared/store";
    import { Kron } from "$lib/shared/molecular";
    import Card from "../shared/videoCard.svelte";

    $: videos = $subscriptions;
    const clear = () => (videos = []);

    let slicer = 1;
</script>

<section class="ƒ p20 ƒ∑" id="search">
    {#if videos.length}
        <div class="w-100 ƒ p5 ∆-bw">
            <span on:click={clear}> Nebula </span>
            <span style="font-size:1.25rem">
                0<input type="range" min={0} max={4} bind:value={slicer}>4
            </span>
        </div>
        {#each videos.slice(0, slicer * 5) as vid}
            <Card
                title={vid.title}
                slug={vid.uri}
                type="Nebula"
                image={vid.image}
                token={vid.token}
                details={[vid.channel, new Kron(vid.date).timeSince()]}
            />
        {/each}
    {/if}
</section>
