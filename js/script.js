import {Mapper} from "./Mapper.js";
let fps = 30;
let game = new Mapper();
game.start().then((res)=>{
    clearInterval(res)
    setInterval(()=>{
        game.runtime()
    }, 1000 / fps)
});



