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
daoTareas.eliminar= function eliminar(id){
   return new Promise((resolved,reject)=>{
       resolved(findOneAndRemove())
   })
}

module.exports=daoTareas
