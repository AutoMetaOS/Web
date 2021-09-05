<script>
    export let //
        title = "Monitor",
        results = [];
</script>

<article>
    <h3>{title}</h3>
    <p>
        {#each results as res}
            <div class="ƒ ƒ∑">
                <span class="fw5">{res.name}:&nbsp;</span>
                {#if res.check}
                    Passed
                {:else}
                    Failed
                    <div class="w-100" style="padding-left:20px;">
                        <span class="fw6">expected: </span>{res.expect}
                        <br />
                        <span class="fw6">outcome: </span>{res.value}
                    </div>
                {/if}
            </div>
        {/each}
    </p>
</article>
