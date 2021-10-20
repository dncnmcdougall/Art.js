const Node = function(pos, size, colour, name) {
    return {
        'Pos': pos,
        'Size': size,
        'Colour': colour,
        'Name': name,
        'draw': function(ctx) {
            ctx.fillStyle = this.Colour;

            ctx.beginPath();
            ctx.arc(this.Pos.x, this.Pos.y, size, 0, 2*Math.PI);
            ctx.fill();

            if ( this.Name ) {
                ctx.strokeText(this.Name, this.Pos.x, this.Pos.y);
            }
        }
    };
};
