<script>
    import {onMount} from "svelte";
    // import * as monaco from "monaco-editor";
    export let init;
    onMount(()=>console.log("is mount"))
</script>

<div id="data">{init}</div>

<style></style>