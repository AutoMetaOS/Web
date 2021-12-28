<script>
    export let data = {};

    import { onMount } from "svelte";

    const type_process = ({ type, url }) => {
        url = new URL(url || "https://os.nukes.in")?.hostname.replace(
            /^www\./,
            ""
        );
        if (type === "Article") return (type = `Article (${url})`);
        else return type;
    };
</script>

<a
    class="tile w-25 p0"
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
        <div class="tile-rec p-abs">
            (<span>{data?.from || "FROM"}</span>)
        </div>
    </div>
</a>

<style type="text/scss">
    .tile {
        color: #fff;
        height: 300px;
        &-rec {
            bottom: 1em;
        }
    }
    .clearfix {
        background: #000c;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        -moz-backdrop-filter: blur(4px);
    }
</style>
