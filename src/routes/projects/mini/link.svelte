<script>
    export let //
        url = "https://www.youtube.com/watch?v=",
        src = "Youtube";

    import { Youtube } from "@process";

    const imageProcessor = (url) => {
        if (Youtube.isYoutube(url)) return Youtube.getImage(url);
        return "@UI:icons/amos.svg";
    };

    const getHost = (url) =>
        new URL(url).hostname.replace("www.", "").replace("www1.", "");
</script>

<a class="fw7 ƒ ∆-ct w-100 p5 rx5 m0" href={url}>
    <img
        class="rx2 p2"
        width="32px"
        height="18px"
        src={imageProcessor(url)}
        alt="Thumb"
    />
    <div>
        {getHost(url)}
    </div>
</a>

<style type="text/scss">
    img {
        margin-right: 5px;
    }
    a {
        display: block;
        transition: background 0.1s ease;
        &:hover {
            background: #333;
        }
    }
</style>
