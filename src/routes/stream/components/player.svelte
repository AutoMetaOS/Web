<script>
    // import { processors } from "../functions";
    import { globalStreamsHandler } from "../functions";
    import { now_playing } from "../functions/store";

    let //
        iframe,
        playNext,
        playPrev;

    onMount(() => {
        playNext = () => globalStreamsHandler.getNext($now_playing.local_id);
        playPrev = () => globalStreamsHandler.getPrev($now_playing.local_id);

        // window.addEventListener("message", processors.onMessage, false);
        // const command = { event: "listening" };
        // setInterval(() => processors.postMessage(iframe, command), 1e3);
    });

    const clickHandler = ({ target }) => {
        const { id } = target;

        if (id === "up") playNext();
        if (id === "down") playPrev();
    };
</script>

{#if $now_playing.youtube_id}
    <div class="ƒ cont p-rel ∆-ct">
        <iframe
            bind:this={iframe}
            title="vid"
            class="w-100 h-100 p-abs"
            frameborder="0"
            src={$now_playing.youtube_id}
            allow="fullscreen; clipboard-write; encrypted-media; picture-in-picture"
            sandbox="allow-scripts allow-same-origin"
        />
        <div id="magicBox" class="ƒ ∆-ar p-abs" on:click={clickHandler}>
            <div class="btn p10 †c h-100 w-100" id="up">
                <svg viewBox="0 0 32 32">
                    <path d="M20 30 L8 16 20 2" />
                </svg>
            </div>
            <div class="btn p10 †c h-100 w-100" id="down">
                <svg viewBox="0 0 32 32">
                    <path d="M12 30 L24 16 12 2" />
                </svg>
            </div>
        </div>
    </div>
{/if}

<style type="text/scss">
    iframe {
        aspect-ratio: 16/10;
        z-index: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .cont {
        height: 100vh;
        width: 100vw;
        align-items: center;
    }
    #magicBox {
        width: 200px;
        z-index: 1;
        bottom: 0;
    }
    .btn {
        background: transparent;
        transition: background 0.1s ease;
        &:hover {
            background: #000a;
        }
    }
    svg {
        pointer-events: none;
        width: 16px;
        height: 16px;
        fill: none;
        stroke: currentcolor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
    }
</style>
