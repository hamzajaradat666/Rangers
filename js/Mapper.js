import {loadUnits} from "./ajax.js";
import {Card} from "./Card.js";
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
let context = canvas.getContext("2d");
let canvasW = document.body.clientWidth;
let canvasH = document.body.clientHeight;
let fpstime = 0;
let renderSpeed = 0;
let x = 1;
let y = 19
var time = 0

document.getElementById("drawarea").setAttribute("width", canvasW);
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
            isOccupied: {},
            isOn: false

        }

    }

    make() {
        this.start();
        context.clearRect(0, 0, canvas.width, canvas.height);
        let map = [];
        for (let j = this.initPosX; j < this.height + this.initPosX; j += 1) {
            for (let i = this.initPosY; i < this.width + this.initPosY; i += 1) {
                this.hex.x = this.hex.x * i * this.cX;
                this.hex.y = i % 2 == 0 ? this.hex.y * j * this.cY + this.hex.in_r * 2 : this.hex.y * j * this.cY + this.hex.in_r;
                if (map.length <= this.height * this.width) {
                    if (map.length <= this.width * this.height - 1)
                        map.push({
                            ...this.hex
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
        context.clearRect(0, 0, canvas.width, canvas.height);
        let map = []
        let inner_map = [];
        for (let i = this.initPosY; i < this.width + this.initPosY; i += 1) {
            for (let j = this.initPosX; j < this.height + this.initPosX; j += 1) {
                this.hex.x = this.hex.x * j * this.cX;
                this.hex.y = j % 2 == 0 ? this.hex.y * i * this.cY + this.hex.in_r * 2 : this.hex.y * i * this.cY + this.hex.in_r;
                inner_map.push({
                    ...this.hex
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

    /* mapDrawer(mapC) {
        let c = {
            r: 133,
            g: 23,
            b: 1,
            a: 0.55
        }
        context.clearRect(0, 0, canvasW, canvasH);
        for (let i = 0; i < mapC.length; i++) {
            context.save();
            context.strokeStyle = "rgba(100, 0, 50, 1)";
            context.beginPath();
            context.moveTo(mapC[i].x, mapC[i].y);
            context.moveTo(mapC[i].x - mapC[i].cir_R, mapC[i].y)
            context.lineTo(mapC[i].x - mapC[i].side / 2, mapC[i].y - mapC[i].in_r)
            context.lineTo(mapC[i].x + mapC[i].side / 2, mapC[i].y - mapC[i].in_r)
            context.lineTo(mapC[i].x + mapC[i].cir_R, mapC[i].y);
            context.lineTo(mapC[i].x + mapC[i].side / 2, mapC[i].y + mapC[i].in_r)
            context.lineTo(mapC[i].x - mapC[i].side / 2, mapC[i].y + mapC[i].in_r)
            context.fillText(mapC[i].cellnum, mapC[i].x, mapC[i].y);
            context.closePath();
            context.stroke();
            context.restore();
            if (OnMouseHoverOverHex(mapC[i]) && OnMouseClickHex(mapC[i]) && mapC[i].isOn == false) {
                mapC[i].isOn = true;
                this.fillHex(mapC[i], c)
            } else if (OnMouseHoverOverHex(mapC[i]) && mapC[i].isOn == true) {
                this.strokeHex(mapC[i], c)
                if (OnMouseClickHex(mapC[i])) {
                    mapC[i].isOn = false;
                    this.fillHex(mapC[i], c)
                }
            }
            if (mapC[i].isOn == true || OnMouseHoverOverHex(mapC[i])) {
                this.fillHex(mapC[i], c);
            }
        }
        md = false;
    } */



    mapDrawer2D_vertical() {
        context.clearRect(0, 0, canvasW, canvasH);
        this.map.forEach((tileProps, i) => {
            tileProps.forEach((tile, j) => {
                context.save();
                context.strokeStyle = "rgba(34, 4, 50, 1)";
                context.fillStyle = "rgba(22, 20, 50, 1)";
                context.beginPath();
                context.moveTo(tile.x, tile.y);
                context.moveTo(tile.x - tile.cir_R, tile.y)
                context.lineTo(tile.x - tile.side / 2, tile.y - tile.in_r)
                context.lineTo(tile.x + tile.side / 2, tile.y - tile.in_r)
                context.lineTo(tile.x + tile.cir_R, tile.y);
                context.lineTo(tile.x + tile.side / 2, tile.y + tile.in_r)
                context.lineTo(tile.x - tile.side / 2, tile.y + tile.in_r)
                context.closePath();
                context.fill();
                context.fillStyle = "black"
                context.font = "8px Arial";
                context.fillText(i + "-" + j, tile.x, tile.y);
                context.restore();
                if (OnMouseHoverOverHex(tile) && OnMouseClickHex(tile) && tile.isOn == false) {
                    tile.isOn = true;
                    this.strokeHex(tile)
                } else if (OnMouseHoverOverHex(tile) && tile.isOn == true) {
                    this.strokeHex(tile)
                    if (OnMouseClickHex(tile)) {
                        tile.isOn = false;
                        this.strokeHex(tile)
                    }
                }
                if (tile.isOn == true || OnMouseHoverOverHex(tile)) {
                    let c = {
                        r: 233,
                        g: 213,
                        b: 122,
                        a: 0
                    }
                    this.strokeHex(tile)
                    this.drawImage(tile);
                }
            })
        })
        md = false;

    }


    cardsDrawer() {
        let scale = 120
        deck.forEach((card, i) => {
            context.drawImage(card.look, card.x * i, card.y, scale, scale)
        })
    }

    fillHex(cell) {
        context.save();
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(cell.x, cell.y);
        context.moveTo(cell.x - cell.cir_R, cell.y)
        context.lineTo(cell.x - cell.side / 2, cell.y - cell.in_r)
        context.lineTo(cell.x + cell.side / 2, cell.y - cell.in_r)
        context.lineTo(cell.x + cell.cir_R, cell.y);
        context.lineTo(cell.x + cell.side / 2, cell.y + cell.in_r)
        context.lineTo(cell.x - cell.side / 2, cell.y + cell.in_r)
        context.closePath();
        context.fillStyle = "rgba(200, 110, 100, 1)";
        context.fill();
        context.restore();
    }

    strokeHex(cell) {
        context.save();
        context.beginPath();
        context.moveTo(cell.x, cell.y);
        context.moveTo(cell.x - cell.cir_R, cell.y)
        context.lineTo(cell.x - cell.side / 2, cell.y - cell.in_r)
        context.lineTo(cell.x + cell.side / 2, cell.y - cell.in_r)
        context.lineTo(cell.x + cell.cir_R, cell.y);
        context.lineTo(cell.x + cell.side / 2, cell.y + cell.in_r)
        context.lineTo(cell.x - cell.side / 2, cell.y + cell.in_r)
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = "rgba(34, 110, 100, 1)";
        context.stroke();
        context.restore();
    }

    drawImage(cell) {
        context.drawImage(deck[5].look, cell.x - cell.side, cell.y - cell.side, cell.side * 2, cell.side * 2);
    }

    loading() {
        let width = 1280
        let drawBox = width / 30
        let image = new Image()
        image.src = "/assets/loading.png"
        if (renderSpeed == 1) {
            renderSpeed = 0;
            x++;
            if (x > 29) {
                /* y++ */
                x = 1;
            }
           /*  if (y > 29) {
                x = 1;
                y = 1
            } */
        }
        renderSpeed++
        context.clearRect(0,0,canvasW,canvasH)
        context.drawImage(image, drawBox * x, drawBox * y, 44, 44, 44, 44, 44, 44);
    }

     start() {
        return new Promise(async(resolve,reject)=>{
            this.cellside = cellside;
            this.width = Math.floor(parseInt(document.getElementById("borderwidth").value) / 2) * 2;
            this.height = parseInt(document.getElementById("borderheight").value);
            this.initPosX = Math.floor(parseInt(document.getElementById("initposX").value) / 2) * 2;
            this.initPosY = Math.floor(parseInt(document.getElementById("initposY").value) / 2) * 2;
            let loading =  setInterval(() => {
                this.loading()
            }, 1000/30);
            await loadUnits().then(Units => {
                unitsData = Units;
                unitsData.forEach(unit => deck.push(new Card(unit)))
            })
            this.map = this.make2D();
                resolve(loading)
        })
    }

    runtime() {
        fpstime++
        if (fpstime == 30) {
            this.time++;
            fpstime = 0;
        }
        this.mapDrawer2D_vertical();
        this.cardsDrawer();
    }


}