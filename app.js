
const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res){
// console.log(req.body.cityName);

const query=req.body.cityName;
const apiKey="e5ab958a3a1b90f43ecf1badc7ec2359";
const unit="metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+apiKey+"&units=" +unit;

https.get(url, function(response) {
    console.log("The Status code is: " + response.statusCode);

    response.on("data", function(data) {

        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        // console.log("The T is: " + temp);
        const weatherDescription = weatherData.weather[0].description;
        // console.log(weatherDescription);
res.write("<p>Weather Description: "+weatherDescription+"</p>");
        // Send response after processing weather data
     const icon=weatherData.weather[0].icon;
     const imageURL=" https://openweathermap.org/img/wn/"+ icon +"@2x.png";
res.write("<img src="+imageURL+">");
     res.write("<h1>Temperature in "+query +" : " + temp + "°C </h1>");
    res.send();
    });
});

    // console.log("Post req recieved");
})


app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});
