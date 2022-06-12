<script>
    import { recommendations } from "./samurai";

    const fixText = (tx) =>
        tx
            .replaceAll("<b>", "&nbsp;<span class='fw6'>")
            .replaceAll("</b>", "</span>&nbsp;")
            .replaceAll("\n", "")
            .replaceAll("<br>", "")
            .replaceAll("<br/>", "")
            .trim();
</script>

<ul id="autoComplete" class="mx-a w-100 p0">
    {#each $recommendations as rec}
        <div class="blur ƒ rx10">
            <img
                class="rx2"
                src={rec[3]?.zs || "https://i.imgur.com/drIqvV8.jpg"}
                alt=""
            />
            <div class="fw4 ƒ-col ∆-ct">
                {#if rec[3]}
                    <div class="ƒ">
                        {@html fixText(rec[3]?.zh || rec[0])}
                    </div>
                    <span>{@html fixText(rec[3]?.zi || "")}</span>
                {:else}
                    <div class="ƒ">
                        {@html fixText(rec[0])}
                    </div>
                {/if}
            </div>
        </div>
    {/each}
</ul>

<style type="text/scss">
    #autoComplete {
        margin-top: 10px;
        overflow: hidden;
        color: #222;
        width: calc(80% + 10px);
        list-style-type: none;
        &:empty {
            opacity: 0;
        }
    }
    .blur {
        padding: 5px 10px;
        --sz: 0;
        --bg: #fff;
    }
    img {
        width: 44px;
        height: 44px;
        object-fit: contain;
        padding-right: 7px;
    }
</style>
