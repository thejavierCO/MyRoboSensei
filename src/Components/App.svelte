<script>
import run from "../Game/Scenes/run";
import boot from "../Game/Scenes/boot"
import PhaserSvelte from "./tools/Phaser.svelte";

</script>

<PhaserSvelte
width={900}
height={900}
bgcolor="rgba(255,255,255,0.5)"
setEscene={[
    boot,
    run
]}
/>
<style>
</style>