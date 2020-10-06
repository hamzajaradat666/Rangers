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
let cellside = canvasW / 35;
let initPosX = Math.floor(canvasW / 250)
let initPosY = 4 / 100;
let boardWidth = 11
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
let defaultState = {
    type: "1",
    owner: {},
    look: "",
}

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
                owner: {},
                look: "",
            }
        },
            this.deckData = [],
            this.drawCards = []
            this.players = [],
            this.terrainData = [],
            this.gameStatus = {
                playerTurn: 1,
                phase: 1,
            }
        this.activePlayer;
    }
    prepareMap = async () => {
        let p1 = this.players[0]
        let p2 = this.players[1]
        this.map = this.make2D(this.mapType);
        console.log(this.map);
        this.map.forEach(row => {
            row.forEach(tile => {
                if (tile.cellnum == Math.ceil(row.length / 2)) {
                    console.log(tile.cellnum, Math.ceil(row.length / 2), this.map.length * row.length - Math.floor(row.length / 2));
                    p1.selectedCard = p1.deck[0]
                    tile.state.look = p1.selectedCard.look
                    tile.state.owner = p1.name
                    tile.state.type = 3
                    tile.isOccupied = true
                }
                if (tile.cellnum == this.map.length * row.length - Math.floor(row.length / 2)) {
                    console.log(tile.cellnum, Math.ceil(row.length / 2), this.map.length * row.length - Math.floor(row.length / 2));
                    p2.selectedCard = p2.deck[0]
                    tile.state.look = p2.selectedCard.look
                    tile.state.owner = p2.name
                    tile.state.type = 3
                    tile.isOccupied = true
                }
            })
        })
        OnLoadingData = false
        setTimeout(() => {
            currentRenderScreen = "gameScreen"
        }, 0);
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
                    this.gameLogicCheck()
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
                context.save();
                context.fillStyle = '#423c6d';
                context.fillRect(sections.sx, sections.sy, sections.dx, sections.dy);
                context.restore();
                sections.subSections.forEach(sub => {
                    switch (sections.title) {
                        case "status":
                            this.PlayerStatus(sub)
                            break;
                        case "cards":
                            this.Cards(sub, OnMouseDownInBox(sections.sx, sections.sy, sections.dx, sections.dy))
                            break;
                        case "deck":
                            this.Deck(sub, OnMouseDownInBox(sections.sx, sections.sy, sections.dx, sections.dy))
                            break;
                    }
                })
            })
        })
    }
    gameLogicCheck = () => {

    }
    PlayerStatus = (sub) => {
        context.save();
        context.fillText(sub.title, sub.sx, sub.sy);
        switch (sub.title) {
            case "playerHP":
                context.fillText(this.activePlayer.hp, sub.valueSx, sub.valueSy);
                break;
            case "playerName":
                context.fillText(this.activePlayer.name, sub.valueSx, sub.valueSy);
                break;
            case "playerTurn":
                context.fillText(this.activePlayer.id, sub.valueSx, sub.valueSy);
                break;
        }
        context.restore();
        context.fillStyle = this.activePlayer.color;

    }
    Cards = (sub, click) => {
        context.save();
        context.fillStyle = "red"
        let count = -1;
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 10; j++) {
                count++
                let tempCell = {
                    x: sub.sx * j / 5 + sub.sx / 1.16,
                    y: sub.sy + i * sub.dy / 3 - 30,
                    side: sub.dx / 5
                }
                this.drawImage({
                    card: {
                        look: this.activePlayer.deck[count].look,
                        ...tempCell
                    }
                })
                if (click) {
                    if (OnMouseDownInBox(tempCell.x - tempCell.side / 2, tempCell.y - tempCell.side / 2, tempCell.side, tempCell.side)) {
                        this.activePlayer.selectedCard = this.activePlayer.deck[count]
                        console.log(this.activePlayer.selectedCard);
                        context.fillRect(tempCell.x - tempCell.side, tempCell.y - tempCell.side, tempCell.side * 2, tempCell.side * 2);
                    }
                }
                else {

                }
            }
            context.restore();
        }
    }
    Deck = (sub, click) => {
        context.save();
        context.save();
        context.fillStyle = this.activePlayer.color;
        context.fillText(sub.title, sub.valueSx, sub.valueSy);
        context.strokeRect(sub.sx, sub.sy, sub.dx, sub.dy);
        context.restore();
        if (click) {
            if (OnMouseDownInBox(sub.sx, sub.sy, sub.dx, sub.dy)) {
                if (this.gameStatus.playerTurn == 1) {
                    this.gameStatus.playerTurn = 2
                }
                else this.gameStatus.playerTurn = 1
                this.activePlayer = this.players[this.gameStatus.playerTurn - 1]
            }
        }
        else {

        }
        context.restore();
    }
    startScreen = () => {
        context.clearRect(0, 0, canvasW, canvasH);
        StartScreen.forEach((ele) => {
            if (OnMouseDownInBox(ele.sx, ele.sy, ele.dx, ele.dy)) {
                context.drawImage(ele.clicked, ele.sx, ele.sy, ele.dx, ele.dy);
                if (OnMousePressed())
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
                    col.x -= zoom * 12;
                }
                if (zoom < latestValue) {
                    col.side /= latestValue
                    col.cir_R /= latestValue
                    col.in_r /= latestValue;
                    col.x /= latestValue;
                    col.y /= latestValue;
                    col.x += zoom * 12;
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
                        if (OnMousePressed()) {
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
        context.globalAlpha = 0.6;
        context.strokeStyle = "rgba(34, 4, 50, 1)";
        context.fillStyle = "white";
        context.beginPath();
        context.moveTo(tile.x, tile.y);
        context.moveTo(tile.x, tile.y - tile.cir_R)
        context.lineTo(tile.x - tile.in_r, tile.y - tile.side / 2)
        context.lineTo(tile.x - tile.in_r, tile.y + tile.side / 2)
        context.lineTo(tile.x, tile.y + tile.cir_R);
        context.lineTo(tile.x + tile.in_r, tile.y + tile.side / 2)
        context.lineTo(tile.x + tile.in_r, tile.y - tile.side / 2)
        context.closePath();
        context.fill();
        context.fillStyle = "red"
        context.font = "8px Arial";
        context.restore();
    }
    flatHexDraw = (tile) => {
        context.save();
        context.globalAlpha = 0.6;
        context.strokeStyle = "rgba(34, 4, 50, 1)";
        context.fillStyle = "white";
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
        context.restore();
    }

    grayScale(context, canvas) {
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imgData.data;
        for (var i = 0, n = pixels.length; i < n; i += 4) {
            var grayscale = pixels[i] * .3 + pixels[i + 1] * .59 + pixels[i + 2] * .11;
            pixels[i] = grayscale; // red
            pixels[i + 1] = grayscale; // green
            pixels[i + 2] = grayscale; // blue
            //pixels[i+3]              is alpha
        }
        //redraw the image in black & white
        context.putImageData(imgData, 0, 0);
    }
    //add the function call in the imageObj.onload
    mapDrawer2DVertical = () => {
        let img = new Image()
        img.src = "../assets/bg2.jpg";
        context.save();
        context.globalAlpha = 0.5;
        /* context.drawImage(img, 0, 0, canvasW, canvasH); */
        /* this.grayScale(context, canvas); */
        context.restore();
        this.map.forEach((tileProps, j) => {
            tileProps.forEach((tile, i) => {
                switch (this.mapType) {
                    case "tipped":
                        this.tippedHexDraw(tile)
                        break;
                    case "flat":
                        this.flatHexDraw(tile)
                        break;
                }
                context.fillRect(0, 0, 10, 10);
                this.drawImage({
                    card: { look: this.terrainData[0].look, ...tile }
                });
                if (OnMouseDownInBox(0, 0, 10, 10)) {
                    currentRenderScreen = "optionsScreen"
                }
                if (tile.isOccupied == true) {
                    if (OnMouseHoverOverHex(tile)) {
                        if (OnMousePressed()) {
                            if (tile.state.type == 3)
                                return
                            else {
                                tile.isOccupied = false
                                tile.state = { ...defaultState }
                            }
                        }
                    }
                    this.strokeHex(tile)
                    this.drawImage({
                        card: {
                            ...tile.state,
                            ...tile
                        }
                    });
                }
                else {
                    context.save()
                    context.fillStyle = "red"
                    context.font = "8px Arial";
                    context.fillText(tile.cellnum, tile.x, tile.y);
                    context.restore()
                    if (OnMouseHoverOverHex(tile)) {
                        if (OnMousePressed()) {
                            tile.state = {
                                owner: this.activePlayer,
                                look: this.activePlayer.selectedCard.look
                            }

                            this.strokeHex(tile)
                            tile.isOccupied = true;
                        }
                    }
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
        let I = this.initPosX;
        let J = this.initPosY;
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
        for (let i = I; i < this.width + I; i += 1) {
            for (let j = J; j < this.height + J; j += 1) {
                this.mapTile.x = this.mapTile.x * i * closeX;
                this.mapTile.y = i % 2 == 0 ? this.mapTile.y * j * closeY + this.mapTile.cir_R * yAxisMargin : this.mapTile.y * j * closeY + this.mapTile.cir_R;
                inner_map.push({
                    ...this.mapTile,
                    state: { ...this.mapTile.state }
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
        context.strokeStyle = cell.state.owner.color;
        context.beginPath();
        context.moveTo(cell.x, cell.y);
        context.moveTo(cell.x - cell.cir_R, cell.y)
        context.lineTo(cell.x - cell.side / 2, cell.y - cell.in_r)
        context.lineTo(cell.x + cell.side / 2, cell.y - cell.in_r)
        context.lineTo(cell.x + cell.cir_R, cell.y);
        context.lineTo(cell.x + cell.side / 2, cell.y + cell.in_r)
        context.lineTo(cell.x - cell.side / 2, cell.y + cell.in_r)
        context.closePath();
        context.fillStyle = cell.state.owner.color;
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
        context.strokeStyle = cell.state.owner.color;
        context.stroke();
        context.restore();
    }

    drawImage = (cell) => {
        context.drawImage(cell.card.look, cell.card.x - cell.card.side, cell.card.y - cell.card.side, cell.card.side * 2, cell.card.side * 2);
    }
    prepareDeck = (deckData, name="") => {
        console.log(name);
        let tempDeck = []
        for (let i = 1; i <= 30; i++) {
            let card = deckData[Math.floor(Math.random() * 10)];
            if(name!=""){
                card["id"] = i;
                card["owner"] = name;
            }
            tempDeck.push(card);
        }
        return tempDeck
    }
    start = async (self) => {
        console.log(self);
        this.deckData = await this.deckGenerator()
        this.terrainData = await this.terrainGenerator()
        this.drawCards = this.prepareDeck(this.deckData)
        canvas.setAttribute("width", canvasW)
        canvas.setAttribute("height", canvasH)
        this.players = [
            new Player({
                id: 1,
                get name() { return "Lord" },
                deck: [...this.prepareDeck(this.deckData, "Lord")],
                hp: 100,
                color: "darkblue"
            }),
            new Player({
                id: 2,
                get name() { return "Worm" },
                deck: [...this.prepareDeck(this.deckData, "Worm")],
                hp: 100,
                color: "darkred"
            }),
        ]
        this.activePlayer = this.players[this.gameStatus.playerTurn - 1]
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