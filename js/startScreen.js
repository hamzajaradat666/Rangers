let canvasW = CONFIGURATIONS.canvasW;
let canvasH = CONFIGURATIONS.canvasH;
 let StartScreen = [{
    title: "startButton",
    dx: 328/2,
    dy: 129/2,
    get sx() {
        return canvasW / 2 - this.dx / 2;
    },
    get sy() {
        return canvasH / 2 + this.dy * 2;
    },
    get idle() {
        let image = new Image()
        image.src = "./assets/startButton.png";
        return image
    },
    get clicked() {
        let image = new Image()
        image.src = "./assets/startButtonClicked.png";
        return image
    }
}, {
    title: "optionsButton",
    dx: 631/2,
    dy: 501/2,
    get sx() {
        return canvasW / 2 - this.dx / 2;
    },
    get sy() {
        return canvasH / 2 - this.dy / 2;
    },
    get idle() {
        let image = new Image()
        image.src = "./assets/logo.png";
        return image
    },
    get clicked() {
        let image = new Image()
        image.src = "./assets/logo.png";
        return image
    }
}]
export default StartScreen