<script>
  import { onMount } from "svelte";
  import { SvgIcon } from "$lib/components";
  import { TextInput } from "$hakama";
  import { channels, nebula } from "../shared/store";

  export let searcher;

  let searchText = "";

  onMount(() => {
    if (getµ().q || getµ().id) {
      searchText = getµ()?.q || "";
    } else {
      nebula();
      channels();
    }
  });
</script>

<form class="o-0 w-100 p5 ƒ 🥃" on:submit|preventDefault={searcher}>
  <TextInput
    class="p5"
    hideLabel
    size="40"
    placeholder="Search"
    value={searchText}
    style="border:none;background:transparent;outline:none;"
  />
  <SvgIcon size="22">
    <circle stroke="#fff" cx="14" cy="14" r="12" />
    <path stroke="#fff" d="M23 23 L30 30" />
  </SvgIcon>
</form>

<style type="text/scss">
  form {
    justify-content: space-between;
    z-index: 9;
    font-size: 1.1em;
    padding: 0 30%;
    position: fixed;
    top: 0;
    justify-content: space-between;
    transition: all 0.3s ease;
    align-items: center;
    &:hover,
    &:focus {
      opacity: 1;
    }
  }
</style>
