import { initScene } from "../scene-manager";
function initBlinder(){
    const scene = initScene('TEMPLATE_blinder');
    scene.addEventListener('click',(e)=>{
        e.preventDefault(); //untested, should be fine
        scene.remove();
    })
    return scene;
}
export default initBlinder;