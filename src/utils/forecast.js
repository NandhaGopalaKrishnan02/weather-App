const request = require("request");

const forecast = (latitude, longitude, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=bf4358498423de4a6bb38f702b2528bd&query=${encodeURIComponent(latitude)}, ${encodeURIComponent(longitude)}&units=f`;
    request( {url, json:true}, (error, {body}={}) =>{
        if(error){
            callback("Unable to connect weather services", undefined);
        } else if(body.error){
            callback("Unable to find given coordinates", undefined)
        } else {
            const currentData = body.current;
            callback(undefined, `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature} degree. It feels like ${currentData.feelslike} degree's out`)
        }
    }) 

}

module.exports = forecast;