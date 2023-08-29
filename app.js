const { urlencoded } = require('body-parser')
const express = require('express')
const path = require('path')
const port = 80
const app = express()
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/danceDB');

// Define schema
const danceSchema = new mongoose.Schema({
    myname: String,
    age: String,
    phone: Number,
    email: String,
    locality: String,
    feedback: String

  });

// Define model
const dance = mongoose.model('dance', danceSchema);

//Serving static file
app.use('/static', express.static(path.join(__dirname, 'static')))

//Use middleware
app.use(express.urlencoded())

//Setting views directory
app.set('views', path.join(__dirname,'views'))

//Setting pug engine
app.set('view engine', 'pug')

//Endpoints
app.get('/', (req, res)=>{
    res.status(200).render('home.pug')
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug')
})
app.post('/contact', (req, res)=>{
    let danceBoys = new dance(req.body);
    danceBoys.save().then(()=>{
        res.send("Data saved successfully")
    }).catch(()=>{
        res.status(400).send('Error while saving data to the database')
    })
})}

//Server start here
app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
});
