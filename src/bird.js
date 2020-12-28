function distanceCost( d, size) {
    x = d/size;
    if (x > 10) return Math.exp(-x/4);
    return (-(x-2)*(x-10))*Math.exp(-x/4)/4.5;
}
function distanceCostDir( d, size) {
    x = d/size;
    if (x > 10) return Math.exp(-x/4);
    return (-(x)*(x-10))*Math.exp(-x/4)/10;
}

const Bird = function(pos, vec, size, colour, name) {
    return {
        'Pos': pos,
        'Vec': vec,
        'Size': size,
        'Colour': colour,
        'Name': name,
        'draw': function( ctx ) {
            ctx.strokeStyle = colour;
            // ctx.fillStyle = colour;

            var normal = Vector.mult(vec, size);
            ctx.beginPath();
            ctx.moveTo(pos.x-normal.y/3,pos.y+normal.x/3);
            ctx.lineTo(pos.x+normal.x/2,pos.y+normal.y/2);
            ctx.lineTo(pos.x+normal.y/3,pos.y-normal.x/3);
            ctx.stroke();
            if (name ){
                ctx.strokeText(name, pos.x, pos.y);
            }
        },
        'move': function(time, width, height) {
            pos = Vector.add(pos,Vector.mult(vec,time))
            pos = Vector.wrap(pos, width, height);
        },
        'update': function(bird, bird_count, print) {
            var distance = Vector.distance(pos,bird.Pos);
            var dist_dir = Vector.norm(Vector.sub(bird.Pos, pos));
            let dir_cost = distanceCostDir(distance, size);
            let dist_cost = distanceCost(distance, size);
            vec = Vector.weightedAdd(vec,1, bird.Vec, dir_cost/bird_count);

            vec = Vector.weightedAdd(vec,1, dist_dir, dist_cost/bird_count);
            vec = Vector.norm(vec);
            if ( print ) {
                console.log(distance/size, dist_cost, dir_cost);
            }
        }
    };

};
