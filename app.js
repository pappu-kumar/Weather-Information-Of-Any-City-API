
const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const myApi = "e59f43f88414e70c6e8350a832c0edac";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + myApi + "&units=" + unit

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDiscription = weatherData.weather[0].description
            console.log(JSON.stringify(temp))
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"


            res.write("<h1>Weather Information of the city: '" + query + "'</h1>" + "<h3>Weather is currently:" + weatherDiscription + "<h3>")
            res.write("Tempratutre is currently:" + temp + "&#8451")
            res.write("<img src=" + imgURL + ">");

            res.send()
        })
    })


    console.log("Post request recieved...");
})


app.listen(3000, function(){
    console.log("server is running on port 3000");
});