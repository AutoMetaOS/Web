<script>
    import { process } from "../functions";
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

    const adder = (data) =>
        SAMOSDB.put("books", Date.now().toString(36), data).then((e) => {
            console.log(e);
            if (e.charAt(0) == '"') objective = "added";
            else objective = "error";
        });

    const clickHandler = (e) => {
        const { func } = e.target.dataset;
        if (func === "add") adder(data);
    };
</script>

{#if objective}
    <div
        class="funcs ƒ hover ∆-bw p10 p-abs"
        on:click|preventDefault={clickHandler}
    >
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
        top: calc(var(--h) - 3rem);
        width: calc(100% - 20px);
    }
</style>
