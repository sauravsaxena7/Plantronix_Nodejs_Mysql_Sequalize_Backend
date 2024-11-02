import dotenv from "dotenv"
import {app} from './app.js'
import { connectDb } from "./src/db/db.connection.js"
dotenv.config({
    path: './.env'
})




connectDb()



app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT||8000}`);
})


