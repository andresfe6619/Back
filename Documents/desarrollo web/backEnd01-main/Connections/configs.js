
import dotenv from "dotenv";
dotenv.config({path: ".env"});



export default  {
    mongodb : {
        connectionString: process.env.MONGO
    },
    firebase :process.env.FIREBASE
    }