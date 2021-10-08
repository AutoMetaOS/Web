<script>
    import { getShows } from "./functions";
    import shows from "../../../../config/database/multiple.json";

    const TODAY = +Date.now();

    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    const cleanDate = (dt) => new Date(dt).toLocaleString("en-GB", options);

    const show_filter = (e) => {
        if (e.state < 0.5 || e.state === 1) return 0;
        const time_difference = (TODAY - +new Date(e.day)) / 864e5;
        return 1;
    };

    const filtered_list = shows.filter(show_filter);

    let shows_promise = getShows(filtered_list);
</script>

{#await shows_promise}
    <div class="p20">Fetching...</div>
{:then response}
    {#each response as show}
        <div class="card">
            <img src={show.image} alt={show.name} />
            <div class="card-body ƒ">
                <div class="card-text p-rel">
                    <h3>{show.name}</h3>
                    <h5>{show.ep}</h5>
                    {@html show.abt}
                </div>
                <div class="button rx2">
                    Released: {cleanDate(show.airstamp)} <br />
                    Last Seen: {cleanDate(show.last_seen)}
                </div>
            </div>
        </div>
        <hr class="w-50" />
    {/each}
{/await}

<style type="text/scss">
    $flexSize: 17em;
    .card {
        margin: 15px auto;
        height: $flexSize;
        max-width: $flexSize * 3;
        flex: 1 1 auto;
        display: flex;
        img {
            height: 100%;
            max-width: $flexSize * 1.3;
            flex: 1 1 auto;
        }
    }

    .card-body {
        width: 12em;
        max-height: 100%;
        flex: 1 1 auto;
        flex-flow: column nowrap;
        padding: 1.25em;
        .button {
            margin-top: auto;
            font-size: 0.9em;
            color: #aaa;
        }
    }

    .card-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0;
        h3,
        h5 {
            margin-top: 0;
        }
        &:after {
            position: absolute;
            bottom: 0;
            content: "";
            width: 100%;
            height: 2.8em;
            background: linear-gradient(#4440, #444);
        }
    }
</style>
