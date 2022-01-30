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
    class="recom p-rel fade-right rx5 m5 p0 ƒ-col"
    data-count={count.join(",")}
    data-title={title}
    data-slug={slug}
    on:click={videoSet}
>
    <img src={image} class="w-100" alt="thubmnail" />
    <div class="†c w-100 deets p-abs p5">
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
        width: calc(20% - 10px);
        z-index: 1;
        transform: scale(1);
        transition: all 0.2s ease;
        .deets {
            -webkit-font-smoothing: antialiased;
            background: #222;
            pointer-events: none;

            z-index: 0;
            opacity: 0;
            top: 50%;

            transition: all 0.15s ease;
        }
        img {
            aspect-ratio: 16/9;
        }
        &:hover {
            transform: scale(1.25);
            z-index: 2;
            .deets {
                z-index: 44;
                opacity: 1;
                top: 99%;
            }
        }
    }
</style>
