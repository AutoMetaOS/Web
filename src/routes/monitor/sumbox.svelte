<script>
  import { onMount } from "svelte";
  import { Riquest, serverURL } from "$lib/shared/molecular.js";

  let system,
    network = "...";

  const request = new Riquest(serverURL, "json");

  const smc = () => request.get("/sys/smc").then((r) => (system = r));
  const net = () =>
    request.get("/sys/net").then((r) => (network = r.speed + " MB/s"));

  onMount(net);

  const getData = (e) => {
    e.target.style.opacity = 1;
    e.target.parentElement.style.opacity = 1;
    if (!(system && network)) smc();
  };
</script>

<div id="stats" class="🥃 m5 p20" on:mouseover={getData}>
  Fan Speed: <progress max="6520" value={+system?.fan || 0} />
  <br /> CPU Temp: <progress max="100" value={+system?.cpu || 0} />
  <br /> MBo Temp: <progress max="100" value={+system?.board || 0} />
  <br /> Networks: <i> {network}</i>
</div>

<style>
  #stats {
    position: absolute;
    bottom: 3em;
    right: 10px;
    opacity: 0;
    justify-content: space-between;
    width: 20vw;
    background: transparent;
    animation: goOut 0.5s 5s forwards ease;
    transition: opacity 0.2s ease;
  }
</style>
