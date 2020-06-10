const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a1d18a6f2d361119a77a3ad037444f69&query=${longitude}, ${latitude}`;

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_descriptions: body.current.weather_descriptions
            })
        }
    })
}

module.exports = forecast