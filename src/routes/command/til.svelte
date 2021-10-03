<script>
    import { onMount } from "svelte";
    import { ClickableTile } from "$hakama";

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
</script>

<ClickableTile
    href={reddit.href}
    class="p0 ƒ-col †j fade-right"
    style="bottom:1em;right:11%;z-index:10;width:350px;position:absolute;"
>
    <p>
        {reddit.title} &rarr;
    </p>
</ClickableTile>
