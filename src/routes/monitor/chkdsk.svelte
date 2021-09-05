<script>
    import Card from "./components/test.svelte";
    import { onMount } from "svelte";
    import { debug_test, stream_test, command_test } from "./checker";

    let test_list = [];

    onMount(() => {
        test_list = [
            { name: "Debugger", component: debug_test },
            { name: "Command", component: command_test },
            { name: "Terelysium", component: notes_test },
            { name: "Helios", component: stream_test },
        ];
    });
</script>

{#each test_list as test}
    <div>
        {#await test["component"]()}
            <h1>Testing {test.name}...</h1>
        {:then results}
            <Card title={test.name} {results} />
        {/await}
    </div>
{/each}

<section>
    <img id="engineImage" width="10px" height="10px" src="" alt="" />
</section>
