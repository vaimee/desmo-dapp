"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*Example
 sources4: [1,1,0,2] --> output:133
 sources4: [3,3,3,3] --> output:255
 sources4: [0,0,0,1] --> output:128
 sources4: [1,0,0,0] --> output:1
*/
function buildUint8(sources4) {
    var ris = new Uint8Array(1);
    var n = 0;
    for (var x = 3; x >= 0; x--) {
        if (sources4.length >= x) {
            if (sources4[x] > 3) {
                n += 3 << 2 * x;
            }
            else if (sources4[x] > 0) {
                n += sources4[x] << 2 * x;
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
function unBuildUint8(b) {
    var _b = b[0];
    const ris = new Array();
    for (var x = 0; x < 4; x++) {
        const r = _b % 4;
        _b = Math.trunc(_b / 4);
        ris.push(r);
    }
    return ris;
}
function unBuildUint8FromInt(b) {
    const ris = new Array();
    for (var x = 0; x < 4; x++) {
        const r = b % 4;
        b = Math.trunc(b / 4);
        ris.push(r);
    }
    return ris;
}
function unBuild8Hex(hex) {
    const arr = new Array();
    for (var x = 0; x < hex.length; x += 2) {
        arr.push(parseInt(hex[x] + hex[x + 1], 16));
    }
    return unBuildUint8(new Uint8Array(arr));
    ;
}
function generalEncodeSources(sources) {
    var ris = "";
    if (sources.length % 4 === 0) {
        const count = sources.length / 4;
        for (var x = 0; x < sources.length; x = x + 4) {
            var temp = buildUint8(sources.slice(x, x + 4))[0].toString(16);
            if (temp.length === 1) {
                temp = "0" + temp;
            }
            ris += temp;
            // console.log("x",x);
        }
        var temp = count.toString(16);
        if (temp.length === 1) {
            temp = "0" + temp;
        }
        return temp + ris;
    }
    else {
        throw new Error("The sources need to be multiple of 4. Is instead: " + sources.length);
    }
}
function generalDecodeSources(hex) {
    const count = parseInt(hex[0] + hex[1], 16);
    var arr = new Array();
    for (var x = 2; x < count * 2 + 2; x += 2) {
        // console.log("parseInt(hex[x]+hex[x+1],16)",parseInt(hex[x]+hex[x+1],16));
        arr = arr.concat(unBuildUint8FromInt(parseInt(hex[x] + hex[x + 1], 16)));
    }
    return arr;
}
exports.default = {
    unBuild8Hex: unBuild8Hex,
    buildUint8: buildUint8,
    unBuildUint8: unBuildUint8,
    generalEncodeSources: generalEncodeSources,
    generalDecodeSources: generalDecodeSources
};
