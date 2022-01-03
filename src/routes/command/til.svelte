<script>
    import Twitter from "./micro/twitter.svelte";
    import Card from "./micro/card.svelte";
</script>

<Card
    type="reddit"
    url="https://www.reddit.com/r/todayilearned/new/.json?limit=1"
/>

<Twitter />

<Card
    type="wikipedia"
    url="https://en.wikipedia.org/api/rest_v1/page/random/summary"
/>
