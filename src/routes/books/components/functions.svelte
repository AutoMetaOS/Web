<script>
    import { stack } from "$lib/db";
    export let //
        objective = "sugg",
        data = {
            title: "",
            image: "",
            tags: "",
            id: "",
            published: "",
            author: "",
        };

    const adder = (data) => {
        stack.put("books", Date.now().toString(36), data).then((r) => {
            alert(r);
        });
    };
    const clickHandler = (e) => {
        const { func } = e.target.dataset;
        if (func === "add") {
            adder(data);
        }
    };
</script>

<div class="funcs ƒ ∆-bw blur p10 p-abs" on:click|preventDefault={clickHandler}>
    {#if objective == "sugg"}
        <svg
            data-func="add"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#fff"
            style="background:#0f0a"
        >
            <path d="M16 2 L16 30 M2 16 L30 16" />
        </svg>
    {/if}
    {#if objective == "todo"}
        <svg
            data-func="add"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#fff"
            style="background:#ff0a"
        >
            <path d="M2 20 L12 28 30 4" />
        </svg>
    {/if}
</div>

<style>
    svg {
        padding: 5px;
        stroke-width: 2;
        border-radius: 15px;
        height: 20px;
        width: 20px;
    }
    .funcs {
        cursor: pointer;
        --bg: #0008;
        --sz: 8px;
        bottom: 0;
        width: calc(100% - 20px);
    }
</style>
