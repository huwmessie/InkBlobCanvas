class Blob {
    constructor(id) {
        this.cellInds = [];
        this.amts = [];
        this.id = id;
        this.color = [Math.random()*255,Math.random()*255,Math.random()*255];
    }

    addCell(cInd,size) {
        let ind = intInd(this.cellInds, cInd);
        if (ind<0) {
            this.cellInds.push(cInd);
            this.amts.push(size);
        }
        else {
            this.amts[ind]+=size;
        }
    }
    
    cellInd(cell) {
        for (var i=0; i<this.cellInds.length; i++) {
            if (cells[this.cellInds[i]].id==cell.id) return i;
        }
        return -1;
    }

    
}

function intInd(is, i) {
    for (var j=0; j<is.length; j++) {
        if (is[j] == i) return j;
    }
    return -1;
}

function rgba(r, g, b, a=1){
    return `rgba(${r}, ${g}, ${b}, ${a})`
}
function rgb(r, g, b){
    return `rgb(${r}, ${g}, ${b})`
}

module.exports = Blob;
