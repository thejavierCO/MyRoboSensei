// class Config{
//     async require(array){
//         return await array.map(async name=>typeof name === "string"?await fetch(name)
//             .then(async e=>({[name]:await e.text()}))
//             .catch(e=>({[name]:e})):(()=>{throw name})()
//         )
//     }
// }
// class Main{}

// let {require:gets} = new Config()
// document.addEventListener("load",()=>{
//     gets([
//         "../monaco-editor-0.21.2/monaco.d.ts",
//         "../blockly/typings/blockly.d.ts",
//         "../blockly/typings/blocks.d.ts",
//         "../blockly/typings/javascript.d.ts",
//     ]).then(async e=>await e.map(async e=>{
// //             let keys = Object.keys(await e);
//             let libSource = e[keys[0]];
//             let libUri = keys[0];
//             monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
//             monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
//             return true
//         })
//     ).then(e=>{
//         console.log(e)
//     })
// })
// let result = async (a,b)=>{
//     let setString = (b)=>typeof b === "object"?
//     ((a)=>{
//         let result = "",keys = Object.keys(a);
//         keys.map((e,i)=>{
//             if(i==0){result += "{";}
//             result += (i==(keys.length-1)?keys.length>1?",":"":"")+e+":"+(a[e].toString())+(i==0||keys.length>1?keys.length>1?",":"":"");
//             if(i==(keys.length-1)){result += "}";}
//         })
//         return result;
//     })(b):((a)=>a.toString())(b);
//     return [
//         "(async (Tools)=>{",a,"})("+setString(b)+")",
//         ".then(a=>a)",
//         ".catch(a=>{throw a})"
//     ].join("\n")
// };

// let RunCode = (a)=>{
//     try{
//         let num = 0,testingTime = setInterval(()=>{num = num+1;});
//         let {getValue} = a;
//         if(getValue){
//             result(a.getValue(),Main)
//             .then(e=>{
//                 console.warn("Run Code",e.length);
//                 return eval(e)
//             }).then(e=>{
//                 clearInterval(testingTime);
//                 console.warn("OK time:"+num);
//                 typeof e !== "undefined"?
//                 console.log("response",e)
//                 :"undefined";})
//             .catch(e=>{
//                 clearInterval(testingTime);
//                 console.warn("Error time:"+num);
//                 throw e
//             })
//         }else{throw "require getValue in editor monaco";}
//     }catch(a){console.error(a)}
// }

// class Main{
//     constructor(){
//         this.delay = async (ms)=>new Promise(r=>setTimeout(r,ms))
//         this.setWorld = class{
//             constructor(width,height){
//                 let canvas = document.createElement("canvas");
//                 canvas.style.width = width;
//                 canvas.style.height = height;
//                 this.window = canvas;
//                 this.width = width;
//                 this.height = height
//             }
//         }
//     }
// }

// var workspace = Blockly.inject('blocklyDiv',{
//     toolbox: document.getElementById('toolbox')
// });
// workspace.addChangeListener(()=>{
//     var code = Blockly.JavaScript.workspaceToCode(workspace);
//     document.getElementById("main").innerHTML = "";
//     window.editor.setValue(code)
// });
// fetch("../monaco-editor-0.21.2/monaco.d.ts")
// .then(e=>e.text())
// .then(libSource=>{    
//     var libUri = 'ts:monaco-editor/monaco.d.ts';
//     monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
//     monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
//     return true;
// }).then(()=>{    
//     monaco.editor.defineTheme("Dark",{
//         base:"vs-dark",
//         inherit:true,
//         rules:[],
//         colors:[]
//     })
//     let editor = monaco.editor.create(document.getElementById("main"), {
//         language: "javascript",
//         lineNumbers: "on",
//         theme: "Dark"
//     });
//     editor.addAction({
//         id:"RunCode",
//         label:"LoadCode",
//         keybindings: [
//             monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
//         ],
//         contextMenuGroupId: 'navigation',
//         contextMenuOrder: 1.5,
//         run: (a)=>RunCode(a)
//     })
//     document.querySelector("#submitCode").addEventListener("click",()=>RunCode(editor))
// })