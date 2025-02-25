const { InfluxDB, QueryApi } = require('@influxdata/influxdb-client');
const dotenv = require('dotenv');

const URL = process.env.INFLUXDB_URL;
const TOKEN = process.env.INFLUXDB_TOKEN;
const ORG = process.env.INFLUXDB_ORG;
const BUCKET = process.env.INFLUXDB_BUCKET;

const influxDB = new InfluxDB({url: URL, token: TOKEN});
const queryApi = influxDB.getQueryApi(ORG);

exports.queryInfluxDB = async () =>{
    return new Promise((resolve, reject) => {
        const query = `from(bucket: "${Bucket}")`;
        let results = [];

        queryApi.queryRows(query, {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row);
                results.push(o);
            },
            error(error){
                console.log(error);
                reject(error);
            },
            complete(){
                resolve(results);
            }
        })
    })
}