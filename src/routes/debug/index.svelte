<script>
  import { wordCount, Iframe, Editor } from "./functions";
  import MarkdownIt from "markdown-it";
  import pkg from "predefined";
  const { F } = pkg;

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

    words = md ? wordCount(htmlURI) : "Code";
  };

  onMount(() => {
    ifr = F("iframe");
    ifr = ifr.contentWindow || ifr.contentDocument?.document;
  });
</script>

<section>
  <nav class="w-100 ƒ ∆-bw fade-down">
    <div>&nbsp;</div>
    <div>{words}</div>
    <div style="padding-right: 20px;">
      md: <input type="checkbox" bind:checked={md} />
    </div>
  </nav>
  <article class="ƒ w-100">
    <Editor on:code={handleCode} />
    <hr />
    <div class="w-50 h-100 fade-left"><Iframe /></div>
  </article>
</section>

<style type="text/scss">
  nav {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  hr {
    border: 1px solid #eee;
  }
  section {
    background: #f5f5f7;
    color: #000;
    height: 100vh;
    article {
      background: #fff;
      height: calc(100% - 40px);
    }
  }
</style>
