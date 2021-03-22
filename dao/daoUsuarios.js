const Usuario = require('../models/Usuario')
const mailer = require('../modules/mailer')

let daoUsuarios={}

daoUsuarios.guardar=function guardar(usuario){
    return new Promise((resolved, reject)=>{
    let u = new Usuario(usuario)
    u.save()
    .then(()=>{
        resolved("Guardado")
    })
    .catch(err=>reject(err))
})
}
daoUsuarios.getUserByEmail= function getUserByEmail(email){
    return new Promise ((resolved)=>{
        resolved(Usuario.findOne({email:email}))
    })
}
daoUsuarios.login = function login(datosRecibidos){
    return new Promise((resolved, reject)=>{
        daoUsuarios.getUserByEmail(datosRecibidos.email)
        .then(async usuario=>{
             if (usuario==null)
                resolved(null)
            else{
                let resultado = await usuario.comprobarPwd(datosRecibidos.password)
                if(resultado==false)
                    resolved(null)
                else
                    resolved(usuario)
            }
        })
    })
}


module.exports = daoUsuarios