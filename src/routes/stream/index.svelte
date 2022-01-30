<script>
    import pkg from "predefined";
    const { url_params } = pkg;
    import Bar from "./components/bar.svelte";
    import Player from "./components/player.svelte";
    import SubSet from "./components/set.svelte";
    import Search from "./components/search.svelte";

    import { onMount } from "svelte";
    import { videoProcessor, search } from "./store";
    import cnls from "../../../../config/sorted_channels.json";

    let base = [];

    const searcher = (sc) => {
        const q = typeof sc === "string" ? sc : sc.target[0].value;
        if (!q) return url_params.set("q", "");
        else search(q).then((r) => (base = r.items));
        window.location.href = "#search";
        return url_params.set("q", q);
    };

    onMount(() => {
        const params = url_params.get();
        params.q && searcher(params.q);
        if (params.id) {
            videoProcessor(params.id);
        }
        return 0;
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/OUI/css/g100.css" />
    <style>
        body {
            background: #111;
            color: #fff;
        }
    </style>
</svelte:head>

<main>
    <Bar {searcher} />
    <Player />
    <Search videos={base} />
    {#each cnls as set, index}
        <SubSet {set} {index} />
    {/each}
</main>

<style>
    main {
        overflow-x: hidden;
    }
</style>
