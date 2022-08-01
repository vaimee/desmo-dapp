import readSensorData from "./utils"

const t = async ()=>{console.log(await readSensorData("bme680","env.temperature"))};
t();