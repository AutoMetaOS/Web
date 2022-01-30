<script>
    import { full_stack, filter } from "./functions";
    import { types } from "./functions/meta.js";

    $: type_count = (type) =>
        $full_stack.map((e) => e.type).filter((e) => e === type).length;

    const clickHandler = (e) => filter.set(e.target.id.split("-")[1]);
</script>

<div class="ƒ ƒ∑" style="color:#fff;">
    {#each types as type}
        <div
            class:active={$filter === type}
            id="ct-{type}"
            class="p10 m10 rx5"
            on:click|preventDefault={clickHandler}
        >
            {type}s: {type_count(type)}
        </div>
    {/each}
    <div class="p10 m10 fw5 rx5" on:click|preventDefault={clickHandler}>
        Total: {$full_stack.length}
    </div>
</div>

<style type="text/scss">
    .p10 {
        cursor: pointer;
        background: #fff0;
        transition: background 0.1s ease;
        &:hover {
            background: #fff4;
        }
    }
    .active {
        background: #fff6;
    }
</style>
