import dotenv from "dotenv"
import {app} from './app.js'
dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 3000;

const db = connectDb();

app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
})

export { db };

