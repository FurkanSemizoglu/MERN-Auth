const mongoose = require("mongoose");

const dbConnect = async() => {

    try {
        const connected = await mongoose.connect(process.env.DATABASE_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true           
        });

        console.log(`Database connected to ${connected.connection.host}) {
            
        }}`)

    } catch (error) {
        console.log(`error : ${error.message}`)
        process.exit();
    }
}

module.exports = dbConnect