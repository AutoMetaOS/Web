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
                    // image:
                    //     fetched?.preview.images[0].source.url.replaceAll(
                    //         "&amp;",
                    //         "&"
                    //     ) ||
                    //     fetched?.thumbnail ||
                    //     reddit.image,
                    title: fetched.title,
                    href: fetched.url,
                };
            })
    );
</script>

<ClickableTile
    href={reddit.href}
    class="p0 ƒ-col †j"
    style="position: absolute;bottom: 1em;right: 11%;z-index: 10;width:350px;"
>
    <!-- <img height="150px" src={reddit.image} alt="" /> -->
    <p>
        {reddit.title} &rarr;
    </p>
</ClickableTile>
