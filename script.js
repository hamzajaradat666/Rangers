let canvas = document.getElementById("drawarea");
let ctx = canvas.getContext("2d");
let ctx2 = canvas.getContext("2d");




let placeTankFlag = document.getElementById("tank");
let placeSoilderFlag = document.getElementById("soilder");
let passable = document.getElementById("pass");


let fps = 30;
let time = 0;
let callOnce = true;
let cellside;
cellside = parseInt(document.getElementById("cellsize1").value);
let r = cellside * Math.sqrt(3) / 2;
let initPosX = 1;
let initPosY = 1;
let board_width = 5;
let board_height = 5;
let closeX = 1.53;
let closeY = 1.76;

let count = 1;

class Mapper {

    constructor() {

        this.width = board_width;
        this.height = board_height;
        this.initPosX = initPosX;
        this.initPosY = initPosY;
        this.cellside = cellside;
        this.r = this.cellside * Math.sqrt(3) / 2;
        this.cX = closeX;
        this.cY = closeY;
        this.map = [];

        this.hex = {

            x: this.cellside,
            y: this.cellside,
            cir_R: this.cellside,
            in_r: this.r,
            side: this.cellside,
            cellnum: count,
            isOff: false

        }


    }
    check_console_log() {

        console.clear();
        console.log(this.map);


    }



    update() {


        ctx.clearRect(0, 0, canvas.width, canvas.height);

        count = 1;

        for (let j = this.initPosX; j < this.height + this.initPosX; j += 1) {
            for (let i = this.initPosY; i < this.width + this.initPosY; i += 1) {
                this.hex.x = this.hex.x * i * this.cX;
                this.hex.y = i % 2 == 0 ? this.hex.y * j * this.cY + this.hex.in_r * 2 : this.hex.y * j * this.cY + this.hex.in_r;

                ctx.save();
                ctx.strokeStyle = "rgba(200, 10, 100, 1)";
                ctx.beginPath();
                ctx.moveTo(this.hex.x, this.hex.y);
                ctx.moveTo(this.hex.x - this.hex.cir_R, this.hex.y)
                ctx.lineTo(this.hex.x - this.hex.side / 2, this.hex.y - this.hex.in_r)
                ctx.lineTo(this.hex.x + this.hex.side / 2, this.hex.y - this.hex.in_r)
                ctx.lineTo(this.hex.x + this.hex.cir_R, this.hex.y);
                ctx.lineTo(this.hex.x + this.hex.side / 2, this.hex.y + this.hex.in_r)
                ctx.lineTo(this.hex.x - this.hex.side / 2, this.hex.y + this.hex.in_r)
                ctx.closePath();
                ctx.stroke();
                ctx.restore();



                if (this.map.length <= this.height * this.width) {

                    //   console.log(this.hex)
                    this.map.push({ ...this.hex
                    });

                }



                this.hex.x = this.cellside;
                this.hex.y = this.cellside;
                this.hex.cellnum = count++;
            }
        }

        return this.map;
    }

    props() {

        this.map = [];
        this.cellside = cellside;
        this.width = Math.floor(parseInt(document.getElementById("borderwidth").value) / 2) * 2;
        this.height = parseInt(document.getElementById("borderheight").value);
        this.initPosX = Math.floor(parseInt(document.getElementById("initposX").value) / 2) * 2;
        this.initPosY = Math.floor(parseInt(document.getElementById("initposY").value) / 2) * 2;




    }

}

class Unit {

    constructor() {

        this.pieces = [];
        this.basePiece = 0;
        this.range = 0;
        this.attack;
        this.defence;
        this.hp;
        this.isSelected = false;
        this.moveable;
        this.isPassable;
    }

    unitchecker(unit,map) {

        for(let i=0;i<map.length;i++){
        if (unit.cellnum==map[i].cellnum) {
                
                fillHex(unit);
        }    
        
    //         if (hexClick(unit)) {
    //             if (unit.cellnum % 2 == 0) {
    //                 if (!unit.isImpassable) {
    //                     console.log("Tank Placed")
    //                     unit.isImpassable = true;

    //                 } else {
    //                     console.log("Tank Removed")
    //                     unit.isImpassable = false;

    //                 }
    //             }

    //         }
    //     }
    //     md = false
         }

    }
}

class Soilder extends Unit{

    constructor() {

        super();

    }


}

class Tank extends Unit {

    constructor() {

        super();


    }


    makeTank(tile) {


       /*  this.basePiece = tile.cellnum;
        this.pieces.push(
            this.basePiece,
            tile.cellnum + 1,
            tile.cellnum - 1,
            tile.cellnum + board_width,
            tile.cellnum - board_width,
            tile.cellnum - board_width + 1,
            tile.cellnum - board_width - 1, ); */



    }

}


let key = {

    a: 65,
    s: 83,
}

function fillHex(hex) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(hex.x, hex.y);
    ctx.moveTo(hex.x - hex.cir_R, hex.y)
    ctx.lineTo(hex.x - hex.cellside / 2, hex.y - hex.in_r)
    ctx.lineTo(hex.x + hex.cellside / 2, hex.y - hex.in_r)
    ctx.lineTo(hex.x + hex.cir_R, hex.y);
    ctx.lineTo(hex.x + hex.cellside / 2, hex.y + hex.in_r)
    ctx.lineTo(hex.x - hex.cellside / 2, hex.y + hex.in_r)
    ctx.closePath();
    // ctx.fillStyle = "rgba("+(Math.random()*1+1)+","+(Math.random()*1+1)+","+(Math.random()*255+1)+",0.64)";
    ctx.fillStyle = "rgba(223,123,1,0.6)"
    ctx.fill();
    ctx.restore();

}

function checkMap(unit) {

    if (unit.isImpassable) {
        fillHex(unit);
    }

}

function timer() {
    fps++
    if (fps > 30) {
        time++;
        fps = 0;
    }
    if (time > 3600)
        time = 0;

}

function template(_let, cb = function () {}) {
    cb();
}
let z = 0;
_map = new Mapper();
_tank = new Tank();
_tank.makeTank(_map.map[z])
if (z == _map.map.length) z = 0;

let s = new Soilder();

function update() {


    timer();
    
    _map.props();
    let map = _map.update();
    s.unitchecker(s,map);

}


window.addEventListener("load", function () {
    let canvasW = 1200;
    let canvasH = 450;
    document.getElementById("testarea").innerHTML = "Welcome To Rangers";
    document.getElementById("drawarea").setAttribute("width", canvasW);
    document.getElementById("drawarea").setAttribute("height", canvasH);

    setInterval(update, 1000 / fps);







})