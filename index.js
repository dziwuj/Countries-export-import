const express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    app = express(),
    { MongoClient } = require("mongodb"),
    port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("client/build"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res) => {
    res.sendFile("/index.html", { root: __dirname });
});

// create a GET route
app.get("/sort", (req, res) => {
    async function run() {
        try {
            await client.connect();
            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            if (req.query.order === "asc") {
                const cursor = coll.aggregate(
                    [
                        { $match: {} },
                        { $sort: { [req.query.cat]: 1 } },
                        { $skip: 50 * (req.query.page - 1) },
                        { $limit: 50 },
                    ],
                    { allowDiskUse: true }
                );

                const results = await cursor.toArray();

                res.send(JSON.stringify(results));
                return;
            } else {
                const cursor = coll.aggregate(
                    [
                        { $match: {} },
                        { $sort: { [req.query.cat]: -1 } },
                        { $skip: 50 * (req.query.page - 1) },
                        { $limit: 50 },
                    ],
                    { allowDiskUse: true }
                );
                const results = await cursor.toArray();

                res.send(JSON.stringify(results));

                return;
            }

            // iterate code goes here
        } finally {
            // Ensures that the client will close when you finish/error
        }
    }
    run().catch(console.dir);
});

app.get("/filter", (req, res) => {
    console.log(req.query);
    async function run() {
        try {
            await client.connect();
            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            const cursor = coll.aggregate([
                {
                    $match: {
                        //     $and: [
                        // {
                        year: {
                            $cond: {
                                if: [req.query.minYear === null],
                                then: {},
                                else: { $gte: ["$year", req.query.minYear] },
                            },
                        },
                    },
                    // {
                    //     $cond: {
                    //         if: req.query.maxYear !== null,
                    //         then: {
                    //             year: {
                    //                 $lte: ["$year", req.query.maxYear],
                    //             },
                    //         },
                    //         else: {},
                    //     },
                    // },
                    //     ],
                    // },
                },
                { $skip: 50 * (req.query.page - 1) },
                { $limit: 50 },
            ]);
            const results = await cursor.toArray();

            res.send(JSON.stringify(results));

            // iterate code goes here
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
});

app.get("/countries", (req, res) => {
    async function run() {
        try {
            await client.connect();

            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            const locations = await coll.distinct("location_code");

            console.log("locations");
            // console.log(partners);

            res.send(
                JSON.stringify({
                    locations: locations,
                    partners: locations,
                })
            );

            // iterate code goes here
        } catch (err) {
            console.log(err);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
});

app.get("/import", (req, res) => {
    async function run() {
        try {
            await client.connect();

            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            const value = await coll
                .find()
                .sort({ import_value: -1 })
                .limit(1)
                .toArray();

            console.log("import");

            res.send(JSON.stringify(value));

            // iterate code goes here
        } catch (err) {
            console.log(err);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
});

app.get("/export", (req, res) => {
    async function run() {
        try {
            await client.connect();

            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            const value = await coll
                .find()
                .sort({ export_value: -1 })
                .limit(1)
                .toArray();

            console.log("export");

            res.send(JSON.stringify(value));

            // iterate code goes here
        } catch (err) {
            console.log(err);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
});

app.get("/pageCount", (req, res) => {
    async function run() {
        try {
            await client.connect();
            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            const count = await coll.countDocuments();

            res.send(JSON.stringify(count));

            // iterate code goes here
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
});
