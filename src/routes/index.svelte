<script>
  import { base } from "$app/paths";
  import { engine, preprocessor, recommendations } from "./command/samurai";
  import { TextInput } from "$hakama";

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

  onMount(() => setInterval(ƒ("#rsc").focus(), 1e3));
</script>

<svelte:head>
  <link rel="preconnect" href="https://api.nukes.in/" />
  <link rel="preload" href="https://api.nukes.in/data/NASA/img" as="image" />
  <link rel="preconnect" href="https://web.whatsapp.com/" />
  <link rel="preconnect" href="https://en.wikipedia.org/" />
  <link rel="preconnect" href="https://github.com" />
  <link rel="prefetch" href="{base}/stream" />
  <link rel="prefetch" href="{base}/notes" />
</svelte:head>

<TIL />

<section class="ƒ-col">
  <form class="ƒ p5" on:submit|preventDefault>
    <img class="m5" id="engineImage" src="{base}/icons/Basic.svg" alt="" />
    <TextInput
      on:keyup={go}
      bind:value
      id="rsc"
      hideLabel
      placeholder="Ronin"
      style="outline:none;"
    />
  </form>
  {#if value && $recommendations.length}
    <Recoms />
  {/if}
</section>

<style type="text/scss">
  section {
    justify-content: center;
    align-items: center;
    background: url(https://api.nukes.in/data/NASA/img) center center no-repeat;
    background-size: cover;
    position: relative;
    height: 100vh;
    z-index: 1;
  }
  form {
    justify-content: center;
    width: calc(80vw - 0.8em);
    background: #262626;
    font-size: 1.25rem;
    img {
      width: 1.5em;
      height: 1.5em;
      border-radius: 5px;
      color: #fff;
    }
  }
</style>
