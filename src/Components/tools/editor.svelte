<script>
    import EspecialTag from "./especialTag.svelte";
    import {createEventDispatcher} from "svelte";
    const setEvent = createEventDispatcher();
    import * as monaco from "monaco-editor";
    export let value = "// insert code";
    export let language = "javascript";
    export let config = ()=>({id:"javascript",monaco,theme:"vs-dark"})
    const {id,class:className} = $$restProps;
    const tagid = "editor",tagclassName = "editorStyle"
    let setID,getID,setClass,getClass;
    if(typeof id === "string"){
        setID = "#"+id;
    }else{
        setID = "#"+tagid;
    }
    getID = id||tagid;
    if(typeof className === "string"){
        setClass = "."+className;
    }else{
        setClass = "."+tagclassName;
    }
    getClass = className||tagclassName;
    let EditorRun = ({detail:data})=>{
        let ConfigR = typeof config === "function"?config(monaco):{id:"javascript",monaco,theme:"vs-dark"};
        if(typeof ConfigR === "object"){
            let {id:langid="javascript",monaco:Cmonaco,theme="vs-dark"} = ConfigR;
            let editor = (typeof Cmonaco ==="object"?Cmonaco:monaco).editor.create(data,{
                value,
                language:typeof langid !== "undefined"?langid:language,
                theme:typeof theme !== "undefined"?theme:"vs-dark"
            })
            setEvent("mount",editor);
        }else{
            setEvent("error",{msg:"not defined config"})
        }
    }
</script>
<EspecialTag 
nameTag="EditorMain" 
on:mount={EditorRun}
id={getID}
class={getClass}>
    <div slot="contentTag">
        <slot name="editor">
            <div id={getID} class="{getClass}"></div>
        </slot>
    </div>
</EspecialTag>