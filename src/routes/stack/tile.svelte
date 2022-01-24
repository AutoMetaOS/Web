<script>
    import { type_process } from "./functions/meta.js";
    import { stack } from "$lib/db";
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
        stack.delete("amos", id).then((r) => console.log(id, r));
        F(`#${id}`).remove();
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
            src={data.image}
            alt="thumb"
        />
    </div>
    <div class="clearfix">
        <div class="ƒ ∆-bw">
            <span>{type_process(data)}</span>
        </div>
        <h1>{data?.title}</h1>
    </div>
    <svg
        on:click|preventDefault={deleteHandler}
        class="p-abs"
        viewBox="0 0 32 32"
        width="16"
        height="16"
        stroke="#fff"
        style="top:10px;right:10px;z-index:0;"
    >
        <path d="M2 30 L30 2 M30 30 L2 2" />
    </svg>
</a>

<style type="text/scss">
    .tile {
        color: #fff;
        &:hover .clearfix {
            width: calc(100% - 40px);
        }
    }
    .clearfix {
        padding: 20px;
        width: calc(50% - 40px);
        height: calc(100% - 40px);
        z-index: 1;
        background: #000c;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        -moz-backdrop-filter: blur(4px);

        transition: width 0.2s ease;
        will-change: width;
    }
</style>
