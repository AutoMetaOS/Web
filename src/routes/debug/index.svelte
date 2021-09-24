<script>
  import { onMount } from "svelte";
  import { Toggle } from "$hakama";
  import { wordCount, Iframe, Editor } from "./functions";

  let //
    ifr,
    md = false,
    words,
    oldHT = "";

  const handleCode = (html) => {
    const htmlURI = md ? markdown.parse(html.detail) : html.detail;
    if (oldHT === htmlURI) return 0;
    oldHT = htmlURI;

    ifr.document.open();
    ifr.document.write(htmlURI);
    ifr.document.close();

    words = wordCount(htmlURI);
  };

  onMount(() => {
    ifr = ƒ("iframe");
    ifr = ifr.contentWindow || ifr.contentDocument?.document;
  });
</script>

<svelte:head>
  <script src="/helpers/code/wasm-md.js"></script>
</svelte:head>

<section>
  <nav class="w-100 p10 ƒ ∆-bw">
    <div>&nbsp;</div>
    <div>{words}</div>
    <div>
      <Toggle hideLabel size="sm" bind:toggled={md} />
      <style>
        .bx--toggle__switch {
          margin-top: 0 !important;
        }
      </style>
    </div>
  </nav>
  <article class="ƒ w-100">
    <div class="w-50 h-100 code"><Editor on:code={handleCode} /></div>
    <hr />
    <div class="w-50 h-100"><Iframe /></div>
  </article>
</section>

<style type="text/scss">
  :global(body) {
    background: #fff;
    color: #000;
  }
  nav {
    border-bottom: 1px solid #ddd;
  }
  hr {
    border: 1px solid #eee;
  }
  .code {
    position: relative;
  }
  section {
    height: 100vh;
    article {
      height: calc(100% - 40px);
    }
  }
</style>
