window.addEventListener("load", function () {

    var canvas = document.getElementById("drawarea");
    var ctx = canvas.getContext("2d");

    document.getElementById("testarea").innerHTML = "i can access that";
    document.getElementById("drawarea").setAttribute("width","1200")
    document.getElementById("drawarea").setAttribute("height","600")
    
    var cellside = 25;
    var board_width = 12;
    var board_height = 12;
    
    var closeX = 1.53;
    var closeY = 1.76;
    
    var r = cellside*Math.sqrt(3)/2;
    var  ix=cellside;
    var  iy=r;
    
    
    
    var hexagon = {
        x:cellside,
        y:cellside,
        cir_R : cellside,
        in_r : r,
        side : cellside
         
    }
    
    var map = [];

    
    
    
    function dh2(x,y,cir_R,in_r,side){
              
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.moveTo(x - cir_R , y)
                ctx.lineTo(x - side/2 , y - in_r)
                ctx.lineTo(x + side/2, y - in_r)
                ctx.lineTo(x + cir_R , y);
                ctx.lineTo(x + side/2 , y + in_r)
                ctx.lineTo(x - side/2 , y + in_r)
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
        
                ctx.save();
                ctx.beginPath();
                ctx.arc(x,y,in_r,0,2*Math.PI);
                ctx.strokeStyle = "rgba(32, 45, 21, 0.3)";
                ctx.stroke();
                ctx.restore();
        
        let hex = {
        
            dx:x,
            dy:y,
            R:cir_R,
            r:in_r,
            hexside:side,
            
        }
        
        map.push(hex)
        console.log(map)
                
                
 }
    
    
    
   
       
    for(var i=1; i<board_width;i+=1){
               
        for(var j=1; j<board_height;j+=1){
            
              
            if(i%2!=0){
                ctx.save();
                
                ctx.strokeStyle = "rgba(32, 145, 21, 1)";
                
               dh2(hexagon.x*i*closeX, hexagon.y*j*closeY+hexagon.in_r, hexagon.cir_R,hexagon.in_r, hexagon.side);
                
                ctx.restore();
                
                }
            if(i%2==0){
                ctx.save();
                ctx.strokeStyle = "rgba(132, 45, 21, 1)";
                
                dh2(hexagon.x*i*closeX, hexagon.y*j*closeY+hexagon.in_r+iy, hexagon.cir_R,hexagon.in_r, hexagon.side);
                
                ctx.restore();
                
            }
      }   
}
//---------------------------------------------------------------//
    
    

    
    
    
    
    

})


       /* // angle in radians
        var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        // angle in degrees
        var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        
        console.log(Math.atan2(p2.y - p1.y, p2.x - p1.x))
*/