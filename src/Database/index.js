require('dotenv').config();
mongose = require('mongoose');
// connection database url
mongose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connected to the database ! ${process.env.MONGO_DB_URI}`)
}).catch(err => {
    console.log("Cannot connect to the database!", err)
});