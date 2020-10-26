import "./style/style.scss";
import App from "./Components/App.svelte";


(async ()=>{
    return new App({target:document.body});
})()
.then(e=>{
    // console.log(e);
})
.catch(e=>{
    console.warn(e);
})