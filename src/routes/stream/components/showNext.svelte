<script>
    import Card from "../components/videoCard.svelte";
    import { F } from "predefined";
    import { tracker, playNext } from "../functions/store";
    import { onMount } from "svelte";

    const handleClick = (e) => playNext($tracker);

    let id_processor = (id) => {
        return { id };
    };

    onMount(() => {
        id_processor = (id) => {
            const [type, index] = id.split("-");

            const next = F(`#${type}-${index - 1}`);
            const { title, slug } = next.dataset;

            return {
                type: type === "yt" ? "snippet" : "stack",
                count: index,
                image: F(`#img_${type}-${index - 1}`).src,
                title,
                slug,
            };
        };
    });
    $: data = { ...id_processor($tracker) };
</script>

{#if $tracker?.split("-")[0] !== 0}
    <div
        id="magicBox"
        class="p-abs p0 visible rx10"
        on:click|preventDefault={handleClick}
    >
        <Card {...data} />
    </div>
{/if}

<style type="text/scss">
    #magicBox {
        z-index: 1;
        cursor: pointer;
        bottom: 3em;

        right: -350px;
        opacity: 0;
        transition: all 0.2s ease-in;
    }
    .visible {
        opacity: 1 !important;
        right: -1px !important;

        background: #0002;
        &:hover {
            background: #000;
        }
    }
</style>
