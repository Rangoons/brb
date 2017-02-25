var express = require('express')
var exphbs = require('express-handlebars')
var path = require('path')
var app = express()

var routes = require('./routes/index')

//set view path and engine to hbs
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({defaultLayout:'layout'}))
app.set('view engine','handlebars')

//set path for static files
app.use(express.static(path.join(__dirname,'public')))

app.use('/', routes)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
