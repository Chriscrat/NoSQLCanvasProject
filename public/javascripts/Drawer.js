var ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0;

var x = "black",
    y = 2;

var canvas;
var onMove, onUp;

var onDown = function (e) {
    prevX = e.clientX - canvas.offset().left;
    prevY = e.clientY - canvas.offset().top;
};
var doPoint;
var drawLine = function (e) {
    doPoint = true;
    prevX = e.clientX - canvas.offset().left;
    prevY = e.clientY - canvas.offset().top;
    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");

    ctx.strokeStyle = x;
}

var drawSmile = function (e) {

    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    if (flag) {
        ctx.strokeStyle = x;
        ctx.arc(prevX + 50, prevY + 55, (currY - prevY) + (currX - prevX), 0, (currY - prevY) + (currX - prevX) * Math.PI, false); // Face
        ctx.moveTo(prevX + 75, prevY + 55);
        ctx.arc(prevX + 50, prevY + 55, (currY - prevY) + (currX - prevX), 0, Math.PI, false);   // mouth
        ctx.moveTo(prevX + 35, prevY + 45);
        ctx.arc(prevX + 30, prevY, (currY - prevY) + (currX - prevX), 0, (currY - prevY) + (currX - prevX) * Math.PI, false);  // Left eye
        ctx.moveTo(prevX + 75, prevY + 45);
        ctx.arc(prevX + 70, prevY + 45, (currY - prevY) + (currX - prevX), 0, (currY - prevY) + (currX - prevX) * Math.PI, false);  // Right eye
    }
}

var drawCircle = function (e) {
    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    if (flag) {
        ctx.strokeStyle = x;
        ctx.beginPath();
        ctx['arc'].apply(ctx, [prevX, prevY, (currY - prevY) + (currX - prevX), 0, (currY - prevY) + (currX - prevX) * Math.PI]);
        ctx.fillStyle = 'white';
    }
}

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

var moveLine = function (e) {

    if (!flag)
        return;

    doPoint = false;

    currX = e.clientX - canvas.offset().left;
    currY = e.clientY - canvas.offset().top;

    ctx.strokeStyle = x;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    // ctx.fillRect(currX, currY, 2, 2);
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
        ctx.fillRect(currX, currY, 1, 1);
        ctx.closePath();
    }
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
}

/*
 * Draw square
 */
function square() {
    onDown = drawSquare;
}

/*
 * Draw line
 */
function line() {
    onDown = drawLine;
    onMove = moveLine;
    onUp=stopLine;

}

/*
 * Draw smile
 */
function smile() {
    onDown = drawSmile;
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
        document.getElementById("xMove").innerHTML = "x : " + currX;
        document.getElementById("yMove").innerHTML = "y : " + currY;
    });

    canvas.mousedown(function (e) {
        flag = true;
        onDown(e);
        document.getElementById("xDown").innerHTML = "x : " + currX;
        document.getElementById("yDown").innerHTML = "y : " + currY;
    });


    canvas.mouseup(function (e) {
        flag = false;
        onUp(e);
        document.getElementById("xUp").innerHTML = "x : " + currX;
        document.getElementById("yUp").innerHTML = "y : " + currY;
    });

    canvas.mouseout(function (e) {
        flag = false;
    });
});