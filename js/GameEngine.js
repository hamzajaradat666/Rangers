import {
    loadUnits,
    loadTerrain
} from "./fetchData.js";
import Card from "./Card.js";
import Terrain from "./Terrain.js";
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
let initPosX = 2
let initPosY = 4/100;
let boardWidth = 30
let boardHeight = 5
let initPosXValue = initPosX
let initPosYValue = initPosY
let boardWidthValue = boardWidth
let boardHeightValue = boardHeight
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
        this.zoomValue = 1
        this.width = boardWidthValue;
        this.height = boardHeightValue;
        this.initPosX = initPosXValue;
        this.initPosY = initPosYValue;
        this.cellside = cellside;
        this.r = this.cellside * Math.sqrt(3) / 2;
        this.tippedCloseX = 0.866;
        this.tippedCloseY = 3;
        this.flatCloseX = 1.51;
        this.flatCloseY = 1.74;
        this.map;
        this.mapType = "flat"
        this.mapTile = {
                x: this.cellside,
                y: this.cellside,
                cir_R: this.cellside,
                in_r: this.r,
                side: this.cellside,
                cellnum: 1,
                isOccupied: false,
                state: {
                    type: "1",
                    owner: "0"
                }
            },
            this.deckData = [],
            this.players = [],
            this.terrainData = [],
            this.gameStatus = {
                playerTurn: 1,
                phase: 1,
            }
    }
    prepareMap = async () => {
        this.map = this.make2D(this.mapType);
        OnLoadingData = false
        setTimeout(() => {
            currentRenderScreen = "gameScreen"
        }, 100);
    }
    render = (renderScreen, fps) => {
        then = Date.now();
        renderScreen()
    }
    gameScreen = () => {
        fpsInterval = 1000 / fps;
        requestAnimationFrame(this.gameScreen)
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
                    this.gameLoginCheck()
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
    loadingScreen = () => {
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
    gameBar = () => {
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
                                let length = 5
                                for (let i = 1; i <= length; i += 1) {
                                    let tempCell = {
                                        x: sub.sx * i * 0.4 + sub.sx / 1.3,
                                        y: sub.sy + 60,
                                        side: sub.dx / 2
                                    }
                                    this.drawImage({
                                        card: {
                                            look: this.players[this.gameStatus.playerTurn - 1].deck[i].look,
                                            ...tempCell
                                        }
                                    })
                                    if (OnMouseDownInBox(tempCell.x - tempCell.side / 2, tempCell.y - tempCell.side / 2, tempCell.side, tempCell.side)) {
                                        this.players[this.gameStatus.playerTurn - 1].selectedCard = this.players[this.gameStatus.playerTurn - 1].deck[i]
                                        context.strokeRect(tempCell.x - tempCell.side, tempCell.y - tempCell.side, tempCell.side * 2, tempCell.side * 2);
                                    }
                                }
                                break;
                            case "deck":
                                context.fillText(sub.title, sub.valueSx, sub.valueSy);
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
                                let length = 5
                                for (let i = 1; i <= length; i += 1) {
                                    let tempCell = {
                                        x: sub.sx * i * 0.4 + sub.sx / 1.3,
                                        y: sub.sy + 60,
                                        side: sub.dx / 2
                                    }
                                    this.drawImage({
                                        card: {
                                            look: this.players[this.gameStatus.playerTurn - 1].deck[i].look,
                                            ...tempCell
                                        }
                                    })
                                }
                                break;
                            case "deck":
                                context.strokeRect(sub.sx, sub.sy, sub.dx, sub.dy);
                                context.fillText(sub.title, sub.valueSx, sub.valueSy);
                                break;
                        }
                    }
                })
            })
        })
    }
    gameLoginCheck = () => {

    }
    startScreen = () => {
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
    onZoom = () => {
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
    optionsScreen = () => {
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

    tippedHexDraw = (tile) => {
        context.save();
        context.strokeStyle = "rgba(34, 4, 50, 1)";
        context.fillStyle = "rgba(122, 120, 150, 1)";
        context.beginPath();
        context.moveTo(tile.x, tile.y);
        context.moveTo(tile.x, tile.y - tile.cir_R)
        context.lineTo(tile.x - tile.in_r, tile.y - tile.side / 2)
        context.lineTo(tile.x - tile.in_r, tile.y + tile.side / 2)
        context.lineTo(tile.x, tile.y + tile.cir_R);
        context.lineTo(tile.x + tile.in_r, tile.y + tile.side / 2)
        context.lineTo(tile.x + tile.in_r, tile.y - tile.side / 2)
        context.closePath();
        context.stroke();
        context.fillStyle = "red"
        context.font = "8px Arial";
        context.restore();
    }
    flatHexDraw = (tile) => {
        context.save();
        context.strokeStyle = "rgba(34, 4, 50, 1)";
        context.fillStyle = "rgba(122, 120, 150, 1)";
        context.beginPath();
        context.moveTo(tile.x, tile.y);
        context.moveTo(tile.x - tile.cir_R, tile.y)
        context.lineTo(tile.x - tile.side / 2, tile.y - tile.in_r)
        context.lineTo(tile.x + tile.side / 2, tile.y - tile.in_r)
        context.lineTo(tile.x + tile.cir_R, tile.y);
        context.lineTo(tile.x + tile.side / 2, tile.y + tile.in_r)
        context.lineTo(tile.x - tile.side / 2, tile.y + tile.in_r)
        context.closePath();
        context.stroke();
        context.restore();
    }


    mapDrawer2DVertical = () => {
        this.map.forEach((tileProps, i) => {
            tileProps.forEach((tile, j) => {
                switch (this.mapType) {
                    case "tipped":
                        this.tippedHexDraw(tile)
                        break;
                    case "flat":
                        this.flatHexDraw(tile)

                        break;
                }
                context.fillStyle = "red"
                context.font = "8px Arial";
                context.fillText(i + " - " + j, tile.x, tile.y);
                context.fillRect(0, 0, 10, 10);
                /* this.drawImage({
                    card: {look:this.terrainData[1].look,...tile}
                }); */
                if (OnMouseDownInBox(0, 0, 10, 10)) {
                    currentRenderScreen = "optionsScreen"
                }
                if (OnMouseHoverOverHex(tile) && OnMousePressed() && tile.isOccupied == false) {
                    tile.isOccupied = true;
                    tile.state = {
                        owner: this.players[this.gameStatus.playerTurn - 1],
                        look: this.players[this.gameStatus.playerTurn - 1].selectedCard.look
                    }
                    this.strokeHex(tile)
                } else if (OnMouseHoverOverHex(tile) && tile.isOccupied == true) {
                    this.strokeHex(tile)
                    if (OnMousePressed()) {
                        tile.isOccupied = false;
                        this.strokeHex(tile)
                    }
                }
                if (tile.isOccupied == true) {
                    this.strokeHex(tile)
                    this.drawImage({
                        card: {
                            ...tile.state,
                            ...tile
                        }
                    });
                }
            })
        })

    }
    cardsDrawer = () => {
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
    deckGenerator = async () => {
        let deck = [];
        let unitsData = await loadUnits()
        unitsData.forEach((unit, i) => {
            let card = new Card(unit)
            card.x = card.x * i * 1.4
            deck.push(card)
        })
        return deck
    }
    terrainGenerator = async () => {
        let terrain = [];
        let terrainData = await loadTerrain()
        console.log(terrainData);
        terrainData.forEach((terrainTile, i) => {
            let t = new Terrain(terrainTile)
            t.x = t.x * i * 1.4
            terrain.push(t)
        })
        return terrain
    }
    make2D = (mapType) => {
        let closeX;
        let closeY
        let yAxisMargin;
        switch (mapType) {
            case "tipped":
                closeX = this.tippedCloseX;
                closeY = this.tippedCloseY;
                yAxisMargin = 2.5;
            break;
            case "flat":
                closeX = this.flatCloseX;
                closeY = this.flatCloseY;
                yAxisMargin = 1.87;
            break;
        }
        let map = []
        let inner_map = [];
        for (let i = this.initPosX; i < this.width + this.initPosX; i += 1) {
            for (let j = this.initPosY; j < this.height + this.initPosY; j += 1) {
                this.mapTile.x = this.mapTile.x * i * closeX;
                this.mapTile.y = i % 2 == 0 ? this.mapTile.y * j * closeY + this.mapTile.cir_R * yAxisMargin : this.mapTile.y * j * closeY + this.mapTile.cir_R;
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

    mapGenerator2D = () => {
        for (let i = 0; i < this.map.length; i++)
            for (let j = 0; j < this.map[i].length; j++) {
                this.map[i][j].isOccupied = levelData[i][j];
            }
    }



    OnWindowResize = () => {
        console.log("resize");
    }


    fillHex = (cell) => {
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

    strokeHex = (cell) => {
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

    drawImage = (cell) => {
        context.drawImage(cell.card.look, cell.card.x - cell.card.side, cell.card.y - cell.card.side, cell.card.side * 2, cell.card.side * 2);
    }

    start = async (self) => {
        console.log(self);
        this.deckData = await this.deckGenerator()
        this.terrainData = await this.terrainGenerator()
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

    zoom = () => {
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