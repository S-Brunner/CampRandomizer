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

const saveTeam = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();

        const db = client.db("randomizer")

        const newTeam = req.body

        if(newTeam._id.length === 0){
            return res.status(400).json({ status: 400, message : "Please enter a team name"});
        }

        const _idFound = await db.collection("teams").findOne({ _id : newTeam._id });

        if(_idFound){
            return res.status(400).json({ status: 400, message: "Team name already exists"});
        }

        const addNewTeam = await db.collection("teams").insertOne(newTeam);

        res.status(200).json({ status: 200, message: "Team saved succeffuly!"});
        client.close();

    } catch (error) {
        res.status(400).json({ status: 400, message: error})
    }
}

const getAllTeams = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("randomizer");

        const data = await db.collection("teams").find({}).toArray();

        res.status(200).json({ status: 200, data });

        client.close();
    } catch (error) {
        res.status(400).json({ status: 400, message: error})
    }
}

module.exports = { getCampers, saveTeam, getAllTeams }