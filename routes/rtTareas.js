const express = require('express')
const rtTareas = express.Router()
const Tarea = require('../models/Tarea')
const daoTareas = require('../dao/daoTareas')


rtTareas.get('/nuevo', function (req, res){
    res.render('tareas/formulario')
})
rtTareas.get('/guardar', (req, res)=>{ 
    res.render('tareas/formulario')})
    
rtTareas.post('/guardar', function (req, res){
    // req.body.foto=`/images/${req.files.foto.name}`
    daoTareas.guardar(req.body)
        .then(resp=>{
            // let archivo = req.files.foto
            // archivo.mv(`./public/images/${archivo.name}`,async err=>{
            //     if(err) return res.status(500).send({message:err})
                let misTareas = daoTareas.listado()
                res.render('tareas/listado',{objetosPerdidos: misTareas})
            })
    })

rtTareas.get('/listado', async function (req, res) {
    let misTareas = await daoTareas.listado()
    res.render('tareas/listado',{objetosPerdidos: misTareas})
})

rtTareas.get('/eliminar/:id',(req,res)=>{
    let id=req.params.id 
    daoTareas.eliminar(id)
        .then(resp=>{
            res.render('tareas/listado')
        })
    })
module.exports=rtTareas