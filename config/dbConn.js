const mongoose = require('mongoose')

const dbConn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Database connected');
    } catch (err) {
        console.log(err);

    }
}

module.exports = dbConn