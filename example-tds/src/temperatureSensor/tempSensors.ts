import td_temp_01 from "./temp_01.td.json"
import td_temp_02 from "./temp_02.td.json"
import td_temp_03 from "./temp_03.td.json"

const maxValueT_01= 100;
const maxValueT_02= 100;
const maxValueT_03= 200;

const activeTemperatureSensors=()=>{
    WoT.produce(td_temp_01).then((thing)=>{
        thing.setPropertyReadHandler("temperature",async()=>{
            return Math.trunc(Math.random()*maxValueT_01*100)/100;
        });
        thing.setPropertyReadHandler("latitude",async()=>{
            return 	44.494888;
        });
        thing.setPropertyReadHandler("longitude",async()=>{
            return 11.3426163;
        });
        thing.expose();
    });
    WoT.produce(td_temp_02).then((thing)=>{
        thing.setPropertyReadHandler("temperature",async()=>{
            return Math.trunc(Math.random()*maxValueT_02*100)/100;
        });
        thing.setPropertyReadHandler("latitude",async()=>{
            return 	44.494889;
        });
        thing.setPropertyReadHandler("longitude",async()=>{
            return 11.3426165;
        });
        thing.expose();
    });
    WoT.produce(td_temp_03).then((thing)=>{
        thing.setPropertyReadHandler("temperature",async()=>{
            return Math.trunc(Math.random()*maxValueT_03*100)/100;
        });
        thing.setPropertyReadHandler("latitude",async()=>{
            return 	44.494884;
        });
        thing.setPropertyReadHandler("longitude",async()=>{
            return 11.3426162;
        });
        thing.expose();
    });
};

export default activeTemperatureSensors;

