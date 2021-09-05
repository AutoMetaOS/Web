<script>
    import Editor from "./components/editor.svelte";
    import { onMount } from "svelte";
    import { base } from "$app/paths";

    import { Button, Dropdown } from "$hakama";
    import { serverURL } from "$lib/shared/molecular";

    import { updateNote, getNotes, getNote } from "./components/api";
    import { editorData, notesList } from "./components/store";

    let //
        tools,
        currentData,
        saveButton = "ghost",
        selectedIndex;

    const onSelect = (e) => {
        getNote(e.detail.selectedId);
    };

    const noteFilter = (e) => {
        return {
            text: e.title,
            id: e.id,
        };
    };

    const saver = async () => {
        const outputData = await editor.save();

        if (outputData === currentData) return;
        saveButton = "danger";
        currentData = outputData;
        updateNote(mainEditor.dataset.id, outputData)
            .then((r) => (saveButton = "ghost"))
            .catch(console.log);
        return 0;
    };

    const deleter = () => {
        const len = $notesList.length;
        selectedIndex = (selectedIndex + 1) % len;
        updateNote(mainEditor.dataset.id);
    };

    onMount(() => {
        getNotes().then((r) => (selectedIndex = 0));

        window.mainEditor = ƒ("#editorOfNotes");
        tools = {
            header: Header,
            alert: Alert,
            image: SimpleImage,
            list: List,
            link: {
                class: LinkTool,
                config: {
                    endpoint: serverURL + "requestMetadata",
                },
            },
            embed: Embed,
            table: Table,
            checklist: Checklist,
        };
        window.editor = new EditorJS({
            holder: "editorOfNotes",
            tools,
            data: $editorData,
        });
    });

    const handleKeyDown = (e) => {
        if (e.metaKey && e.keyCode === 83) {
            e.preventDefault();
            saver();
        }
    };
</script>

<svelte:head>
    <title>Terrelysium</title>
    <style>
        body {
            color: #fff;
            min-height: 100vh;
        }
    </style>
    {#each ["editorjs", "header+embed", "table+alert", "checklist+list", "simple-image+link"] as js}
        <script src="{base}/helpers/notes/{js}.js"></script>
    {/each}
</svelte:head>

<svelte:window on:keydown={handleKeyDown} />

<main class="w-100" style="z-index: 0;">
    <div class="w-100 fns ƒ">
        <Button kind={saveButton} on:click={saver}>Saver</Button>
        <Button kind="danger-ghost" on:click={deleter}>Delete</Button>
        <Dropdown
            on:select
            hideLabel
            type="inline"
            on:select={onSelect}
            bind:selectedIndex
            items={$notesList.map(noteFilter)}
            style="grid-gap:unset;"
        />
    </div>
    <Editor />
</main>

<style type="text/scss">
    .fns {
        justify-content: center;
    }
    main {
        height: 100vh;
        overflow: hidden;
    }
</style>
