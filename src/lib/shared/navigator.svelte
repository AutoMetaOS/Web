<script>
    export let title, titleStyle;
    import { base } from "$app/paths";
    const pages = [
        { name: "Home", url: base + "/", icon: base + "/assets/ronin.png" },
        {
            name: "Notes",
            url: base + "/notes",
            icon: base + "/icons/terrelys.svg",
        },
        {
            name: "Video",
            url: base + "/stream",
            icon: base + "/icons/Netflix.svg",
        },
    ];
</script>

<details>
    <summary style={titleStyle}>
        {title}
    </summary>
    <nav class="flex rpm-10">
        {#each pages as pg}
            <a class="rpm-10 †c" href={pg.url}>
                <img src={pg.icon} height="60px" width="60px" alt={pg.name} />
                <div>
                    {pg.name}
                </div>
            </a>
        {/each}
    </nav>
</details>

<style type="text/scss">
    summary {
        list-style: none;
    }
    details summary::-webkit-details-marker {
        display: none;
    }
    details summary::after {
        position: absolute;
        content: url(/minicons/right.svg);
        right: -1.25em;
        top: -0.25em;
        display: inline-block;
        transform: rotate(90deg) scale(0.66);
        transition: all 0.1s ease;
    }
    details[open] summary::after {
        top: -0.1em;
        transform: rotate(0deg) scale(0.66);
    }
    details nav {
        background: #eeeeef;
        z-index: 999;
        overflow: hidden;
        position: fixed;
        flex-wrap: wrap;
        top: 3rem;
        left: 1rem;
    }
    img {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 5px 1px #0004;
    }
</style>
