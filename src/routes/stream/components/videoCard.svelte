<script>
    import { onMount } from "svelte";
    import { processors } from "../functions";
    import { now_playing, getNext } from "../functions/store";

    export let //
        get_next = 0,
        title = "",
        details = [],
        type = "",
        count = +$now_playing.local_id?.split("-")[1] || 0,
        slug = "",
        image = "https://wallpaperaccess.com/full/2404603.png";

    const id_processor = () => {
        let id;

        if (type === "snippet") id = "yt-" + count;
        if (type === "stack") id = "kv-" + count;
        else id = "yt-" + count;

        return id;
    };

    $: self = {
        title,
        details,
        type,
        count,
        slug,
        image,
        id: id_processor(),
    };

    const clickHandler = () => processors.videoSet(self);

    onMount(() => {
        if (get_next) {
            const next = getNext();
            [title, slug, image, count, type] = [
                next.title,
                next.slug,
                next.image,
                next.count,
                next.type,
            ];
        }
    });
</script>

<div
    class="recom p-rel fade-right m5 rx10 ƒ-col"
    id={id_processor()}
    data-title={title}
    data-slug={slug}
    on:click={clickHandler}
>
    <img
        id={"img_" + id_processor()}
        src={image}
        class="w-100"
        alt="thubmnail"
    />
    {#if details.length}
        <div class="†c w-100 deets blur p-abs p5">
            <div style="padding-bottom:5px;">
                {@html title?.slice(0, 60)}
                {title.length > 60 ? "..." : ""}
            </div>
            <div style="color: #888;">
                {details.join(" • ")}
            </div>
        </div>
    {/if}
</div>

<style type="text/scss">
    .recom {
        cursor: pointer;
        min-width: 300px;
        width: calc(20% - 10px);
        overflow: hidden;
        .deets {
            --bg: #000a;
            --sz: 8px;
            -webkit-font-smoothing: antialiased;
            pointer-events: none;

            z-index: 2;
            height: 4rem;
            top: calc(99% - 3.5rem);
            opacity: 0;

            transition: opacity 0.2s ease;
        }
        &:hover .deets {
            opacity: 1;
        }
        img {
            aspect-ratio: 16/9;
        }
    }
</style>
