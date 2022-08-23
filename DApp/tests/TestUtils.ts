const strValidator = (data:any)=>{return data!==null && data !==undefined && typeof data == "string"};
const numberValidator = (data:any)=>{return data!==null && data !==undefined && !isNaN(data)};
const boolValidator = (data:any)=>{
    //console.log("------->",typeof data);
    return data!==null && data !==undefined && 
    (typeof data == "boolean" || (
        typeof data == "string" 
        && 
        (
            data.toLocaleLowerCase().trim()==="true"
            || 
            data.toLocaleLowerCase().trim()==="false"
        )
    ));
};

const assertTest=async function (testName:String,testFunction:any,validator=(d:any)=>{return true}){
    try{
        const data= await testFunction();
        return validator(data);
    }catch(err){
        console.log(testName+"->Err: ",err);
        return false;
    }
}

export default {
    assertTest,
    strValidator,
    boolValidator,
    numberValidator
}