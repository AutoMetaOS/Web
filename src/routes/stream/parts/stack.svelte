<script>
    import { processors } from "../functions";
    import Card from "../components/VideoCard.svelte";

    const promise = stackDB.type("stack", "Video");

    const url_process = (ur) => {
        if (ur.includes("tu.be")) return ur.split("be/")[1].split("?")[0];
        else return ur.split("v=")[1].split("&")[0];
    };

    const dater = (v) => parseInt(v.id.split("-")[0], 36);
    const sorter = (a, b) => {
        const [a_dt, b_dt] = [a, b].map(dater);
        return new Date(b_dt) - new Date(a_dt);
    };

    let slicer = 1;
</script>

<section class="ƒ p20 ƒ∑" id="search">
    {#await promise}
        Waiting for Updates...
    {:then videos}
        <div class="w-100 ƒ p5 ∆-bw">
            <span> Stack ({videos.length})</span>
            <span style="font-size:1.25rem">
                <input
                    type="range"
                    min={0}
                    max={videos.flat().length / 4}
                    bind:value={slicer}
                />
            </span>
        </div>
        {#each videos.sort(sorter).slice(0, slicer * 4) as vid, i}
            <Card
                type="stack"
                count={i}
                title={vid.title}
                slug={url_process(vid.url)}
                image={vid.image}
                details={["Stack", processors.timeSince(dater(vid))]}
            />
        {/each}
    {/await}
</section>
