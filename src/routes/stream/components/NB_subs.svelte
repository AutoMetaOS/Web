<script>
    import { subscriptions } from "../shared/store";
    import { Slider } from "$oui";
    import { Kron } from "$lib/shared/molecular";
    import Card from "../shared/videoCard.svelte";

    $: videos = $subscriptions;
    const clear = () => (videos = []);

    let slicer = 1;
    const update = (e) => (slicer = e.detail);
</script>

<section class="ƒ p20 ƒ∑" id="search">
    {#if videos.length}
        <div class="w-100 ƒ p5 ∆-bw">
            <span on:click={clear}> Nebula </span>
            <span>
                <Slider hideTextInput on:change={update} max={4} value={1} />
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
