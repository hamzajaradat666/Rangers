let screenWidth1 = window.outerWidth
let screenHeight1 = window.outerHeight - 200
let canvasW = screenWidth1;
let canvasH = screenHeight1;
 let StartScreen = [{
    title: "startButton",
    dx: 328,
    dy: 129,
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
    title: "logo",
    dx: 631,
    dy: 501,
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
    }
}]
export default StartScreen