<script>
    import { videoSet } from "../store";

    export let //
        title = "",
        details = [],
        count = [0, 0],
        slug = "",
        image = "https://wallpaperaccess.com/full/2404603.png";
</script>

<div
    class="recom p-rel fade-right rx10 ƒ-col"
    data-count={count}
    data-title={title}
    data-slug={slug}
    on:click={videoSet}
>
    <img src={image} class="w-100" alt="thubmnail" />
    <div class="†c w-100 deets blur p-abs p5">
        <div style="padding-bottom:5px;">
            {@html title?.slice(0, 60)}
            {title.length > 60 ? "..." : ""}
        </div>
        <div style="color: #888;">
            {details?.join(" • ")}
        </div>
    </div>
</div>

<style type="text/scss">
    .recom {
        cursor: pointer;
        margin: 5px 0;
        width: calc(20%);
        overflow: hidden;
        .deets {
            --bg: #000a;
            --sz: 8px;
            -webkit-font-smoothing: antialiased;
            pointer-events: none;

            z-index: 2;
            height: 3.75rem;
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
