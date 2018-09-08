let canvas = document.getElementById("drawarea");
let ctx = canvas.getContext("2d");
let ctx2 = canvas.getContext("2d");
let canvasW = document.body.clientWidth;
let canvasH = document.body.clientHeight / 3 * 2;
let translate_rate = 8;
let generate = false;
let carImg = new Image();
carImg.src ="assets/Card2.png";

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
let board_width = 1;
let board_height = 1;
let closeX = 1.53;
let closeY = 1.76;

var levelData=[
[-1,-1,-1,0,0,0,0,0,0,0,-1,-1,-1],
[-1,-1,0,0,0,0,0,0,0,0,-1,-1,-1],
[-1,-1,0,0,0,0,0,0,0,0,0,-1,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,-1],
[0,0,0,0,0,0,0,0,0,0,0,0,-1],
[0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,0,-1],
[-1,0,0,0,0,0,0,0,0,0,0,-1,-1],
[-1,-1,0,0,0,0,0,0,0,0,0,-1,-1],
[-1,-1,0,0,0,0,0,0,0,0,-1,-1,-1],
[-1,-1,-1,0,0,0,0,0,0,0,-1,-1,-1]
];


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
            type: {

                disabled: 1,
                land: 2,
                water: 3

            },
            isOn: false

        }


    }


    check_console_log() {

        console.clear();
        console.log(this.map);


    }



    make() {

        this.props();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let map = [];

        for (let j = this.initPosX; j < this.height + this.initPosX; j += 1) {
            for (let i = this.initPosY; i < this.width + this.initPosY; i += 1) {
                this.hex.x = this.hex.x * i * this.cX;
                this.hex.y = i % 2 == 0 ? this.hex.y * j * this.cY + this.hex.in_r * 2 : this.hex.y * j * this.cY + this.hex.in_r;
                if (map.length <= this.height * this.width) {

                    
                    if (map.length <= this.width * this.height - 1)
                        map.push({ ...this.hex
                        });

                    // console.log(this.hex)

                }



                this.hex.x = this.cellside;
                this.hex.y = this.cellside;
                this.hex.cellnum++;
            }
        }

        this.hex.cellnum = 1;
        return map;
    }

    make2D() {

        this.props();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let map = []
        let inner_map = [];
      
        for (let i = this.initPosY; i < this.width + this.initPosY; i += 1) {

            for (let j = this.initPosX; j < this.height + this.initPosX; j += 1) {

                this.hex.x = this.hex.x * j * this.cX;
                this.hex.y = j % 2 == 0 ? this.hex.y * i * this.cY + this.hex.in_r * 2 : this.hex.y * i * this.cY + this.hex.in_r;

                  
                inner_map.push({ ...this.hex});
                   
                    
                        
                this.hex.x = this.cellside;
                this.hex.y = this.cellside;
                this.hex.cellnum++;
            }
            map.push(inner_map);
            inner_map=[];

        }

        this.hex.cellnum = 1;
        return map;
    }

    mapGenerator2D(mapC) {




    }

    mapDrawer(mapC) {
        ctx.clearRect(0, 0, canvasW, canvasH);
        for (let i = 0; i < mapC.length; i++) {
            ctx.save();
            ctx.strokeStyle = "rgba(100, 0, 50, 1)";
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

    mapDrawer2D_vertical(mapC) {
        ctx.clearRect(0, 0, canvasW, canvasH);
        for (let i = 0; i < mapC.length; i++)
            for (let j = 0; j < mapC[i].length; j++) {
                ctx.save();
                ctx.strokeStyle = "rgba(100, 0, 50, 1)";
                ctx.beginPath();
                ctx.moveTo(mapC[i][j].x, mapC[i][j].y);
                ctx.moveTo(mapC[i][j].x - mapC[i][j].cir_R, mapC[i][j].y)
                ctx.lineTo(mapC[i][j].x - mapC[i][j].side / 2, mapC[i][j].y - mapC[i][j].in_r)
                ctx.lineTo(mapC[i][j].x + mapC[i][j].side / 2, mapC[i][j].y - mapC[i][j].in_r)
                ctx.lineTo(mapC[i][j].x + mapC[i][j].cir_R, mapC[i][j].y);
                ctx.lineTo(mapC[i][j].x + mapC[i][j].side / 2, mapC[i][j].y + mapC[i][j].in_r)
                ctx.lineTo(mapC[i][j].x - mapC[i][j].side / 2, mapC[i][j].y + mapC[i][j].in_r)
                ctx.fillText(/* mapC[i][j].cellnum+ "-"+*/i+"-"+j, mapC[i][j].x, mapC[i][j].y);
                ctx.closePath();
                ctx.stroke();
                ctx.drawImage(carImg,mapC[i][j].x-mapC[i][j].side,mapC[i][j].y-mapC[i][j].side,mapC[i][j].side*2,mapC[i][j].side*2);
                ctx.restore();
            }


    }

    mapChecker(mapC) {
        let c = {
            r: 133,
            g: 23,
            b: 1,
            a: 0.55
        }
        for (let i = 0; i < mapC.length; i++) {

            if (hexhover(mapC[i]) && hexClick(mapC[i]) && mapC[i].isOn == false) {

                mapC[i].isOn = true;
                this.fillHex(mapC[i], c)

            } else if (hexhover(mapC[i]) && mapC[i].isOn == true) {

                this.strokeHex(mapC[i], c)

                if (hexClick(mapC[i])) {

                    mapC[i].isOn = false;
                    this.fillHex(mapC[i], c)
                }
            }

            if (mapC[i].isOn == true || hexhover(mapC[i])) {

                this.fillHex(mapC[i], c);
            }



        }
        md = false;
    }

    mapChecker2D(mapC) {
        let c = {
            r: 133,
            g: 213,
            b: 1,
            a: 0.55
        }
        for (let i = 0; i < mapC.length; i++)
            for (let j = 0; j < mapC[i].length; j++) {

                if (hexhover(mapC[i][j]) && hexClick(mapC[i][j]) && mapC[i][j].isOn == false) {

                    mapC[i][j].isOn = true;
                    this.fillHex(mapC[i][j], c)

                } else if (hexhover(mapC[i][j]) && mapC[i][j].isOn == true) {

                    this.strokeHex(mapC[i][j], c)

                    if (hexClick(mapC[i][j])) {

                        mapC[i][j].isOn = false;
                        this.fillHex(mapC[i][j], c)
                    }
                }

                if (mapC[i][j].isOn == true || hexhover(mapC[i][j])) {


                    this.fillHex(mapC[i][j], c);



                }

                if (mapC[i][j].isOn == true && hexhover(mapC[i][j])) {

                    
                    this.fillHex(mapC[i+1][j], c);
                    this.fillHex(mapC[i+2][j], c);
                    this.fillHex(mapC[i+3][j], c);
                    this.fillHex(mapC[i+4][j], c);
                    this.fillHex(mapC[i+5][j], c);
                    this.fillHex(mapC[i+6][j], c);
                    this.fillHex(mapC[i+7][j], c);
                    this.fillHex(mapC[i+8][j], c);
                    this.fillHex(mapC[i+9][j], c);
                    this.fillHex(mapC[i][j], c);

                }



            }
        md = false;
    }

    fillHex(cell, c) {
        let color = "rgba(" + c.r + "," + c.g + ", " + c.b + ", " + c.a + ")";
        ctx.save();
        // ctx.strokeStyle = "rgba(200, 10, 100, 1)";
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(cell.x, cell.y);
        ctx.moveTo(cell.x - cell.cir_R, cell.y)
        ctx.lineTo(cell.x - cell.side / 2, cell.y - cell.in_r)
        ctx.lineTo(cell.x + cell.side / 2, cell.y - cell.in_r)
        ctx.lineTo(cell.x + cell.cir_R, cell.y);
        ctx.lineTo(cell.x + cell.side / 2, cell.y + cell.in_r)
        ctx.lineTo(cell.x - cell.side / 2, cell.y + cell.in_r)
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();


    }

    strokeHex(cell, c) {
        let color = "rgba(" + c.r + "," + c.g + ", " + c.b + ", " + c.a + ")";
        ctx.save();
        
        ctx.beginPath();
        ctx.moveTo(cell.x, cell.y);
        ctx.moveTo(cell.x - cell.cir_R, cell.y)
        ctx.lineTo(cell.x - cell.side / 2, cell.y - cell.in_r)
        ctx.lineTo(cell.x + cell.side / 2, cell.y - cell.in_r)
        ctx.lineTo(cell.x + cell.cir_R, cell.y);
        ctx.lineTo(cell.x + cell.side / 2, cell.y + cell.in_r)
        ctx.lineTo(cell.x - cell.side / 2, cell.y + cell.in_r)
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.strokeStyle = "rgba(200, 10, 100, 1)";
        ctx.stroke();
        ctx.restore();


    }


    props() {


        this.cellside = cellside;
        this.width = Math.floor(parseInt(document.getElementById("borderwidth").value) / 2) * 2;
        this.height = parseInt(document.getElementById("borderheight").value);
        this.initPosX = Math.floor(parseInt(document.getElementById("initposX").value) / 2) * 2;
        this.initPosY = Math.floor(parseInt(document.getElementById("initposY").value) / 2) * 2;




    }


}


class Unit {

    constructor() {

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



    }


}

class Soilder extends Unit {

    constructor() {

        super();

    }

}

class Tank extends Unit {

    constructor() {

        super();


    }
}






function main_menu() {



    if (translate_rate > mx) {
        ctx.translate(translate_rate, 0)
        mx += translate_rate;
    }

    if (mx > canvasW - translate_rate) {
        ctx.translate(-translate_rate, 0)
        mx -= translate_rate;
    }

    if (translate_rate > my) {
        ctx.translate(0, translate_rate)
        my += translate_rate;
    }

    if (my > canvasH - translate_rate) {
        ctx.translate(0, -translate_rate)
        my -= translate_rate;
    }



}
let map0 = new Mapper();
let main_map;

function the_props(){

    
    map0.props();
    main_map = map0.make2D();
    console.log(main_map)

}

function update() {

    
    map0.mapDrawer2D_vertical(main_map);
    map0.mapChecker2D(main_map);


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

    document.getElementById("testarea").innerHTML = "Welcome To Rangers";
    document.getElementById("drawarea").setAttribute("width", canvasW);
    document.getElementById("drawarea").setAttribute("height", canvasH);

    setInterval(update, 1000 / fps);







})