import loadUnits from "./ajax.js";
import Card from "./Card.js";
import OptionsScreen from "./optionsScreen.js";
import StartScreen from "./startScreen.js";
console.log(StartScreen);
let canvas = document.getElementById("drawarea");
let context = canvas.getContext("2d");
let screenWidth1 = window.outerWidth
let screenHeight1 = window.outerHeight
let screenWidth2 = document.body.innerWidth
let screenHeight2 = document.body.innerHeight
let canvasW = screenWidth1;
let canvasH = screenHeight1;
document.getElementById("drawarea").setAttribute("width", canvasW);
document.getElementById("drawarea").setAttribute("height", canvasH);
/* let initPosX = document.getElementById("initposX")
let initPosY = document.getElementById("initposY")
let boardWidth = document.getElementById("borderwidth")
let boardHeight = document.getElementById("borderheight") */
 let initPosX = 2
 let initPosY = 0
 let boardWidth = 5
 let boardHeight = 8
let unitsData;
let deck = [];
let cellside = screenWidth1 / 100 * 2;
let initPosXValue = Math.floor(parseInt(initPosX) / 2) * 2;
let initPosYValue = Math.floor(parseInt(initPosY) / 2) * 2;
let boardWidthValue = Math.floor(parseInt(boardWidth) / 2) * 2;
let boardHeightValue = Math.floor(parseInt(boardHeight))
let closeX = 1.50;
let closeY = 1.73;
let x = 1;
let y = 19
let latestValue
let then;
let fps = 60
let fpsInterval;
let now;
let elapsed
let currentRenderScreen = "startScreen";
let OnLoadingData = false;

export class GameEngine {

    constructor() {
        this.prepareMapAndCards = async () => {
            this.map = this.make2D();
            unitsData = await loadUnits()
            unitsData.forEach(unit => deck.push(new Card(unit)))
            OnLoadingData = false
            setTimeout(() => {
                currentRenderScreen = "gameScreen"
            }, 100);
        }
        this.render = (renderScreen, fps) => {
            then = Date.now();
            renderScreen()
        }
        this.gameScreen = () => {
            fpsInterval = 1000 / fps;
            this.gameTrigger = requestAnimationFrame(this.gameScreen)
            now = Date.now();
            elapsed = now - then;
            if (elapsed > fpsInterval) {
                context.clearRect(0, 0, canvasW, canvasH);
                switch (currentRenderScreen) {
                    case "gameScreen":
                        if (OnLoadingData) {
                            currentRenderScreen = "loadingScreen"
                            this.prepareMapAndCards()
                        }
                        this.mapDrawer2DVertical()
                        this.gameBar()
                        /* this.cardsDrawer() */
                        break;
                    case "startScreen":
                        this.startScreen()
                        break;
                    case "loadingScreen":
                        this.loadingScreen()
                        break;
                    case "optionsScreen":
                        this.optionsScreen()
                        break;

                    default:
                        break;
                }

            }
            then = now - (elapsed % fpsInterval)
        }
        this.loadingScreen = () => {
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
        this.gameBar = () => {
            
            if(OnMouseDownInBox(0, canvasH-100, canvasW, 100)){
                context.save();
                context.fillStyle = "red"
                context.fillRect(0, canvasH-100, canvasW, 100);
                context.restore()
            }
            else{
                context.fillRect(0, canvasH-100, canvasW, 100);
            }

        }
        this.startScreen = () => {
            context.clearRect(0, 0, canvasW, canvasH);
            StartScreen.forEach((ele) => {
                if (OnMouseDownInBox(ele.sx, ele.sy, ele.dx, ele.dy)) {
                    context.drawImage(ele.clicked, ele.sx, ele.sy, ele.dx, ele.dy);
                    if(OnMouseClick())
                    switch (ele.title) {
                        case "startButton":
                            OnLoadingData = true
                            currentRenderScreen = "gameScreen"
                            break;

                        case "optionsButton":
                            currentRenderScreen = "optionsScreen"
                            break;
                    }
                } else {
                    context.drawImage(ele.idle, ele.sx, ele.sy, ele.dx, ele.dy);
                }
            })

        }
        this.zoomValue = 1
        this.onZoom = () => {
            let zoom = (this.zoomValue + 1000) / 1000;
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
        this.optionsScreen = () => {
            let marginBetween = 2
            let marginFromBox = 20
            let optionsCenterBox = {
                sx: canvasW / 10,
                sy: canvasH / 10,
                dx: canvasW / 1.3,
                dy: canvasH / 1.3,
            }
            let backButton = {
                sx: canvasW / 1.3 * 1.13,
                sy: canvasH / 1.3 * 1.13,
                dx: 200,
                dy: 100,
            }
            context.save();
            context.font = '24px sans-serif';
            context.strokeStyle = "red"
            context.clearRect(0, 0, canvasW, canvasH);
            context.strokeRect(optionsCenterBox.sx, optionsCenterBox.sy, optionsCenterBox.dx, optionsCenterBox.dy)
            context.strokeRect(backButton.sx, backButton.sy, backButton.dx, backButton.dy)
            context.fillText("Settings", canvasW / 2 - 100, 50);
            context.restore();
            OptionsScreen.forEach((option, i) => {
                option.forEach((optionBox, j) => {
                    let marginX = optionBox.sx * j * marginBetween + optionsCenterBox.sx + marginFromBox;
                    let marginY = optionBox.sy * i * marginBetween + optionsCenterBox.sy + marginFromBox;
                    context.save();
                    context.strokeRect(marginX, marginY, optionBox.dx, optionBox.dy)
                    context.restore();
                    optionBox.optionData.forEach(data => {
                        let posX = data.sx + marginX;
                        let posY = data.sy + marginY;
                        context.save();
                        context.strokeStyle = data.fillStyle;
                        context.restore();
                        if (data.type.includes("text")) {
                            context.fillText(data.title, posX, posY, 100);
                            context.fillText(this.zoomValue, posX+100, posY+50, 100);

                        }
                        context.strokeRect(posX, posY, data.dx, data.dy)
                        if (OnMouseDownInBox(posX, posY, data.dx, data.dy))
                        if(OnMouseClick()){
                            context.strokeRect(posX, posY, data.dx, data.dy)
                            if (data.title.includes("zoomin") && this.zoomValue<25) {
                                this.zoomValue++
                                this.onZoom()
                            }
                            if (data.title.includes("zoomout") && !this.zoomValue<1) {
                                this.zoomValue--
                                this.onZoom()
                            }
                        }
                        if (OnMouseDownInBox(backButton.sx, backButton.sy, backButton.dx, backButton.dy)) {
                            currentRenderScreen = "gameScreen"
                        }

                    })
                    if (j <= option.length)
                        j++
                })
            })

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
                    context.fillStyle = "red"
                    context.font = "8px Arial";
                    context.fillText(i + " - " + j, tile.x, tile.y);
                    context.restore();
                    context.fillRect(0,0,10,10);
                    if(OnMouseDownInBox(0,0,10,10)){
                        currentRenderScreen = "optionsScreen"
                    }
                    if (OnMouseHoverOverHex(tile) && OnMousePressed() && tile.isOn == false) {
                        tile.isOn = true;
                        this.strokeHex(tile)
                    } else if (OnMouseHoverOverHex(tile) && tile.isOn == true) {
                        this.strokeHex(tile)
                        if (OnMousePressed()) {
                            tile.isOn = false;
                            this.strokeHex(tile)
                        }
                    }
                    if (tile.isOn == true || OnMouseHoverOverHex(tile)) {
                        this.strokeHex(tile)
                        this.drawImage(tile);
                    }
                })
            })
            
        }
        this.cardsDrawer = () => {
            let scale = 100
            deck.forEach((card, i) => {
                context.drawImage(card.look, card.x * i, card.y, scale, scale)
                if(OnMouseHoverOverHex({x:card.x* i,y:card.y,in_r:card.in_r})){
                    context.clearRect(card.x * i, card.y, scale, scale)
                    context.strokeRect(card.x * i, card.y, scale*1.1, scale*1.1)
                }
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
        /* console.log(map) */
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
        canvas.setAttribute("width", screenWidth1)
        canvas.setAttribute("height", screenHeight1)
        this.render(this.gameScreen, fps)
    }

    zoom() {
        let zoom = (parseFloat(document.getElementById("zoom").value) + 1000) / 1000;
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