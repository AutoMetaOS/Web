<script>
    $: time = "00:00:00 AM";

    setInterval(() => {
        time = new Date().toLocaleTimeString();
    }, 1000);
</script>

<div id="time" class="†c h-100 ƒ-col ∆-ct">
    {time}
</div>

<style>
    #time {
        font-size: 5em;
        align-items: center;
    }
</style>
