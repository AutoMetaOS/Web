<script>
    import Stick from "./tile.svelte";
    // import Adder from "./adder.svelte";
    import { full_stack } from "./functions";
    import { onMount } from "svelte";

    onMount(() => {});
</script>

<svelte:head>
    <style>
        body {
            background: #222;
        }
    </style>
</svelte:head>

<section class="">
    <div class="ƒ ƒ∑">
        <!-- <Adder /> -->
        {#each $full_stack as orb}
            <Stick data={orb} />
        {/each}
    </div>
</section>
