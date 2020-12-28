var maxPos = Vector.toVec( 650, 650);

var canvas = document.getElementById('canvas');
canvas.width = maxPos.x;
canvas.height = maxPos.y;
var ctx = canvas.getContext('2d');

var interval = 50;
var speed = 2;

var count = 100;
var birds = []
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
for( let i = 0; i < count; i++) {
    pos = Vector.wrap(Vector.random(maxPos.x), maxPos.x, maxPos.y)
    vec = Vector.randomDir(1)
    var colour = i%colours.length;

    birds.push( Bird(pos, vec, 20, colours[colour]))
}

var ite = 0;
var timer = setInterval( () => {
    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0, maxPos.x, maxPos.y);

    // Draw arcs
    for( i in birds) {
        birds[i].draw( ctx);
        birds[i].move(speed, maxPos.x, maxPos.y);
    }
    for( i in birds) {
    for( j in birds) {
        if( i == j ) continue;
        birds[i].update(birds[j], count);
    }
    }

    ite+=1;
    // if(ite > 100) {
    //     clearInterval(timer);
    // }

}, interval);
