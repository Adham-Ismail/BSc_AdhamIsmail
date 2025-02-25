require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const influxRoutes = require('./Routes/influxRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', influxRoutes );

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Up and Running on PORT: ", `${PORT}`));