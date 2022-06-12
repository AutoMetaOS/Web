<script>
    import { globalStreamsHandler } from "../functions";
    import Card from "../components/videoCard.svelte";

    export let //
        type = "unknown",
        initializedArray = [],
        prefetch = null,
        postfetch = null;

    const dateSort = (a, b) => new Date(b.date) - new Date(a.date);
    const max = (len) => Math.ceil(len / 4);
    const clear = () => (videoArray = []);
    const arrayId = (~~(Math.random() * 1e16))
        .toString(36)
        .replaceAll("-", "0");

    $: slicer = 1;
    $: videoArray = [];

    onMount(async () => {
        if (type === "unit") {
            const promise = initializedArray;
            const promiseResponse = await promise;
            videoArray = promiseResponse.map(postfetch);
        } else if (type === "array") {
            const promiseArray = initializedArray.map(prefetch);
            console.log(0, promiseArray);
            const promiseArrayResponse = await Promise.all(promiseArray);

            videoArray = promiseArrayResponse.flat(1).map(postfetch);
        }

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
            <input
                type="range"
                min={0}
                max={max(videoArray.length)}
                bind:value={slicer}
            />
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
