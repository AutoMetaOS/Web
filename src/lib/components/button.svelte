<script>
    export let theme,
        style = "",
        classes = "",
        disabled,
        square,
        click = "",
        rx = 0,
        flat;
</script>

<button
    {square}
    {flat}
    {disabled}
    on:click={click}
    class="btn {classes}"
    style={`${style};--theme:${theme};border-radius:${rx};`}
>
    <slot />
</button>

<style type="text/scss">
    .btn {
        --theme: #18f;
        cursor: pointer;
        margin: 10px;
        padding: 10px;
        transform: scale(1);
        transition: all 0.2s ease;
        color: #fff;
        background: var(--theme);

        &:disabled {
            cursor: default;
            color: #fff;
            background: #888;
        }

        &:hover:not(:disabled) {
            transform: scale(1.05);
            background: var(--theme);
            color: #ddd;
            z-index: 999;
        }

        &[flat] {
            color: var(--theme);
            background: #fff;
            &:hover:not(:disabled) {
                color: var(--theme);
                background: #ddd;
            }
        }

        &[square] {
            height: 50px;
            width: 50px;
        }
    }
</style>
