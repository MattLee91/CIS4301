const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello World !!!')
})

app.get('/tuplecount',(req,res)=>{
    async function fetchTupleCount(){
        try {
            const connection = await oracledb.getConnection({
                user:'zackary.denson',
                password:'hj2G2t61o23OB2GsiEE1hoVo',
                connectString:'oracle.cise.ufl.edu/orcl'
            });

            const result = await connection.execute('SELECT COUNT(*) AS total_count FROM Crash');
            console.log(result);
            return result.rows;

        } catch (error) {
            return error;
        }
    }

    fetchTupleCount()
    .then(dbRes =>{
        res.send(dbRes);
    })
    .catch(err=>{
        res.send(err);
    })

});

app.post('/query1', async (req, res) => {
    const { date1, date2 } = req.body;
    const selectedBorough = parseInt(req.body.selectedBorough);
    
    try {
        const connection = await oracledb.getConnection({
            user: 'zackary.denson',
            password: 'hj2G2t61o23OB2GsiEE1hoVo',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });

        const result = await connection.execute(`
        SELECT \
            name AS BoroughName, \
            b2.month AS month, \
            b2.year AS year, \
            b2.numberOfCrashes AS numberOfCrashes
        FROM Borough b1,
            (
            SELECT \
                crashBorough, \
                year, \
                month, \
                COUNT(*) as numberOfCrashes
            FROM 
                (
                SELECT \
                    crashBorough, \
                    EXTRACT(MONTH FROM crash_date) AS month, \
                    EXTRACT(YEAR FROM crash_date) AS year
                FROM CRASH
                WHERE crash_date >= (:date1) \
                    AND crash_date <= (:date2)
                    AND crashBorough IN (:selectedBorough)
                )
            GROUP BY crashBorough, year, month
            ) b2
        WHERE b1.borough_id = b2.crashborough
        ORDER BY year ASC, month ASC, crashBorough ASC
        `, {
            date1: new Date(date1),
            date2: new Date(date2),
            selectedBorough: selectedBorough
        }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

//used to hardcode values and test on server side, check post for actual front end behavior
app.get('/query1', async (req, res) => {
    const date1 = "2022-01-01";
    const date2 = "2023-12-31";
    const selectedBorough = 1;
    try {
        const connection = await oracledb.getConnection({
            user: 'zackary.denson',
            password: 'hj2G2t61o23OB2GsiEE1hoVo',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });

        const result = await connection.execute(`
        SELECT \
            name AS BoroughName, \
            b2.month AS month, \
            b2.year AS year, \
            b2.numberOfCrashes AS numberOfCrashes
        FROM Borough b1,
            (
            SELECT \
                crashBorough, \
                year, \
                month, \
                COUNT(*) as numberOfCrashes
            FROM 
                (
                SELECT \
                    crashBorough, \
                    EXTRACT(MONTH FROM crash_date) AS month, \
                    EXTRACT(YEAR FROM crash_date) AS year
                FROM CRASH
                WHERE crash_date >= (:date1) \
                    AND crash_date <= (:date2)
                    AND crashBorough IN (:selectedBorough)
                )
            GROUP BY crashBorough, year, month
            ) b2
        WHERE b1.borough_id = b2.crashborough
        ORDER BY year ASC, month ASC, crashBorough ASC
        `, {
            date1: new Date(date1),
            date2: new Date(date2),
            selectedBorough: selectedBorough
        }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.post('/query2', async (req, res) => {
    const { hour1, hour2, selectedBorough} = req.body;
    try {
        const connection = await oracledb.getConnection({
            user: 'zackary.denson',
            password: 'hj2G2t61o23OB2GsiEE1hoVo',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });

        const result = await connection.execute(`
        SELECT \
            name AS BoroughName, \
            b2.hour as hour, \
            b2.numOfCrashes AS numberOfCrashes
        FROM Borough b1,
            (
            SELECT \
                crashBorough, \
                crash_time as hour, \
                COUNT(*) AS numOfCrashes 
            FROM Crash 
            WHERE crash_time >= (:hour1) \
                AND crash_time <= (:hour2)
                AND crashBorough IN (:selectedBorough)
            GROUP BY crashBorough, crash_time
            ) b2
        WHERE b1.borough_id = b2.crashBorough
        ORDER BY hour ASC, crashBorough ASC
        `, {
            hour1: hour1,
            hour2: hour2,
            selectedBorough: selectedBorough
        }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

//used to hardcode values and test on server side, check post for actual front end behavior
app.get('/query2', async (req, res) => {
    const hour1 = 1;
    const hour2 = 15;
    const selectedBorough = 1;
    try {
        const connection = await oracledb.getConnection({
            user: 'zackary.denson',
            password: 'hj2G2t61o23OB2GsiEE1hoVo',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });

        const result = await connection.execute(`
        SELECT \
            name AS BoroughName, \
            b2.hour as hour, \
            b2.numOfCrashes AS numberOfCrashes
        FROM Borough b1,
            (
            SELECT \
                crashBorough, \
                crash_time as hour, \
                COUNT(*) AS numOfCrashes 
            FROM Crash 
            WHERE crash_time >= (:hour1) \
                AND crash_time <= (:hour2)
                AND crashBorough IN (:selectedBorough)
            GROUP BY crashBorough, crash_time
            ) b2
        WHERE b1.borough_id = b2.crashBorough
        ORDER BY hour ASC, crashBorough ASC
        `, {
            hour1: hour1,
            hour2: hour2,
            selectedBorough: selectedBorough
        }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.post('/query3', async (req, res) => {
    const {year, event} = req.body;
    const selectedBorough = parseInt(req.body.selectedBorough);
    try {
        const connection = await oracledb.getConnection({
            user: 'zackary.denson',
            password: 'hj2G2t61o23OB2GsiEE1hoVo',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });

        const result = await connection.execute(`
        SELECT \
            b.name AS Borough, \
            cb.hour AS hour, \
            cb.numberOfCrashes AS numberOfCrashes
        FROM Borough b,
            (
            SELECT \
                c.crashBorough, \
                c.crash_time AS hour, \
                COUNT(*) AS numberOfCrashes
            FROM Crash c,
                (
                SELECT \
                    event_id, \
                    event_day, \
                    event_month
                FROM event
                WHERE event_id = (:event)
                ) e
            WHERE EXTRACT(MONTH FROM c.crash_date) = e.event_month
                AND EXTRACT(DAY FROM c.crash_date) = e.event_day
                AND EXTRACT(YEAR FROM c.crash_date) = (:year)
                AND c.CrashBorough IN (:selectedBorough)
            GROUP BY c.crashBorough, c.crash_time
            ) cb
        WHERE b.borough_id = cb.crashBorough
        ORDER BY hour ASC, Borough ASC
        `, {
            event: event,
            year: year,
            selectedBorough: selectedBorough
        }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

//used to hardcode values and test on server side, check post for actual front end behavior
app.get('/query3', async (req, res) => {
    const year = 2022;
    const event = 5;
    const selectedBorough = 1;
    try {
        const connection = await oracledb.getConnection({
            user: 'zackary.denson',
            password: 'hj2G2t61o23OB2GsiEE1hoVo',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });

        const result = await connection.execute(`
        SELECT \
            b.name AS Borough, \
            cb.hour AS hour, \
            cb.numberOfCrashes AS numberOfCrashes
        FROM Borough b,
            (
            SELECT \
                c.crashBorough, \
                c.crash_time AS hour, \
                COUNT(*) AS numberOfCrashes
            FROM Crash c,
                (
                SELECT \
                    event_id, \
                    event_day, \
                    event_month
                FROM event
                WHERE event_id = (:event)
                ) e
            WHERE EXTRACT(MONTH FROM c.crash_date) = e.event_month
                AND EXTRACT(DAY FROM c.crash_date) = e.event_day
                AND EXTRACT(YEAR FROM c.crash_date) = (:year)
                AND c.CrashBorough IN (:selectedBorough)
            GROUP BY c.crashBorough, c.crash_time
            ) cb
        WHERE b.borough_id = cb.crashBorough
        ORDER BY hour ASC, Borough ASC
        `, {
            event: event,
            year: year,
            selectedBorough: selectedBorough
        }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.post('/query4', async (req, res) => {
    const location = parseInt(req.body.location);
    const selectedBorough = parseInt(req.body.selectedBorough);
    try {
        const connection = await oracledb.getConnection({
            user: 'zackary.denson',
            password: 'hj2G2t61o23OB2GsiEE1hoVo',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });

        const result = await connection.execute(`
        SELECT \
            l.range as KM_Range, \
            COUNT(*) as numberOfCrashes
        FROM 
            (
            SELECT CASE
                WHEN distance BETWEEN 0 and 1 then '0-1'
                WHEN distance BETWEEN 1 and 5 then '1-5'
                WHEN distance BETWEEN 5 and 20 then '5-20'
                ELSE '20+' END AS RANGE
            FROM 
                ( 
                select sdo_geom.sdo_distance
                    (
                    sdo_geometry(2001, 4326, sdo_point_type(e.longitude, e.latitude, null), null, null),
                    sdo_geometry(2001, 4326, sdo_point_type(c.longitude, c.latitude, null), null, null),
                    0.01,
                    'unit=KM'
                    ) AS distance
                FROM LOCATION e, CRASH c
                WHERE e.location_ID = (:location) AND c.crashBorough = (:selectedBorough)
                )
            ) l
        GROUP BY l.range
        ORDER BY l.range ASC
        `, {
            location: location,
            selectedBorough: selectedBorough
        }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

//used to hardcode values and test on server side, check post for actual front end behavior
app.get('/query4', async (req, res) => {
    const location = 71717;
    const selectedBorough = 1;
    try {
        const connection = await oracledb.getConnection({
            user: 'zackary.denson',
            password: 'hj2G2t61o23OB2GsiEE1hoVo',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });

        const result = await connection.execute(`
        SELECT \
            l.range as KM_Range, \
            COUNT(*) as numberOfCrashes
        FROM 
            (
            SELECT CASE
                WHEN distance BETWEEN 0 and 1 then '0-1'
                WHEN distance BETWEEN 1 and 5 then '1-5'
                WHEN distance BETWEEN 5 and 20 then '5-20'
                ELSE '20+' END AS RANGE
            FROM 
                ( 
                select sdo_geom.sdo_distance
                    (
                    sdo_geometry(2001, 4326, sdo_point_type(e.longitude, e.latitude, null), null, null),
                    sdo_geometry(2001, 4326, sdo_point_type(c.longitude, c.latitude, null), null, null),
                    0.01,
                    'unit=KM'
                    ) AS distance
                FROM LOCATION e, CRASH c
                WHERE e.location_ID = (:location) AND c.crashBorough = (:selectedBorough)
                )
            ) l
        GROUP BY l.range
        ORDER BY l.range ASC
        `, {
            location: location,
            selectedBorough: selectedBorough
        }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.post('/query5', async (req, res) => {
    const {year1, year2} = req.body;
    const selectedBorough = parseInt(req.body.selectedBorough);
    try {
        const connection = await oracledb.getConnection({
            user: 'zackary.denson',
            password: 'hj2G2t61o23OB2GsiEE1hoVo',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });

        const result = await connection.execute(`
        SELECT 
            c5.year, 
            l.description, 
            c5.max2
        FROM Location l,
            (
            SELECT c3.year, c3.max2, c4.crashLocation 
            FROM
                (
                SELECT c2.year, MAX(c2.numberOfCrashes) as max2
                FROM
                    (
                    SELECT year, crashLocation, COUNT(*) AS numberOfCrashes
                    FROM
                        (
                        SELECT crash_id, crash_date, crashLocation, EXTRACT(YEAR FROM crash_date) AS year
                        FROM Crash
                        WHERE EXTRACT(YEAR FROM crash_date) >= (:year1)
                            AND EXTRACT(YEAR FROM crash_date) <= (:year2) 
                            AND crashBorough IN (:selectedBorough)
                        ) c
                    GROUP BY year, crashLocation
                    )c2
                GROUP BY c2.year
                ) c3,
                (
                    SELECT year, crashLocation, COUNT(*) AS numberOfCrashes
                    FROM
                        (
                        SELECT crash_id, crash_date, crashLocation, EXTRACT(YEAR FROM crash_date) AS year
                        FROM Crash
                        WHERE EXTRACT(YEAR FROM crash_date) >= (:year1)
                            AND EXTRACT(YEAR FROM crash_date) <= (:year2) 
                            AND crashBorough IN (:selectedBorough)
                        ) c
                    GROUP BY year, crashLocation
                )c4
            WHERE c4.numberOfCrashes = c3.max2
            AND c4.year = c3.year
            ) c5
        WHERE c5.crashLocation = l.location_ID
        `, {
            year1: year1,
            year2: year2,
            selectedBorough: selectedBorough
        }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

//used to hardcode values and test on server side, check post for actual front end behavior
app.get('/query5', async (req, res) => {
    const year1 = 2022;
    const year2 = 2023;
    const selectedBorough = 1;
    try {
        const connection = await oracledb.getConnection({
            user: 'zackary.denson',
            password: 'hj2G2t61o23OB2GsiEE1hoVo',
            connectString: 'oracle.cise.ufl.edu/orcl'
        });

        const result = await connection.execute(`
        SELECT 
            c5.year, 
            l.description, 
            c5.max2
        FROM Location l,
            (
            SELECT c3.year, c3.max2, c4.crashLocation 
            FROM
                (
                SELECT c2.year, MAX(c2.numberOfCrashes) as max2
                FROM
                    (
                    SELECT year, crashLocation, COUNT(*) AS numberOfCrashes
                    FROM
                        (
                        SELECT crash_id, crash_date, crashLocation, EXTRACT(YEAR FROM crash_date) AS year
                        FROM Crash
                        WHERE EXTRACT(YEAR FROM crash_date) >= (:year1)
                            AND EXTRACT(YEAR FROM crash_date) <= (:year2) 
                            AND crashBorough IN (:selectedBorough)
                        ) c
                    GROUP BY year, crashLocation
                    )c2
                GROUP BY c2.year
                ) c3,
                (
                    SELECT year, crashLocation, COUNT(*) AS numberOfCrashes
                    FROM
                        (
                        SELECT crash_id, crash_date, crashLocation, EXTRACT(YEAR FROM crash_date) AS year
                        FROM Crash
                        WHERE EXTRACT(YEAR FROM crash_date) >= (:year1)
                            AND EXTRACT(YEAR FROM crash_date) <= (:year2) 
                            AND crashBorough IN (:selectedBorough)
                        ) c
                    GROUP BY year, crashLocation
                )c4
            WHERE c4.numberOfCrashes = c3.max2
            AND c4.year = c3.year
            ) c5
        WHERE c5.crashLocation = l.location_ID
        `, {
            year1: year1,
            year2: year2,
            selectedBorough: selectedBorough
        }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(PORT,
    () => {
        console.log(`listen to port ${PORT}`);
    })
