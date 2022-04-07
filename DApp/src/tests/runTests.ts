import TestConsNumb from "./TestConsNumb";
import TestEncoding from "./TestEncoding";
import TestConsStr from "./TestConsStr";

const consOnNumberTest = (cb = () => { }) => {
    if (process.argv[2] === "number" || process.argv[2] === undefined) {
        console.log("\n");
        console.log("\n");
        console.log("####################TEST#################");
        console.log("#            consensus on number        #");
        console.log("####################TEST#################");
        console.log("\n");
        TestConsNumb.test_01(() => {
            TestConsNumb.test_02(() => {
                TestConsNumb.test_03(cb)
            });
        });
    }else{
        cb();
    }
}

const consOnStringTest = (cb = () => { }) => {
    if (process.argv[2] === "str" || process.argv[2] === undefined) {
        console.log("\n");
        console.log("\n");
        console.log("####################TEST#################");
        console.log("#            consensus on string        #");
        console.log("####################TEST#################");
        console.log("\n");
        TestConsStr.test_01(cb);
    }else{
        cb();
    }
}

const ecnodingTest = (cb = () => { }) => {
    if (process.argv[2] === "encoding" || process.argv[2] === undefined) {
        console.log("\n");
        console.log("\n");
        console.log("####################TEST#################");
        console.log("#                encoding               #");
        console.log("####################TEST#################");
        console.log("\n");
        TestEncoding.test_01(() => {
            TestEncoding.test_02(() => {
                TestEncoding.test_03(() => {
                    TestEncoding.test_04(cb)
                })
            })
        });
    }else{
        cb();
    }
}


consOnNumberTest(()=>{
    consOnStringTest(()=>{
        ecnodingTest(()=>{
            
        })
    })
})