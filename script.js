
import {
    Mapper
} from "./Mapper.js";
let fps = 30;
let callOnce = true;

setInterval(function(){
    if (callOnce) {
        map0.start();
        callOnce = false;
    }
    map0.mapDrawer2D_vertical();
}, 1000 / fps);
let key = {

    a: 65,
    s: 83,
}

let map0 = new Mapper();

    