import {Mapper} from "./Mapper.js";
let fps = 30;
let game = new Mapper();
game.start();
setInterval(function () {game.runtime()}, 1000 / fps)    
    

