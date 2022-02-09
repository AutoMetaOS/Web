<script>
    import { process } from "../functions";
    import Functions from "./functions.svelte";
    export let //
        objective = "sugg",
        title = "",
        image = "",
        tags = [],
        id,
        published = new Date().getFullYear(),
        author = "";

    $: self = {
        title,
        image: image,
        tags: process.tags(tags),
        bk_id: id,
        published: published[0],
        author: process.author(author),
    };
</script>

<div {id} class="book ƒ m10">
    <div class="p-rel">
        <img class="w-100 h-100" src={process.image(image)} alt={title} />
        <Functions {objective} data={self} />
    </div>
    <div class="p10">
        <div class="fw4">{title}</div>
        <div>{process.author(author)}</div>

        <div class="p5">
            <i class="published"
                >First Published {process.published(published)}</i
            > <br />
            <div class="tags">
                {process.tags(tags)}
            </div>
        </div>
    </div>
</div>

<style type="text/scss">
    .book {
        width: 300px;
        max-height: 220px;
        overflow: hidden;
        word-wrap: break-word;
        .published {
            color: #aaa;
        }
        .tags {
            text-transform: capitalize;
        }
        img {
            width: 140px;
            height: 200px;
        }
    }
</style>
