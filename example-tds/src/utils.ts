// import axios from "axios";
const superagent = require('superagent');

// var querystring = require('querystring');
// var http = require('http');

const readSensorData=async function(sensorName:string,filterProp:string):Promise<any>{
   try{
    
        const headers = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const query = {
                start: "-10s",
                tail: 1,
                filter: {
                   node:sensorName
                }
        };
        const ris = await asyncMyPost(query);
        // const ris =await axios.post("https://data.sagecontinuum.org/api/v1/query", query, headers);
   
        console.log("readSensorData.body",ris);
        var jsonArr=[];
        const temp= ris.toString().split("\n");
        for(var x in temp){
            try{
                jsonArr.push(JSON.parse(temp[x]));
            }catch(ignore){

            }
        }
        //console.log("readSensorData.jsonArr",jsonArr);
        return  jsonArr[jsonArr.length-1].value;
    }catch(err){
        console.log("Error: on sensor "+sensorName + ": "+ err);
        console.log("err",err);
        return null;
    }
}




async function asyncMyPost(query:any){
    return new Promise( resolve => (myPost(query,resolve)) );
}

function myPost(query:any,cb:any) {
    superagent
    .post('http://data.sagecontinuum.org/api/v1/query')
    .send(query) // sends a JSON post body
    .set('Content-Type', 'application/json')
    .end((err, res) => {
        if(err!==null && err!==undefined){
            console.log("err",err);
            cb(null)
        }else{
            // console.log("res.res",res.res);
            const ris = res.res.text.toString();
            cb(ris)
        }
});

}

// async function asyncMyPost(query:any){
//     return new Promise( resolve => (myPost(query,resolve)) );
// }

// function myPost(query:any,cb:any) {
//   // Build the post string from an object
//   var post_data = querystring.stringify(query);

//   // An object of options to indicate where to post to
//   var post_options = {
//       host: 'data.sagecontinuum.org',
//       port: '80',
//       path: '/api/v1/query',
//       method: 'POST',
//       headers: {
//           'Content-Type': "application/json",
//           'Content-Length': Buffer.byteLength(post_data)
//       }
//   };

//   // Set up the request
//   var post_req = http.request(post_options, function(res) {
//       res.setEncoding('utf8');
//       var data ="";
//       res.on('data', function (chunk) {
//         console.log("data: "+data);
//         data+=chunk;
//       });
//       res.on('end', () => {
//         cb(data);
//     });
//   });

//   // post the data
//   post_req.write(post_data);
//   post_req.end();

// }


export default readSensorData
