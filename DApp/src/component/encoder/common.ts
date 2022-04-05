
/*Example
 sources4: [1,1,0,2] --> output:133 
 sources4: [3,3,3,3] --> output:255 
 sources4: [0,0,0,1] --> output:128
 sources4: [1,0,0,0] --> output:1
*/
function buildUint8(sources4: Array<number>): Uint8Array {
    var ris = new Uint8Array(1);
    var n = 0;
    for (var x = 3; x >= 0; x--) {
        if (sources4.length >= x) {
            if (sources4[x] > 3) {
                n += 3 << 2*x;
            } else if (sources4[x] > 0) {
                n += sources4[x] << 2*x;
            }
        }
    }
    // console.log("sources4",sources4);
    // console.log("n",n);
    ris[0] = n;
    return ris;
}

/*
Example: 133 --> [1,1,0,2] 
*/
function unBuildUint8(b: Uint8Array): Array<number> {
    var _b = b[0];
    const ris = new Array<number>();
    for (var x = 0; x < 4; x++) {
        const r = _b % 4;
        _b = Math.trunc(_b / 4);
        ris.push(r);
    }
    return ris;
}


function unBuild8Hex(hex: string): Array<number> {
    const arr = new Array<number>();
    for(var x=0;x<hex.length;x+=2){
        arr.push(parseInt(hex[x]+hex[x+1],16))
    }
    return  unBuildUint8(new Uint8Array(arr));;
}

export default {

    unBuild8Hex:unBuild8Hex,
    buildUint8:buildUint8,
    unBuildUint8:unBuildUint8,

}