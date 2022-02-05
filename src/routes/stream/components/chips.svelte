<script>
    export let //
        cnls,
        recenter;

    $: list =
        cnls
            ?.map((e) => e.channels)
            .flat()
            .sort((a, b) => (a.name - b.name ? 1 : -1)) || [];
</script>

<section class="w-100 ƒ ƒ∑ m10 p10">
    {#each list as cnl}
        <div
            id={cnl.id}
            class="chip rx20 p10 †c m5"
            on:click|preventDefault={recenter}
        >
            {cnl.name}
        </div>
    {/each}
</section>

<style type="text/scss">
    .chip {
        min-width: 100px;
        border: 1px solid #fff;
        background: #444;
        color: #fff;
        cursor: pointer;
        transition: background 0.2s ease;
        &:hover {
            background: #666;
        }
    }
</style>
