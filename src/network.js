var maxPos = Vector.toVec( 500, 500);

var canvas = document.getElementById('canvas');
canvas.width = maxPos.x;
canvas.height = maxPos.y;
var ctx = canvas.getContext('2d');

var interval = 50;
const speed = 2;
const count = 10;
const size = 10;
const name = true;

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

var nodes = [];
var connections = [];

for( let i = 0; i < count; i++) {
    var pos = Vector.wrap(Vector.random(maxPos.x), maxPos.x, maxPos.y)
    var colour = i%colours.length;
    nodes.push(Node(pos, size, colours[colour], name?''+i:null));
    connections.push([]);
    for( let j = 0; j < count; j++) {
        var conn = 0;
        if ( i == j ) {
            conn = 0;
        } else if ( j < i ) {
            conn = connections[j][i];
        } else {
            conn = (Math.random()-0.5)*10;
        }
        connections[i].push(conn);
    }
}

var ite = 0;
function updateFunction() {
    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0, maxPos.x, maxPos.y);

    for( let i = 0; i < count; i++) {
        for( let j = 0; j < count; j++) {
            var conn = Connection(i,j, connections[i][j], '#aaaaaa');
            conn.draw(ctx, nodes, [200,100,100],[100,100,200], -5, 5);
        }
    }
    // Draw arcs
    for( i in nodes) {
        nodes[i].draw( ctx);
    }

    ite+=1;
    if(ite > 1) {
        clearInterval(timer);
        console.log('Stop');
    }
}
updateFunction();

// var timer = setInterval( updateFunction, interval);
