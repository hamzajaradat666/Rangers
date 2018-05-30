    let canvas = document.getElementById("drawarea");
    let ctx = canvas.getContext("2d");
    let ctx2 = canvas.getContext("2d");


    let passable = document.getElementById("pass");

    let fps = 30;
    let time = 0;
    let callOnce = true;

    let cellside = 15;
    let initPosX;
    let initPosY;
    let board_width;
    let board_height;
    let closeX = 1.53;
    let closeY = 1.76;
    let r = cellside * Math.sqrt(3) / 2;
    let ix = cellside;
    let iy = r;
    let cellNum = 1;



    let hexagon = {

        x: cellside,
        y: cellside,
        cir_R: cellside,
        in_r: r,
        side: cellside

    }
    let enemy = {

        hp: 100,


    }

    let key = {

        a: 65,
        s: 83,
    }

    let map = [];




    function props() {

        map = [];
        cellNum = 1;
        board_width = Math.floor(parseInt(document.getElementById("borderwidth").value)/2)*2;
        board_height = parseInt(document.getElementById("borderheight").value);
        initPosX = parseInt(document.getElementById("initposX").value);
        initPosY = parseInt(document.getElementById("initposY").value);
        cellside = parseInt(document.getElementById("cellsize1").value);



    }

    function check_console_log() {

        console.log(map);

    }

    function theDrawMap(x, y, cir_R, in_r, side) {

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.moveTo(x - cir_R, y)
        ctx.lineTo(x - side / 2, y - in_r)
        ctx.lineTo(x + side / 2, y - in_r)
        ctx.lineTo(x + cir_R, y);
        ctx.lineTo(x + side / 2 , y + in_r)
        ctx.lineTo(x - side / 2, y + in_r)
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        

        let hex = {
            dx: x,
            dy: y,
            R: cir_R,
            r: in_r,
            side: side,
            cellNum: cellNum,
            isSelected: false,
            isGoto: false,
            isImpassable: false,
        }

        if (map.length < board_height * board_width) {
            map.push(hex);
            cellNum++;
        }
    }


    function drawMap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let j = initPosX; j < board_height + initPosX; j += 1) {
            for (let i = initPosY; i < board_width + initPosY; i += 1) {
                if (i % 2 != 0) {
                    ctx.save();
                    ctx.strokeStyle = "rgba(200, 100, 100, 1)";
                    theDrawMap(hexagon.x * i * closeX, hexagon.y * j * closeY + hexagon.in_r, hexagon.cir_R, hexagon.in_r, hexagon.side);
                    ctx.restore();
                }
                if (i % 2 == 0) {
                    ctx.save();
                    ctx.strokeStyle = "rgba(100, 100, 200, 1)";
                    theDrawMap(hexagon.x * i * closeX, hexagon.y * j * closeY + hexagon.in_r + iy, hexagon.cir_R, hexagon.in_r, hexagon.side);
                    ctx.restore();
                }
            }
        }

    }

    function fillHex(hex) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(hex.dx, hex.dy);
        ctx.moveTo(hex.dx - hex.R, hex.dy)
        ctx.lineTo(hex.dx - hex.side / 2, hex.dy - hex.r)
        ctx.lineTo(hex.dx + hex.side / 2, hex.dy - hex.r)
        ctx.lineTo(hex.dx + hex.R, hex.dy);
        ctx.lineTo(hex.dx + hex.side / 2, hex.dy + r)
        ctx.lineTo(hex.dx - hex.side / 2, hex.dy + hex.r)
        ctx.closePath();
        ctx.fillStyle = "rgba(0,100,0,0.54)"
        ctx.fill();
        ctx.restore();
    }

    function strokeHex(hex) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(hex.dx, hex.dy);
        ctx.moveTo(hex.dx - hex.R, hex.dy)
        ctx.lineTo(hex.dx - hex.side / 2, hex.dy - hex.r)
        ctx.lineTo(hex.dx + hex.side / 2, hex.dy - hex.r)
        ctx.lineTo(hex.dx + hex.R, hex.dy);
        ctx.lineTo(hex.dx + hex.side / 2, hex.dy + r)
        ctx.lineTo(hex.dx - hex.side / 2, hex.dy + hex.r)
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

    }

    function randomMap() {
        for (let i = 0; i < map.length; i++) 
            map[i].isImpassable = false;
        }

        for (let i = 0; i < map.length; i++) {
            let random = Math.floor(Math.random() * 20 + 1);
            if (i < board_width * 3)
                map[i].isImpassable = true
        }

    function checkMap() {
        for (let i = 0; i < map.length; i++) {
            if (hexhover(map[i])) {
                fillHex(map[i]);
                if (hexClick(map[i]) && keys[key.a] == true) {
                    if (!map[i].isImpassable) {
                        console.log("Locked")
                        map[i].isImpassable = true;
                    } else {
                        console.log("Unlocked")
                        map[i].isImpassable = false;
                    }
                    md = false
                }
                
            }
            if (map[i].isImpassable == true) {
                fillHex(map[i])
                /*strokeHex(map[i])*/
            }

        }

    }
    function placeTank() {
        for (let i = 0; i < map.length; i++) {
            if (hexhover(map[i]) && keys[key.s]) {
                if (map[i].cellNum % 2 !== 0) {
                    fillHex(map[i]);
                    fillHex(map[i + board_width]);
                    fillHex(map[i - board_width]);
                    fillHex(map[i + board_width - 1]);
                    fillHex(map[i + board_width + 1]);
                    fillHex(map[i + 1]);
                    fillHex(map[i - 1]);
                    
                }
                if (map[i].cellNum % 2 == 0) {
                    fillHex(map[i]);
                    fillHex(map[i + board_width]);
                    fillHex(map[i - board_width]);
                    fillHex(map[i - board_width - 1]);
                    fillHex(map[i - board_width + 1]);
                    fillHex(map[i + 1]);
                    fillHex(map[i - 1]);
                   
                }
                if (hexClick(map[i]) && keys[key.s] == true) {
                    if (map[i].cellNum % 2 == 0){
                        if (!map[i].isImpassable) {
                            console.log("Tank Placed")
                            map[i].isImpassable = true;
                            map[i + board_width].isImpassable = true;
                            map[i - board_width].isImpassable = true;
                            map[i - board_width + 1].isImpassable = true;
                            map[i - board_width - 1].isImpassable = true;
                            map[i + 1].isImpassable = true;
                            map[i - 1].isImpassable = true;
                        }
                        else {
                            console.log("Tank Removed")
                            map[i].isImpassable = false;
                            map[i + board_width].isImpassable = false;
                            map[i - board_width].isImpassable = false;
                            map[i - board_width + 1].isImpassable = false;
                            map[i - board_width - 1].isImpassable = false;
                            map[i + 1].isImpassable = false;
                            map[i - 1].isImpassable = false;
    
                        }}


                    if (map[i].cellNum % 2 != 0){
                        if (!map[i].isImpassable) {
                            console.log("Tank Placed")
                            map[i].isImpassable = true;
                            map[i + board_width].isImpassable = true;
                            map[i - board_width].isImpassable = true;
                            map[i + board_width + 1].isImpassable = true;
                            map[i + board_width - 1].isImpassable = true;
                            map[i + 1].isImpassable = true;
                            map[i - 1].isImpassable = true;
                            console.log("hi")
                        }
                        else {
                            console.log("Tank Removed")
                            map[i].isImpassable = false;
                            map[i + board_width].isImpassable = false;
                            map[i - board_width].isImpassable = false;
                            map[i + board_width + 1].isImpassable = false;
                            map[i + board_width - 1].isImpassable = false;
                            map[i + 1].isImpassable = false;
                            map[i - 1].isImpassable = false;
    
                        }}
                    md = false
                }

            }

        }

    }

    function timer() {
        fps++;
        if (fps > 30) {
            time++;
            fps = 0;
        }
        if (time > 3600)
            time = 0;

    }

    function template(_let,cb=function(){}){
        cb();
    }

    function update() {
        timer();
        if(callOnce){props(); callOnce=false}
        template("Drawing Map", drawMap()) 
        checkMap();
        placeTank();


    }

    window.addEventListener("load", function () {
        let canvasW = 1200;
        let canvasH = 600;
        document.getElementById("testarea").innerHTML = "Welcome To Rangers";
        document.getElementById("drawarea").setAttribute("width", canvasW);
        document.getElementById("drawarea").setAttribute("height", canvasH);

        setInterval(update, 1000 / fps);







    })
