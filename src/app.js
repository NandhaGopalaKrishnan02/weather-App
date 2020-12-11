const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static site
app.use(express.static(publicDirectoryPath));


// Define different routers
app.get('/', (req, res)=>{
    res.render('index', {
        title:"Weather",
        name:"nandhu"
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title:"About",
        name:"susa"
    });
})

app.get("/help", (req, res)=>{
    res.render('help', {
        title:"Help",
        name:"sanjay"
    });
})


app.get("/weather", (req, res)=> {
    if(!req.query.address){
        return res.send({
            error:"Please provide address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{       

        if(error) return res.send({error})                                 

        forecast(latitude, longitude , (error, forecastData)=>{                
            if(error) return res.send({error})
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    });





 
})

app.get("/products", (req, res)=>{

    if(!req.query.search){
        return res.send({
            error:"please provide search term"
        })
    }
    console.log(req.query)
    res.send("products")
})

app.get("/help/*", (req, res)=>{
    res.render('404',{
        title:"404",
        name:"nandhu",
        errorMessage:"Help article not found"
    });
});

app.get("*", (req, res) => {
    res.render('404',{
        title:"404",
        name:"nandhu",
        errorMessage:"Page not found"
    })
})

app.listen(3000, ()=> "Server listening to port 3000");