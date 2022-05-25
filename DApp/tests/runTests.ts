import TestConsNumb from "./TestConsNumb";
import TestEncoding from "./TestEncoding";
import TestConsStr from "./TestConsStr";
import TestConsBool from "./TestConsBool";
import UseCaseTest from "./UseCaseTest";
import QueryParserTest from "./QueryParserTest";
import WotTest from "./WotTest";


const consOnBoolTest = (cb = () => { }) => {
    if (process.argv[2] === "bool" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#            consensus on boolean       #");
        console.log("####################TEST#################");
        console.log("\n");
        TestConsBool.test_01(cb);
    } else {
        cb();
    }
}

const consOnNumberTest = (cb = () => { }) => {
    if (process.argv[2] === "number" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#            consensus on number        #");
        console.log("####################TEST#################");
        console.log("\n");
        TestConsNumb.test_01(() => {
            TestConsNumb.test_02(() => {
                TestConsNumb.test_03(()=>{
                    TestConsNumb.test_04(()=>{
                        TestConsNumb.test_05(cb);
                    });                    
                })
            });
        });
    } else {
        cb();
    }
}

const consOnStringTest = (cb = () => { }) => {
    if (process.argv[2] === "str" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#            consensus on string        #");
        console.log("####################TEST#################");
        console.log("\n");
        TestConsStr.test_01(() => {
            TestConsStr.test_02(() => {
                TestConsStr.test_03(cb);
            });
        });
    } else {
        cb();
    }
}

const ecnodingTest = async () => {
    if (process.argv[2] === "encoding" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#                encoding               #");
        console.log("####################TEST#################");
        console.log("\n");
        for (var test in TestEncoding) {
            await TestEncoding[test]();
        }
    }
    return;
}


const useCaseTest = (cb = () => { }) => {
    if (process.argv[2] === "usecase" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#                 USE CASE              #");
        console.log("####################TEST#################");
        console.log("\n");
        UseCaseTest.test_01(cb);
    } else {
        cb();
    }
}

const wotTest = (cb = () => { }) => {
    if (process.argv[2] === "wot" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#                  WOT                  #");
        console.log("####################TEST#################");
        console.log("\n");
        WotTest.test_01(cb);
    } else {
        cb();
    }
}


const queryParserTest = async () => {
    if (process.argv[2] === "parser" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#               QUERY PARSER            #");
        console.log("####################TEST#################");
        console.log("\n");
        for (var test in QueryParserTest) {
            await QueryParserTest[test]();
        }
    }
    return;
}



const runAllTest = async function () {
    await ecnodingTest();
    await queryParserTest();

    consOnNumberTest(() => {
        consOnStringTest(() => {
            consOnBoolTest(() => {
                wotTest(()=>{
                    useCaseTest(()=>{
                        console.log("\n\n");
                        console.log("#########################################");
                        console.log("#               TESTS FINISHED          #");
                        console.log("#########################################");
                    });
                })
            })
        })
    })

}

runAllTest();

//WotTest.test_02(()=>{});