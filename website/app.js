/* Global Variables */
const generateBtn = document.querySelector("#generate");

// Personal API Key for OpenWeatherMap API
const apiKey = "ca07ca59c2853959834d4dec4b1424c3&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear(); //Add one to month number as it starts with 0

// mainEvents function to run after pressing generate btn
generateBtn.addEventListener("click", function mainEvents() {
  // get data when first run (when click on generate button)

  // 1- get zip code data of the country from input with id = zip
  const countryZipCode = document.querySelector("#zip").value;

  // 2- get feelings data from input with id feelings
  const myFeelings = document.querySelector("#feelings").value;

  // 3- get link = APICallURL + apiKey
  const APICallURL = `https://api.openweathermap.org/data/2.5/weather?zip=${countryZipCode}&appid=`;

  const fetchAPI = getWeatherData(APICallURL); // carry data returned from getWeatherData function
  fetchAPI
    .then((promiseData) => {
      //console.log(promiseData); //print object to console
      //let temperature = promiseData.main.temp;
      //console.log(temperature); // print tempreture to console
      // create object of three data temp, feeling and date
      const dataObject = {
        temperature: promiseData.main.temp,
        userFeelings: myFeelings,
        date: newDate,
      };
      sendData("/addData", dataObject);
    })
    .then(() => retrieveData());
});

// getWeatherData function to get data from openWetherMap
const getWeatherData = async (callURL) => {
  const jsonLink = callURL + apiKey;
  const fetchResponse = await fetch(jsonLink); // wait for this to be done before all code after
  try {
    const promiseData = await fetchResponse.json();
    return promiseData;
  } catch (error) {
    console.log("error");
  }
};

// sendData function to send data to the server
const sendData = async (route, dataObject) => {
  const response = await fetch(route, {
    // fetch default => get >> change from get to post
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObject), // all data should be json
  });
  try {
    const myData = await response.json();
    console.log(myData);
  } catch (error) {
    console.log(error);
  }
};

// getData function to get data from the server
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temperature) + " degrees";
    document.getElementById("content").innerHTML = allData.userFeelings;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
