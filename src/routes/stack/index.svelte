<script>
    import Stick from "./tile.svelte";
    import Adder from "./adder.svelte";
    import { onMount } from "svelte";
    import { full_stack, getStack } from "./functions";

    const Rank = (a, b) => (a.rank > b.rank ? 1 : -1);
    onMount(() => {
        getStack();
    });
</script>

<section class="p5">
    <div class="ƒ ƒ∑">
        <Adder />
        {#each $full_stack.sort(Rank) as orb}
            <Stick data={orb} />
        {/each}
    </div>
    <style>
        .tile {
            padding: 0;
            width: 25%;
            height: 300px;
        }
    </style>
</section>
