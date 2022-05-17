<script>
    import { getReddit } from "$lib/pages";
    import { onMount } from "svelte";

    let news = [];
    onMount(() => {
        getReddit("technews", "new", 10).then((d) => {
            news = d;
        });
    });
</script>

{#each news as post}
    <div class="p5 rx5 blur" rel="external">
        <div class="ƒ" style="width:250px;">
            <img
                class="rx2"
                src={post.image}
                height="64px"
                width="64px"
                alt={new URL(post.href).origin}
            />
            <a class="post" href={post.href}>
                {post.desc}
            </a>
        </div>
    </div>
{/each}

<style>
    .post {
        margin-left: 5px;
        display: -webkit-box;
        line-height: 1.33em;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .blur {
        margin-right: 10px;
        height: 64px;
        --sz: 8px;
        --bg: #fff4;
    }
    a {
        display: block;
    }
</style>
