const Objeto = require('../models/Objeto')

const daoObjetos={}

daoObjetos.guardar = function save(objeto){
    return new Promise((resolved, reject)=>{
        let o = new Objeto(objeto)
        if(o.errores.length<=0) o.save()
        resolved(o)
    })
}
daoObjetos.listado = function find(){
    return new Promise((resolved, reject)=>{
        resolved(Objeto.find().lean())
    })
}
daoObjetos.listarPorTitulo = function findByTitle(param){
    return new Promise((resolved, reject)=>{
        resolved(Objeto.find({titulo:{$regex:`.*${param}.*`}}).lean())
    })
}
daoObjetos.buscarPorId = function buscarPorId(id){
    return new Promise((resolved, reject)=>{
        console.log(id)
        resolved(Objeto.findOne({_id:id}).lean())
    })
}
daoObjetos.modificar = function udapte(objeto){
    return new Promise((resolved)=>{
        Objeto.findByIdAndUpdate(
            objeto._id,
            objeto
        ).then(err=>{
            resolved('Actualizado correctamente')
        }).catch(err=>resolved(err))
    })
}
daoObjetos.eliminar= function eliminar(id){
   return new Promise((resolved,reject)=>{
       resolved(findOneAndRemove())
   })
}

module.exports=daoObjetos
