const mongoose = require("mongoose")
const {Model, Schema} = mongoose

const schemaTarea = new Schema({
    nombre: {type:String, required: true},
    descripcion: {type:String, required:true}, 
    puntuacion:{type:String}, 
    fecha:{type:String},
})

class Tarea extends Model{
    
    errores=[]
    get errores(){
        let errores=[]
        if(this.nombre=="") errores.push({error:"Tarea vacia, es obligatorio."})
        if(this.descripcion=="") errores.push({error:"Descripción vacia, es obligatorio"})
        return errores
    }
}

schemaTarea.loadClass(Tarea)
module.exports=mongoose.model('tareas',schemaTarea)