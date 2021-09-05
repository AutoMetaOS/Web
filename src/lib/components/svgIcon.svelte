<script>
    export let size = 24,
        stroke = "currentcolor",
        classes = "",
        style = "",
        fill = "none";
</script>

<svg
    class={classes}
    viewBox="0 0 32 32"
    width={size}
    height={size}
    {stroke}
    stroke-width="2"
    {fill}
    {style}
>
    <slot />
</svg>

<style>
    svg {
        stroke-linecap: round;
        stroke-linejoin: round;
    }
</style>
