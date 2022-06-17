<script>
    import { globalStreamsHandler } from "../functions";
    import Card from "../components/videoCard.svelte";

    export let //
        exposed = 1,
        type = "unknown",
        initializedArray = [],
        prefetch = null,
        postfetch = null;

    const dateSort = (a, b) => new Date(b.date) - new Date(a.date);
    const clear = () => (videoArray = []);
    const arrayId = (~~(Math.random() * 1e16))
        .toString(36)
        .replaceAll("-", "0");

    $: slicer = exposed;
    $: videoArray = [];

    onMount(async () => {
        let promiseResponse;

        if (type === "unit") {
            const promise = initializedArray;
            promiseResponse = await promise;
        } else if (type === "array") {
            const promiseArray = initializedArray.map(prefetch);
            promiseResponse = await Promise.all(promiseArray);
        }

        videoArray = promiseResponse.flat(1).map(postfetch).filter(Boolean);
        globalStreamsHandler.addStream(arrayId, videoArray);
    });

    const timeSince = (val) => {
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
</script>

<section class="ƒ p20 ƒ∑" id="updates">
    <div class="w-100 ƒ p5 ∆-bw">
        <span on:click={clear}> Updates </span>
        <span style="font-size:1.25rem">
            <input type="range" min="0" max="6" bind:value={slicer} />
        </span>
    </div>
    {#each videoArray.sort(dateSort).slice(0, slicer * 4) as vid, i}
        <Card
            count={`${arrayId}_${i}`}
            title={vid.title}
            slug={vid.slug}
            image={vid.image}
            details={[vid.channel, timeSince(vid.date)]}
        />
    {/each}
</section>
