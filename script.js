    var cellside = 100;
    var initPosX = 1;
    var initPosY = 1;
    var board_width = initPosX + 12;
    var board_height = initPosY + 12;
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


        board_width = parseInt(document.getElementById("borderwidth").value);
        board_height = parseInt(document.getElementById("borderheight").value);
        initPosX = parseInt(document.getElementById("initposX").value);
        initPosY = parseInt(document.getElementById("initposY").value);
        cellside = parseInt(document.getElementById("cell").value);



    }


    window.addEventListener("load", function () {

        setInterval(update, 1000 / 30);




    })

    function update() {




        var canvas = document.getElementById("drawarea");
        var ctx = canvas.getContext("2d");
        var ctx2 = canvas.getContext("2d");

        document.getElementById("testarea").innerHTML = "i can access that";
        document.getElementById("drawarea").setAttribute("width", "1200")
        document.getElementById("drawarea").setAttribute("height", "600")


        function drawMap(x, y, cir_R, in_r, side) {

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
                hexside: side,

            }

            map.push(hex)



        }

        function hoverhex() {


        }





        for (var i = initPosX; i < board_width + initPosX; i += 1) {

            for (var j = initPosY; j < board_height + initPosY; j += 1) {


                if (i % 2 != 0) {
                    ctx.save();

                    ctx.strokeStyle = "rgba(200, 100, 100, 1)";

                    drawMap(hexagon.x * i * closeX, hexagon.y * j * closeY + hexagon.in_r, hexagon.cir_R, hexagon.in_r, hexagon.side);

                    ctx.restore();

                }
                if (i % 2 == 0) {
                    ctx.save();
                    ctx.strokeStyle = "rgba(100, 100, 200, 1)";

                    drawMap(hexagon.x * i * closeX, hexagon.y * j * closeY + hexagon.in_r + iy, hexagon.cir_R, hexagon.in_r, hexagon.side);

                    ctx.restore();

                }
            }
        }



    }


    /* // angle in radians
        var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        // angle in degrees
        var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        
        console.log(Math.atan2(p2.y - p1.y, p2.x - p1.x))
*/
