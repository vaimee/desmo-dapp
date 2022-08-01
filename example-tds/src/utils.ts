import axios from "axios";
const readSensorData=async function(sensorName:string,filterProp:string):Promise<any>{
   // try{
        const headers = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const query = {
            start: "-10s",
            tail: 1,
            filter: {
                sensor: sensorName,
                name:filterProp
            }
        };
        const ris =await axios.post("https://data.sagecontinuum.org/api/v1/query", query, headers);
   
        console.log("readSensorData.ris",ris);
        var jsonArr=[];
        try {
            jsonArr= JSON.parse(ris.data);
        } catch (e) {
           const temp= ris.data.toString().split("\n");
            for(var x in temp){
                try{
                    jsonArr.push(JSON.parse(temp[x]));
                }catch(ignore){

                }
            }
        }     
        console.log("readSensorData.jsonArr",jsonArr);
        return  jsonArr[jsonArr.length-1].value;
    // }catch(err){
    //     console.log("Error: on sensor "+sensorName + ": "+ err);
    //     return null;
    // }
}

export default readSensorData
