<script>
    import { stack } from "$lib/db";
    import Card from "./videoCard.svelte";

    const promise = stack.type("amos", "Video");

    const url_process = (ur) => {
        if (ur.includes("tu.be")) return ur.split("?")[0].split("be/")[1];
        else return ur.split("?")[0].split("v=")[1];
    };

    const dater = (v) => parseInt(v.id.split("-")[0], 36);

    const sorter = (a, b) => {
        console.log(a);
        const [a_dt, b_dt] = [a, b].map(dater);
        console.log(a_dt, b_dt);

        return new Date(b_dt) - new Date(a_dt);
    };

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

    let slicer = 3;
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
                    max={videos.flat().length / 5}
                    bind:value={slicer}
                />
            </span>
        </div>
        {#each videos.sort(sorter).slice(0, slicer * 5) as vid, i}
            <Card
                type="snippet"
                count={i}
                title={vid.title}
                slug={url_process(vid.url)}
                image={vid.image}
                details={["Stack", since(dater(vid))]}
            />
        {/each}
    {:catch error}
        {typeof error === "string" ? error : JSON.stringify(error)}
    {/await}
</section>
