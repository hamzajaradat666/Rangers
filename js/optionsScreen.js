let screenWidth1 = window.outerWidth
let screenHeight1 = window.outerHeight - 200
let canvasW = screenWidth1;
let canvasH = screenHeight1;
let optionProps = {
    dx: 270,
    dy: 110,
    sx: 270,
    sy: 110,
}
let OptionsScreen = [
    [{
        ...optionProps,
        optionData: [{
                type: "button",
                title: "zoomin",
                dx: 25,
                dy: 50,
                sx: 235,
                sy: 50,
                fillStyle: "red"
            }, {
                type: "button",
                title: "zoomout",
                dx: 25,
                dy: 50,
                sx: 10,
                sy: 50,
                fillStyle: "yellow"
            }, {
                type: "button",
                title: "zoomValue",
                dx: 200,
                dy: 50,
                sx: 35,
                sy: 50,
                fillStyle: "blue"
            },
            {
                type: "text",
                title: "Zoom",
                sx: 10,
                sy: 35,
                fillStyle: "green"
            },
        ]
    }, ],
    [{
        ...optionProps,
        optionData: [{
                type: "button",
                title: "zoomin",
                dx: 25,
                dy: 50,
                sx: 235,
                sy: 50,
                fillStyle: "red"
            }, {
                type: "button",
                title: "zoomout",
                dx: 25,
                dy: 50,
                sx: 10,
                sy: 50,
                fillStyle: "yellow"
            }, {
                type: "button",
                title: "zoomValue",
                dx: 200,
                dy: 50,
                sx: 35,
                sy: 50,
                fillStyle: "blue"
            },
            {
                type: "text",
                title: "Zoom",
                sx: 10,
                sy: 35,
                fillStyle: "green"
            },
        ]
    }, ]
]
export default OptionsScreen