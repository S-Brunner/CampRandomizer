require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getCampers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("randomizer");

        const result = await db.collection("campers").find().toArray();

        if(!result){
            return res.status(400).json({ status: 400, message: "Something went wrong :("}) 
        }

        res.status(200).json({ status: 200, data: result });

        client.close();
    } catch (error) {
        res.status(400).json({ status: 400, message: error})
    }
}

module.exports = { getCampers }