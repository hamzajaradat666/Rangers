import {
    GameEngine
} from "./GameEngine.js";
let gameEngine = new GameEngine();
function prepareBrowser(params) {
    return new Promise((resolve)=>{
        var element = document.getElementById("container");
           /*  if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } */
            resolve()
    })
}
prepareBrowser().then(()=>{
    gameEngine.start(gameEngine)
})

/* document.getElementById('zoom').addEventListener('input', zoom)
function zoom() {
    gameEngine.zoom()
} */


window.onresize = function (event) {
    canvas.setAttribute("width", screenWidth1)
    canvas.setAttribute("height", screenHeight1)
};