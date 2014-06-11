var ctx,
    x = "black",
    y = 2,
    onMove,
    onUp,
    doPoint;

var canvas;

var last = null;

var actions = [];

var onDown ;

/*
 *  DRAW LINE
 */
var drawLine = function (e) {
    doPoint = true;
//    prevX = e.clientX - canvas.offset().left;
//    prevY = e.clientY - canvas.offset().top;
//    var c = document.getElementById("mainCanvas");
//    var ctx = c.getContext("2d");
//    ctx.beginPath();
//    ctx.strokeStyle = x;;

}
var moveLine = function (e) {
    doPoint = false;

    var current = new Point(e.clientX - canvas.offset().left, e.clientY - canvas.offset().top);

        var sequence = [
            {'function': 'moveTo', 'parameter': [last.x, last.y]}
            ,
            {'function': 'lineTo', 'parameter': [current.x, current.y]}
        ];

//        sequence = [
//            {'function': 'moveTo', 'parameter': [$.extend({}, last.x), $.extend({}, last.y)]}
//            ,
//            {'function': 'lineTo', 'parameter': [$.extend({}, current.x), $.extend({}, current.y)]}
//        ];

    actions[actions.length-1] = actions[actions.length-1].concat(sequence);

    last = current;

}
var stopLine = function (e) {

//    if (doPoint) {
//        currX = e.clientX - canvas.offset().left;
//        currY = e.clientY - canvas.offset().top;
//        ctx.beginPath();
//        ctx.fillStyle = x;
//        ctx.fillRect(currX, currY, 3, 3);
//        ctx.closePath();
//    }
}

/*
 * DRAW CIRCLE
 */
var drawCircle = function (e) {
//    doCircle = true;
//    prevX = e.clientX - canvas.offset().left;
//    prevY = e.clientY - canvas.offset().top;
//    var c = document.getElementById("mainCanvas");
//    var ctx = c.getContext("2d");
//    ctx.strokeStyle = x;
//    ctx.beginPath();


}


var stopCircle = function (e) {
//    if(doCircle){
//        var c=document.getElementById("circle");
//        var ctx=c.getContext("2d");
//        ctx.beginPath();
//        ctx.arc(prevX+50,prevY+50,40,0,2*Math.PI);
//        ctx.stroke();
//    }
}

/*
 * DRAW SQUARE
 */
var drawSquare = function (e) {
//    var c = document.getElementById("mainCanvas");
//    var ctx = c.getContext("2d");
//    if (flag) {
//        ctx.strokeStyle = x;
//        ctx.beginPath();
//        if (prevX > currX && prevY > currY)
//            ctx.rect(prevX, prevY, 0, 0);
//        else if (prevY > currY)
//            ctx.rect(prevX, prevY, (currX - prevX), 0);
//        if (prevX > currX)
//            ctx.rect(prevX, prevY, 0, (currY - prevY));
//        else
//            ctx.rect(prevX, prevY, (currX - prevX), (currY - prevY));
//
//        ctx.fillStyle = 'white';
//        ctx.fill();
//        ctx.lineWidth = 1;
//
//        //ctx.stroke();
//    }
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
    onMove = null;
    onUp = null;
}

/*
 * Draw square
 */
function square() {
    onDown = drawSquare;
    onMove = null;
    onUp = null;
}

/*
 * Draw line
 */
function line() {
    onDown = drawLine;
    onMove = moveLine;
    onUp = stopLine;
}

function draw(actions, context) {
    //setstrokestyle etc
    //console.log(JSON.stringify(actions));
    for (var i = 0; i < actions.length; ++i) {
        context.beginPath();
        for (var j = 0; j < actions[i].length; ++j) {
            var func = actions[i][j].function;
            var params = actions[i][j].parameter;
            context[func].apply(context, params);
        }
        context.stroke();
        context.closePath();
    }

}

var poppedActions = [];

$(function () {
    var $body = $(document.body);
    canvas = $('#mainCanvas');
    ctx = canvas[0].getContext("2d");

    line();

    $body.keypress(function (e) {
        if(!e.ctrlKey)
        return;

        if(26 == e.which && 0 != actions.length){

            poppedActions.push(actions.pop());
        }
        if(25 == e.which && 0 != poppedActions.length){

            actions.push(poppedActions.pop());
        }

        draw(actions,ctx);
//       console.log(e);
    });

    canvas.mousedown(function (e) {
        last = new Point(e.clientX - canvas.offset().left, e.clientY - canvas.offset().top);
        actions.push([]);

        if (onDown)
            onDown(e);
        draw(actions, ctx);
    });
    canvas.mousemove(function (e) {
        if (null == last)
            return;

        if (onMove)
            onMove(e);
        draw(actions, ctx);

    });
    canvas.mouseup(function (e) {
        if (onUp)
            onUp(e);
        last = null;
        draw(actions, ctx);
    });
    canvas.mouseout(function (e) {
        if (onUp)
            onUp(e);
        draw(actions, ctx);
    });

});