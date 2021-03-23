const mongoose = require("mongoose")
const {Schema} = mongoose
const bcrypt = require('bcrypt')

const schemaUsuario = new Schema({
    
    nombre: {type:String},
    apellido: {type: String},
    email: {type:String, required:true, index:true, lowercase:true, unique:true},
    telefono: {type: String, required: true},
    password:{type:String, required:true},
    edad: {type:String,} 
})
schemaUsuario.pre('save', function(next) {
    bcrypt.hash(this.password, 6)
        .then(hash=>{
            this.password = hash
            next()
        })
})
class Usuario{
    get errores(){
        let errores=[]
        if(this.email=="") errores.push({error:"email vacío, rellena los campos."})
        if(this.password=="") errores.push({error:"password vacío, rellena los campos"})
        return errores
    }
    comprobarPwd(password){
        return bcrypt.compare(password, this.password)
            .then(res=>{return res})
    }
}


schemaUsuario.loadClass(Usuario)
module.exports=mongoose.model('user',schemaUsuario)