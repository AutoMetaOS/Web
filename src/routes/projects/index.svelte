<script>
    import data from "./data.json";
    import Project from "./proj.svelte";
</script>

<main class="ƒ ƒ∑ w-100 p5">
    {#each data as dat}
        <Project data={dat} />
    {/each}
</main>

<style type="text/scss">
    main {
        overflow-x: hidden;
        background: #111;
        color: #fff;
        min-height: 100vh;
    }
</style>
