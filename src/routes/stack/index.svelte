<script>
    import Row from "./tile.svelte";
    import Filter from "./filter.svelte";
    import Adder from "./adder.svelte";
    import { full_stack, filter } from "./functions";
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

    $: filter_calc = (e) => {
        const result = $filter?.length ? e.type === $filter : true;
        return result;
    };
</script>

<svelte:head>
    <style>
        body {
            background: #222;
        }
    </style>
</svelte:head>

<section class="ƒ ƒ∑">
    <div class="ƒ ∆-bw w-100">
        <img
            class="m10"
            src="/OUI/icons/infinity.svg"
            width="40px"
            height="40px"
            alt=""
        />
        <Filter />
    </div>
    <Adder {size} />
    {#each $full_stack.filter(filter_calc) as orb}
        <Row {size} data={orb} />
    {/each}
</section>
