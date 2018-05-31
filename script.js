    let canvas = document.getElementById("drawarea");
    let ctx = canvas.getContext("2d");
    let ctx2 = canvas.getContext("2d");



    let placeTankFlag = document.getElementById("tank");
    let placeSoilderFlag = document.getElementById("soilder");


    let passable = document.getElementById("pass");

    
    let map = [];

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
    let count = 1;
    
    function props() {

        map = [];
        cellside = parseInt(document.getElementById("cellsize1").value);
        board_width = Math.floor(parseInt(document.getElementById("borderwidth").value)/2)*2;
        board_height = parseInt(document.getElementById("borderheight").value);
        initPosX = Math.floor(parseInt(document.getElementById("initposX").value)/2)*2;
        initPosY = Math.floor(parseInt(document.getElementById("initposY").value)/2)*2;
        



    }

    let hexagon = {

        x: cellside,
        y: cellside,
        cir_R: cellside,
        in_r: r,
        side: cellside,
        cellnum : count

    }

  
    class Hexagon {
        
        

       constructor(hex){ 
        this.cellside = hex.side;   
        this.x=hex.x
        this.y=hex.y
        this.cir_R=hex.cir_R
        this.in_r=hex.in_r
        this.side=hex.side
        this.cellnum = hex.cellnum;
        this.isImpassable = false;
       }
       
   
           
        set_hex (hex1){

        this.x=hex1.x;
        this.y=hex1.y;  
        this.cellnum=hex1.cellnum;   

    }

        default(cellside){

        this.cellside = cellside;   
        this.r = this.cellside * Math.sqrt(3) / 2;
        this.x=this.cellside
        this.y=this.cellside
        this.cir_R=this.cellside
        this.in_r=this.r
        this.side=this.cellside
        this.ix=this.cellside;
        this.iy=this.r;
       

        }


       
    }
     

    class Unit extends Hexagon{

        constructor(pieces=[]){
        this.pieces = pieces;
        this.isGoto = false;
        this.isSelected = false;
    }
}
    class Tanks extends Unit{

        constructor(){

           super(); 
        }

    }
    
    

    let key = {

        a: 65,
        s: 83,
    }

    function check_console_log() {

        console.clear();
        console.log(map);
        

    }
    
    
    function drawMap() {
        
      
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let j = initPosX; j < board_height + initPosX; j += 1) {
            for (let i = initPosY; i < board_width + initPosY; i += 1) {
                    
                    hexagon.x=hexagon.x*i*closeX;
                    hexagon.y=i%2==0?hexagon.y * j * closeY + hexagon.in_r*2:hexagon.y * j * closeY + hexagon.in_r;
                    hexagon.cellnum=count++;
                    ctx.save();
                    ctx.strokeStyle = "rgba(100, 100, 100, 1)";
                    theDrawMap(new Hexagon(hexagon));
                    ctx.restore(); 
                    hexagon.x=15;
                    hexagon.y=15; 
                       
               
            }
        }
        
    }


    function theDrawMap(hex1) {
 
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(hex1.x, hex1.y);
        ctx.moveTo(hex1.x - hex1.cir_R, hex1.y)
        ctx.lineTo(hex1.x - hex1.side / 2, hex1.y - hex1.in_r)
        ctx.lineTo(hex1.x + hex1.side / 2, hex1.y - hex1.in_r)
        ctx.lineTo(hex1.x + hex1.cir_R, hex1.y);
        ctx.lineTo(hex1.x + hex1.side / 2 , hex1.y + hex1.in_r)
        ctx.lineTo(hex1.x - hex1.side / 2, hex1.y + hex1.in_r)
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        if (map.length < board_height * board_width) {
            map.push(hex1);  
        }
    }

    function fillHex(hex) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(hex.x, hex.y);
        ctx.moveTo(hex.x - hex.cir_R, hex.y)
        ctx.lineTo(hex.x - hex.cellside / 2, hex.y - hex.in_r)
        ctx.lineTo(hex.x + hex.cellside / 2, hex.y - hex.in_r)
        ctx.lineTo(hex.x + hex.cir_R, hex.y);
        ctx.lineTo(hex.x + hex.cellside / 2, hex.y + hex.in_r)
        ctx.lineTo(hex.x - hex.cellside / 2, hex.y + hex.in_r)
        ctx.closePath();
        // ctx.fillStyle = "rgba(50,100,200,0.64)"
        ctx.fill();
        ctx.restore();
        
    }

    function randomMap() {
        for (let i = 0; i < map.length; i++) 
            map[i].isImpassable = false;
        }

        for (let i = 0; i < map.length; i++) {
            let random = Math.floor(Math.random() * map.length + 1);
            if (i < board_width * 3){
                map[i].isImpassable = true
                fillHex(map[random])
            }
                
        }
       

    function checkMap() {
        for (let i = 0; i < map.length; i++) {
            if(map[i].isImpassable==true)
                fillHex(map[i]);
            if (hexhover(map[i])) {
                fillHex(map[i]);   
            }
            

        }

    }

    function place_unit(){

        placeSoilder();
        placeTank();

    }

    function placeSoilder(){

        if (hexClick(map[i]) && placeSoilderFlag.checked) {
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
    function placeTank() {
        for (let i = 0; i < map.length; i++) {
            if (hexhover(map[i]) && placeTankFlag.checked) {
                if (map[i].cellnum % 2 !== 0) {
                    fillHex(map[i]);
                    fillHex(map[i + board_width]);
                    fillHex(map[i - board_width]);
                    fillHex(map[i + board_width - 1]);
                    fillHex(map[i + board_width + 1]);
                    fillHex(map[i + 1]);
                    fillHex(map[i - 1]);
                    
                }
                if (map[i].cellnum % 2 == 0) {
                    fillHex(map[i]);
                    fillHex(map[i + board_width]);
                    fillHex(map[i - board_width]);
                    fillHex(map[i - board_width - 1]);
                    fillHex(map[i - board_width + 1]);
                    fillHex(map[i + 1]);
                    fillHex(map[i - 1]);
                   
                }


                if (hexClick(map[i])) {
                    if (map[i].cellnum % 2 == 0){
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


                    if (map[i].cellnum % 2 != 0){
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
        fps++
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
        place_unit();


    }

    window.addEventListener("load", function () {
        let canvasW = 1200;
        let canvasH = 600;
        document.getElementById("testarea").innerHTML = "Welcome To Rangers";
        document.getElementById("drawarea").setAttribute("width", canvasW);
        document.getElementById("drawarea").setAttribute("height", canvasH);

        setInterval(update, 1000 / fps);







    })
