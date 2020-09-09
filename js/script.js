import {GameEngine} from "./GameEngine.js";
let gameEngine = new GameEngine();
gameEngine.start(gameEngine)
document.getElementById('zoom').addEventListener('input',zoom)
function zoom(){
    gameEngine.zoom()
}
window.onresize = function (event) {
    canvas.setAttribute("width", screenWidth1)
    canvas.setAttribute("height", screenHeight1)
};


