<script>
  import { onMount } from "svelte";
  import { Toggle } from "$hakama";
  import { wordCount, Iframe, Editor } from "./functions";
  import MarkdownIt from "markdown-it";

  const mkd = new MarkdownIt();

  let //
    ifr,
    md = false,
    words = 0,
    oldHT = "";

  const handleCode = (html) => {
    const htmlURI = md ? mkd.render(html.detail) : html.detail;
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

<section>
  <nav class="w-100 p10 ƒ ∆-bw fade-down">
    <div>&nbsp;</div>
    <div>{words}</div>
    <div>
      <Toggle hideLabel size="sm" bind:toggled={md} />
      <style>
        .bx--toggle__switch {
          margin-top: 0 !important;
        }
        .bx--toggle__switch span {
          display: none !important;
        }
      </style>
    </div>
  </nav>
  <article class="ƒ w-100">
    <Editor on:code={handleCode} />
    <hr />
    <div class="w-50 h-100 fade-left"><Iframe /></div>
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
  section {
    height: 100vh;
    article {
      height: calc(100% - 40px);
    }
  }
</style>
