const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

const authenticate = (req, res, next) => {
  if (req.body.username === 'foo' && req.body.password === 'foo') {
    next()
  } else {
    res.redirect('/login')
  }
}

app.get('/login', (req, res) => {
  res.render('login')
})

app.use(authenticate)

app.post('/', (req, res) => {
  console.log(req.body)
  res.render('index', req.body)
})

app.listen(3000, (req, res) => {
  console.log('JUST')
})
