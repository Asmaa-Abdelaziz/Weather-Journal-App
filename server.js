// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance (for connection between browser and local server)
const cors = require("cors");
app.use(cors());

// Initialize the main project folder (website folder)
app.use(express.static("website"));

// make port that server always listen for
const port = 5500; // like mailBoxs

// Setup Server
const server = app.listen(port, function listening() {
  console.log(`server is running on localhost:${port}`); // This message printed on terminal
});

// post data to the server
function postData(request, response) {
  projectData = request.body;
  response.send(projectData);
  console.log(projectData);
}
app.post("/addData", postData);

// get data from the server
const getData = (request, response) => {
  response.send(projectData);
};
app.get("/all", getData);
