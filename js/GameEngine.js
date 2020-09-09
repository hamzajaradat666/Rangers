import {
    loadUnits
} from "./ajax.js";
import {
    Card
} from "./Card.js";
let canvas = document.getElementById("drawarea");
let context = canvas.getContext("2d");
let screenWidth1 = window.innerWidth
let screenHeight1 = window.innerHeight - 200
let screenWidth2 = document.body.innerWidth
let screenHeight2 = document.body.innerHeight
let canvasW = screenWidth1;
let canvasH = screenHeight1;
document.getElementById("drawarea").setAttribute("width", canvasW);
document.getElementById("drawarea").setAttribute("height", canvasH);
let initPosX = document.getElementById("initposX")
let initPosY = document.getElementById("initposY")
let boardWidth = document.getElementById("borderwidth")
let boardHeight = document.getElementById("borderheight")
let unitsData;
let deck = [];
let cellside = screenWidth1 / 100 * 2;
let initPosXValue = Math.floor(parseInt(initPosX.value) / 2) * 2;
let initPosYValue = Math.floor(parseInt(initPosY.value) / 2) * 2;
let boardWidthValue = Math.floor(parseInt(boardWidth.value) / 2) * 2;
let boardHeightValue = Math.floor(parseInt(boardHeight.value))
let closeX = 1.50;
let closeY = 1.73;
let x = 1;
let y = 19
let latestValue = parseFloat(document.getElementById("zoom").value) / 10;
let then;
let fps = 60
let fpsInterval;
let now;
let elapsed
export class GameEngine {

    constructor() {
        this.render = (renderScreen, fps) => {
            fpsInterval = 1000 / fps;
            then = Date.now();
            renderScreen()
        }
        this.gameScreen = () => {
            this.gameTrigger = requestAnimationFrame(this.gameScreen)
            now = Date.now();
            elapsed = now - then;
            if (elapsed > fpsInterval) {
                context.clearRect(0, 0, canvasW, canvasH);
                this.mapDrawer2DVertical()
                this.cardsDrawer()
            }
            then = now - (elapsed % fpsInterval)
        }
        this.loadingScreen = () => {
            this.loadingTrigger = requestAnimationFrame(this.loadingScreen)
            now = Date.now();
            elapsed = now - then;
            if (elapsed > fpsInterval) {
                let width = 1280
                let drawBox = width / 30
                let image = new Image()
                image.src = "/assets/loading.png"
                x++;
                if (x > 29) {
                    y++
                    x = 1;
                }
                if (y > 29) {
                    x = 1;
                    y = 1
                }
                context.fillRect(0, 0, canvasW, canvasH);
                context.drawImage(image, drawBox * x, (drawBox - 0.1) * y, 44, 44, canvasW - 220, canvasH - 220, 44, 44);
            }
            then = now - (elapsed % fpsInterval);

        }
        this.mapDrawer2DVertical = () => {
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
        this.cardsDrawer = () => {
            let scale = 120
            deck.forEach((card, i) => {
                context.drawImage(card.look, card.x * i, card.y, scale, scale)
            })
        }
        this.width = boardWidthValue;
        this.height = boardHeightValue;
        this.initPosX = initPosXValue;
        this.initPosY = initPosYValue;
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
        context.drawImage(deck[6].look, cell.x - cell.side, cell.y - cell.side, cell.side * 2, cell.side * 2);
    }

    async start(self) {
        console.log(self);
        this.render(this.loadingScreen, fps)
        canvas.setAttribute("width", screenWidth1)
        canvas.setAttribute("height", screenHeight1)
        canvas.style.cssText = `background-color:gray`;
        this.map = this.make2D();
        unitsData = await loadUnits()
        unitsData.forEach(unit => deck.push(new Card(unit)))
        setTimeout(() => {
            cancelAnimationFrame(this.loadingTrigger)
        }, 1000);
        this.render(this.gameScreen, fps)
    }

    zoom() {
        let zoom = parseFloat(document.getElementById("zoom").value) / 1000;
        console.log(zoom);
        this.map.forEach((row) => {
            row.forEach((col) => {
                if (zoom > latestValue) {
                    col.side *= zoom
                    col.cir_R *= zoom
                    col.in_r *= zoom;
                    col.x *= zoom;
                    col.y *= zoom;
                }
                if (zoom < latestValue) {
                    col.side /= latestValue
                    col.cir_R /= latestValue
                    col.in_r /= latestValue;
                    col.x /= latestValue;
                    col.y /= latestValue;
                }
            })
        })
        latestValue = zoom
    }

}

