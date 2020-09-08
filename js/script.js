import {Mapper} from "./Mapper.js";
let fps = 30;
let game = new Mapper();
let gameInterval;
document.getElementById('applySettings').addEventListener('click',ApplySettings)
document.getElementById('zoom').addEventListener('input',ReRender)

function ReRender(){
    game.reRender()
}
function ApplySettings() {
    console.log("click");
    clearInterval(gameInterval)
    game.start().then((loadingInterval)=>{
        clearInterval(loadingInterval)
        gameInterval = setInterval(()=>{
            game.runtime()
        }, 1000 / fps)
    });
}


