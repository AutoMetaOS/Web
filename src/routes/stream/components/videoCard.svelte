<script>
    import { videoSet } from "../functions/store";

    export let //
        title = "",
        details = [],
        count = 0,
        slug = "",
        image = "https://wallpaperaccess.com/full/2404603.png";

    const clickHandler = () => {
        const [arrayId, index] = count.split("_");
        videoSet({
            slug,
            title,
            arrayId,
            index,
        });
    };
</script>

<div
    class="recom p-rel fade-right m5 rx10 ƒ-col"
    id={slug}
    on:click={clickHandler}
>
    <img id="img_{count}" src={image} class="w-100" alt="thubmnail" />
    {#if details.length}
        <div class="†c fw3 w-100 deets blur p-abs p5">
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
        width: calc(25% - 10px);
        overflow: hidden;
        .deets {
            --bg: #000a;
            --sz: 8px;
            -webkit-font-smoothing: antialiased;
            pointer-events: none;

            z-index: 2;
            height: 5rem;
            top: calc(99% - 4.25rem);
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
