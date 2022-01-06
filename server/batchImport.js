const { MongoClient } = require("mongodb");
const { campers } = require("./data");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const gender = [];

Object.keys(campers).forEach((camper) => {
    gender.push({
        _id: camper,
        names: campers[camper]
    })
});

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("randomizer");

        const result = await db.collection("campers").insertMany(gender);

        console.log("Success");

        client.close;
    } catch (error) {
        console.log(error);
    }
}

batchImport();