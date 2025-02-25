const influxService = require('../Services/influxServices');

exports.getData = async (req, res)=> {
    try {
        const data = await influxService.queryInfluxDB();
        res.json(data);
    } catch(err){
        console.log(err);
        res.status(500).json({error: 'Failed to fetch data'});
    }
}