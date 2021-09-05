<script>
  import { onMount } from "svelte";
  import { w3, wordCount, initialize } from "./functions";
  import { base } from "$app/paths";
  import { debounce } from "$lib/shared/molecular";

  let //
    ifr,
    words,
    oldHT = "";

  const render = () => {
    const html = editor.getValue();
    recalculate(html);
  };

  const recalculate = (html) => {
    const htmlURI = html;
    if (oldHT === htmlURI) return 0;
    oldHT = htmlURI;

    ifr.document.open();
    ifr.document.write(htmlURI);
    ifr.document.close();

    words = wordCount(editor.getValue());
  };

  onMount(() => {
    let x = setInterval(() => {
      if (CodeMirror) {
        initialize();
        render();
        clearInterval(x);
      }
    }, 10);
    ifr = ƒ("iframe");
    ifr = ifr.contentWindow || ifr.contentDocument?.document;
  });
</script>

<svelte:head>
  <title>Jupiter</title>
  {#each ["codemirror", "css", "xml+mixedHtml", "js"] as js}
    <script src="{base}/helpers/codes/{js}.js"></script>
  {/each}
  <link rel="stylesheet" href="{base}/helpers/codes/codemirror+cobalt.css" />
</svelte:head>

<section class="ƒ">
  <div class="w-50 h-100 codeContainer" on:keyup={debounce(render, 1000)}>
    <textarea spellcheck="true" id="code" value={w3} />
  </div>
  <div class="h-100 ƒ∑ p5 m0 w-50">
    <iframe
      title="sim"
      src="/assets/repl.html"
      class="w-100 h-100"
      frameborder="0"
    />
  </div>
</section>
<section class="w-100 h-100">
  <div class="p20">
    {words}
  </div>
</section>

<style type="text/scss">
  .codeContainer {
    position: relative;
  }
  section {
    height: 100vh;
    background: #000;
    color: #fff;
  }
  iframe {
    background: #fff;
  }
</style>
