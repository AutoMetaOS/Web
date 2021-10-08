<script>
  import { base } from "$app/paths";
  import { engine, preprocessor, recommendations } from "./command/samurai";
  import { TextInput } from "$oui";

  import TIL from "./command/til.svelte";
  import Recoms from "./command/suggestion.svelte";
  import { onMount } from "svelte";

  let value;

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

  onMount(() => setInterval(ƒ("#rsc").focus(), 1e2));
</script>

<svelte:head>
  <link rel="preconnect" href="https://web.whatsapp.com/" />
  <link rel="preconnect" href="https://en.wikipedia.org/" />
  <link rel="preconnect" href="https://github.com" />
  <link rel="prefetch" href="{base}/stream" />
  <link rel="prefetch" href="{base}/notes" />
</svelte:head>

<TIL />

<section class="ƒ-col p-rel fade">
  <style>
    * .bg {
      --bg: #fff;
      --tx: #000;
      background: var(--bg) !important;
      color: var(--tx) !important;
    }
  </style>
  <form class="ƒ bg p5 rx10 fade-down" on:submit|preventDefault>
    <img class="m5 rx5" id="engineImage" src="{base}/icons/Basic.svg" alt="" />
    <TextInput
      class="b0 bg"
      on:keyup={go}
      style="--bg:#ccc;-tx:#000"
      bind:value
      id="rsc"
      hideLabel
      placeholder="AMOS Search"
    />
    <style>
      input::placeholder {
        color: #333;
      }
    </style>
  </form>
  <br />
  {#if value && $recommendations.length}
    <Recoms />
  {/if}
</section>

<style type="text/scss">
  section {
    justify-content: center;
    align-items: center;
    background: #fff;
    height: 100vh;
    z-index: 1;
  }
  form {
    --bg: #ccc;
    width: 80%;
    font-size: 1.25rem;
    img {
      width: 1.25em;
      height: 1.25em;
      color: #333;
    }
  }
</style>
