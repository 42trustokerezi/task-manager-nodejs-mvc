const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDb = (url)=> {
    return (
        mongoose.connect(
            url,
            // {
            //     useNewUrlParser: true,
            //     useCreateIndex: true,
            //     useFindAndModifiy: false,
            //     useUnifiedTopology: true,
            // },
        )
    )
}

module.exports = connectDb;