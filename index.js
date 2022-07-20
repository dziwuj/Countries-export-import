const express = require("express"),
    cors = require("cors"),
    app = express(),
    { MongoClient } = require("mongodb"),
    port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("client/build"));

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.get("/", (req, res) => {
    res.sendFile("/index.html", { root: __dirname });
});

// create a GET route
app.get("/all/:page", (req, res) => {
    async function run() {
        try {
            await client.connect();
            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            const cursor = coll
                .find({})
                .limit(50)
                .skip(50 * (req.params.page - 1));
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

app.get("/all/:page", (req, res) => {
    async function run() {
        try {
            await client.connect();
            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            const cursor = coll
                .find({})
                .limit(50)
                .skip(50 * (req.params.page - 1));
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

app.post("/filter/:page", (req, res) => {
    console.log(req.body);
    async function run() {
        try {
            await client.connect();
            // database and collection code goes here
            const db = client.db("Countries-Export-Import");
            const coll = db.collection("Countries-Export-Import");
            // find code goes here
            // const query = { sitc_eci: 0.79901 };
            const cursor = coll
                .find({
                    $cond: {
                        if: req.body.productId !== null,
                        then: { product_id: req.body.productId },
                        else: {},
                    },
                    $cond: {
                        if: req.body.productCode !== null,
                        then: { sitc_product_code: req.body.productCode },
                        else: {},
                    },
                    $cond: {
                        if: req.body.location !== null,
                        then: { location_code: req.body.location },
                        else: {},
                    },
                    $cond: {
                        if: req.body.partner !== null,
                        then: { partner_code: req.body.partner },
                        else: {},
                    },
                    $cond: {
                        if: req.body.minYear !== null,
                        then: { year: { $gt: req.body.minYear - 1 } },
                        else: {},
                    },
                    $cond: {
                        if: req.body.maxYear !== null,
                        then: { year: { $lt: req.body.maxYear + 1 } },
                        else: {},
                    },
                    $cond: {
                        if: req.body.minImport !== null,
                        then: { import_value: { $gt: req.body.minImport - 1 } },
                        else: {},
                    },
                    $cond: {
                        if: req.body.maxImport !== null,
                        then: { import_value: { $lt: req.body.maxImport + 1 } },
                        else: {},
                    },
                    $cond: {
                        if: req.body.minExport !== null,
                        then: { export_value: { $gt: req.body.minExport - 1 } },
                        else: {},
                    },
                    $cond: {
                        if: req.body.maxExport !== null,
                        then: { export_value: { $lt: req.body.maxExport + 1 } },
                        else: {},
                    },
                })
                .limit(req.body.rowsPerPage)
                .skip(req.body.rowsPerPage * (req.params.page - 1));
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
