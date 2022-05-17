<script>
    import data from "./data/data.json";
    import pending from "./data/frontier.json";
    import Nav from "./nav.svelte";

    import Article from "./mini/article.svelte";
    import Project from "./mini/proj.svelte";
</script>

<Nav len={data.length} />
<main class="p10">
    <div class="w-100" style="height: 100px">&nbsp;</div>

    <div class="ƒ ƒ∑ ∆-bw w-100">
        {#each data.sort((a, b) => new Date(a.eta) - new Date(b.eta)) as dat}
            <Project data={dat} />
        {/each}
    </div>
    <div class="ƒ ƒ∑ ∆-bw w-100">
        <h1 class="w-100">Frontier Pending</h1>
        {#each pending as subject}
            <div class="w-100">
                <Article title={subject.series?.toUpperCase()} />
            </div>
            {#each subject.items as item}
                <Article {item} />
            {/each}
            {#each subject.specials as series}
                <Article title={series.series} />
                {#each series.items as item}
                    <Article {item} />
                {/each}
            {/each}
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
</style>
