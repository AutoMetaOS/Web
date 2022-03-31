<script>
    import { onMount } from "svelte";
    import Stamp from "./year.svelte";
    import { getData } from ".";

    onMount(() => {});
</script>

<main class="p10">
    {#await getData() then response}
        {#each response as year}
            <Stamp data={year} />
        {/each}
    {/await}
</main>

<style>
    main {
        background: #fff;
        color: #000;
        width: calc(100vw - 20px);
        height: calc(100vh - 20px);
        overflow-x: hidden;
    }
</style>
