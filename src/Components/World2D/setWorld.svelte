<script>
    import Control from "../../js/CreateWordClass";
    import {createEventDispatcher} from "svelte";
    export let width = 100;
    export let height = 100;
    export let name = "testing";
    let setEvent = createEventDispatcher();
    import SetTag from "../tools/especialTag.svelte";
    let getCanvasConfig = ({detail:data})=>{
        let {World} = Control;
        let setW = new World(name,data,data.id);
        setEvent("getWord",setW);
    }
</script>
<SetTag id="worldID" 
nameTag="world" 
on:mount={getCanvasConfig}>
    <div slot="contentTag">
        <canvas id="wordID" 
        width={width}
        height={height}
        ></canvas>
    </div>
</SetTag>