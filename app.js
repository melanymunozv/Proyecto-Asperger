const express = require('express')
const app = express()
const rtMain = require('./routes/rtMain')
const rtUsers = require('./routes/rtUsers')
const rtTareas = require('./routes/rtTareas')
var exphbs  = require('express-handlebars')
const session = require('express-session')
const conexion = require('./conexion')
const fileUpload = require('express-fileupload')

app.engine('.hbs', exphbs({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(express.static(__dirname + '/public'))
app.use(fileUpload())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({
    secret: 'miclavesecreta',
    resave: false,
    saveUninitialized: true,
  }))


conexion.on('error',console.error.bind(console,"Error de conexion mongo"))
conexion.once('open',()=>console.log("Conexión mongo OK!!"))

app.use('/',rtMain)
app.use('/usuarios',rtUsers)
app.use('/tareas',rtTareas)

app.listen(8080,(err)=>{
    console.log('Server run on port 8080')
})