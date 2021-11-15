<script>
    import { recommendations } from "./samurai";
    import { Tile } from "$oui";

    const tile_style = [
        ["--bg", "#ccc"],
        ["margin", "10px 0"],
        ["padding", "5px 10px"],
        ["color", "#000"],
    ]
        .map((e) => e.join(":"))
        .join(";");
</script>

<ul id="autoComplete" class="mx-a w-100">
    {#each $recommendations as rec}
        <Tile class="bg ƒ rx10" style={tile_style}>
            <img
                class="rx2"
                src={rec[3]?.zs || "https://i.imgur.com/drIqvV8.jpg"}
                alt=""
            />
            <div class="ƒ-col ∆-ct">
                {#if rec[3]}
                    <div class="fw7">{@html rec[3]?.zh || rec[0]}</div>
                    <span>{rec[3]?.zi || ""}</span>
                {:else}
                    <div class="fw7">{@html rec[0]}</div>
                {/if}
            </div>
        </Tile>
    {/each}
</ul>

<style type="text/scss">
    #autoComplete {
        width: 80%;
        list-style-type: none;
        &:empty {
            opacity: 0;
        }
    }
    img {
        width: 44px;
        height: 44px;
        object-fit: contain;
        padding-right: 7px;
    }
</style>
