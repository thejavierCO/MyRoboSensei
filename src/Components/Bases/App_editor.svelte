<script>
    import lib from "../../js/Control.d.ts";
    import Control from "!!raw-loader!../../js/Control";
    import RunCode from "../../js/RunCode";
    import Editor from "../tools/editor.svelte";
    import {KeyMod,KeyCode} from "monaco-editor";
    let editorConfig = (monaco)=>{
        let theme = "ApiBotTheme";
        monaco.languages.typescript.javascriptDefaults.addExtraLib(lib,"../js/Control.d.ts")
        monaco.editor.defineTheme(theme, {
            base: 'vs-dark',
            inherit: true,
            rules: [
                {token:"delimiter",foreground: 'FFBF00'}
            ]
        })
        return {monaco,theme};
    }
    let editorModific = ({detail:data})=>{
        data.setValue("let {"+([
            "delay"
        ].join(","))+"} = new Control()")
        data.addAction({
            id:"RunCode",
            label:"LoadCode",
            keybindings: [
                KeyMod.CtrlCmd | KeyCode.KEY_S,
            ],
            contextMenuGroupId: 'navigation',
            contextMenuOrder: 1.5,
            run: (a)=>{
                let control = new RunCode(a,Control);
                control.Run()
            }
        })
    }
</script>

<Editor id="editor" config={editorConfig} on:mount={editorModific}>
    <div slot="editor" id="editor"></div>
</Editor>

<style>
    :global(#editor){
        background: red;
        width: 100%;
        height: 600px;
    }
</style>