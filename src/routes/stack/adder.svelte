<script>
    import { notifs } from "@internal";
    import { math } from "predefined";
    import { process } from "./functions";
    import { getMetadata, types } from "./functions/meta.js";

    export let size = {
        width: 0,
        height: 0,
    };

    const blurHandler = (e) => {
        data.title = "Fetching...";
        data.image = "Fetching...";

        // Get Metadata for specified URL and general domain
        const promises = [
            e.target.value,
            e.target.value.split("/")[0].split("?")[0],
        ].map(getMetadata);

        Promise.all(promises).then((metadata) => {
            const [r, bkp] = metadata;
            if (r.title) data.title = r.title || "No Title Recieved";
            if (r.image)
                data.image = r.image || bkp.image || "No Image Available";
            if (r.type) data.type = process.type(r.type);
        });
    };

    let data = {
        title: "",
        type: "Video",
        url: "",
        image: "",
    };

    const preprocess = (e) => {
        const send = data;
        const uuid = math.uuid().split("-")[0];
        const date = new Date();

        const id = `${(+date).toString(36)}-${uuid}`;

        send.type ||= "Article";

        stackDB.put("stack", id, send).then((r) => {
            if (r.charAt(0) === `"`) {
                console.log(200);
                data = {
                    title: "",
                    type: "Article",
                    url: "",
                    image: "",
                };
            } else {
                const text = typeof r === "object" ? JSON.stringify(r) : r;

                notifs.send({ text }, 1000, {
                    from: "ursus",
                    scale: "danger",
                });

                data.title = "Problem Sending!";
                data.image = "";
            }
        });
    };
</script>

<div class="tile p-rel" style={`width:${size.width};height:${size.height};`}>
    <img
        class="p-abs"
        src={data.image}
        width={size.width}
        height={size.height}
        alt="Placeholder"
        style="z-index: 0;"
    />
    <form class="p-abs p20" on:submit|preventDefault={preprocess}>
        <select bind:value={data.type}>
            {#each types as type}
                <option value={type}>{type}</option>
            {/each}
        </select>
        <br />
        <input
            type="text"
            placeholder="URL"
            on:blur={blurHandler}
            bind:value={data.url}
        />

        <!-- ADD LENGTH REDUCTION HERE -->
        <input type="text" placeholder="Title" bind:value={data.title} />
        <input type="text" placeholder="Image" bind:value={data.image} />

        <input class="o-0" type="submit" value="Go" />
    </form>
</div>

<style type="text/scss">
    form {
        z-index: 1;
        width: calc(100% - 40px);
        height: calc(100% - 40px);

        background: #000a;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        input {
            margin: 5px;
            border: 1px solid #fff8;
            border-radius: 5px;
            padding: 5px;
            color: #fff;
            width: 70%;
        }
    }
    .p-abs {
        top: 0;
        left: 0;
    }
</style>
