<script lang="ts">
    import { math } from "predefined";

    interface Style {
        width: string;
        height: string;
        style: string;
    }

    export let // OPTIONAL
        rx: string | number = 0,
        size: string | number = 32,
        box: Array<string> = ["0", "0 5px 0 0"], // Padding, Margin
        params: object = {},
        fallback: string | Array<string> = null,
        alt: string = "Logo",
        // IMPORTANT
        url: string = "";

    const parametrise = (params: object): string => {
        let str = "";
        for (let key in params) str += `${key}=${params[key]}&`;

        return `${str.slice(0, -1)}`;
    };

    const getDimensions = (): { width: string; height: string } => {
        const check = size.toString().replaceAll("px", "");

        if (check.includes("x")) {
            const [width, height] = check.split("x");
            return { width, height };
        } else return { width: check, height: check };
    };

    const getFallback = (): string => {
        if (fallback) {
            if (typeof fallback === "string") return fallback;
            else return fallback[0];
        } else return "";
    };

    const getStyle = (): Style => {
        const { width, height } = getDimensions();
        const [padding, margin] = box;
        let style = "";

        if (rx) style += `border-radius:${rx}px;`;
        if (padding) style += `padding:${padding};`;
        if (margin) style += `margin:${margin};`;

        return {
            style,
            width,
            height,
        };
    };
</script>

<object
    id={math.uuid().split("-")[0]}
    type="image/svg+xml"
    data={`${url}?${parametrise(params)}`}
    {...getStyle()}
    aria-label={alt}
>
    {#if fallback}
        <img src={getFallback()} {alt} />
    {/if}
</object>

<style>
</style>
