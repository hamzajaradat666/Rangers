    var canvas = document.getElementById("drawarea");
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas.getContext("2d");


    var passable = document.getElementById("pass");

    var fps = 30;
    var time = 0;
    var callOnce = false;

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
    var cellNum = 1;

    var hexagon = {
        
        x: cellside,
        y: cellside,
        cir_R: cellside,
        in_r: r,
        side: cellside

    }
     var enemy = {
        
         hp : 100,
         

    }
     
     var key = {
         
         a:65
     }
    
    var map = [];
    



function props() {

        map = [];
        cellNum = 1;
        board_width = parseInt(document.getElementById("borderwidth").value);
        board_height = parseInt(document.getElementById("borderheight").value);
        initPosX = parseInt(document.getElementById("initposX").value);
        initPosY = parseInt(document.getElementById("initposY").value);
        cellside = parseInt(document.getElementById("cellsize1").value);



    }
function check_console_log(){
    
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
            ctx.lineTo(x + side / 2, y + in_r)
            ctx.lineTo(x - side / 2, y + in_r)
            ctx.closePath();
            ctx.stroke();
            ctx.restore();

            /*ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, in_r, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(255, 0, 235, 0.3)";
            ctx.stroke();
            ctx.restore();*/
            
            let hex = {

                dx: x,
                dy: y,
                R: cir_R,
                r: in_r,
                side: side,
                cellNum: cellNum,
                isSelected:false,
                isGoto:false,
                isImpassable:false,
                
                
                

            }

        if(map.length<board_height*board_width){  
                map.push(hex);
                cellNum++;
                
        
        }
    }


function drawMap(){
    
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    for (var j = initPosX; j < board_height + initPosX; j += 1) {
        
            for (var i = initPosY; i < board_width + initPosY; i+= 1) {
                
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

function randomMap(){
    
    for(var i=0; i<map.length;i++){
    
         map[i].isImpassable = false;
         
     }
    
    
    for(var i=0; i<map.length;i++){
        
         var random = Math.floor(Math.random() * 20 + 1);
    
        if(i < board_width*3)
         map[i].isImpassable = true
         
     }
    
    
}

function checkMap(){
    
    fps++;
    if(fps>30){
        time++;
        fps=0;
    }
    if(time>3600)
        time=0;
    
    for(var i=0; i<map.length;i++){
        
    if(hexhover(map[i])){
        fillHex(map[i]);  
    }
        
    if(hexhover(map[i]) && hexClick(map[i])&& keys[key.a]==true){
        
        if(!map[i].isImpassable){
            console.log("Locked")
            map[i].isImpassable=true;
       }
        
        else{
            console.log("Unlocked")
            map[i].isImpassable=false;
       
        }
        
    md=false}
        
    if(map[i].isImpassable==true){
        
        fillHex(map[i])
        strokeHex(map[i])
    }
        
    
}
    
    
    
}
function update() {
       drawMap();
       checkMap();
    

    }

window.addEventListener("load", function () {
     
        
     
     
        document.getElementById("testarea").innerHTML = "Welcome To Rangers";
        document.getElementById("drawarea").setAttribute("width", "1200");
        document.getElementById("drawarea").setAttribute("height", "600");
        
     
        
        setInterval(update, 1000 / fps);
    

    

         


})