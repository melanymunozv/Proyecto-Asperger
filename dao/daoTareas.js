const Tarea = require('../models/Tarea')

const daoTareas={}

daoTareas.guardar = function save(tarea){
    return new Promise((resolved, reject)=>{
        let o = new Tarea(tarea)
        if(o.errores.length<=0) o.save()
        resolved(o)
    })
}
daoTareas.listado = function find(){
    return new Promise((resolved, reject)=>{
        resolved(Tarea.find().lean())
    })
}
daoTareas.listarPorTitulo = function findByTitle(param){
    return new Promise((resolved, reject)=>{
        resolved(Tarea.find({titulo:{$regex:`.*${param}.*`}}).lean())
    })
}
daoTareas.buscarPorId = function buscarPorId(id){
    return new Promise((resolved, reject)=>{
        console.log(id)
        resolved(Tarea.findOne({_id:id}).lean())
    })
}
daoTareas.modificar = function udapte(tarea){
    return new Promise((resolved)=>{
        Tarea.findByIdAndUpdate(
            tarea._id,
            tarea
        ).then(err=>{
            resolved('Actualizado correctamente')
        }).catch(err=>resolved(err))
    })
}
daoTareas.eliminar= function eliminar(id){
   return new Promise((resolved,reject)=>{
       resolved(findOneAndRemove())
   })
}

module.exports=daoTareas
