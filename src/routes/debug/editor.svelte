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
        });

        flask.updateCode(w3);

        flask.onUpdate((code) => update(code));
    });
</script>

<div id="code" />
