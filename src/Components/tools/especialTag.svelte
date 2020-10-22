<script>
    import {onMount,createEventDispatcher} from "svelte";
    const setEvent = createEventDispatcher();
    export let nameTag = "NoneNameTagMain";
    export let id;
    let tagID = id;
    if(nameTag===""){
        nameTag = "NoneNameTagMain";
    }
    const {class:className} = $$restProps;
    let getID = (typeof tagID === "string"?tagID:nameTag+"_id");
    let getClass = (typeof className === "string"?className:nameTag+"_class");
    onMount(()=>{
        let id = nameTag+"count"
        window[id] = (!window[id]?0:window[id])+1;
        let print = document.querySelector("#"+nameTag)
        print.id = nameTag+window[id];
        let getchild = print.querySelector("#"+getID+"."+getClass);
        if(getchild===null){
            print = print.querySelector("div").childNodes[0];
            print.id = getID;
            print.className = getClass;
            setEvent("mount",print);
        }else{
            setEvent("mount",getchild);
        }
    })
</script>
<div id="{nameTag}">
    <slot name="contentTag"><div></div></slot>
</div>