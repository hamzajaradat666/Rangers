var mx, my, md = false;

var keys = [];

document.addEventListener('mousedown', function (e) {
    md = true;
    
}, false);

document.addEventListener('mouseup', function (e) {
    md = false;
}, false);


document.addEventListener('mousemove', function (e) {

    mx = e.offsetX;
    my = e.offsetY;

}, false);
//-- --------------------------------------------------------------------------------------

function OnMouseDownInBox(x, y, width, height) {
    if (mx >= x && mx <= x + width && my >= y && my <= y + height && md) {
        console.log("OnMouseDownInBox");
        simulateClick();
        return true;

    }

    return false;
}

function OnMouseHoverOverHex(hex) {
    var dx = hex.x - mx;
    var dy = hex.y - my;

    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < hex.in_r) {
        // console.log(mx,my)
        return true;
    }

}

function simulateClick(){
    let X = setTimeout(() => {
        md = false
        clearTimeout(X);
    }, 0.1);
}

function OnMousePressed() {
    if (md == true) {
        console.log("OnMousePressed");
        simulateClick();
        return true;
    } else return false

}

//----------------------------------------------------------------------------------------
function rectCollision(x, y, w, h, x2, y2, w2, h2) {

    if (x < x2 + w2 ||
        x + w > x2 ||
        y < y2 + h2 ||
        h + y > y2) {
        return true
    }

    return false
}

function rectCollisionObj(rect1, rect2) {

    if (rect1.dx < rect2.x + rect2.width &&
        rect1.dx + rect1.dwidth > rect2.x &&
        rect1.dy < rect2.y + rect2.height &&
        rect1.dheight + rect1.dy > rect2.y) {
        return true
    }

    return false
}
//----------------------------------------------------------------------------------------
function circleCollision(circle1, circle2) {

    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.radius + circle2.radius) {
        return true;
    }

}

//----------------------------------------------------------------------------------------

document.addEventListener('keydown', function (e) {

    keys[e.keyCode] = true;


});

document.addEventListener('keyup', function (e) {

    keys[e.keyCode] = false;


});