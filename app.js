const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const models = require('./models')




app.use(bodyParser.urlencoded({extended: false}))

//setting the templating engine to use mustacheExpress
app.engine('mustache', mustacheExpress())
//setting the mustache pages directory
app.set('views', './views')
//set the view engine to mustache
app.set('view engine', 'mustache')

//load the index mustache page
app.get('/', function(req, res) {
  models.shoppinglist.findAll().then(function(shoppinglists) {
    res.render('index', {list: shoppinglists})
  })

})

app.post('/', function(req, res) {
  let newShoppingList = models.shoppinglist.build({
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state
  })

  newShoppingList.save().then(function(savedList) {
    res.redirect('/')
  })

})

app.listen(3000, () => console.log('THE SERVER IS ALIVE!!!'))
