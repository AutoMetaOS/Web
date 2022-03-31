<script>
    export let //
        color = "linear-gradient(to top, #2af, #08d)",
        data = {};

    const colorProcess = () => {
        if (data?.title?.startsWith("Academic"))
            return "linear-gradient(to top, #2d2, #0b0)";
        if (data?.title?.startsWith("Infinite"))
            return "linear-gradient(to top, #fa2, #d80)";
        return color;
    };

    const process = {
        date: (eta) => {
            const diff = (-1 * (new Date(eta) - new Date())) / 864e5;
            return diff > 0 ? `+${~~diff}` : ~~diff;
        },
        readable: (dt) =>
            new Date(dt).toLocaleString("en-GB", {
                weekday: "short",
                day: "numeric",
                year: "2-digit",
                month: "short",
            }),
        color: (dt) => {
            const d = process.date(dt);
            if (d >= 0) return "#f00";
            if (d >= -7) return "#ff0";
            return "#fff";
        },
    };
</script>

<div class="rx5 fw3 m10 p10 cont p-rel" style="--col:{colorProcess()}">
    <div class="title fw3">{data.title}</div>
    <div class="desc">{data.description}</div>
    <div class="mile fw7">
        <input type="checkbox" name="blank" checked disabled />
        {#if data.milestone?.date}
            <span>
                {process.readable(data.milestone.date)}
            </span>
        {:else}
            <span>{data.milestone?.text}</span>
        {/if}
    </div>

    <div class="eta p-abs p10 blur" style={`color:${process.color(data.eta)};`}>
        <svg viewBox="0 0 32 32" class="p-rel">
            <circle cx="16" cy="16" r="14" />
            <path d="M16 8 L16 16 20 20" />
        </svg>
        {process.date(data.eta)}
    </div>
</div>

<style type="text/scss">
    .cont {
        min-height: 180px;
        width: calc(25% - 40px);
        height: auto;
        background: var(--col);
    }
    .title {
        font-size: 2rem;
    }
    .desc {
        height: 2em;
        margin-bottom: 1rem;
    }
    .eta {
        bottom: 0;
        right: 0;
        --bg: #2224;
        border-top-left-radius: 5px;
    }
    svg {
        width: 19px;
        height: 19px;
        stroke: currentcolor;
        stroke-width: 2px;
        fill: none;
        top: 0.25rem;
        left: 2px;
    }
</style>
