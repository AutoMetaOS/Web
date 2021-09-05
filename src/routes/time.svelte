<script>
    import Timer from "$lib/shared/timer";
    import { Kron } from "$lib/shared/molecular";

    let //
        loop = false,
        loopable = "00:00:10",
        running = true,
        paused = false,
        time = "00:00:10";

    const endHandler = () => {
        if (loop) startHandler(loopable);
        else stopHandler();
    };

    const displayHandler = (ms) => {
        time = new Kron().secondsToClock(Math.round(ms / 1000));
        document.title = time;
    };

    const stopHandler = () => {
        clock.stop();
        time = "00:00:00";
        running = false;
        paused = true;
    };

    const startHandler = (duration) => {
        running = true;
        paused = false;
        if (paused) clock.start();
        else {
            time = duration;
            clock.start(new Kron().clockToSeconds(duration));
        }
    };

    const handleClick = (e) => {
        const func = e.target.id || e.target.parentElement.id;
        if (func === "playpause") {
            if (running) {
                clock.pause();
                paused = true;
                running = false;
            } else startHandler(time);
        }
        if (func === "fullstop") stopHandler();
    };

    let clock = new Timer({
        tick: 1,
        ontick: displayHandler,
        onend: endHandler,
    });

    startHandler(time);
</script>

<svelte:head>
    <style>
        body {
            background: #f52;
        }
    </style>
</svelte:head>

<section class="h-1vh ƒ-col ƒ∑">
    <div class="w-100" id="top">
        <input
            type="checkbox"
            name="v2"
            id="v2"
            bind:checked={loop}
            style="display:none;"
        />
        <label for="v2">
            <svg id="loop" viewBox="0 0 32 32" on:click={handleClick}>
                <path
                    fill="none"
                    d="M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2"
                />
            </svg>
            <input
                id="looptime"
                type="text"
                disabled={!loop}
                bind:value={loopable}
            />
        </label>
    </div>
    <div class="†c" contenteditable id="timer" bind:innerHTML={time} />
    <div class="†c o-75" id="controls">
        <svg id="playpause" viewBox="0 0 32 32" on:click={handleClick}>
            {#if running}
                <path d="M23 2 L23 28 M9 2 L9 28" fill="none" />
            {:else}
                <polygon points="0,0 32,16 0,32" fill="var(--primary)" />
            {/if}
        </svg>
        <svg
            id="fullstop"
            viewBox="0 0 32 32"
            fill="var(--primary)"
            on:click={handleClick}
        >
            <rect x="0" y="0" width="32" height="32" />
        </svg>
    </div>
</section>

<style type="text/scss">
    :root {
        --primary: #ccc8;
        --disabled: #0004;
        --hover: #fff;
        --active: var(--hover);
    }
    section {
        color: #fff;
        align-items: center;
        justify-content: center;
    }
    svg {
        margin: 10px;
        width: 24px;
        height: 24px;
        stroke: var(--primary);
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 3;
        &:hover {
            --primary: var(--hover);
            stroke: var(--hover);
        }
    }
    input:checked + label {
        svg {
            stroke: var(--active);
        }
    }
    #looptime {
        position: relative;
        top: -0.85em;
        color: #fff;
        &[disabled] {
            display: none;
        }
    }
    #timer {
        --size: 120px;
        height: calc(var(--size) + 30px);
        font-size: var(--size);
        outline: none;
    }
    #top {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
    }
</style>
