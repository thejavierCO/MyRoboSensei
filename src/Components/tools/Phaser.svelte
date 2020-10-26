<script>
    import EspecialTag from "./especialTag.svelte";
    import {onMount,createEventDispatcher} from "svelte";
    let setEvent = createEventDispatcher();
    import {Game,CANVAS} from "phaser";
    export let width = 300;
    export let height = 300;
    export let title = "";
    export let preload = ()=>setEvent("error",{error:{msg:"not defined preload"}});
    export let create = ()=>setEvent("error",{error:{msg:"not defined preload"}});
    export let update = ()=>(()=>{setEvent("error",{error:{msg:"not defined update"}});return ()=>{};})();
    export let bgcolor;
    export let setEscene = ()=>({
        preload,
        create,
        update:update()
    });
    let config = {
        type: CANVAS,
        width,
        height,
        physics: {
            default: 'arcade',
            arcade: {
                fps:30,
                gravity: { y: 200 }
            }
        },
        trasparent:true
    }
    onMount(()=>{setEvent("mount",config)})
</script>

<EspecialTag
nameTag="EspecilaTagPhaser"
id="world"
typeTag="canvas"
on:mount={({detail:a})=>{
    a.width = width;
    a.height = height;
    config.canvas = a;
    typeof title === "string"&&title!==""?config.title = title:"";
    typeof bgcolor === "string"&&bgcolor!==""?config.backgroundColor = bgcolor:"";
    if(typeof setEscene === "function"){
        let getEscenes = setEscene();
        if(typeof getEscenes === "object"&&getEscenes.length<0){
            setEvent("error",{error:{mag:"setEscene not return object"}})
            getEscenes = {
                preload,
                create,
                update:update()
            }
        }
        config.scene = getEscenes;
        setEvent("GameLoad",new Game(config));
    }else if(typeof setEscene === "object"){
        config.scene = setEscene;
        setEvent("GameLoad",new Game(config));
    }else{
        setEvent("error",{error:{mag:"require funcion setEscene"}})
    }
}}/>