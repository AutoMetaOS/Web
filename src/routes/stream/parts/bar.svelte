<script>
  import { onMount } from "svelte";
  import { storage } from "predefined";

  export let searcher;

  let searchText = "";

  onMount(() => {
    searchText = storage.URLParams.get()?.q || "";
  });
</script>

<form
  class="o-0 w-100 p5 ƒ blur p-fix ∆-bw"
  on:submit|preventDefault={searcher}
>
  <input class="p5 b0" placeholder="Search" bind:value={searchText} />
  <svg viewBox="0 0 32 32" height="22" width="22" fill="none">
    <circle stroke="#fff" cx="14" cy="14" r="12" />
    <path stroke="#fff" d="M23 23 L30 30" />
  </svg>
</form>

<style type="text/scss">
  form {
    z-index: 9;
    font-size: 1.1em;
    padding: 0 30%;
    top: 0;
    transition: all 0.3s ease;
    align-items: center;
    &:hover,
    &:focus {
      opacity: 1;
    }
    & input {
      color: #fff;
      background: #0000;
      outline: none;
    }
  }
</style>
