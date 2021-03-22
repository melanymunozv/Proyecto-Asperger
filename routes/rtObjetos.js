const express = require('express')
const rtObjetos = express.Router()
const Objeto = require('../models/Objeto')
const daoObjetos = require('../dao/daoObjetos')


rtObjetos.get('/nuevo', function (req, res){
    res.render('objetos/formulario')
})
rtObjetos.get('/guardar', (req, res)=>{ 
    res.render('objetos/formulario')})
    
rtObjetos.post('/guardar', function (req, res){
    req.body.foto=`/images/${req.files.foto.name}`
    daoObjetos.guardar(req.body)
        .then(resp=>{
            let archivo = req.files.foto
            archivo.mv(`./public/images/${archivo.name}`,async err=>{
                if(err) return res.status(500).send({message:err})
                let misObjetos = await daoObjetos.listado()
                res.render('objetos/listado',{objetosPerdidos: misObjetos})
            })
    })
})
rtObjetos.get('/listado', async function (req, res) {
    let misObjetos = await daoObjetos.listado()
    res.render('objetos/listado',{objetosPerdidos: misObjetos})
})
rtObjetos.post('/filtrar',(req,res)=>{
    console.log(req.body)
    daoObjetos.listarPorTitulo(req.body.titulo)
        .then(listado=>
            res.json(listado)
        )
})
rtObjetos.get('/detalle/:id',(req,res)=>{
let id=req.params.id 
daoObjetos.buscarPorId(id)
    .then(obj=>{
        res.render('objetos/formulario-mod', obj)
    })
})
rtObjetos.post('/modificar',function (req,res){
    daoObjetos.modificar(req.body)
    .then(resp=>
        res.redirect('objetos/listado',))
})
rtObjetos.get('/eliminar/:id',(req,res)=>{
    let id=req.params.id 
    daoObjetos.eliminar(id)
        .then(resp=>{
            res.render('objetos/listado')
        })
    })
module.exports=rtObjetos