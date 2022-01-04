<script>
    import Row from "./tile.svelte";
    import Adder from "./adder.svelte";
    import { full_stack } from "./functions";
    import { onMount } from "svelte";

    const size = {
        width: "400px",
        height: "300px",
    };

    onMount(() => {
        const w = window.innerWidth;

        let frac = 0;
        if (w > 0) frac = 1;
        if (w > 300) frac = 2;
        if (w > 600) frac = 3;
        if (w > 991) frac = 4;
        if (w > 1440) frac = 5;

        size.width = ~~(w / frac) + "px";
        size.height = ~~(((3 / 4) * w) / frac) + "px";
    });
</script>

<svelte:head>
    <style>
        body {
            background: #222;
        }
    </style>
</svelte:head>

<section class="ƒ ƒ∑">
    <Adder {size} />
    {#each $full_stack as orb}
        <Row {size} data={orb} />
    {/each}
</section>
