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
app.get("/all", (req, res) => {
    async function run() {
        try {
            await client.connect();
            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");

            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            console.log("get data");

            console.log(req.query);

            const query = {
                $match: {
                    location_code: req.query.location
                        ? { $eq: req.query.location }
                        : { $exists: true },
                    partner_code: req.query.partner
                        ? { $eq: req.query.partner }
                        : { $exists: true },
                    sitc_product_code: req.query.productCode
                        ? { $eq: req.query.productCode }
                        : { $exists: true },
                    product_id: req.query.productId
                        ? { $eq: parseInt(req.query.productId) }
                        : { $exists: true },
                    year: {
                        $gte: parseInt(req.query.minYear),
                        $lte: parseInt(req.query.maxYear),
                    },
                    import_value: {
                        $gte: parseInt(req.query.minImport),
                        $lte: parseInt(req.query.maxImport),
                    },
                    export_value: {
                        $gte: parseInt(req.query.minExport),
                        $lte: parseInt(req.query.maxExport),
                    },
                },
            };

            const result = await coll
                .aggregate(
                    [
                        query,
                        {
                            $sort: {
                                [req.query.cat]:
                                    req.query.order === "asc" ? 1 : -1,
                            },
                        },
                        { $skip: 50 * (req.query.page - 1) },
                        { $limit: 50 },
                    ],
                    { allowDiskUse: true }
                )
                .toArray();

            res.send(JSON.stringify(result));

            return;

            // iterate code goes here
        } finally {
            // Ensures that the client will close when you finish/error
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

            console.log("countries");
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
            // await client.close();
        }
    }
    run().catch(console.dir);
});

app.get("/product_id", (req, res) => {
    async function run() {
        try {
            await client.connect();

            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            const result = await coll.distinct("product_id");

            console.log("product_id");
            // console.log(partners);

            res.send(result);

            // iterate code goes here
        } catch (err) {
            console.log(err);
        } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
        }
    }
    run().catch(console.dir);
});

app.get("/product_code", (req, res) => {
    async function run() {
        try {
            await client.connect();

            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            const result = await coll.distinct("sitc_product_code");

            console.log("sitc_product_code");
            // console.log(partners);

            res.send(result);

            // iterate code goes here
        } catch (err) {
            console.log(err);
        } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
        }
    }
    run().catch(console.dir);
});

app.get("/stats", (req, res) => {
    async function run() {
        try {
            await client.connect();

            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here

            console.log("stats");

            const result = await coll
                .aggregate([
                    {
                        $match: {
                            year: { $not: { $size: 0 } },
                        },
                    },
                    { $unwind: "$year" },
                    {
                        $group: {
                            _id: "$year",
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $match: {
                            count: { $gte: 2 },
                        },
                    },
                ])
                .toArray();

            console.log(result);

            res.send(JSON.stringify(result));

            // iterate code goes here
        } catch (err) {
            console.log(err);
        } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
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
            // await client.close();
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
            // await client.close();
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
            // await client.close();
        }
    }
    run().catch(console.dir);
});
