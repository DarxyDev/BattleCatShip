import { initScene } from "../scene-manager";
function initBlinder(){
    const scene = initScene('TEMPLATE_blinder');
    const textBox = scene.querySelector("[blinderID='textBox']");
    scene.addEventListener('click',(e)=>{
        e.preventDefault(); //untested, should be fine
        setText('');
        scene.remove();
    })
    function setText(text){
        textBox.textContent = text;
    }
    return {scene, setText}
}
export default initBlinder;