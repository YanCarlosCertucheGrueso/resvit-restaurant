const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let rolesValidos ={
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol valido'
};
let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required:[true,'el nombre es necesario']
    },
    email:{
        type:String,
        required: [true,"EL correo es necesario"]
    },
    password:{
        type:String,
        required: [true,"EL pass es necesario"]
    },
    img:{
        type:String,
        required: false
    },
    role:{
        type:String,
        default:'USER_ROLE' ,
        enum:  rolesValidos
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }


});



usuarioSchema.methods.toJson = function(){//es para no devolver nunca el pass en la respuesta
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
usuarioSchema.plugin(uniqueValidator,{message: '{PATH} Debe de ser Unico'});

module.exports= mongoose.model('usuario',usuarioSchema);