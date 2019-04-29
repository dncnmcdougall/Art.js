/* eslint-env browser*/
/* global Vector, Arc*/

var maxPos = Vector.toVec( 1400, 750);

var increment = 0.002;
var rInc = 4;
var width = 4;
var circle = 0.75;

var canvas = document.getElementById('canvas');
canvas.width = maxPos.x;
canvas.height = maxPos.y;
var ctx = canvas.getContext('2d');
var interval = 50;


var amount = 0.0;
var centre = Vector.toVec(maxPos.x/2, maxPos.y/2);

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
var arcs = [];
var speeds = [];
var len = Vector.length(centre);
var n = Math.ceil(len/rInc);
var sets = Math.floor(n/colours.length);
console.log('Sets: ',sets);


for( var i = 0; i <= sets*(colours.length-1)+(sets-1); i++ ) {
    var set = Math.floor(i/colours.length);
    var colour = i%colours.length;
    if ( set%2 == 0 ) {
        colour = colours.length - colour -1;
    }
    if ( ( colour == 0  && set%2 == 0 ) 
        || ( colour == (colours.length-1)  && set%2 == 1 ) )
    {
        arcs.push( Arc(rInc*(i+1+set), width, Math.PI*circle, colours[colour]));
        speeds.push(colour+1);
        arcs.push( Arc(rInc*(i+2+set), width, Math.PI*circle, borderColour));
        if ( colour == 0  && set%2 == 0 ) 
        {
            speeds.push(0);
        }
        else
        {
            speeds.push(colours.length+1);
        }
        console.log(i,set,colour);
        console.log(i,set,'border');
    }
    else
    {
        arcs.push( Arc(rInc*(i+1+set), width, Math.PI*circle, colours[colour]));
        speeds.push(colour+1);
        console.log(i,set,colour);
    }
}

var timer = setInterval( () => {
    amount += increment;
    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0, maxPos.x, maxPos.y);

    // Draw arcs
    for( i in arcs) {
        arcs[i].draw( ctx, speeds[i]*amount*Math.PI, centre);
    }

}, interval);

