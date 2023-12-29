import { initScene } from "../scene-manager";
function initBlinder(){
    const scene = initScene('TEMPLATE_blinder');
    scene.addEventListener('click',()=>{
        scene.remove();
    })
    return scene;
}
export default initBlinder;