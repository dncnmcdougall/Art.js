function interpolate(value, colour1, colour2) {
    return [
        colour1[0]*value + colour2[0]*(1-value),
        colour1[1]*value + colour2[1]*(1-value),
        colour1[2]*value + colour2[2]*(1-value)
    ];
};

function colourToString(colour) {
    return 'rgb('+colour[0]+','+colour[1]+','+colour[2]+')';
};

const Connection = function(nodeId1, nodeId2, weight) {
    return {
        'NodeId1': nodeId1,
        'NodeId2': nodeId2,
        'Weight': weight,
        'draw': function(ctx, nodes, minColour, maxColour, min, max) {
            let node1 = nodes[this.NodeId1];
            let node2 = nodes[this.NodeId2];


            let v = (this.Weight - min)/(max - min);
            console.log('connecing ['+this.NodeId1+','+this.NodeId2+'] w: '+this.Weight+' -> '+v);
            ctx.strokeStyle = colourToString(interpolate(v, minColour, maxColour));
            ctx.lineWidth = 2*(Math.abs(v));

            ctx.beginPath();
            ctx.moveTo(node1.Pos.x,node1.Pos.y);
            ctx.lineTo(node2.Pos.x,node2.Pos.y);
            ctx.stroke();
        }
    };
};
