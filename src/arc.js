const Arc = function(radius, width, span, colour) {
    return {
        'Radius': radius,
        'Width': width,
        'Span': span,
        'Colour': colour,
        'draw': function( ctx, radians, point) {
            ctx.strokeStyle = colour;
            ctx.fillStyle = colour;
            ctx.beginPath();
            const halfSpan = span/2;
            ctx.arc(point.x,point.y,  radius, radians-halfSpan, radians+halfSpan);
            ctx.arc(point.x,point.y,  radius-width, radians+halfSpan, radians-halfSpan, true);
            ctx.fill();
        }
    };

};
