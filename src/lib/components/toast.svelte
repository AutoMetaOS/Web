<script>
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { notifs } from "@internal";

    export let themes = {
        danger: "#E26D69",
        success: "#84C991",
        warning: "#f0ad4e",
        info: "#5bc0de",
        default: "#aaaaaa",
    };
</script>

<div class="notifs p-fix m5">
    {#each $notifs as notif (notif.id)}
        <div
            animate:flip
            class="toast mx-a rx10 p10 blur ƒ"
            transition:fly={{ x: 30 }}
        >
            <img
                class="p5"
                src={`@UI:icons/amos.svg`}
                height="40px"
                width="40px"
                alt="logo"
            />
            <div style="margin-left: 10px">
                {#if notif.title}
                    <div class="title fw5">{notif.title}</div>
                {/if}
                <div class="content">
                    <!-- {themes[notif.type]}: -->
                    {notif.message}
                </div>
            </div>
        </div>
    {/each}
</div>

<style type="text/scss">
    .notifs {
        top: 10px;
        right: 10px;
        z-index: 9999;
        justify-content: flex-start;
        align-items: center;
        pointer-events: none;

        color: white;
    }
    .blur {
        --sz: 4px;
        --bg: #fff4;
    }

    .title {
        font-color: #888;
    }

    .toast {
        --sz: 16px;
        --bg: #fff4;
        overflow: hidden;
        width: 300px;
        flex: 0 0 auto;
        margin-bottom: 10px;
    }
</style>
