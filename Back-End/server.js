require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const url = process.env.INFLUXDB_URL;
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;

const influxDB = new InfluxDB({url, token});

console.log(`Up and running at ${url}`);

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));


app.use(bodyParser.urlencoded({ extended: true }));


const writeApi = influxDB.getWriteApi(org, bucket, 'ns');

const points = [
    new Point("census").tag("location","Klamath").intField("bees", 23),
    new Point("census").tag("location", "Portland").intField("ants", 30),
    new Point("census").tag("location", "Klamath").intField("bees", 28),
    new Point("census").tag("location", "Portland").intField("ants", 32),
    new Point("census").tag("location", "Klamath").intField("bees", 29),
    new Point("census").tag("location", "Portland").intField("ants", 40)
];

async function writeData(){
    for(let i = 0; i<points.length; i++){
        const point = points[i];
        console.log(`Writing point: ${point}`);

        await writeApi.writePoint(point);

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    await writeApi.close();
    console.log('Write complete');
}
writeData().catch(err => console.error(`Write failed, ${err}`));   
