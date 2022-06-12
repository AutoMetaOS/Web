<script>
    import { url_process, image_process, type_process } from "./functions";
    import { F } from "predefined";

    export let //
        data = {},
        size = {
            width: 0,
            height: 0,
        };

    const defs = {
        preload: 0,
    };

    const hoverHandler = (e) => {
        if (!defs.preload) {
            const rel = document.createElement("link");
            rel.rel = "prefetch";
            rel.href = e.target.href;
            document.head.appendChild(rel);
            defs.preload = 1;
        }
        return 0;
    };

    const deleteHandler = (e) => {
        const id = e.target.parentElement.id;
        try {
            SAMOSDB.delete("stack", id).then((r) => console.log(id, r));
            F(`#${id}`).remove();
        } catch (e) {
            let err = typeof e === "string" ? e : e.message;
            notifs.send({ text: err }, 1000, {
                from: "ursus",
                scale: "danger",
            });
        }
        return 0;
    };
</script>

<a
    class="tile p0 p-rel"
    style={`width:${size.width};height:${size.height};`}
    href={data?.url}
    id={data?.id}
    on:mouseenter={hoverHandler}
>
    <div class="p-abs w-100 h-100" style="top:0;left:0;z-index:0;">
        <img
            width={size.width}
            height={size.height}
            src={image_process(data)}
            alt="thumb"
        />
    </div>
    <div class="clearfix blur p-rel">
        <div class="ƒ ∆-bw">
            <span>{url_process(data.url)}</span>
            <svg
                width="16"
                height="16"
                viewbox="0 0 64 64"
                style="color:{type_process(data.type)}"
            >
                <circle cx="32" cy="32" r="32" fill="currentcolor" />
            </svg>
        </div>
        <div class="fw4">
            <span class="fw7">{data.type}:&nbsp;</span>
            {data?.title}
        </div>
    </div>
    <svg
        on:click|preventDefault={deleteHandler}
        class="p-abs"
        viewBox="0 0 32 32"
        width="16"
        height="16"
        stroke="#fff"
        style="top:10px;right:10px;z-index:2;"
    >
        <path d="M2 30 L30 2 M30 30 L2 2" />
    </svg>
</a>

<style type="text/scss">
    .tile {
        color: #fff;
    }
    .fw4 {
        font-size: 1.33em;
        min-height: 3em;
        padding: 10px 0;
        word-wrap: break-word;
    }
    .clearfix {
        overflow: hidden;
        padding: 20px;
        width: calc(100% - 40px);
        height: 4rem;
        bottom: calc(-100% + 4em + 40px);
        z-index: 1;
        --bg: #000c;
        --sz: 4px;
    }
</style>
