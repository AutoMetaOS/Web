<script>
  import { F } from "predefined";
  import { base } from "$app/paths";
  import { engine, preprocessor, recommendations } from "./command/samurai";

  import Logo from "./command/logo.svelte";
  import TIL from "./command/til.svelte";
  import Recoms from "./command/suggestion.svelte";
  import { onMount } from "svelte";

  let //
    value,
    show_extras = false;

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
    setInterval(F("#rsc").focus(), 1e2);
    setTimeout(() => (show_extras = true), 6e3);
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://web.whatsapp.com/" />
  <link rel="preconnect" href="https://en.wikipedia.org/" />
  <link rel="preconnect" href="https://github.com" />
  <link rel="prefetch" href="{base}/stream" />
</svelte:head>

<section class="ƒ-col p-rel">
  <Logo />
  <form class="ƒ bg p5 rx10 fade-down" on:submit|preventDefault>
    <img class="m5 rx5" id="engineImage" src="{base}/icons/Basic.svg" alt="" />
    <input
      type="text"
      class="b0 w-100"
      on:keyup={go}
      bind:value
      id="rsc"
      placeholder="AMOS Search"
    />
  </form>
  <br />
  {#if value && $recommendations.length}
    <Recoms />
  {/if}
  <div class="p-rel ƒ" style="padding-top:5%;">
    {#if show_extras}
      <TIL />
    {:else}
      <svg
        class="p2"
        viewBox="0 0 32 32"
        stroke="#FFF"
        stroke-width="2"
        on:click={() => (show_extras = true)}
      >
        <path d="M16 2 L16 30 M2 16 L30 16" />
      </svg>
    {/if}
  </div>
</section>

<style type="text/scss">
  section {
    padding-top: 12.5%;
    align-items: center;
    background: #fff;
    height: 100vh;
    z-index: 1;
  }
  svg {
    margin: 10px;
    stroke-width: 2;
    background: #ddd;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    cursor: pointer;
    will-change: transform;
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
  form {
    --bg: #ccc;
    width: 80%;
    font-size: 1.25rem;
    input {
      background: #ccc;
      color: #000;
      &::placeholder {
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
