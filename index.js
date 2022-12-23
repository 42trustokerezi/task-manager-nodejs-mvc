const express = require('express');
const app = express();
const dotenv = require('dotenv');
const tasks = require('./routes/task.js');
const connectDb = require('./db/connect')
const mongoose = require('mongoose')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


dotenv.config();


app.use(express.static('./public'))
app.use(express.json());
app.use(notFound);
app.use(errorHandlerMiddleware);

app.use("/api/v1/tasks", tasks);

// const start = async ()=> {
//     try{
//         await connectDb(process.env.MONGO_URI)
//         app.listen( process.env.PORT, console.log('listening on port ' + process.env.PORT));
//     }
//     catch(error){console.log(error)}
// }

// start();

mongoose.connect(process.env.MONGO_URI, ()=>{
    console.log("db connected successfully");
})

app.listen(process.env.PORT, console.log('listening on', process.env.PORT));

