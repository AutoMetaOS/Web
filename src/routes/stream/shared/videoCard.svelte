<script>
    import { onMount } from "svelte";

    import { videoSet } from "../shared/store";

    let href = "";

    onMount(() => {
        window.onload(() => {
            href = "#wrapper";
        });
    });

    export let //
        title = "",
        details = [],
        token = 1,
        type = "Youtube",
        slug = "",
        image = "";
</script>

<div class="recom p-rel fade-right m5 p0 ƒ-col" on:click={videoSet}>
    <a
        {href}
        data-type={type}
        data-title={title}
        data-token={token}
        data-slug={slug}
    >
        <img
            src={image}
            class="w-100"
            style="aspect-ratio:16/9"
            alt="thubmnail"
        />
        <div class="†c w-100 deets p-abs p5">
            <div style="padding-bottom:5px;">
                {@html title?.slice(0, 60)}
                {title.length > 60 ? "..." : ""}
            </div>
            <div style="color: #888;">
                {details?.join(" • ")}
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
            .deets {
                z-index: 44;
                opacity: 1;
                top: 100%;
            }
        }
    }
</style>
