<script>
    import { TextInput, Tile } from "$hakama";
    import { getMetadata, setStack, full_stack } from "./functions";

    let data = {
        title: "",
        type: "",
        url: "",
        image: "",
        from: "",
    };

    const getImage = (e) => {
        const holder = ƒ("form");
        if (data.url.includes("youtube")) {
            data.image =
                "https://i.ytimg.com/vi/" +
                data.url.split("v=")[1].split("&")[0] +
                "/maxresdefault.jpg";
        } else {
            getMetadata(data.url).then((res) => {
                data.image = res.meta.image.url;
            });
        }
        holder.style.background = `url(${data.image}) center center no-repeat;`;
        holder.style.backgroundSize = `cover`;
    };

    const preprocess = (e) => {
        data.id = uuid();
        data.date = Date.now();
        console.log(data, data.url);
        console.log($full_stack);
        // setStack(data);
    };
</script>

<Tile
    class="tile"
    id="adding-tile"
    style="background:url(/assets/Amos.svg) center center no-repeat;"
>
    <form class="clfx p20 w-100 h-100" on:submit|preventDefault={preprocess}>
        <TextInput size="sm" placeholder="Type" bind:value={data.type} />
        <TextInput size="lg" placeholder="Title" bind:value={data.title} />
        <br />
        <div class="extra ƒ">
            <svg viewBox="0 0 32 32">
                <path
                    d="M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15"
                />
            </svg>
            <TextInput
                size="sm"
                placeholder="Link"
                on:blur={getImage}
                bind:value={data.url}
            />
        </div>
        <div class="extra ƒ">
            <svg viewBox="0 0 32 32">
                <path
                    d="M20 24 L12 16 2 26 2 2 30 2 30 24 M16 20 L22 14 30 22 30 30 2 30 2 24"
                />
                <circle cx="10" cy="9" r="3" />
            </svg>
            <TextInput size="sm" placeholder="Image" bind:value={data.image} />
        </div>
        <span class="rec p-abs">
            <TextInput size="sm" placeholder="Rec" bind:value={data.from} />
        </span>
        <input class="o-0" type="submit" value="Go" />
    </form>
    <div class="add p-abs">Add More...</div>
</Tile>

<style type="text/scss">
    form {
        opacity: 0.5;
        transition: opacity 0.2s ease;
        &:hover {
            opacity: 1;
            & ~ .add {
                opacity: 0;
            }
        }
        .rec {
            bottom: 1em;
        }
    }
    svg {
        height: 28px;
        width: 28px;
        margin: 2px 5px 0 0;
        stroke: #fff;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
    }

    .clfx {
        background: #0008;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        -moz-backdrop-filter: blur(4px);
    }
    .add {
        color: #000;
        bottom: 1em;
        right: 1em;
    }
</style>
