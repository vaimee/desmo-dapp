import bme680 from "./bme680.td.json"
import readSensorData from "../utils"

const activeSagecontinuum=()=>{
    WoT.produce(bme680).then((thing)=>{
        const sensorName = "bme680";
        thing.setPropertyReadHandler("temp",async()=>{
            return await readSensorData(sensorName,"env.temperature");
        });
        thing.setPropertyReadHandler("humidity",async()=>{
            return await readSensorData(sensorName,"env.relative_humidity");
        });
        thing.setPropertyReadHandler("in_humidity",async()=>{
            return await readSensorData(sensorName,"iio.in_humidityrelative_input");
        });
        thing.setPropertyReadHandler("pressure",async()=>{
            return await readSensorData(sensorName,"iio.in_pressure_input");
        });
        thing.setPropertyReadHandler("resistance",async()=>{
            return await readSensorData(sensorName,"iio.in_resistance_input");
        });
        thing.setPropertyReadHandler("latitude",async()=>{
            return 	44.04666098;
        });
        thing.setPropertyReadHandler("longitude",async()=>{
            return -123.0737003;
        });
        thing.expose();
    });
};

export default activeSagecontinuum;

