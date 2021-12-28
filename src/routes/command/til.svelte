<script>
    import { onMount } from "svelte";

    let reddit = {
        title: "fetching...",
        href: "#",
    };

    onMount(() =>
        fetch("https://www.reddit.com/r/todayilearned/new/.json?limit=1")
            .then((r2) => r2.json())
            .then((r) => {
                const fetched = r.data.children[0].data;
                reddit = {
                    title: fetched.title,
                    href: fetched.url,
                };
            })
    );

    const styler = (st) => st.map((e) => e.join(":")).join(";");

    const tile_style = styler([
        ["--bg", "linear-gradient(135deg, #30a, #90F)"],
    ]);
    const twt_style = styler([["border", "1px solid #2af"]]);
    const wiki_style = styler([
        ["border", "1px solid #888"],
        ["height", "240px"],
    ]);

    const cleaner = (tx) =>
        tx
            .replace("TIL that", "")
            .replace("TIL about", "")
            .replace("TIL :", "")
            .replace("TIL:", "")
            .replace("TIL", "")
            .replace("Today I Learned", "")
            .trim();
</script>

<a
    href={reddit.href}
    class="rpm-10 tile ƒ-col †j fade-right bg"
    style={tile_style}
>
    {@html cleaner(reddit.title)} &rarr;
</a>
<div class="rpm-10 tile fade-right" style={twt_style}>
    <a
        class="twitter-timeline "
        href="https://twitter.com/elonmusk?ref_src=twsrc%5Etfw"
        >Tweets by elonmusk</a
    >
    <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"></script>
</div>
<iframe
    class="tile rx10 m10 fade-right"
    style={wiki_style}
    title="Wiki"
    src="https://en.m.wikipedia.org/wiki/Special:Random"
/>

<style>
    a:first-letter {
        text-transform: uppercase;
    }
    .tile {
        width: 350px;
        height: 220px;
        z-index: 10;
        --tx: #fff;
        overflow-y: scroll;
    }
</style>
