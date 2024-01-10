import './styles/reset.css';
import './styles/style.css';

import sceneManager from './scripts/scene-manager';
import { setDummyUnits } from './scripts/game-state';


//setDummyUnits();
sceneManager.initializeScenes();
const scenes = sceneManager.getScenes();

sceneManager.loadScene(scenes.main.titleScreen);

//sceneManager.loadScene(scenes.p1.piecePlacement)
// sceneManager.loadScene(scenes.main.game);
