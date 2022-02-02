<script>
    import { process } from "../functions";
    export let //
        title = "",
        image = "",
        description = "",
        tags = [],
        isbn,
        id,
        published = new Date().getFullYear(),
        author = "";
</script>

<div id={process.isbn(isbn)} class="book ƒ m10">
    <img src={process.image(image)} alt={title} />
    <div class="p10">
        <div {id} class="fw4">{title}</div>
        <div>{process.author(author)}</div>

        <div class="p5">
            <i class="published">First Published {published[0]}</i> <br />
            <div class="tags">
                {tags
                    .filter((e) => !/[^a-zA-Z]/i.test(e))
                    .map((e) => e.toLowerCase())
                    .slice(0, 4)
                    .join(", ")}
            </div>
            {description}
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
            object-fit: cover;
        }
    }
</style>
