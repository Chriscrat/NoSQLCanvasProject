var ctx,
    flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    x = "black",
    y = 2,
    onMove,
    onUp,
    doPoint,
    doSquare,
    doCircle;

var onDown = function (e) {
    prevX = e.clientX - canvas.offset().left;
    prevY = e.clientY - canvas.offset().top;
};

/*
 *  DRAW LINE
 */
var drawLine = function (e) {
    doPoint = true;
    prevX = e.clientX - canvas.offset().left;
    prevY = e.clientY - canvas.offset().top;
    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = x;
}
var moveLine = function (e) {

    if (!flag)
        return;

    doPoint = false;

    currX = e.clientX - canvas.offset().left;
    currY = e.clientY - canvas.offset().top;
    ctx.strokeStyle = x;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    prevX = currX;
    prevY = currY;

}
var stopLine = function (e) {

    if (doPoint) {
        currX = e.clientX - canvas.offset().left;
        currY = e.clientY - canvas.offset().top;
        ctx.beginPath();
        ctx.fillStyle = x;
        ctx.fillRect(currX, currY, 3, 3);
        ctx.closePath();
    }
}

/*
 * DRAW CIRCLE
 */
var drawCircle = function (e) {
    doCircle = true;
    prevX = e.clientX - canvas.offset().left;
    prevY = e.clientY - canvas.offset().top;
    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    ctx.strokeStyle = x;
    ctx.beginPath();


}
var redimCircle = function(e){
    ctx['arc'].apply(ctx, [prevX, prevY, (currY - prevY) + (currX - prevX), 0, (currY - prevY) + (currX - prevX) * Math.PI]);
    ctx.fillStyle = 'white';
    ctx.stroke();
}

var stopCircle = function(e){
    if(doCircle){
        var c=document.getElementById("circle");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.arc(prevX+50,prevY+50,40,0,2*Math.PI);
        ctx.stroke();
    }
}

/*
 * DRAW SQUARE
 */
var drawSquare = function (e) {
    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    if (flag) {
        ctx.strokeStyle = x;
        ctx.beginPath();
        if (prevX > currX && prevY > currY)
            ctx.rect(prevX, prevY, 0, 0);
        else if (prevY > currY)
            ctx.rect(prevX, prevY, (currX - prevX), 0);
        if (prevX > currX)
            ctx.rect(prevX, prevY, 0, (currY - prevY));
        else
            ctx.rect(prevX, prevY, (currX - prevX), (currY - prevY));

        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;

        //ctx.stroke();
    }
}
var redimSquare = function(e){

}
var stopSquare = function (e) {
}

/*
 * Clear main canvas
 */
function erase() {
    var m = confirm("Erase current canvas ?");
    var c = document.getElementById("mainCanvas");

    if (m) {
        c.width = c.width;
    }
}

/*
 * Change cursor color
 */
function color(obj) {
    switch (obj.id) {
        case "green":
            x = "green";
            break;
        case "blue":
            x = "blue";
            break;
        case "red":
            x = "red";
            break;
        case "yellow":
            x = "yellow";
            break;
        case "orange":
            x = "orange";
            break;
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
    }
    if (x == "white") y = 14;
    else y = 2;
}

/*
 * Draw circle
 */
function circle() {
    onDown = drawCircle;
    onMove = redimCircle;
    onUp = stopCircle;
}

/*
 * Draw square
 */
function square() {
    onDown = drawSquare;
    onMove = redimSquare;
    onUp = stopSquare;
}

/*
 * Draw line
 */
function line() {
    onDown = drawLine;
    onMove = moveLine;
    onUp = stopLine;
}

$(function () {

    $body = $(document.body);
    canvas = $('#mainCanvas');
    ctx = canvas[0].getContext("2d");
    w = canvas.width;
    h = canvas.height;
    line();

    canvas.mousemove(function (e) {
        onMove(e);

    });
    canvas.mousedown(function (e) {
        flag = true;
        onDown(e);
    });
    canvas.mouseup(function (e) {
        flag = false;
        onUp(e);
    });
    canvas.mouseout(function (e) {
        flag = false;
    });
});