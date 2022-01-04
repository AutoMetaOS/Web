<script>
    import { getMetadata } from "./functions/meta.js";

    export let size = {
        width: 0,
        height: 0,
    };

    const types = ["Article", "Repository", "Video"];

    const blurHandler = (e) => {
        getMetadata(e.target.value).then((r) => {
            if (r.title) data.title = r.title;
            if (r.image) data.image = r.image;
            if (r.type) data.type = r.type;
        });
    };

    let data = {
        title: "",
        type: "Video",
        url: "",
        image: "",
    };

    const preprocess = (e) => {
        data.id = uuid();
        data.date = Date.now();
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
            <!-- on:change={() => console.log(data.type)} -->
            {#each types as type}
                <option value={type}>
                    {type}
                </option>
            {/each}
        </select> <br />

        <input
            type="text"
            placeholder="URL"
            on:blur={blurHandler}
            bind:value={data.url}
        />

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
        }
    }
    .p-abs {
        top: 0;
        left: 0;
    }
</style>
