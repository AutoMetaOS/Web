<script>
    import { onMount } from "svelte";
    import { ClickableTile } from "$oui";

    let reddit = {
        image: "https://stayhipp.com/wp-content/uploads/2019/10/reddit.png",
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

    const tile_style = [
        ["bottom", "1em"],
        ["right", "10%"],
        ["width", "350px"],
        ["z-index", "10"],
        ["--tx", "#fff"],
        ["--bg", "linear-gradient(135deg, #30a, #90F)"],
    ]
        .map((e) => e.join(":"))
        .join(";");
</script>

<ClickableTile
    href={reddit.href}
    class="p0 ƒ-col †j fade-right bg rx10 p-abs"
    style={tile_style}
>
    <p>
        {@html reddit.title} &rarr;
    </p>
</ClickableTile>
