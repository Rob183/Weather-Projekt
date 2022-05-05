const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "a34cd42dd745031b8bbf47186059b407"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;
    https.get(url, (response) => {
        // console.log('statusCode:', response.statusCode);
        // console.log('headers:', response.headers);
        // console.log(response);

        response.on('data', (data) => {
            // process.stdout.write(data);
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature in " + query + " is: " + temperature + " degrees Celcius.</h1>");
            res.write("<p>The Weather is currently " + weatherDescription + "<p>");
            res.write('<img src="' + imgURL + '"></img>');
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server started on 3000");
})