class Cell {
    constructor(vec) {
      this.pos = vec;
    }
}
  
function containsCell(cs, c) {
    if (cs==null || cs.length==0) {return false;}
    for (var i=0; i<cs.length; i++) {
      let check = cs[i];
      if (c==check) {return true;}
    }
    return false;
}
  
function initCellPs(minD, maxD, maxX, maxY) {
    result = [];
    var placed = 1;
    var tries = 0;
    let newPt = createVector(Math.random()*maxX,Math.random()*maxY);
    result.push(newPt);
    while ( tries<10000) {
        newPt = createVector(Math.random()*maxX, Math.random()*maxY);
        var farEnough = true;
        var closeEnough = false;
        for (var i=0; i<placed; i++) {
            let d = cellDist(result[i],newPt);
            if (d<minD) {
            farEnough = false;
        }
        if (d<maxD) {
            closeEnough = true;
        }
      }
      if (farEnough&&closeEnough) {
        result.push(newPt);
        placed++;
      }
      tries++;
    }
    //console.log(tries);
    return result;
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

function rgba(r, g, b, a=1){
    return `rgba(${r}, ${g}, ${b}, ${a})`
}
function rgb(r, g, b){
    return `rgb(${r}, ${g}, ${b})`
}

function createVector(x=0, y=0) {
    return {x: x, y: y};
}
