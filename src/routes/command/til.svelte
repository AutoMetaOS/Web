<script>
    import { onMount } from "svelte";

    let reddit = {
        // image: "https://stayhipp.com/wp-content/uploads/2019/10/reddit.png",
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

    const cleaner = (tx) => {
        return tx
            .replace("TIL that", "")
            .replace("TIL about", "")
            .replace("TIL", "")
            .replace("Today I Learned", "")
            .trim();
    };
</script>

<a
    href={reddit.href}
    class="rpm-10 tile ƒ-col †j fade-right bg"
    style={tile_style}
>
    <p>
        {@html cleaner(reddit.title)} &rarr;
    </p>
</a>
<div class="rpm-10 tile" style={twt_style}>
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

<style>
    p::first-letter {
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
