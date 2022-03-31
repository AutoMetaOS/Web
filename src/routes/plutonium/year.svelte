<script>
    import { onMount } from "svelte";

    import { gets } from ".";
    export let //
        data = {
            Year: "2000",
            Grade: "0",
        };

    onMount(() => {});
</script>

<div class="p10 indi p-rel">
    <div class="head p-rel fw7">
        {data.Year} <span class="hover">({data.Grade})</span>
    </div>
    <div class="body">
        {#if data.Song_id}
            <div class="song">
                MAIN <br />
                {#await gets.song(data.Song_id) then song}
                    {JSON.stringify(song)}
                {/await}
                <br />
                <br />
                IMAGE <br />
                {#await fetch(`https://coverartarchive.org/release/${data.Song_id}`).then( (d) => d.text() ) then photo}
                    {photo}
                    {JSON.stringify(photo)}
                {/await}
            </div>
        {/if}
    </div>

    <div class="fw7">
        {JSON.stringify(data)}
    </div>
</div>

<style type="text/scss">
    .indi {
        min-height: 200px;
        border-left: 1px solid #333;
    }
    .head {
        left: -1rem;
        top: -10px;
        font-size: 2rem;
        color: purple;
        background: #fff;
    }
    .indi:hover {
        .hover {
            opacity: 1;
        }
    }
</style>
