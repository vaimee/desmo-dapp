import _000048b02d15bdcd from "./000048b02d15bdcd.td.json"
import _000048B02D15BC87 from "./000048b02d15bc87.td.json"
import _000048B02D15BC6D from "./000048b02d15bc6d.td.json"
import _000048B02D15C319 from "./000048b02d15c319.td.json"
import _000048B02D15C31F from "./000048b02d15c31f.td.json";
import _000048B02D15BC3D from "./000048b02d15bc3d.td.json";
import _000048B02D15BC77 from "./000048b02d15bc77.td.json";
import _000048B02D15BDA5 from "./000048b02d15bda5.td.json";
import _000048B02D15BC7C from "./000048b02d15bc7c.td.json";
import _000048B02D05A1C6 from "./000048b02d05a1c6.td.json";
import readSensorData from "../utils"
//https://portal.sagecontinuum.org/data
const activeReadersFor =function(sensorName,tdSchema,lat,long,props){
    WoT.produce(tdSchema).then((thing)=>{
        for(var x in props){
            const propsLabel = props[x].label;
            const propsName = props[x].name;
            thing.setPropertyReadHandler(propsLabel,async()=>{
                return await readSensorData(sensorName,propsName);
            });
        }
        thing.setPropertyReadHandler("latitude",async()=>{
            return lat;
        });
        thing.setPropertyReadHandler("longitude",async()=>{
            return long;
        });
        thing.expose();
    });
}

const porpsBMExxx =[
    {name:"env.temperature",label:"temp"},
    {name:"env.relative_humidity",label:"humidity"},
    {name:"iio.in_humidityrelative_input",label:"in_humidity"},
    {name:"iio.in_pressure_input",label:"pressure"},
    {name:"iio.in_resistance_input",label:"resistance"}
];

const activeSagecontinuum=()=>{
    activeReadersFor("000048b02d15bdcd",_000048b02d15bdcd,41.73673644,-87.60469641,porpsBMExxx);
    activeReadersFor("000048b02d15bc87",_000048B02D15BC87,44.04666098,-123.0737003,porpsBMExxx);
    activeReadersFor("000048b02d15bc6d",_000048B02D15BC6D,null,null,porpsBMExxx);
    activeReadersFor("000048b02d15c319",_000048B02D15C319,41.73673644,-87.60469641,porpsBMExxx);
    activeReadersFor("000048b02d15c319",_000048B02D15C319,41.73673644,-87.60469641,porpsBMExxx);
    activeReadersFor("000048b02d15c31f",_000048B02D15C31F,41.874121609,-87.666516623,porpsBMExxx);
    activeReadersFor("000048b02d15bc3d",_000048B02D15BC3D,41.71847338,-87.98399009,porpsBMExxx);
    activeReadersFor("000048b02d15bc77",_000048B02D15BC77,36.60517135,-97.48558495,porpsBMExxx);
    activeReadersFor("000048b02d15bda5",_000048B02D15BDA5,41.866695589,-87.666581479,porpsBMExxx);
    activeReadersFor("000048b02d15bc7c",_000048B02D15BC7C,41.71780518,-87.9785753,porpsBMExxx);
    activeReadersFor("000048b02d05a1c6",_000048B02D05A1C6,41.71810396,-87.98290344,porpsBMExxx);
    
    
};

export default activeSagecontinuum;

