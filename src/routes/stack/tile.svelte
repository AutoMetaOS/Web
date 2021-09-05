<script>
    export let data = {};

    import { ClickableTile } from "$hakama";
    import { onMount } from "svelte";

    const type_process = ({ type, url }) => {
        url = new URL(url || "https://trial.nukes.in")?.hostname.replace(
            /^www\./,
            ""
        );
        if (type === "Article") return (type = `Article (${url})`);
        else return type;
    };

    let holders = {
        time: "",
    };

    onMount(() => {
        holders.time = time.since(data?.date);
    });
</script>

<ClickableTile
    class="tile"
    href={data?.url}
    id={data?.id}
    style="background:url({data?.image}) center center no-repeat;background-size: cover;"
>
    <div class="clearfix p20 w-100 h-100">
        <div class="ƒ ∆-bw">
            <span>{type_process(data)}</span>
            <svg viewBox="0 0 32 32" width="16" height="16" stroke="#fff">
                <path d="M2 30 L30 2 M30 30 L2 2" />
            </svg>
        </div>
        <h1>{data?.title}</h1>
        <div class="tile-rec">
            <span>{holders.time}</span>
            (<span>{data?.from}</span>)
        </div>
    </div>
</ClickableTile>

<style>
    .tile-rec {
        position: absolute;
        bottom: 1em;
    }
    .clearfix {
        background: #000c;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        -moz-backdrop-filter: blur(4px);
    }
</style>
