<script>
    import Bar from "./components/bar.svelte";
    import Player from "./components/player.svelte";
    import Subsc from "./components/YT_subs.svelte";
    import NebSubsc from "./components/NB_subs.svelte";
    import Search from "./components/search.svelte";

    import { onMount } from "svelte";
    import { videoProcessor, search } from "./shared/store";

    let base = [];

    const searcher = (sc) => {
        const q = typeof sc === "string" ? sc : sc.target[0].value;
        if (!q) return setµ("q", "");
        else search(q).then((r) => (base = r.items));
        window.location.href = "#search";
        return setµ("q", q);
    };

    onMount(() => {
        const params = getµ();
        params.q && searcher(params.q);
        if (params.id) {
            videoProcessor(params.type, params.id, params.token);
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
    <Subsc />
    <NebSubsc />
</main>

<style>
    main {
        overflow-x: hidden;
    }
</style>
