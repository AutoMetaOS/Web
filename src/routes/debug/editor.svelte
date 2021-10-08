<script>
    import { w3 } from "./functions";
    import { onMount, createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const update = (code) => dispatch("code", code);

    onMount(() => {
        const loads = [
            "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.13/ace.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.13/mode-html.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.13/theme-chrome.min.js",
        ];

        loads.forEach((load) => {
            const scr = document.createElement("script");
            scr.type = "text/javascript";
            scr.src = load;
            document.body.appendChild(scr);
        });

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

            editor.on("change", function () {
                update(editor.getValue());
            });

            editor.setValue(w3);
        }, 2e3);
    });
</script>

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
