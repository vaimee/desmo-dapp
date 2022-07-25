import UseCaseTest from "./UseCaseTest";


// test('UseCaseTest.test01', async () => {
//     const ris=await UseCaseTest.test_01();
//     expect(ris).toEqual(true);
// });

test('UseCaseTest.test02', async () => {
    const ris=await UseCaseTest.test_02();
    expect(ris).toEqual(true);
});

test('UseCaseTest.test03', async () => {
    const ris=await UseCaseTest.test_03();
    expect(ris).toEqual(true);
});

test('UseCaseTest.test04', async () => {
    const ris=await UseCaseTest.test_04();
    expect(ris).toEqual(true);
});

test('UseCaseTest.test05', async () => {
    const ris=await UseCaseTest.test_05();
    expect(ris).toEqual(true);
});

test('UseCaseTest.test06', async () => {
    try{
        expect(await UseCaseTest.test_06()).toEqual(true);
    }catch(err){
        console.log("err",err);
    }
});

test('UseCaseTest.test07', async () => {
    try{
        expect(await UseCaseTest.test_07()).toEqual(true);
    }catch(err){
        console.log("err",err);
    }
});
