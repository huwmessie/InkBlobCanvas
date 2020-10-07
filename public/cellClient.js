function updateCellClientProps(state, props) {
    if (props==null) {props = initCellClientProps(state);}
    props = runCellClient(state, props);
    return props;
}

function initCellClientProps(state) {
    let ps = [];
    let vs = [];
    for (var i=0; i<state.cells.length; i++) {
        ps.push(copyVec(state.cells[i].pos));
        vs.push(createVector());
    }
    return {ps: ps, vs: vs};
}

function runCellClient(state, props) {
    let ps = props.cell
    let m = createVector(mouseX, mouseY);
    let clstInd = closestPtInd(props.ps, m)
    clstCellInd = clstInd;
    //print(props.vs[0]);
    for (var i=0; i<props.ps.length; i++) {
        let curP = props.ps[i];
        let curD = cellDist(curP,m);
        let curToM = subFromVec(copyVec(m), curP);
        let force = divVec(curToM, pow(curD,1));
        if (i==clstInd) {
            addToVec(props.vs[i], force);
        }
        else {
            subFromVec(props.vs[i], multVec(force,4));
        }
    }
    for (var i=0; i<props.ps.length; i++) {
        lerpVecs(props.ps[i], state.cells[i].pos, 0.1);
        multVec(props.vs[i], 0.7);
        props.ps[i].x+=props.vs[i].x;
        props.ps[i].y+=props.vs[i].y;
    }
    return props;
}

function closestPtInd(ps, v) {
    minD = null;
    minInd = null;
    for (var i=0; i<ps.length; i++) {
        d = cellDist(ps[i],v);
        if (minD==null || d<minD) {
            minD = d;
            minInd = i;
        }
    }
    return minInd;
}

function minkowskiDist(v1,v2,p) {
    let d1 = Math.abs(Math.pow(v1.x-v2.x,p));
    let d2 = Math.abs(Math.pow(v1.y-v2.y,p));
    return Math.pow(d1+d2,1/p);
}

function cellDist(v1,v2) {
    return minkowskiDist(v1,v2,2);
    //if (manhattanDistances) {return manhattanDist(v1,v2);}
    //return v1.dist(v2);
}

function copyVec(v) {
    return createVector(v.x,v.y);
}

function addToVec(v, add) {
    v.x+=add.x;
    v.y+=add.y;
    return v;
}

function subFromVec(v, sub) {
    v.x-=sub.x;
    v.y-=sub.y;

    return v;
}

function multVec(v, mult) {
    v.x*=mult;
    v.y*=mult;

    return v;
}

function divVec(v, div) {
    v.x/=div;
    v.y/=div;

    return v;
}

function lerpVecs(from, to, amt) {
    from.x = lerp(from.x,to.x,amt);
    from.y = lerp(from.y,to.y,amt);
    return from;
}