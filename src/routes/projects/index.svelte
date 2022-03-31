<script>
    import data from "./data.json";
    import Nav from "./nav.svelte";
    import Project from "./proj.svelte";

    import Frequency from "./stats/upcoming.svelte";
    import Time from "./stats/clock.svelte";
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        Chart.defaults.color = "#fff";
    </script>
</svelte:head>

<main class="">
    <Nav len={data.length} />
    <div class="w-100" style="height: 75px">&nbsp;</div>

    <div class="ƒ" style="overflow-x: scroll">
        <div class="h-100 statCont">
            <Time />
        </div>
        <div class="h-100 statCont">
            <Frequency />
        </div>
    </div>
    <div class="ƒ ƒ∑ w-100">
        {#each data.sort((a, b) => new Date(a.eta) - new Date(b.eta)) as dat}
            <Project data={dat} />
        {/each}
    </div>
</main>

<style type="text/scss">
    main {
        overflow-x: hidden;
        background: #335;
        color: #fff;
        min-height: 100vh;
    }
    .statCont {
        max-height: 800px;
        min-width: 500px;
        aspect-ratio: 16/9;
    }
</style>
