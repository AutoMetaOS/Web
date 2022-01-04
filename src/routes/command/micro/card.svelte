<script>
    import { onMount } from "svelte";
    import { wikipedia, reddit } from "./mapper";
    export let url, type;

    let data = {
        title: "",
        desc: "fetching...",
        image: "",
        href: "",
    };

    onMount(() => {
        const types = {
            reddit: reddit,
            wikipedia: wikipedia,
        };

        fetch(url)
            .then((response) => response.json())
            .then((d) => (data = types[type](d)));
    });
</script>

<a href={data.href} class="m10 tile ƒ †l fade-right">
    <div class="p10">
        {#if data.title}
            <h5 class="m0">{@html data.title}</h5>
        {/if}
        {@html data.desc}
    </div>
    {#if data.image}
        <img src={data.image} alt={data.title} />
    {/if}
</a>

<style type="text/scss">
    a *:first-letter {
        text-transform: uppercase;
    }
    .tile {
        width: 350px;
        height: 240px;
        z-index: 10;
        background: #fff;
        color: #000;
        overflow-y: scroll;
        border-radius: 4px;
        border: 1px solid #0002;
        & img {
            background: #fff;
            width: 33%;
            object-fit: cover;
            transition: width 0.1s ease;
            &:hover {
                width: 100%;
            }
        }
    }
</style>
