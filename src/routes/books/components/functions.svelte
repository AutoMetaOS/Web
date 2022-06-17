<script>
    import { process } from "../functions";
    export let //
        objective = "suggest",
        data = {
            title: "",
            image: "",
            id: "",
            published: "",
            author: "",
        };

    const adder = (data) =>
        SAMOSDB.put("books", Date.now().toString(36), data).then((e) => {
            if (e.charAt(0) == '"') objective = "added";
            else objective = "error";
        });

    const clickHandler = (e) => {
        const { func } = e.target.dataset;
        if (func === "add") adder(data);
    };
</script>

{#if objective && objective !== "null"}
    <div class="funcs ƒ ∆-bw p10" on:click|preventDefault={clickHandler}>
        <svg
            {...process.attributes(objective)}
            viewBox="0 0 32 32"
            fill="none"
            stroke="#fff"
        >
            {@html process.icons(objective)}
        </svg>
    </div>
{/if}

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
        width: calc(100% - 20px);
    }
</style>
