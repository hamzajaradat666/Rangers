    var canvas = document.getElementById("drawarea");
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas.getContext("2d");

    
    var cellside = 20;
    var initPosX = 1;
    var initPosY = 1;
    var board_width = initPosX + 3;
    var board_height = initPosY + 3;
    var closeX = 1.53;
    var closeY = 1.76;
    var r = cellside * Math.sqrt(3) / 2;
    var ix = cellside;
    var iy = r;

    var hexagon = {
        
        x: cellside,
        y: cellside,
        cir_R: cellside,
        in_r: r,
        side: cellside

    }
    
    var map = [];



function props() {

        map = [];
        board_width = parseInt(document.getElementById("borderwidth").value);
        board_height = parseInt(document.getElementById("borderheight").value);
        initPosX = parseInt(document.getElementById("initposX").value);
        initPosY = parseInt(document.getElementById("initposY").value);
        cellside = parseInt(document.getElementById("cellsize1").value);



    }

function theDrawMap(x, y, cir_R, in_r, side) {

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.moveTo(x - cir_R, y)
            ctx.lineTo(x - side / 2, y - in_r)
            ctx.lineTo(x + side / 2, y - in_r)
            ctx.lineTo(x + cir_R, y);
            ctx.lineTo(x + side / 2, y + in_r)
            ctx.lineTo(x - side / 2, y + in_r)
            ctx.closePath();
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, in_r, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(0, 255, 0, 0.3)";
            ctx.stroke();
            ctx.restore();

            let hex = {

                dx: x,
                dy: y,
                R: cir_R,
                r: in_r,
                side: side,

            }

        if(map.length<board_height*board_width){  
                map.push(hex);
                console.log(map)
        
        }
    }


function drawMap(){
    
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (var i = initPosX; i < board_width + initPosX; i += 1) {
            for (var j = initPosY; j < board_height + initPosY; j += 1) {
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
function fillHex(hex){
            
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
            ctx.fillStyle = "rgba(200,0,0,0.3)"
            ctx.fill();
            ctx.restore();
    
}
function strokeHex(hex){
            
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

function attatchObject(hex){
    console.log("check")
    fillHex(hex);
    
}

function clickHex(){
    
    for(var i=0; i<map.length;i++){
        
    if(hexhover(map[i])){
        fillHex(map[i]);  
    }
        
    if(hexhover(map[i])==true&& hexClick(map[i])==true){
        
        attatchObject(map[i]);
        
    }
        
    
}
    
}
function update() {
       drawMap();
       clickHex();

    }

window.addEventListener("load", function () {
     
        
     
     
        document.getElementById("testarea").innerHTML = "i can access that";
        document.getElementById("drawarea").setAttribute("width", "1200")
        document.getElementById("drawarea").setAttribute("height", "600") 
     
        
        setInterval(update, 1000 / 30);

    

         


})