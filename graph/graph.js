var margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
},
width = 960 - margin.right - margin.left,
height = 800 - margin.top - margin.bottom;

var root = {
    "name": "ROOT",
    "children": []
};

var i = 0,
    duration = 250,
    rectW = 60,
    rectH = 30,
    radius = 30;

var tree = d3.layout.tree().nodeSize([100, 50]);
var diagonal = d3.svg.diagonal()
    .projection(function (d) {
    // return [d.x + rectW / 2, d.y + rectH / 2];
    return [d.x, d.y + radius];
});

var svg = d3.select("#body").append("svg").attr("width", 1000).attr("height", 1000)
    .call(zm = d3.behavior.zoom().scaleExtent([1,3]).on("zoom", redraw)).append("g")
    .attr("transform", "translate(" + 350 + "," + 20 + ")");

//necessary so that zoom knows where to zoom and unzoom from
zm.translate([350, 20]);

root.x0 = 0;
root.y0 = height / 2;

function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

// root.children.forEach(collapse);
update(root);

d3.select("#body").style("height", "800px");

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = (d.depth-1) * 120 +25;
    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            if (source && source.x0 )
                return "translate(" + source.x0 + "," + source.y0 + ")";
                return "translate(0,0)";
        })
        .on("click", click);

    // nodeEnter.append("rect")
    //     .attr("width", rectW)
    //     .attr("height", rectH)
    nodeEnter.append("circle")
        .attr("r", radius)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .style("fill", function (d) {
            return d._children ? "grey" : "#fff";
        })
        .style("opacity", function(d){
        	return !d.depth ? 0 : 1;
        });

    nodeEnter.append("text")
        .attr("x", 0)
        .attr("y", 5)
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.name;
        })
        .style("font-size", 18)
        .style("font-weight", "bold")
        .style("opacity", function(d){
        	return !d.depth ? 0 : 1;
        });

    nodeEnter.append("text")
        .attr("x", radius *1/2)
        .attr("y", radius *2/3)
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.incr;
        })
        .style("font-size", 12)
        .style("opacity", function(d){
        	return !d.depth ? 0 : 1;
        });

    nodeEnter.append("text")
        .attr("x", 5)
        .attr("y", -radius-5 )
        .attr("text-anchor", "right")
        .text(function (d) {
            return d.dist;
        })
        .style("font-size", 12)
        .style("font-weight", "bold")
        .style("fill", "red")
        .style("opacity", function(d){
        	return !d.depth ? 0 : 1;
        });

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    // nodeUpdate.select("rect")
    //     .attr("width", rectW)
    //     .attr("height", rectH)
    //     .attr("stroke", "black")
    //     .attr("stroke-width", 1)
    //     .style("fill", function (d) {
    //     return d._children ? "lightsteelblue" : "#fff";
    // });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
    })
        .remove();

    // nodeExit.select("rect")
    // .attr("width", rectW)
    // .attr("height", rectH)
    nodeExit.select("circle")
        .attr("width", 0)
        .attr("height", radius)
    //.attr("width", bbox.getBBox().width)""
    //.attr("height", bbox.getBBox().height)
    .attr("stroke", "black")
        .attr("stroke-width", 1);

    nodeExit.select("text");

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function (d) {
        return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        // .attr("x", rectW / 2)
        // .attr("y", rectH / 2)
        .attr("x", 0)
        .attr("y", radius)
        .attr("d", function (d) {
            if(source && source.x0)
                var o = {
                    x: source.x0,
                    y: source.y0
                };
            else
                var o = {
                    x: 0,
                    y: 0
                };
            return diagonal({
                source: o,
                target: o
            });
        }).style("opacity", function(d, i) {
            return !d.source.depth ? 0 : 1;
        });


    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
        var o = {
            x: source.x,
            y: source.y
        };
        return diagonal({
            source: o,
            target: o
        });
    })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

//Redraw for zoom
function redraw() {
  //console.log("here", d3.event.translate, d3.event.scale);
  svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}
