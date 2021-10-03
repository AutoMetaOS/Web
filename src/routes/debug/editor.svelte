<script>
    import { w3 } from "./functions";
    import CodeFlask from "codeflask";
    // import Prism from 'prismjs';
    import { onMount, createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const update = (code) => dispatch("code", code);

    onMount(() => {
        const flask = new CodeFlask(ƒ("#code"), {
            language: "html",
            lineNumbers: true,
            tabSize: 4,
            wordWrap: true,
        });

        flask.updateCode(w3);

        flask.onUpdate((code) => update(code));
    });
</script>

<div class="w-50 h-100 p-rel fade-right">
    <style>
        .codeflask__flatten {
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    </style>
    <pre class="w-100" id="code">Initialising...</pre>
</div>

<style>
</style>
