import PhaserLoader from "./js/PhaserLoad";
import Phaser from "Phaser";
import "./style/style.scss";
import App from "./Components/Test1.svelte";


// let getGame = new PhaserLoader("#world",[]);

// getGame
// .then(e=>{
//     // let {parent} = e;
//     // let tag = document.createElement("canvas");
//     // parent.appendChild(tag);
//     // console.log(e);
//     return e;
// })
// .then(e=>new Phaser.Game(e))
// .then(e=>{
//     console.log(e);
// })
new App({target:document.body});