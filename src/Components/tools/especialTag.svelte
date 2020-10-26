<script>
    import {onMount,createEventDispatcher} from "svelte";
    const setEvent = createEventDispatcher();
    export let nameTag = "NoneNameTagMain";
    export let typeTag = "div";
    if(nameTag===""){
        nameTag = "NoneNameTagMain";
    }
    const {id:tagID,class:className} = $$restProps;
    let getID = (typeof tagID === "string"?tagID:nameTag+"_id");
    let getClass = (typeof className === "string"?className:nameTag+"_class");
    onMount(()=>{
        let id = nameTag+"count"
        window[id] = (!window[id]?0:window[id])+1;
        let print = document.querySelector("#"+nameTag)
        print.id = nameTag+window[id];
        let getchild = print.querySelector("#"+getID+"."+getClass);
        if(getchild!==null){
            print = print.querySelector(typeTag).childNodes[0];
            print.id = getID;
            print.className = getClass;
            setEvent("mount",print);
        }else{
            let tag = document.createElement(typeTag);
            tag.id = getID;
            tag.className = getClass;
            print.appendChild(tag)
            setEvent("mount",print.querySelector(typeTag+"#"+getID+"."+getClass));
        }
    })
</script>
<div id="{nameTag}">
    <slot name="contentTag"></slot>
</div>