var maxPos = Vector.toVec( 500, 500);

var canvas = document.getElementById('canvas');
canvas.width = maxPos.x;
canvas.height = maxPos.y;
var ctx = canvas.getContext('2d');

const v2str = Vector.toString;

const Separation_settings = {
    'r': 1,
    'k': -2,
    'w': 0.7
};
const cohesion_settings = {
    'r': 5,
    'k': -1,
    'w': 0.3
};
const alignment_settings = {
    'r': 5,
    'k': -1,
    'w': 0.1
};

var interval = 50;

const speed = 2;
const count = 100;
const size = 10;
const name = false;

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

    birds.push( Bird(pos, vec, size, colours[colour], name?''+i:null,
    Separation_settings, cohesion_settings, alignment_settings))
}

var ite = 0;
function updateFunction() {
    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0,0, maxPos.x, maxPos.y);

    // Draw arcs
    for( i in birds) {
        birds[i].draw( ctx);
        birds[i].move(speed, maxPos.x, maxPos.y);
    }
    for( i in birds) {
        let bird = birds[i];
        let Separation_centre = Vector.toVec(0,0);
        let Separation_total = 0;
        let cohesion_centre = Vector.toVec(0,0);
        let cohesion_total = 0;
        let alignment_centre = Vector.toVec(0,0);
        let alignment_vector = Vector.toVec(0,0);
        let alignment_total = 0;

        for( j in birds) {
            if( i == j ) continue;
    
            let sigmas = bird.sigmas(birds[j]);
            Separation_total += sigmas[0];
            Separation_centre = Vector.multAdd(Separation_centre,1, birds[j].Pos, sigmas[0]);

            cohesion_total += sigmas[1];
            cohesion_centre = Vector.multAdd(cohesion_centre,1, birds[j].Pos, sigmas[1]);

            alignment_total += sigmas[2];
            alignment_centre = Vector.multAdd(alignment_centre,1, birds[j].Pos, sigmas[2]);
            alignment_vector = Vector.multAdd(alignment_vector,1, birds[j].Vec, sigmas[2]);

        }
        birds[i].accumulate(Separation_total, Separation_centre,
            cohesion_total, cohesion_centre,
            alignment_total, alignment_centre, alignment_vector);
    }

    ite+=1;
    // if(ite > 100) {
    //     clearInterval(timer);
    // }
}
// updateFunction();

var timer = setInterval( updateFunction, interval);
