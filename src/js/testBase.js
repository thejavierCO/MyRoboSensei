class Config{
    constructor(a){
        this.libs = a.map(e=>this.setScript(e))
        this.Start = async ()=>this.libs.map(e=>document.head.appendChild(e));
    }
    setScript(a){
        let tag = document.createElement("script");
        tag.src = a;
        return tag;
    }
    setLibMonaco(a={url:"",code:""}){
        let {url,code} = a;
        monaco.languages.typescript.javascriptDefaults.addExtraLib(code,url);
        monaco.editor.createModel(code, 'typescript', monaco.Uri.parse(url));
    }
}

var require = { paths: { vs: '../monaco-editor-0.21.2/min/vs' } };

let getLibs = new Config([
    "../sat-js-master/SAT.js",
    "../blockly/blockly_compressed.js",
    "../blockly/blocks_compressed.js",
    "../blockly/msg/js/es.js",
    "../monaco-editor-0.21.2/min/vs/loader.js",
    "../monaco-editor-0.21.2/min/vs/editor/editor.main.js",
])

console.log(getLibs);

getLibs.Start()