import { loadUnits } from "./ajax.js";
import { Unit } from "./Unit.js";
import { Card } from "./Card.js";
var tileImg = new Image();
var unitsData;
var deck = [];

let cellside = document.body.clientWidth / 100 * 2.5;
let initPosX = 1;
let initPosY = 1;
let board_width = 1;
let board_height = 1;
let closeX = 1.50;
let closeY = 1.73;


let canvas = document.getElementById("drawarea");
let ctx = canvas.getContext("2d");

let canvasW = document.body.clientWidth;
let canvasH = document.body.clientHeight;
document.getElementById("drawarea").setAttribute("width", canvasW * 5);
document.getElementById("drawarea").setAttribute("height", canvasH);



export class Mapper {

    constructor() {

        this.width = board_width;
        this.height = board_height;
        this.initPosX = initPosX;
        this.initPosY = initPosY;
        this.cellside = cellside;
        this.r = this.cellside * Math.sqrt(3) / 2;
        this.cX = closeX;
        this.cY = closeY;
        this.map;
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
            isOccupied:{},
            isOn: false

        }

    }

    make() {

        this.start();
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let map = []
        let inner_map = [];

        for (let i = this.initPosY; i < this.width + this.initPosY; i += 1) {

            for (let j = this.initPosX; j < this.height + this.initPosX; j += 1) {

                this.hex.x = this.hex.x * j * this.cX;
                this.hex.y = j % 2 == 0 ? this.hex.y * i * this.cY + this.hex.in_r * 2 : this.hex.y * i * this.cY + this.hex.in_r;


                inner_map.push({ ...this.hex
                });



                this.hex.x = this.cellside;
                this.hex.y = this.cellside;
                this.hex.cellnum++;
            }
            map.push(inner_map);
            inner_map = [];

        }

        this.hex.cellnum = 1;
        console.log(map)
        return map;
    }

    mapGenerator2D() {

        for (let i = 0; i < this.map.length; i++)
            for (let j = 0; j < this.map[i].length; j++) {

                this.map[i][j].isOn = levelData[i][j];
            }

    }

    mapDrawer(mapC) {
        let c = {
            r: 133,
            g: 23,
            b: 1,
            a: 0.55
        }


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



    mapDrawer2D_vertical() {
        let c = {
            r: 133,
            g: 213,
            b: 1,
            a: 0.55
        }
        ctx.clearRect(0, 0, canvasW, canvasH);
        for (let i = 0; i < this.map.length; i++)
            for (let j = 0; j < this.map[i].length; j++) {

                ctx.save();
                ctx.strokeStyle = "rgba(200, 0, 50, 1)";
                ctx.fillStyle = "rgba(2, 200, 50, 0.4)";
                ctx.beginPath();
                ctx.moveTo(this.map[i][j].x, this.map[i][j].y);
                ctx.moveTo(this.map[i][j].x - this.map[i][j].cir_R, this.map[i][j].y)
                ctx.lineTo(this.map[i][j].x - this.map[i][j].side / 2, this.map[i][j].y - this.map[i][j].in_r)
                ctx.lineTo(this.map[i][j].x + this.map[i][j].side / 2, this.map[i][j].y - this.map[i][j].in_r)
                ctx.lineTo(this.map[i][j].x + this.map[i][j].cir_R, this.map[i][j].y);
                ctx.lineTo(this.map[i][j].x + this.map[i][j].side / 2, this.map[i][j].y + this.map[i][j].in_r)
                ctx.lineTo(this.map[i][j].x - this.map[i][j].side / 2, this.map[i][j].y + this.map[i][j].in_r)
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = "black"
                ctx.font = "8px Arial";
                ctx.fillText(i + "-" + j, this.map[i][j].x, this.map[i][j].y);
                ctx.restore();

                if (hexhover(this.map[i][j]) && hexClick(this.map[i][j]) && this.map[i][j].isOn == false) {

                    this.map[i][j].isOn = true;
                    this.strokeHex(this.map[i][j], c)

                } else if (hexhover(this.map[i][j]) && this.map[i][j].isOn == true) {

                    this.strokeHex(this.map[i][j], c)

                    if (hexClick(this.map[i][j])) {

                        this.map[i][j].isOn = false;
                        this.strokeHex(this.map[i][j], c)
                    }
                }

                if (this.map[i][j].isOn == true || hexhover(this.map[i][j])) {
                    let c = {
                        r: 233,
                        g: 213,
                        b: 122,
                        a: 0
                    }
                    this.strokeHex(this.map[i][j], c)
                    this.drawImage(this.map[i][j]);
                }
              
            }
        md = false;

    }


    cardsDrawer(){

        let scale = 120
        let cardX = 100;
        let cardY = canvasH-130;
            for(let i=0;i<deck.length;i++)
            ctx.drawImage(deck[i].look,deck[i].x*i,deck[i].y,scale,scale)

    }

    fillHex(cell, c) {
        let color = "rgba(" + c.r + "," + c.g + ", " + c.b + ", " + c.a + ")";
        ctx.save();
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
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgba(200, 110, 100, 1)";
        ctx.stroke();
        ctx.restore();


    }

    drawImage(cell) {

        
        ctx.drawImage(deck[1].look, cell.x - cell.side, cell.y - cell.side, cell.side * 2, cell.side * 2);
        
    }


    start() {

        this.cellside = cellside;
        this.width = Math.floor(parseInt(document.getElementById("borderwidth").value) / 2) * 2;
        this.height = parseInt(document.getElementById("borderheight").value);
        this.initPosX = Math.floor(parseInt(document.getElementById("initposX").value) / 2) * 2;
        this.initPosY = Math.floor(parseInt(document.getElementById("initposY").value) / 2) * 2;
        loadUnits(Units => {

            console.log(Units.fire_golem);   
            tileImg.src = Units.fire_golem.look;
            unitsData = Units;
            console.log(unitsData)
            deck.push(new Card(unitsData.peasent),new Card(unitsData.water_golem),new Card(unitsData.hawk),new Card(unitsData.orc),new Card(unitsData.fire_golem))
          
            
            
         })
         
        this.map = this.make2D();

    }

    runtime(){

        
        this.mapDrawer2D_vertical();
        this.cardsDrawer();
    }


}
