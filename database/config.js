const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        const connection =  await mongoose.connect(process.env.DB_CONNECTION)
        const url = `${connection.connection.host}:${connection.connection.port}`

        console.log(`mongoDB connected in ${url}`);

    }catch(err) {
        console.log(`error mongoDB: ${err.message}`);
    }
}

module.exports = connectDB