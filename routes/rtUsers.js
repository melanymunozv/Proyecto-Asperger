const express = require('express')
const rtUsers = express.Router()
const daoUsuarios = require('../dao/daoUsuarios')
const Usuario = require('../models/Usuario')

rtUsers.get('/nuevo', (req,res)=>{
    res.render('usuarios/formulario')
})
rtUsers.post('/guardar',(req,res)=>{
    daoUsuarios.guardar(req.body)    
        .then(resp=>{
        res.render('usuarios/formulario',{mensaje:resp})
        }).catch(err=>{
        res.render('usuarios/formulario', {mensaje:err})
    })
})
rtUsers.get('/loggin', (req,res)=>{
    res.render('usuarios/loggin')
})
rtUsers.post('/loggin', (req,res)=>{
    daoUsuarios.login(req.body)
    .then( usuario =>{
        if(usuario!==null)
        res.render('usuarios/perfiluser',usuario)
        else
        res.render('usuarios/loggin',{mensaje: 'Usuario incorrecto'})
    })
})
    

module.exports= rtUsers