require('dotenv').config()
const app = require("./app")
const connectDB = require("./db/db")

console.log("Starting server...")
console.log("MongoDB URL:", process.env.MONGODB_URL ? "Found" : "Not found")

connectDB()

app.listen(3000, () => {
    console.log("Server is running at port 3000")
}).on('error', (err) => {
    console.error("Server error:", err)
})
