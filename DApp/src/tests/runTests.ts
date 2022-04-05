import TestConsNumb from "./TestConsNumb";
import TestEncoding from "./TestEncoding";
import TestConsStr from "./TestConsStr";

if (process.argv[2] === "number" || process.argv[2] === undefined) {
    console.log("\n");
    console.log("\n");
    console.log("####################TEST#################");
    console.log("#            consensus on number        #");
    console.log("####################TEST#################");
    console.log("\n");
    TestConsNumb.test_01(() => {
        TestConsNumb.test_02(() => {
            TestConsNumb.test_03(() => { })
        });
    });
}

if (process.argv[2] === "str" || process.argv[2] === undefined) {
    console.log("\n");
    console.log("\n");
    console.log("####################TEST#################");
    console.log("#            consensus on string        #");
    console.log("####################TEST#################");
    console.log("\n");
    TestConsStr.test_01(() => {

    });
}


if (process.argv[2] === "encoding" || process.argv[2] === undefined) {
    console.log("\n");
    console.log("\n");
    console.log("####################TEST#################");
    console.log("#                encoding               #");
    console.log("####################TEST#################");
    console.log("\n");
    TestEncoding.test_01(() => {

    });
}