const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
// Use mongoDB Atlast
const mongoURI = "mongodb+srv://username:password@cluster0.tgawyy6.mongodb.net/Ai_Blog?retryWrites=true&w=majority"
// Use local mongoDB
// const mongoURI = "mongodb://localhost:27017/Ai_Blog"

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to Ai_Blog DB");
        })
}

module.exports = connectToMongo;