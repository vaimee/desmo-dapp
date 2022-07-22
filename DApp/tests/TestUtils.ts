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
const assertTest=(testName:String,testFunction:any,validator=(d:any)=>{return true})=>{
    return new Promise((resolve, reject) => {
        try{
            testFunction((data:any) => {
                    resolve(validator(data));
            });
        }catch(err){
            console.log(testName+"->Err: ",err);
            resolve(false);
        }
    })
}

export default {
    assertTest,
    strValidator,
    boolValidator,
    numberValidator
}