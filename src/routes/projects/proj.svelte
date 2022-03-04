<script>
    export let data = {};

    const process = {
        date: (eta) => {
            const diff = new Date(eta) - new Date();
            return ~~(diff / 864e5);
        },
    };
</script>

<div class="rx5 fw3 m10 p10 cont">
    <div class="title fw7">{data.title}</div>
    <div class="desc">{data.description}</div>
    <div class="mile">
        {#if data.milestone?.date}
            <span class="fw7">
                {new Date(data.milestone.date).toLocaleString("en-GB")}
            </span>
        {:else}
            <span class="desc">{data.milestone?.text}</span>
        {/if}
    </div>
    <div class="eta">
        <span class="fw7">{process.date(data.eta)} Days</span>
    </div>
</div>

<style type="text/scss">
    .cont {
        width: calc(25% - 44px);
        height: auto;
        background: #08c;
        border: 2px solid #2af;
    }
</style>
