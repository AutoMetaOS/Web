<script>
    import pkg from "predefined";
    const { url_params } = pkg;
    import Bar from "./parts/bar.svelte";
    import Player from "./parts/player.svelte";
    import SubSet from "./parts/set.svelte";
    import Stack from "./parts/stack.svelte";
    import Search from "./parts/search.svelte";

    import { onMount } from "svelte";
    import { youtube } from "./functions";
    import { videoSet } from "./functions/store";
    import cnls from "../../../../config/sorted_channels.json";

    let base = [];

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
