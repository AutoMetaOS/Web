<script>
  import { getReddit } from "$lib/pages";
  import Logo from "./command/logo.svelte";
  import Newz from "./command/news.svelte";
  import { engine, preprocessor, recommendations } from "./command/samurai";
  import Recoms from "./command/suggestion.svelte";

  let //
    value,
    placeholder = "AMOS Search";

  const go = (e) => {
    const send = engine(value);
    let recs = $recommendations.map((e) => e[3]?.zh || e[0]);

    const div = document.createElement("div");
    div.innerHTML = recs.join("&&");
    recs = div.innerText.split("&&");

    switch (e.keyCode) {
      case 40:
        value = `!${send.key} ${recs[0]}`;
        break;
      case 38:
        value = `!${send.key} ${recs[1]}`;
        break;
      case 13:
        window.location.href = preprocessor(send);
        break;
    }
    return send;
  };

  onMount(() => {
    getReddit("todayilearned", "new", 20).then((d) => {
      let potential = d.map((e) => e.desc).filter((e) => e.length < 100);
      placeholder = potential[0] || "AMOS Search";
    });
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://web.whatsapp.com/" />
  <link rel="preconnect" href="https://en.wikipedia.org/" />
  <link rel="preconnect" href="https://google.com" />
  <link rel="prefetch" href="/stream" />
</svelte:head>

<section class="ƒ-col p-rel" style="overflow-y:hidden">
  <div class="p-fix w-100 h-100 hero" style="top:0;">
    <div class="blur w-100 h-100" style="--sz:4px;bg:#0002;">&nbsp;</div>
  </div>
  <Logo />
  <form class="ƒ bg p5 rx10 fade-down" on:submit|preventDefault>
    <img class="m5 rx5" id="engineImage" src="/icons/Basic.svg" alt="" />
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      class="b0 w-100"
      on:keyup={go}
      bind:value
      autofocus
      id="rsc"
      {placeholder}
    />
  </form>
  {#if value && $recommendations.length}
    <Recoms />
  {/if}
  <div class="ƒ m10" style="overflow-x:scroll;max-width:80%;">
    <Newz />
  </div>
</section>

<style type="text/scss">
  .hero {
    z-index: -1;
    background-image: url("https://source.unsplash.com/random/1280x720");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  section {
    padding-top: 12.5%;
    align-items: center;
    background: #fff;
    height: 100vh;
    z-index: 1;
  }
  form {
    --bg: #fff;
    width: 80%;
    font-size: 1.25rem;
    input {
      background: var(--bg);
      color: #000;
      &::placeholder {
        text-transform: capitalize;
        color: #8888;
      }
    }
    img {
      width: 1.25em;
      height: 1.25em;
      color: #333;
    }
  }
</style>
