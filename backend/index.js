// const express = require("express");
// const app = express();
// const cors = require('cors');
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// const PORT = process.env.PORT || 4000;

// require("dotenv").config();
// const dbConnect = require("./config/database");

// // Middleware
// app.use(express.json());

// // Routes
// app.get("/", (req, res) => {
//     res.send("<h2>Welcome to homepage</h2>");
// });



// // Todo Routes
// const todoRoutes = require("./routes/todos");
// app.use("/api/v1", todoRoutes);

// // Database Connection
// dbConnect();

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server started at port ${PORT}`);
// });









// Import required modules
const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const dbConnect = require("./config/database");

// Load environment variables from a .env file
dotenv.config();

// Define the port for the server to listen on
const PORT = process.env.PORT || 4000;

// Set up middleware
app.use(cors()); // Enable CORS
app.use(express.urlencoded({ extended: true }));// Parse URL-encoded request bodies
app.use(express.json()); // Parse JSON request bodies

// Define a route for the homepage
app.get("/", (req, res) => {
    res.send("<h2>Welcome to the homepage</h2>");
});

// Import and use todo routes
const Routes = require("./routes/user");
app.use("/api/v1", Routes); // Mount the todoRoutes under the "/api/v1" path

// Connect to the database
dbConnect();

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
