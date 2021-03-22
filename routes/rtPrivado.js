const express = require('express')
const rtMain = express.Router()

rtPrivado.get('/objetos/nuevo', function (req, res){
    req.session.usuario='pepe'
    res.locals.session=req.session
    if(req.session.autenticado=true)
        res.render('usuarios/perfiluser')
    else
    res.render('usuarios/loggin')
})

rtPrivado.get('/usuarios/unlogin',(req, res)=>{
    req.session.destroy()
    res.redirect('/')   
})

module.exports= rtPrivado
