<script>
    import { videoSet } from "../shared/store";
    import { ImageLoader } from "$hakama";

    export let //
        title = "",
        details = [],
        token = 1,
        type,
        slug,
        image;
</script>

<div class="recom p-rel m5 p0 ƒ-col" on:click={videoSet}>
    <a
        href="#wrapper"
        data-type={type}
        data-title={title}
        data-token={token}
        data-slug={slug}
    >
        <ImageLoader class="w-100" ratio="16x9" src={image} />
        <div class="†c w-100 deets p-abs p5">
            <div style="padding-bottom:5px;">
                {@html title.slice(0, 60)}
                {title.length > 60 ? "..." : ""}
            </div>
            <div style="color: #888;">
                {details.join(" • ")}
            </div>
        </div>
    </a>
</div>

<style type="text/scss">
    .recom {
        cursor: pointer;
        width: calc(20% - 10px);
        z-index: 1;
        transition: all 0.2s ease;
        .deets {
            background: #222;
            pointer-events: none;

            z-index: 0;
            opacity: 0;
            top: 50%;

            transition: all 0.15s ease;
        }
        &:hover {
            transform: scale(1.1);
            z-index: 2;
            img {
                border-radius-top-left: 5px;
                border-radius-top-right: 5px;
            }
            .deets {
                z-index: 44;
                opacity: 1;
                top: 100%;
                border-radius-bottom-left: 5px;
                border-radius-bottom-right: 5px;
            }
        }
    }
</style>
