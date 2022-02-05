const express = require("express");
const app = express();
const path = require('path')
const mongoose = require("mongoose");
const methodOverride = require('method-override')

const Campground = require('./models/campground.js');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Mongo Connection Open!"))
.catch((e) => console.log("Oh no mongo error!!", e));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(methodOverride('_method'))  
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/makecampground', async (req, res) => {
  const camp = new Campground({title: 'My Backyard', description: 'cheap camping'});
  await camp.save()
  res.send(camp)

})

app.listen(3000, () => {
  console.log('Listening on Port 3000')
})