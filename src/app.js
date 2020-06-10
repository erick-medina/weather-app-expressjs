const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Erick Medina'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Do you need some help?',
        author: 'Erick Medina'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Erick Medina',
    }) 
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    let address = req.query.address;

    geocode(address, (error, {longitude, latitude, location } = {}) => { // adding default parameter
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: address
            })

        })

    })

})
    
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Erick Medina',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Erick Medina',
        errorMessage: 'Page not found'
    })
})

// listen to port
app.listen(5000, () => {
    console.log('Server is up and running')
})
