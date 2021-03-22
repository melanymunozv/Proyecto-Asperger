const express = require('express')
const app = express()
const rtMain = require('./routes/rtMain')
const rtUsers = require('./routes/rtUsers')
const rtObjetos = require('./routes/rtObjetos')
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

//   let rutasPrivadas=[
//   '/objetos/guardar',
//   '/objetos/nuevo',
//   '/objetos/listado'
//   ]
//   app.use((req,res,next)=>{
//       console.log('Estoy pasando por el middleware', req.url)
//       if(req.session.autenticado){ 
//        res.locals.session=req.session
//        console.log("usuario si esta autenticado")
//         next()
//       }else{
//           console.log("usuario no esta autenticado")
//           if(rutasPrivadas.indexOf(req.url)!=-1){
//               res.render('usuarios/loggin')
//           }else next()
//       }
//     })

conexion.on('error',console.error.bind(console,"Error de conexion mongo"))
conexion.once('open',()=>console.log("Conexión mongo OK!!"))

app.use('/',rtMain)
app.use('/usuarios',rtUsers)
app.use('/objetos',rtObjetos)

app.listen(8080,(err)=>{
    console.log('Server run on port 8080')
})