<!--
- https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation
- https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information
-->
<script>
    import { ExpandableTile, Tile } from "$hakama";
    import metadata from "$lib/meta.json";
    import Shows from "./show.svelte";
    import EnvSummary from "./summary.svelte";
</script>

<main class="p5 ƒ ƒ∑">
    <Tile class="m20" style="width: calc(50% - 40px);">
        <EnvSummary />
    </Tile>
    <Tile class="m20" style="width: calc(50% - 40px);">
        <Shows />
        ok
    </Tile>
    <ExpandableTile class="m20" style="width: calc(50% - 40px);">
        <div slot="above">
            <code>{metadata.name}</code> build:
            <code>{metadata.build.version}::{metadata.build.current}</code>
            <br />Compiled: {new Date(metadata.time).toLocaleString("en-GB")}
        </div>
    </ExpandableTile>
</main>

<style type="text/scss">
</style>
