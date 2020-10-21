import "./style.scss";
import App from "./App.svelte";

new App({
    target:document.querySelector("body"),
    props:{
        init:"hola"
    }
})


// monaco.editor.create(document.body,{
//     value:"// insert data",
//     language:"javascript",
//     theme:"vs-dark"
// })