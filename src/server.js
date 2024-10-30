const app = require("./app");
const connectDb = require("./db/connection");


const PORT = process.env.PORT || 3000;

connectDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});