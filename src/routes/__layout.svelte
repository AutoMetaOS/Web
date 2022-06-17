<script>
    import Toast from "$lib/components/Toast.svelte";
    import { auth, parts, listeners } from "./global/init";

    let nav;
    const state = {
        q: false,
    };

    const handleqq = (e) => {
        if (e.keyCode === 81) {
            if (state.q) {
                nav.classList.toggle("active");
                state.q = 0;
            } else state.q = 1;
        } else state.q = 0;
    };

    onMount(() => {
        nav.classList.toggle("active");
        // auth.check();
        listeners();
        window.onerror = (msg, url, lineNo, columnNo, error) => {
            console.warn("Global Catch");
            errorCatch(error, url, lineNo, columnNo);
        };
    });
</script>

<!-- ADD Auth -->
<svelte:window on:keyup={handleqq} />

<div id="AMOS">
    <slot />
</div>

<Toast />

<div id="AMOS-Nav" class="p-fix fade-right active ƒ-col" bind:this={nav}>
    {#each parts as part}
        <a class="m10 p5 tile †r p-rel blur" href={part.href}>
            <div class="p-abs name fw2">
                &nbsp;{part.name}
            </div>
            <img
                height="150px"
                width="150px"
                src="/OUI/icons/web/{part.icon}.svg"
                alt={part.name}
            />
        </a>
    {/each}
</div>

<style type="text/scss">
    :global(body) {
        background: #222;
    }
    .tile {
        contain: content;
        color: #fff;
        --bg: #fff2;
        --sz: 8px;
        img {
            z-index: 0;
            opacity: 0.5;
            transition: opacity 0.1s ease;
        }
        .name {
            top: calc(50% - 0.6em);
            z-index: 1;
            text-transform: uppercase;
            font-size: 3rem;
            left: 1px;
        }
        &:hover {
            img {
                opacity: 1;
            }
        }
    }
    #AMOS {
        background: #222;
        color: #fff;
        z-index: 0;
        &-Nav {
            z-index: 1;
            left: -320px;
            top: 0;
            height: 100vh;
            overflow-y: scroll;
            width: 320px;
            background: linear-gradient(to bottom, #519e, #229e);
            transition: left 0.1s ease;
        }
    }
    .active {
        left: 0 !important;
    }
</style>
