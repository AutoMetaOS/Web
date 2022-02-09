<script>
    import pkg from "predefined";
    const { url_params } = pkg;
    import Bar from "./parts/bar.svelte";
    import Player from "./parts/player.svelte";
    import SubSet from "./parts/set.svelte";
    import Stack from "./parts/stack.svelte";
    import Search from "./parts/search.svelte";

    import Chips from "./components/chips.svelte";

    import { onMount } from "svelte";
    import { processors, youtube } from "./functions";
    import cnls from "../../../../config/sorted_channels.json";

    let base = [];

    const recenter = (e) => {
        youtube.channel(e.target.id).then((r) => (base = r.items));
        window.location.href = "#search";
    };
    const searcher = (sc) => {
        const q = typeof sc === "string" ? sc : sc.target[0].value;
        if (!q) return url_params.set("q", "");
        else youtube.search(q).then((r) => (base = r.items));
        window.location.href = "#search";
        return url_params.set("q", q);
    };

    onMount(() => {
        const params = url_params.get();
        params.q && searcher(params.q);
        if (params.id) processors.videoProcessor(params.id);

        return 0;
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/OUI/css/g100.css" />
</svelte:head>

<main>
    <Bar {searcher} />
    <Player />
    <Search videos={base} />
    <SubSet set={cnls} />
    <Stack />
    <Chips {recenter} {cnls} />
</main>

<style>
    main {
        overflow-x: hidden;
        background: #111;
        color: #fff;
    }
</style>
