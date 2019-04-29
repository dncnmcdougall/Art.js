/* eslint-env browser*/
/* global Vector, Line*/

var maxPos = Vector.toVec( 650, 650);
var forward = true;
var symmetric = true;

var increment = 0.002;
var n = 80;
var width = 6;
var xInc = maxPos.x/n;
var yInc = maxPos.y/n;

var canvas = document.getElementById('canvas');
canvas.width = maxPos.x;
canvas.height = maxPos.y;
var ctx = canvas.getContext('2d');
var interval = 40;


var borderColour = '#FF0000'
var colours = [
'#FF007F',
'#FF00FF',
'#7F00FF',
'#0000FF',
'#007FFF',
'#00FFFF',
'#00FF7F',
'#00FF00',
'#7FFF00',
'#FFFF00',
'#FF7F00'
];


let corners = [];

corners.push( Vector.toVec(0.4*maxPos.x,0));
corners.push( Vector.toVec(0.6*maxPos.x,0));
corners.push( Vector.toVec(maxPos.x,maxPos.y));
corners.push( Vector.toVec(0.6*maxPos.x,maxPos.y*0.6));
corners.push( Vector.toVec(0.4*maxPos.x,maxPos.y*0.6));
corners.push( Vector.toVec(0,maxPos.y));
let cN = corners.length;

var getPointOnSide = function( side, i ) {
    let e = i/n;
    return Vector.interpolate(corners[side%cN], corners[(side+1)%cN], e);
}

var i = 0;
var stage = 0;

var timer = setInterval( () => {

    if ( forward ) {
        i++;
        if ( i >= n ) {
            i = 0;
            stage++;
            if ( stage >= cN ) {
                stage = 0;
            }
        }
    } else {
        i--;
        if ( i < 0 ) {
            i = n-1;
            stage--;
            if ( stage < 0) {
                stage = cN-1;
            }
        }
    }

    var p1 = getPointOnSide( stage, i);
    var p2 = getPointOnSide( stage+1, i);

    var colour = i%colours.length;
    let ln = Line(p1, p2, width, colours[colour]);
    ln.draw(ctx);

    if ( symmetric ) {
        p1 = getPointOnSide( cN-stage, n-i);
        p2 = getPointOnSide( cN-stage-1, n-i);

        ln = Line(p1, p2, width, colours[colour]);
        ln.draw(ctx);
    }


}, interval);

