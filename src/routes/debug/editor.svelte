<script>
    import { w3 } from "./functions";
    import { onMount, createEventDispatcher } from "svelte";
    import { debounce } from "$lib/shared";

    const dispatch = createEventDispatcher();

    const update = (code) => dispatch("code", code);

    onMount(() => {
        setTimeout(function () {
            let editor = ace.edit("editor");
            editor.setTheme("ace/theme/chrome");
            editor.session.setMode("ace/mode/html");

            editor.setOptions({
                useWrapMode: true, // wrap text to view
                wrapBehavioursEnabled: true,
                wrap: true,
                showPrintMargin: false,
                fontSize: 16,
                cursorStyle: "slim",
            });

            editor.on(
                "change",
                debounce(function () {
                    update(editor.getValue());
                }, 5e2)
            );

            editor.setValue(w3);
        }, 5e2);
    });
</script>

<svelte:head>
    {#each ["ace.min.js", "mode-html.min.js", "theme-chrome.min.js"] as doc}
        <script
            type="text/javascript"
            src={`https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.13/${doc}`}></script>
    {/each}
</svelte:head>

<div class="w-50 h-100 p-rel fade-right">
    <pre class="w-100" id="editor">Initialising...</pre>
</div>

<style>
    #editor {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
    }
</style>
