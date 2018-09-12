import {
    Mapper
} from "./Mapper.js";

let fps = 30;
let callOnce = true;

let map = new Mapper();


setInterval(function () {
    if (callOnce) {
        map.start();
        callOnce = false;
    }
    map.mapDrawer2D_vertical();
}, 1000 / fps);
let key = {

    a: 65,
    s: 83,
}