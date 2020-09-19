import loadUnits from "./ajax.js";
import Card from "./Card.js";
import GameBar from "./gameBar.js";
import OptionsScreen from "./optionsScreen.js";
import Player from "./Player.js";
import StartScreen from "./startScreen.js";
let canvas = document.getElementById("drawarea");
let context = canvas.getContext("2d");
let canvasW = CONFIGURATIONS.canvasW;
let canvasH = CONFIGURATIONS.canvasH;
document.getElementById("drawarea").setAttribute("width", canvasW);
document.getElementById("drawarea").setAttribute("height", canvasH);
let cellside = canvasW / 50;
let initPosX = canvasW / 200
let initPosY = 0
let boardWidth = 8
let boardHeight = 16
let initPosXValue = Math.floor(initPosX);
let initPosYValue = Math.floor(initPosY);
let boardWidthValue = Math.floor(boardWidth / 2) * 2;
let boardHeightValue = Math.floor(boardHeight)
let x = 1;
let y = 19;
let latestValue;
let then;
let fps = 60
let fpsInterval;
let now;
let elapsed
let currentRenderScreen = "startScreen";
let OnLoadingData = false;

export class GameEngine {

    constructor() {

        this.prepareMap = async () => {
            this.map = this.make2D();
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
                            this.prepareMap()
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
            GameBar.forEach((gameBarBody) => {
                gameBarBody.gameBarSections.forEach((sections) => {
                    sections.subSections.forEach(sub => {
                        if (OnMouseDownInBox(sections.sx, sections.sy, sections.dx, sections.dy)) {
                            context.save();
                            context.strokeStyle = "blue"
                            context.strokeRect(sections.sx, sections.sy, sections.dx, sections.dy);
                            context.restore()
                            switch (sections.title) {
                                case "status":
                                    context.fillStyle = 'black';
                                    context.fillText(sub.title, sub.sx, sub.sy);
                                    switch (sub.title) {
                                        case "playerHP":
                                            context.fillText(this.players[this.gameStatus.playerTurn - 1].hp, sub.valueSx, sub.valueSy);
                                            break;
                                        case "playerName":
                                            context.fillText(this.players[this.gameStatus.playerTurn - 1].name, sub.valueSx, sub.valueSy);
                                            break;
                                        case "playerTurn":
                                            context.fillText(this.players[this.gameStatus.playerTurn - 1].id, sub.valueSx, sub.valueSy);
                                            break;
                                    }
                                    break;
                                case "cards":
                                    context.strokeRect(sub.sx, sub.sy, sub.dx*2, sub.dy);
                                    context.font=`10px sans-serif`;
                                    context.fillText(sub.title, sub.sx, sub.sy+sub.margin);
                                    break;
                                case "deck":
                                    context.fillText(sub.title, sub.sx, sub.sy);
                                    context.strokeRect(sub.sx, sub.sy, sub.dx, sub.dy);
                                    if (OnMouseDownInBox(sub.sx, sub.sy, sub.dx, sub.dy)) {
                                        if (this.gameStatus.playerTurn == 1)
                                            this.gameStatus.playerTurn = 2
                                        else this.gameStatus.playerTurn = 1
                                    }
                                    break;
                            }
                        } else {
                            context.save();
                            context.strokeStyle = "red"
                            context.strokeRect(sections.sx, sections.sy, sections.dx, sections.dy);
                            context.restore()
                            context.save();
                            context.globalAlpha = 0.1;
                            context.fillRect(sections.sx, sections.sy, sections.dx, sections.dy);
                            context.restore();
                            switch (sections.title) {
                                case "status":
                                    context.fillStyle = 'black';
                                    context.fillText(sub.title, sub.sx, sub.sy);
                                    switch (sub.title) {
                                        case "playerHP":
                                            context.fillText(this.players[this.gameStatus.playerTurn - 1].hp, sub.valueSx, sub.valueSy);
                                            break;
                                        case "playerName":
                                            context.fillText(this.players[this.gameStatus.playerTurn - 1].name, sub.valueSx, sub.valueSy);
                                            break;
                                        case "playerTurn":
                                            context.fillText(this.players[this.gameStatus.playerTurn - 1].id, sub.valueSx, sub.valueSy);
                                            break;
                                    }
                                    break;
                                case "cards":
                                    context.strokeRect(sub.sx, sub.sy, sub.dx, sub.dy);
                                    context.fillText(sub.title, sub.sx, sub.sy);
                                    break;
                                case "deck":
                                    context.strokeRect(sub.sx, sub.sy, sub.dx, sub.dy);
                                    context.fillText(sub.title, sub.sx, sub.sy);
                                    break;
                            }
                        }
                    })
                })
            })
        }
        this.startScreen = () => {
            context.clearRect(0, 0, canvasW, canvasH);
            StartScreen.forEach((ele) => {
                if (OnMouseDownInBox(ele.sx, ele.sy, ele.dx, ele.dy)) {
                    context.drawImage(ele.clicked, ele.sx, ele.sy, ele.dx, ele.dy);
                    if (OnMouseClick())
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
                            context.fillText(this.zoomValue, posX + 100, posY + 50, 100);

                        }
                        context.strokeRect(posX, posY, data.dx, data.dy)
                        if (OnMouseDownInBox(posX, posY, data.dx, data.dy))
                            if (OnMouseClick()) {
                                context.strokeRect(posX, posY, data.dx, data.dy)
                                if (data.title.includes("zoomin") && this.zoomValue < 25) {
                                    this.zoomValue++
                                    this.onZoom()
                                }
                                if (data.title.includes("zoomout") && !this.zoomValue < 1) {
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
                    context.fillRect(0, 0, 10, 10);
                    if (OnMouseDownInBox(0, 0, 10, 10)) {
                        currentRenderScreen = "optionsScreen"
                    }
                    if (OnMouseHoverOverHex(tile) && OnMousePressed() && tile.isOccupied == false) {
                        tile.isOccupied = true;
                        this.strokeHex(tile)
                    } else if (OnMouseHoverOverHex(tile) && tile.isOccupied == true) {
                        this.strokeHex(tile)
                        if (OnMousePressed()) {
                            tile.isOccupied = false;
                            this.strokeHex(tile)
                        }
                    }
                    if (tile.isOccupied == true || OnMouseHoverOverHex(tile)) {
                        this.strokeHex(tile)
                        this.drawImage(tile);
                    }
                })
            })

        }
        this.cardsDrawer = () => {
            let scale = 100
            deck.forEach((card, i) => {
                context.drawImage(card.look, card.x, card.y, scale, scale)
                if (OnMouseHoverOverHex({
                        x: card.x,
                        y: card.y,
                        in_r: card.in_r
                    })) {
                    context.clearRect(card.x, card.y, scale, scale)
                    context.strokeRect(card.x, card.y, scale, scale)
                    context.drawImage(card.look, card.x, card.y, scale, scale)

                }
            })
        }
        this.width = boardWidthValue;
        this.height = boardHeightValue;
        this.initPosX = initPosXValue;
        this.initPosY = initPosYValue;
        this.cellside = cellside;
        this.r = this.cellside * Math.sqrt(3) / 2;
        this.closeX = 1.50;
        this.closeY = 1.73;
        this.map;
        this.mapTile = {
                x: this.cellside,
                y: this.cellside,
                cir_R: this.cellside,
                in_r: this.r,
                side: this.cellside,
                cellnum: 1,
                isOccupied: false,
                state: {}
            },
            this.deckData = [],
            this.players = [],
            this.gameStatus = {
                playerTurn: 1,
                phase: 1,
            }


    }
    async deckGenerator() {
        let deck = [];
        let unitsData = await loadUnits()
        unitsData.forEach((unit, i) => {
            let card = new Card(unit)
            card.x = card.x * i * 1.4
            deck.push(card)
        })
        return deck
    }
    make() {
        this.start();
        let map = [];
        for (let j = this.initPosX; j < this.height + this.initPosX; j += 1) {
            for (let i = this.initPosY; i < this.width + this.initPosY; i += 1) {
                this.mapTile.x = this.mapTile.x * i * this.closeX;
                this.mapTile.y = i % 2 == 0 ? this.mapTile.y * j * this.closeY + this.mapTile.in_r * 2 : this.mapTile.y * j * this.closeY + this.mapTile.in_r;
                if (map.length <= this.height * this.width) {
                    if (map.length <= this.width * this.height - 1)
                        map.push({
                            ...this.mapTile
                        });
                }
                this.mapTile.x = this.cellside;
                this.mapTile.y = this.cellside;
                this.mapTile.cellnum++;
            }
        }

        this.mapTile.cellnum = 1;
        return map;
    }

    make2D() {
        let map = []
        let inner_map = [];
        for (let i = this.initPosY; i < this.width + this.initPosY; i += 1) {
            for (let j = this.initPosX; j < this.height + this.initPosX; j += 1) {
                this.mapTile.x = this.mapTile.x * j * this.closeX;
                this.mapTile.y = j % 2 == 0 ? this.mapTile.y * i * this.closeY + this.mapTile.in_r * 2 : this.mapTile.y * i * this.closeY + this.mapTile.in_r;
                inner_map.push({
                    ...this.mapTile
                });
                this.mapTile.x = this.cellside;
                this.mapTile.y = this.cellside;
                this.mapTile.cellnum++;
            }
            map.push(inner_map);
            inner_map = [];
        }

        this.mapTile.cellnum = 1;
        console.log(map)
        return map;
    }

    mapGenerator2D() {
        for (let i = 0; i < this.map.length; i++)
            for (let j = 0; j < this.map[i].length; j++) {
                this.map[i][j].isOccupied = levelData[i][j];
            }
    }



    OnWindowResize() {
        console.log("resize");
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
        context.drawImage(this.players[this.gameStatus.playerTurn - 1].deck[6].look, cell.x - cell.side, cell.y - cell.side, cell.side * 2, cell.side * 2);
    }

    async start(self) {
        console.log(self);
        this.deckData = await this.deckGenerator()
        canvas.setAttribute("width", canvasW)
        canvas.setAttribute("height", canvasH)
        this.players = [
            new Player({
                id: 1,
                name: "Lord",
                deck: this.deckData,
                hp: 100
            }),
            new Player({
                id: 2,
                name: "Worm",
                deck: this.deckData,
                hp: 100
            }),
        ]
        console.log(this.players);
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