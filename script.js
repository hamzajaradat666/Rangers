window.addEventListener("load", function () {

    var canvas = document.getElementById("drawarea");
    var ctx = canvas.getContext("2d");

    document.getElementById("testarea").innerHTML = "i can access that";
    
    

    
    
    
    var cellside = 30 ;
    
    var r = cellside*Math.sqrt(3)/2;
    
    var  ix=cellside , iy=r;
    
    var board_width = 12;
    var board_height = 14;
    
    var hexagon = {
        x:cellside*2,
        y:cellside*2,
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
        
                ctx.beginPath();
                ctx.arc(x,y,in_r,0,2*Math.PI);
                ctx.strokeStyle = "darkgreen"
                ctx.stroke();
        
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
               dh2(hexagon.x*i, hexagon.y*j+hexagon.in_r, hexagon.cir_R,hexagon.in_r, hexagon.side);
                ctx.strokeStyle ="red"
                }
            if(i%2==0){
               dh2(hexagon.x*i, hexagon.y*j+hexagon.in_r+iy, hexagon.cir_R,hexagon.in_r, hexagon.side);
                ctx.strokeStyle ="blue"
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