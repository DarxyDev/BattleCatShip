import './styles/reset.css';
import './styles/style.css';

import sceneManager from './scripts/scene-manager';

sceneManager.initializeScenes();
const scenes = sceneManager.getScenes();

//sceneManager.loadScene(scenes.main.titleScreen);
sceneManager.loadScene(scenes.p1.piecePlacement);
