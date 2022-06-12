<script>
    import { storage } from "predefined";
    const { URLParams } = storage;
    import Bar from "./parts/bar.svelte";
    import Player from "./parts/player.svelte";
    import SubSet from "./parts/set.svelte";
    import Stack from "./parts/stack.svelte";
    import Search from "./parts/search.svelte";

    import { youtube } from "./functions";
    import { videoSet } from "./functions/store";
    import cnls from "../../../../config/sorted_channels.json";

    let base = [];

    const searcher = (sc) => {
        const q = typeof sc === "string" ? sc : sc.target[0].value;
        if (!q) return URLParams.set("q", "");
        else youtube.search(q).then((r) => (base = r.items));
        window.location.href = "#search";
        return URLParams.set("q", q);
    };

    onMount(() => {
        const params = URLParams.get();
        params.q && searcher(params.q);
        if (params.id) videoSet({ slug: params.id });

        return 0;
    });
</script>

<main>
    <Bar {searcher} />
    <Player />
    <Search videos={base} />
    <SubSet set={cnls} />
    <Stack />
</main>
