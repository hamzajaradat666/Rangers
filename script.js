let canvas = document.getElementById("drawarea");
let ctx = canvas.getContext("2d");
let ctx2 = canvas.getContext("2d");

let key = {

    a: 65,
    s: 83,
}


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
let board_width=1;
let board_height=1;
let closeX = 1.53;
let closeY = 1.76;
let the_map = [];


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


        this.hex = {

            x: this.cellside,
            y: this.cellside,
            cir_R: this.cellside,
            in_r: this.r,
            side: this.cellside,
            cellnum: 1,
            isOn: false

        }


    }


    check_console_log() {

        console.clear();
        console.log(this.map);


    }



    make() {


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let map = [];

        for (let j = this.initPosX; j < this.height + this.initPosX; j += 1) {
            for (let i = this.initPosY; i < this.width + this.initPosY; i += 1) {
                this.hex.x = this.hex.x * i * this.cX;
                this.hex.y = i % 2 == 0 ? this.hex.y * j * this.cY + this.hex.in_r * 2 : this.hex.y * j * this.cY + this.hex.in_r;
                if (map.length <= this.height * this.width) {
                    
                    if (map.length <= this.width * this.height - 1)
                        map.push({ ...this.hex});

                        console.log(this.hex)

                }

                

                this.hex.x = this.cellside;
                this.hex.y = this.cellside;
                this.hex.cellnum++;
            }
        }

        this.hex.cellnum = 1;
        return map;
    }

    mapDrawer(mapC){
        for (let i = 0; i < mapC.length; i++) {
                    ctx.save();
                    ctx.strokeStyle = "rgba(200, 10, 100, 1)";
                    ctx.beginPath();
                    ctx.moveTo(mapC[i].x, mapC[i].y);
                    ctx.moveTo(mapC[i].x - mapC[i].cir_R, mapC[i].y)
                    ctx.lineTo(mapC[i].x - mapC[i].side / 2, mapC[i].y - mapC[i].in_r)
                    ctx.lineTo(mapC[i].x + mapC[i].side / 2, mapC[i].y - mapC[i].in_r)
                    ctx.lineTo(mapC[i].x + mapC[i].cir_R, mapC[i].y);
                    ctx.lineTo(mapC[i].x + mapC[i].side / 2, mapC[i].y + mapC[i].in_r)
                    ctx.lineTo(mapC[i].x - mapC[i].side / 2, mapC[i].y + mapC[i].in_r)
                    ctx.fillText(mapC[i].cellnum, mapC[i].x, mapC[i].y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.restore();
        }


    }

    mapChecker(mapC) {

        

            for (let i = 0; i < mapC.length; i++) {

                

                if(hexhover(mapC[i])&&hexClick(mapC[i])){
                    
                    mapC[i].isOn=true;
                    fillHex(mapC[i])
                    // md=false;
                    
                }

                if(mapC[i].isOn==true){

                    fillHex(mapC[i]);
                }
                
          }
          
    }



    props() {

        
        this.cellside = cellside;
        this.width = Math.floor(parseInt(document.getElementById("borderwidth").value) / 2) * 2;
        this.height = parseInt(document.getElementById("borderheight").value);
        this.initPosX = Math.floor(parseInt(document.getElementById("initposX").value) / 2) * 2;
        this.initPosY = Math.floor(parseInt(document.getElementById("initposY").value) / 2) * 2;




    }

}

class Unit extends Mapper {

    constructor(unit) {
        super();
        console.log(" Unit Constructer");
        this.range = 20;
        this.pieces = [1];
        this.basePiece = 99;
        this.attack = 20;
        this.defence = 0;
        this.hp = 0;
        this.isSelected = false;
        this.moveable = false;
        this.isPassable = false;

        if(unit instanceof Soilder)this.pieces=piecesMaker("Soilder");
        if(unit instanceof Tank)this.pieces=piecesMaker("Tank");
    

    }
      piecesMaker(checkthis){

        if(checkthis==="Soilder"){
            console.log("SOLIDER IS HERE")        
        }
        if(checkthis==="Tank"){console.log("TANK IS HERE")}

      }
    


}

class Soilder extends Unit {

    constructor(unit) {
    
        super(unit);

    }



}

class Tank extends Unit {

    constructor() {

        super();


    }
}



function fillHex(hex){
                    ctx.save();
                    ctx.strokeStyle = "rgba(200, 10, 100, 1)";
                    ctx.beginPath();
                    ctx.moveTo(hex.x, hex.y);
                    ctx.moveTo(hex.x - hex.cir_R, hex.y)
                    ctx.lineTo(hex.x - hex.side / 2, hex.y - hex.in_r)
                    ctx.lineTo(hex.x + hex.side / 2, hex.y - hex.in_r)
                    ctx.lineTo(hex.x + hex.cir_R, hex.y);
                    ctx.lineTo(hex.x + hex.side / 2, hex.y + hex.in_r)
                    ctx.lineTo(hex.x - hex.side / 2, hex.y + hex.in_r)
                    ctx.closePath();
                    ctx.fillStyle = "rgba(100,0,200,0.65)"
                    ctx.fill();
                    ctx.restore();


}
let map0=new Mapper();
map0.props();
main_map = map0.make();

function update() {
   ctx.clearRect(0,0,1300,450);
   map0.mapDrawer(main_map);
   map0.mapChecker(main_map);

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
window.addEventListener("load", function () {
    let canvasW = 1300;
    let canvasH = 450;
    document.getElementById("testarea").innerHTML = "Welcome To Rangers";
    document.getElementById("drawarea").setAttribute("width", canvasW);
    document.getElementById("drawarea").setAttribute("height", canvasH);

    setInterval(update, 1000 / fps);







})