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

function sigma(d, size, L /*Max value*/, x0 /*centre*/, k /*steepness*/) {
    x = d/size;
    return L/(1+Math.exp(-k*(x-x0)));
}

const Bird = function(pos, vec, size, colour, name, 
    seperation_settings, cohesion_settings, alignment_settings ) {
    return {
        'Pos': pos,
        'Vec': vec,
        'Size': size,
        'Colour': colour,
        'Seperation': seperation_settings,
        'Cohesion': cohesion_settings,
        'Alignment': alignment_settings,
        'Name': name,
        'draw': function( ctx ) {
            ctx.strokeStyle = this.Colour;
            // ctx.fillStyle = colour;

            var normal = Vector.mult(this.Vec, this.Size);
            ctx.beginPath();
            ctx.moveTo(this.Pos.x-normal.y/3,this.Pos.y+normal.x/3);
            ctx.lineTo(this.Pos.x+normal.x/2,this.Pos.y+normal.y/2);
            ctx.lineTo(this.Pos.x+normal.y/3,this.Pos.y-normal.x/3);
            ctx.stroke();

            if ( this.Name ){
                ctx.strokeText(this.Name, this.Pos.x, this.Pos.y);
            }
        },
        'move': function(time, width, height) {
            this.Pos = Vector.add(this.Pos,Vector.mult(this.Vec,time))
            this.Pos = Vector.wrap(this.Pos, width, height);
        },
        'distance': function(otherPos) {
            return Vector.distance(this.Pos, otherPos);
        },
        'sigmas': function(otherBird) {
            let d = this.distance(otherBird.Pos);

            seperation_sigma = sigma(d, this.Size, 1, this.Seperation.r, this.Seperation.k);
            cohesion_sigma = sigma(d, this.Size, 1, this.Cohesion.r, this.Cohesion.k);
            alignment_sigma = sigma(d, this.Size, 1, this.Alignment.r, this.Alignment.k);

            return [seperation_sigma, cohesion_sigma, alignment_sigma];
        },
        'accumulate': function(seperation_total, seperation_centre,
            cohesion_total, cohesion_centre,
            alignment_total, alignment_centre, alignment_vector) {

            seperation_centre = Vector.mult(seperation_centre, 1/seperation_total);
            cohesion_centre = Vector.mult(cohesion_centre, 1/cohesion_total);
            alignment_centre = Vector.mult(alignment_centre, 1/alignment_total);

            let seperation_vector = Vector.norm(Vector.sub(this.Pos, seperation_centre));
            let seperation_distance = this.distance(seperation_centre);
            let seperation_sigma = sigma(seperation_distance, this.Size, 1, this.Seperation.r, this.Seperation.k);

            let cohesion_vector = Vector.norm(Vector.sub(cohesion_centre, this.Pos));
            let cohesion_distance = this.distance(cohesion_centre);
            let cohesion_sigma = sigma(cohesion_distance, this.Size, 1, this.Cohesion.r, this.Cohesion.k);

            alignment_vector = Vector.norm(alignment_vector);
            let alignment_distance = this.distance(alignment_centre);
            let alignment_sigma = sigma(alignment_distance, this.Size, 1, this.Alignment.r, this.Alignment.k);


            this.Vec = Vector.norm(
                Vector.multAdd(this.Vec, 1, 
                    Vector.multAdd(seperation_vector, this.Seperation.w*seperation_sigma, 
                        Vector.multAdd(cohesion_vector, this.Cohesion.w*cohesion_sigma, 
                            alignment_vector, this.Alignment.w*alignment_sigma),
                        1),
                    1)
            );

        }
    };

};
