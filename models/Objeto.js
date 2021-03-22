const mongoose = require("mongoose")
const {Model, Schema} = mongoose

const schemaObjeto = new Schema({
    nombre: {type:String, required: true},
    telefono: {type:String, required:true},
    titulo:{type:String},
    descripcion:{type:String},
    foto:{type:String,default:'/images/default.png'}    
})

class Objeto extends Model{
    
    errores=[]

    get errores(){
        let errores=[]
        if(this.nombre=="") errores.push({error:"Nombre vacío, es obligatorio."})
        if(this.telefono=="") errores.push({error:"Telefono vacío, es obligatorio"})
        return errores
    }
}

schemaObjeto.loadClass(Objeto)
module.exports=mongoose.model('objetos',schemaObjeto)